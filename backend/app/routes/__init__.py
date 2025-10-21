from sqlmodel.ext.asyncio.session import AsyncSession
from typing import  AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine
from typing import Annotated
from fastapi import Depends

from app.models import User


URL = f"postgresql+asyncpg://nehws:fordevelopmentonly@localhost:5432/mydatabase"

engine = create_async_engine(URL, echo=True, future=True)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSession(engine) as session:
        try:
            yield session
        except Exception as e:
            await session.rollback()
            raise e
        finally:
            await session.close()
