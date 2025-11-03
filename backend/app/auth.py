import os
from dotenv import load_dotenv
from datetime import timezone, datetime, timedelta
from jose import jwt
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordBearer
from app.routes import SessionDep
from app.models import User
from sqlmodel import select

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))


password_hash = PasswordHash.recommended()
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="users/login")


def verify_password(plain_password : str, hashed_password: str):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def authenticate_user(email: str, password: str, session: SessionDep):
    result = await session.exec(select(User).filter(User.email == email))
    user = result.first()
    if not user:
        return False
    user_hashed_password = user.password
    if not verify_password(password, user.password):
        return False
    return user
