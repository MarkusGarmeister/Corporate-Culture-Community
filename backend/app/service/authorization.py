from fastapi import HTTPException
from app.models import User
import logging
from app.models.data_models import RoleEnum

logger = logging.getLogger(__name__)


class AuthorizationService:
    @staticmethod
    def is_admin(current_user: User) -> bool:
        return current_user.role == RoleEnum.ADMIN.value

    @staticmethod
    def require_admin(current_user: User) -> None:
        if not AuthorizationService.is_admin(current_user):
            logger.warning(
                f"User {current_user.id} attempted admin-only operation without permission",
                extra={"current_user_id": current_user.id},
            )
            raise HTTPException(
                status_code=403,
                detail="You don't have permission to access this resource.",
            )
