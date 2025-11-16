from typing import List, Optional
from app.models.data_models import RoleEnum
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlmodel import select, Session
from app.models import User
from app.routes.dto.user import (
    UserCreateDTO,
    UserReadDTO,
    UserUpdateDTO,
    Token,
    LoginDTO,
)
import traceback

from app.auth import (
    authenticate_user,
    create_access_token,
    get_current_user,
    get_password_hash,
    generate_random_password,
)
from app.routes import SessionDep
from datetime import timedelta
from app.config import Config
from .__init__ import get_session
from app.service import AsyncSMTPClient

config = Config()
router = APIRouter()


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
            subject = "Your Account Has Been Created"
            body = f"Hello {user.first_name},\n\nYour account has been created. Your temporary password is: {random_password}\n\nPlease change your password after logging in. \n\nBest regards,\nCorporate Culture Community Team"
            a = await smtp_client.send_message(
                subject=subject,
                body=body,
                to_addrs=user.email,
            )
            print(f"Email sent: {a}")
    except Exception as e:
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email") from e
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
        print(f"Error creating user object: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user
    except Exception as e:
        print(f"Error creating user:")
        print(f"Exception type: {type(e).__name__}")
        traceback.print_exc()
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[UserReadDTO])
def list_users(
    session: Session = Depends(get_session),
    pending: Optional[bool] = Query(None),
):
    if pending is not None and pending:
        result = session.exec(select(User).where(User.role == RoleEnum.PENDING.value))
        return result.all()

    result = session.exec(select(User))
    return result.all()


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
):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    hashed_password = get_password_hash(updated_user.password)
    db_user.name = updated_user.name
    db_user.password = hashed_password

    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()


@router.post("/login")
def get_access_token(login_data: LoginDTO, session: SessionDep) -> Token:
    user = authenticate_user(login_data.email, login_data.password, session)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    user_data = {"sub": user.email, "id": user.id}
    token = create_access_token(
        user_data, expires_delta=timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return Token(access_token=token, token_type="bearer")


@router.post("/{user_id}/approve", response_model=UserReadDTO)
def approve_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if current_user.role != RoleEnum.ADMIN.value:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only admin users can approve accounts",
        )
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.role = RoleEnum.USER.value

    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))


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
        return current_user
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
