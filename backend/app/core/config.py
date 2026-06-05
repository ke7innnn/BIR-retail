from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    MINIO_ENDPOINT: str
    MINIO_ACCESS_KEY: str
    MINIO_SECRET_KEY: str
    MINIO_BUCKET: str = "bir-retail-media"
    MINIO_SECURE: bool = False
    MINIO_EXTERNAL_ENDPOINT: str = "http://localhost:9000"

    # JWT Authentication
    JWT_SECRET: str = "change-me-to-a-secure-random-secret"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Google OAuth
    GOOGLE_CLIENT_ID: str = ""

    # Cookie Configuration
    COOKIE_SECURE: bool = False
    COOKIE_DOMAIN: str | None = None

    model_config = ConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
