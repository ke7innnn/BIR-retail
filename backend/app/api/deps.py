from typing import AsyncGenerator
from fastapi import Request, HTTPException, status, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import AsyncSessionLocal
from app.core.tokens import decode_token
from app.models.user import User
from app.models.admin import Admin


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session


def _extract_token(request: Request) -> str:
    """Extract the access_token from HttpOnly cookies."""
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return token


async def get_current_user(
    request: Request, db: AsyncSession = Depends(get_db)
) -> dict:
    """
    Decode the JWT from cookies and return a dict with user info.
    Works for both customers and admins.
    """
    token = _extract_token(request)
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user_id = payload.get("sub")
    user_type = payload.get("type")

    if not user_id or not user_type:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    return {"user_id": user_id, "user_type": user_type}


async def require_customer(
    request: Request, db: AsyncSession = Depends(get_db)
) -> User:
    """Require an authenticated customer. Returns the User ORM object."""
    token = _extract_token(request)
    payload = decode_token(token)
    if payload is None or payload.get("type") != "customer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customer access required",
        )

    user = await db.get(User, payload["sub"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    return user


async def require_admin(
    request: Request, db: AsyncSession = Depends(get_db)
) -> Admin:
    """Require an authenticated admin. Returns the Admin ORM object."""
    token = _extract_token(request)
    payload = decode_token(token)
    if payload is None or payload.get("type") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    admin = await db.get(Admin, payload["sub"])
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin not found",
        )
    return admin
