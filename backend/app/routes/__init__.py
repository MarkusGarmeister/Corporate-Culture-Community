from sqlmodel.ext.asyncio.session import AsyncSession
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine
from typing import Annotated
from fastapi import Depends
from app.config import Config
from app.models import User

config = Config()


engine = create_async_engine(config.DATABASE_URL, echo=True, future=True)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine) as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            raise e
        finally:
            await session.close()


SessionDep = Annotated[AsyncSession, Depends(get_session)]


# Fake async current_user dependency
async def get_current_user() -> User:
    return User(id=2, name="test", e_mail="a@b.com", password="", seed="", role="user")
