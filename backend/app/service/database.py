from typing import TypeVar
from fastapi import HTTPException
from sqlmodel import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging

T = TypeVar("T")
logger = logging.getLogger(__name__)


class DatabaseService:
    @staticmethod
    def safe_commit(
        session: Session, entity: T, operation: str, entity_type: str = "entity"
    ) -> T:

        try:
            session.add(entity)
            session.commit()
            session.refresh(entity)
            return entity

        except IntegrityError as e:
            session.rollback()
            logger.warning(
                f"Integrity error during {operation} {entity_type}",
                exc_info=True,
                extra={"operation": operation, "error": str(e)},
            )

            error_str = str(e).lower()
            if "unique constraint" in error_str:
                raise HTTPException(
                    status_code=400,
                    detail=f"Cannot {operation} {entity_type}: duplicate data",
                )
            raise HTTPException(
                status_code=400,
                detail=f"Cannot {operation} {entity_type}: data conflict",
            )

        except SQLAlchemyError as e:
            session.rollback()
            logger.error(
                f"Database error during {operation} {entity_type}",
                exc_info=True,
                extra={"operation": operation},
            )
            raise HTTPException(
                status_code=500, detail="Database error occurred. Please try again."
            )

        except Exception as e:
            session.rollback()
            logger.error(
                f"Unexpected error during {operation} {entity_type}",
                exc_info=True,
                extra={"operation": operation, "error_type": type(e).__name__},
            )
            raise HTTPException(
                status_code=500,
                detail="An unexpected error occurred. Please try again.",
            )
