from typing import List, Optional
from app.models.data_models import RoleEnum
from fastapi import APIRouter, Depends, HTTPException, Query, status, Response
from sqlmodel import select, Session
from app.models import User
from app.routes.dto.user import (
    UserCreateDTO,
    UserReadDTO,
    UserUpdateDTO,
    Token,
    LoginDTO,
    SetPasswordDTO,
)
import logging
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from app.auth import (
    authenticate_user,
    create_access_token,
    get_current_user,
    get_password_hash,
    generate_random_password,
    is_admin_user,
)
from app.routes import SessionDep
from datetime import timedelta
from app.config import Config
from .__init__ import get_session
from app.service import AsyncSMTPClient
from jose import JWTError, jwt


config = Config()
router = APIRouter()

logger = logging.getLogger(__name__)


@router.post("/", response_model=UserReadDTO, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreateDTO, session: Session = Depends(get_session)):

    random_password = generate_random_password(16)
    try:
        async with AsyncSMTPClient(
            host=config.SMTP_HOST,
            port=config.SMTP_PORT,
            username=config.SMTP_USERNAME,
            password=config.SMTP_PASSWORD,
        ) as smtp_client:
            subject = "Thank You for Your Application"
            body = f"Hello {user.first_name},\n\nThank you for your application to the Corporate Culture Community.\n\nWe’ll review your application over the next few days and get back to you.\n\nBest regards,\nCorporate Culture Community Team"
            a = await smtp_client.send_message(
                subject=subject,
                body=body,
                to_addrs=user.email,
            )
            logger.info(f"Registration email sent successfully to {user.email}")
    except Exception as e:

        logger.error(
            "Failed to send registration email",
            exc_info=True,
            extra={"user_email": user.email, "error_type": type(e).__name__},
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to send confirmation email. Please contact support.",
        )
    hashed_password = get_password_hash(random_password)

    try:
        db_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            password=hashed_password,
            city=user.city,
            company=user.company,
            work_position=user.work_position,
            linkedin_url=user.linkedin_url,
            department=user.department,
        )
    except Exception as e:
        logger.error(
            "Failed to create user object",
            exc_info=True,
            extra={"error_type": type(e).__name__},
        )
        raise HTTPException(status_code=400, detail="Invalid user data provided.")
    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user

    except IntegrityError as e:
        session.rollback()
        logger.warning(
            "Database integrity error during user creation",
            exc_info=True,
            extra={
                "user_email": user.email,
                "error_detail": str(e.orig) if hasattr(e, "orig") else str(e),
            },
        )

        error_str = str(e).lower()
        if "unique constraint" in error_str and "email" in error_str:
            raise HTTPException(
                status_code=400,
                detail="An account with this email address already exists.",
            )
        else:
            raise HTTPException(
                status_code=400,
                detail="Unable to create user account due to data conflict.",
            )

    except SQLAlchemyError as e:
        session.rollback()
        logger.error(
            "Database error during user creation",
            exc_info=True,
            extra={"user_email": user.email, "error_type": type(e).__name__},
        )
        raise HTTPException(
            status_code=500, detail="A database error occurred. Please try again later."
        )

    except Exception as e:
        session.rollback()
        logger.error(
            "Unexpected error during user creation",
            exc_info=True,
            extra={"user_email": user.email, "error_type": type(e).__name__},
        )
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later.",
        )


@router.get("", response_model=List[UserReadDTO])
def list_users(
    response: Response,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
    pending: Optional[bool] = Query(None),
):
    if current_user.role != RoleEnum.ADMIN.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to access this resource.",
        )
    if pending is not None and pending:
        users_pending = session.exec(
            select(User).where(User.role == RoleEnum.PENDING.value)
        ).all()
        total_users_pending = len(users_pending)
        response.headers["Content-Range"] = (
            f"users 0-{len(users_pending)-1}/{total_users_pending}"
        )
        return users_pending

    users = session.exec(select(User)).all()
    total_users = len(users)

    response.headers["Content-Range"] = f"users 0-{len(users)-1}/{total_users}"
    return users


@router.get("/{user_id}", response_model=UserReadDTO)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserReadDTO)
def update_user(
    user_id: int,
    updated_user: UserUpdateDTO,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if current_user.id != user_id and current_user.role != RoleEnum.ADMIN.value:
        logger.warning(
            f"User {current_user.id} attempted to update user {user_id} without permission",
            extra={"current_user_id": current_user.id, "target_user_id": user_id},
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to update this user.",
        )
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if updated_user.first_name is not None:
        db_user.first_name = updated_user.first_name
    if updated_user.last_name is not None:
        db_user.last_name = updated_user.last_name
    if updated_user.city is not None:
        db_user.city = updated_user.city
    if updated_user.company is not None:
        db_user.company = updated_user.company
    if updated_user.work_position is not None:
        db_user.work_position = updated_user.work_position
    if updated_user.linkedin_url is not None:
        db_user.linkedin_url = updated_user.linkedin_url
    if updated_user.department is not None:
        db_user.department = updated_user.department
    if updated_user.role is not None:
        if not is_admin_user(current_user):
            logger.warning(
                f"User {current_user.id} attempted to change role of user {user_id} without permission",
                extra={"current_user_id": current_user.id, "target_user_id": user_id},
            )
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to change user roles.",
            )
        old_role = db_user.role
        db_user.role = updated_user.role
        logger.warning(
            f"User role changed by admin",
            extra={
                "event_type": "USER_ROLE_CHANGED",
                "target_user_id": user_id,
                "changed_by_admin_id": current_user.id,
                "old_role": old_role,
                "new_role": updated_user.role,
            },
        )
    if updated_user.password is not None:
        hashed_password = get_password_hash(updated_user.password)
        db_user.password = hashed_password

    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user

    except IntegrityError as e:
        session.rollback()
        logger.warning(
            f"Database integrity error updating user {user_id}",
            exc_info=True,
            extra={"user_id": user_id},
        )
        raise HTTPException(
            status_code=400, detail="Unable to update user due to data conflict."
        )

    except SQLAlchemyError as e:
        session.rollback()
        logger.error(
            f"Database error updating user {user_id}",
            exc_info=True,
            extra={"user_id": user_id},
        )
        raise HTTPException(
            status_code=500, detail="A database error occurred. Please try again later."
        )

    except Exception as e:
        session.rollback()
        logger.error(
            f"Unexpected error updating user {user_id}",
            exc_info=True,
            extra={"user_id": user_id},
        )
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later.",
        )


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if current_user.id != user_id and current_user.role != RoleEnum.ADMIN.value:
        logger.warning(
            f"User {current_user.id} attempted to delete user {user_id} without permission",
            extra={"current_user_id": current_user.id, "target_user_id": user_id},
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to delete this user.",
        )
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    is_self_deletion = current_user.id == user_id
    logger.warning(
        f"User account deleted: {'self-deletion' if is_self_deletion else 'admin deletion'}",
        extra={
            "event_type": "USER_DELETED",
            "deleted_user_id": user.id,
            "deleted_user_email": user.email,
            "deleted_user_role": user.role,
            "deleted_by_user_id": current_user.id,
            "is_self_deletion": is_self_deletion,
        },
    )
    session.delete(user)
    session.commit()


@router.post("/login")
def get_access_token(
    login_data: LoginDTO, session: Session = Depends(get_session)
) -> Token:
    user = authenticate_user(login_data.email, login_data.password, session)
    if not user:
        logger.warning(
            f"Failed login attempt for email {login_data.email}",
            extra={"attempted_email": login_data.email},
        )
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    user_data = {"sub": user.email, "id": user.id}
    token = create_access_token(
        user_data, expires_delta=timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    logger.info(
        f"User {user.id} logged in successfully",
        extra={
            "event_type": "USER_LOGGED_IN",
            "user_id": user.id,
            "user_email": user.email,
        },
    )
    return Token(access_token=token, token_type="bearer")


@router.post("/{user_id}/approve", response_model=UserReadDTO)
async def approve_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if not is_admin_user(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin users can approve accounts",
        )
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = {"sub": db_user.email, "id": db_user.id}
    token = create_access_token(
        user_data, expires_delta=timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    try:
        async with AsyncSMTPClient(
            host=config.SMTP_HOST,
            port=config.SMTP_PORT,
            username=config.SMTP_USERNAME,
            password=config.SMTP_PASSWORD,
        ) as smtp_client:
            subject = "Your Application Has Been Approved"
            body = f"Hello {db_user.first_name},\n\nYour application has been approved.\nPlease set your password using this Link:\nhttps://joinculture.co/#/set-password?token={token} \n\nBest regards,\nCorporate Culture Community Team"
            a = await smtp_client.send_message(
                subject=subject,
                body=body,
                to_addrs=db_user.email,
            )
            logger.info(f"Approval email sent successfully to {db_user.email}")
    except Exception as e:
        logger.error(
            "Failed to send approval email",
            exc_info=True,
            extra={
                "user_id": user_id,
                "user_email": db_user.email,
                "error_type": type(e).__name__,
            },
        )
        raise HTTPException(
            status_code=500,
            detail="User approved but failed to send notification email. Please contact the user directly.",
        )
    db_user.role = RoleEnum.USER.value

    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        logger.info(
            f"User {user_id} approved by admin {current_user.id}",
            extra={
                "event_type": "USER_APPROVED",
                "approved_user_id": user_id,
                "approved_by_admin_id": current_user.id,
            },
        )
        return db_user

    except SQLAlchemyError as e:
        session.rollback()
        logger.error(
            f"Database error approving user {user_id}",
            exc_info=True,
            extra={"user_id": user_id},
        )
        raise HTTPException(
            status_code=500,
            detail="Failed to update user approval status. Please try again.",
        )

    except Exception as e:
        session.rollback()
        logger.error(
            f"Unexpected error approving user {user_id}",
            exc_info=True,
            extra={"user_id": user_id},
        )
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later.",
        )


@router.post("/set_password", response_model=UserReadDTO)
def set_password(
    data: SetPasswordDTO,
    session: Session = Depends(get_session),
):
    try:
        payload = jwt.decode(
            data.token, config.JWT_SECRET_KEY, algorithms=[config.JWT_ALGORITHM]
        )
        decoded_email: str = payload.get("sub")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid token")

    user = session.exec(select(User).where(User.email == decoded_email)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    hashed_password = get_password_hash(data.password)
    user.password = hashed_password

    try:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

    except SQLAlchemyError as e:
        session.rollback()
        logger.error(
            f"Database error setting password for user {user.id}",
            exc_info=True,
            extra={"user_id": user.id},
        )
        raise HTTPException(
            status_code=500, detail="Failed to update password. Please try again."
        )

    except Exception as e:
        session.rollback()
        logger.error(
            f"Unexpected error setting password for user {user.id}",
            exc_info=True,
            extra={"user_id": user.id},
        )
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later.",
        )


@router.post("/update_password", response_model=UserReadDTO)
def update_password(
    new_password: str,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    hashed_password = get_password_hash(new_password)
    current_user.password = hashed_password

    try:
        session.add(current_user)
        session.commit()
        session.refresh(current_user)
        logger.info(
            f"Password updated for user {current_user.id}",
            extra={
                "event_type": "PASSWORD_CHANGED",
                "user_id": current_user.id,
                "user_email": current_user.email,
            },
        )
        return current_user

    except SQLAlchemyError as e:
        session.rollback()
        logger.error(
            f"Database error updating password for user {current_user.id}",
            exc_info=True,
        )
        raise HTTPException(
            status_code=500, detail="Failed to update password. Please try again."
        )

    except Exception as e:
        session.rollback()
        logger.error(
            f"Unexpected error updating password for user {current_user.id}",
            exc_info=True,
            extra={"user_id": current_user.id},
        )
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again later.",
        )
