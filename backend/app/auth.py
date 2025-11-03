from app.config import Config
from datetime import timezone, datetime, timedelta
from jose import jwt
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordBearer
from app.routes import SessionDep
from app.models import User
from sqlmodel import select

config = Config()

password_hasher = PasswordHash.recommended()
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="users/login")


def verify_password(plain_password: str, hashed_password: str):
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


async def authenticate_user(email: str, password: str, session: SessionDep):
    result = await session.exec(select(User).filter(User.email == email))
    user = result.first()
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user
