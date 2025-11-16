from sqlmodel import Session
from typing import Generator
from sqlalchemy import create_engine
from typing import Annotated
from fastapi import Depends
from app.config import Config
from app.models import User

config = Config()


engine = create_engine(config.DATABASE_URL, echo=True, future=True)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        try:
            yield session
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()


SessionDep = Annotated[Session, Depends(get_session)]
