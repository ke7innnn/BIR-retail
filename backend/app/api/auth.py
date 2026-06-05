from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests as google_requests

from app.api.deps import get_db, get_current_user
from app.core.config import settings
from app.core.security import hash_password, verify_password
from app.core.tokens import create_access_token, create_refresh_token, decode_token
from app.models.user import User
from app.models.admin import Admin
from app.models.user_oauth_link import UserOAuthLink
from app.schema.auth import (
    RegisterRequest,
    LoginRequest,
    GoogleAuthRequest,
    AuthResponse,
    MeResponse,
)

router = APIRouter(prefix="/auth", tags=["auth"])

# Cookie configuration constants
COOKIE_SECURE = False  # Set to True in production (HTTPS)
COOKIE_SAMESITE = "lax"
COOKIE_HTTPONLY = True


def _set_auth_cookies(response: Response, access_token: str, refresh_token: str):
    """Set access and refresh token cookies on the response."""
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=COOKIE_HTTPONLY,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=COOKIE_HTTPONLY,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        path="/api/auth/refresh",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
    )


def _clear_auth_cookies(response: Response):
    """Clear auth cookies on the response."""
    response.delete_cookie(key="access_token")
    response.delete_cookie(key="refresh_token", path="/api/auth/refresh")


# ---------- Registration ----------

@router.post("/register", response_model=AuthResponse)
async def register(
    body: RegisterRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    """Register a new customer account with email and password."""
    # Validate password confirmation
    if body.password != body.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match.",
        )

    # Check if email already exists in users table
    existing_user = await db.execute(select(User).where(User.email == body.email))
    if existing_user.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists. Try logging in.",
        )

    # Check if email belongs to an admin
    existing_admin = await db.execute(select(Admin).where(Admin.email == body.email))
    if existing_admin.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists. Try logging in.",
        )

    # Create new user
    new_user = User(
        email=body.email,
        password_hash=hash_password(body.password),
        full_name=body.full_name,
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    # Issue tokens
    access_token = create_access_token(new_user.id, "customer")
    refresh_token = create_refresh_token(new_user.id, "customer")
    _set_auth_cookies(response, access_token, refresh_token)

    return AuthResponse(
        message="Registration successful",
        user_type="customer",
        user_id=new_user.id,
        email=new_user.email,
        full_name=new_user.full_name,
    )


# ---------- Login ----------

@router.post("/login", response_model=AuthResponse)
async def login(
    body: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    """
    Unified login for both customers and admins.
    Checks admins table first, then users table.
    """
    # 1. Check admins table first
    result = await db.execute(select(Admin).where(Admin.email == body.email))
    admin = result.scalar_one_or_none()
    if admin:
        if not verify_password(body.password, admin.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials.",
            )
        access_token = create_access_token(admin.id, "admin")
        refresh_token = create_refresh_token(admin.id, "admin")
        _set_auth_cookies(response, access_token, refresh_token)
        return AuthResponse(
            message="Login successful",
            user_type="admin",
            user_id=admin.id,
            email=admin.email,
            full_name=admin.full_name,
        )

    # 2. Check users table
    result = await db.execute(select(User).where(User.email == body.email))
    user = result.scalar_one_or_none()
    if user:
        # Users who signed up via Google won't have a password_hash
        if not user.password_hash:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This account uses Google Sign-In. Please log in with Google.",
            )
        if not verify_password(body.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials.",
            )
        access_token = create_access_token(user.id, "customer")
        refresh_token = create_refresh_token(user.id, "customer")
        _set_auth_cookies(response, access_token, refresh_token)
        return AuthResponse(
            message="Login successful",
            user_type="customer",
            user_id=user.id,
            email=user.email,
            full_name=user.full_name,
        )

    # 3. No match
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials.",
    )


# ---------- Google OAuth ----------

@router.post("/google", response_model=AuthResponse)
async def google_auth(
    body: GoogleAuthRequest,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    """
    Authenticate with a Google ID Token.
    Creates a new customer account if the user doesn't exist.
    """
    # Verify the Google ID Token
    try:
        idinfo = google_id_token.verify_oauth2_token(
            body.id_token,
            google_requests.Request(),
            settings.GOOGLE_CLIENT_ID,
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token.",
        )

    google_user_id = idinfo["sub"]
    email = idinfo.get("email", "")
    full_name = idinfo.get("name", "")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google account does not have an email address.",
        )

    # Check if user already exists by email
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if user:
        # Link Google account if not already linked
        link_result = await db.execute(
            select(UserOAuthLink).where(
                UserOAuthLink.user_id == user.id,
                UserOAuthLink.provider == "google",
            )
        )
        if not link_result.scalar_one_or_none():
            db.add(UserOAuthLink(
                user_id=user.id,
                provider="google",
                provider_user_id=google_user_id,
            ))
            # Mark email as verified since Google verified it
            user.is_email_verified = True
            await db.commit()
    else:
        # Create new user from Google profile
        user = User(
            email=email,
            full_name=full_name,
            password_hash=None,
            is_email_verified=True,  # Google accounts are pre-verified
        )
        db.add(user)
        await db.flush()  # Get user.id before creating the link

        db.add(UserOAuthLink(
            user_id=user.id,
            provider="google",
            provider_user_id=google_user_id,
        ))
        await db.commit()
        await db.refresh(user)

    # Issue tokens
    access_token = create_access_token(user.id, "customer")
    refresh_token = create_refresh_token(user.id, "customer")
    _set_auth_cookies(response, access_token, refresh_token)

    return AuthResponse(
        message="Google login successful",
        user_type="customer",
        user_id=user.id,
        email=user.email,
        full_name=user.full_name,
    )


# ---------- Token Refresh ----------

@router.post("/refresh", response_model=AuthResponse)
async def refresh_token(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    """
    Refresh the access token using the refresh token cookie.
    Issues a new access token without requiring re-authentication.
    """
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token not found.",
        )

    payload = decode_token(token)
    if payload is None:
        _clear_auth_cookies(response)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token.",
        )

    user_id = payload.get("sub")
    user_type = payload.get("type")

    if user_type == "admin":
        admin = await db.get(Admin, user_id)
        if not admin:
            _clear_auth_cookies(response)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin not found.")
        new_access = create_access_token(admin.id, "admin")
        response.set_cookie(
            key="access_token",
            value=new_access,
            httponly=COOKIE_HTTPONLY,
            secure=COOKIE_SECURE,
            samesite=COOKIE_SAMESITE,
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )
        return AuthResponse(
            message="Token refreshed",
            user_type="admin",
            user_id=admin.id,
            email=admin.email,
            full_name=admin.full_name,
        )

    elif user_type == "customer":
        user = await db.get(User, user_id)
        if not user:
            _clear_auth_cookies(response)
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found.")
        new_access = create_access_token(user.id, "customer")
        response.set_cookie(
            key="access_token",
            value=new_access,
            httponly=COOKIE_HTTPONLY,
            secure=COOKIE_SECURE,
            samesite=COOKIE_SAMESITE,
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )
        return AuthResponse(
            message="Token refreshed",
            user_type="customer",
            user_id=user.id,
            email=user.email,
            full_name=user.full_name,
        )

    _clear_auth_cookies(response)
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type.")


# ---------- Logout ----------

@router.post("/logout")
async def logout(response: Response):
    """Clear auth cookies to log out."""
    _clear_auth_cookies(response)
    return {"message": "Logged out successfully"}


# ---------- Current User Profile ----------

@router.get("/me", response_model=MeResponse)
async def get_me(
    request: Request,
    db: AsyncSession = Depends(get_db),
    current: dict = Depends(get_current_user),
):
    """Return the authenticated user's profile."""
    if current["user_type"] == "admin":
        admin = await db.get(Admin, current["user_id"])
        if not admin:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found.")
        return MeResponse(
            user_id=admin.id,
            user_type="admin",
            email=admin.email,
            full_name=admin.full_name,
        )

    user = await db.get(User, current["user_id"])
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found.")
    return MeResponse(
        user_id=user.id,
        user_type="customer",
        email=user.email,
        full_name=user.full_name,
        is_email_verified=user.is_email_verified,
        is_phone_verified=user.is_phone_verified,
    )
