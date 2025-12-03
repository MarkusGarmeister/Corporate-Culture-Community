from app.config import Config
from datetime import timezone, datetime, timedelta
from app.models.data_models import RoleEnum
from jose import jwt, JWTError
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordBearer
from app.routes import SessionDep
from app.models import User
from sqlmodel import select
from typing import Annotated
from fastapi import Depends, HTTPException, status
import secrets
import string


config = Config()

password_hasher = PasswordHash.recommended()
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="users/login")


def generate_random_password(length: int = 16) -> str:

    letters = string.ascii_letters
    digits = string.digits
    special_chars = "!@#$%^&*"
    all_chars = letters + digits + special_chars
    password = [secrets.choice(all_chars) for _ in range(length)]
    return "".join(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hasher.verify(plain_password, hashed_password)


def get_password_hash(password: str):
    return password_hasher.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, config.JWT_SECRET_KEY, algorithm=config.JWT_ALGORITHM
    )
    return encoded_jwt


def get_current_user(
    token: Annotated[str, Depends(oauth2_bearer)],
    session: SessionDep,
) -> User:
    try:
        payload = jwt.decode(
            token, config.JWT_SECRET_KEY, algorithms=[config.JWT_ALGORITHM]
        )
        email: str = payload.get("sub")
        user_id: int = payload.get("id")
        if email is None or user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
            )

        result = session.exec(select(User).where(User.id == user_id))
        user = result.first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        if user.role == RoleEnum.PENDING.value:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is pending approval",
            )

        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
