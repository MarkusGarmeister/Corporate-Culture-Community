import os
from dotenv import load_dotenv

# Load .env file if it exists (for local development)
load_dotenv()


class Config:
    _DATABASE_URL: str = os.getenv("DATABASE_URL")

    @property
    def DATABASE_URL(self) -> str:
        """Convert postgres URL to sync format with psycopg2 driver"""
        if self._DATABASE_URL:
            # Replace postgres:// with postgresql+psycopg2://
            url = self._DATABASE_URL.replace("postgres://", "postgresql+psycopg2://")
            # Also handle postgresql:// (without driver)
            if url.startswith("postgresql://") and "postgresql+psycopg2://" not in url:
                url = url.replace("postgresql://", "postgresql+psycopg2://")
            return url
        return self._DATABASE_URL

    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )
    SMTP_HOST: str = os.getenv("SMTP_HOST", "smtp.example.com")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USERNAME: str = os.getenv("SMTP_USERNAME", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    FROM_EMAIL: str = os.getenv("FROM_EMAIL", "")

    def validate(self):
        errors = []
        if not self.JWT_SECRET_KEY:
            errors.append("JWT_SECRET key is not set.")
        elif len(self.JWT_SECRET_KEY) < 32:
            errors.append("JWT_SECRET key must be at least 32 characters long.")

        if errors:
            raise ValueError("Configuration errors: " + "; ".join(errors))
