from pydantic import BaseModel, EmailStr


# --- Request Schemas ---

class RegisterRequest(BaseModel):
    """Customer registration request body."""
    full_name: str
    email: EmailStr
    password: str
    confirm_password: str


class LoginRequest(BaseModel):
    """Unified login request body (works for both customers and admins)."""
    email: EmailStr
    password: str


class GoogleAuthRequest(BaseModel):
    """Google OIDC token exchange request body."""
    id_token: str


class RefreshRequest(BaseModel):
    """Explicit refresh request (token is read from cookie, this is a placeholder body)."""
    pass


# --- Response Schemas ---

class AuthResponse(BaseModel):
    """Successful authentication response."""
    message: str
    user_type: str  # "customer" or "admin"
    user_id: str
    email: str
    full_name: str


class MeResponse(BaseModel):
    """Current authenticated user profile response."""
    user_id: str
    user_type: str
    email: str
    full_name: str
    is_email_verified: bool = False
    is_phone_verified: bool = False
