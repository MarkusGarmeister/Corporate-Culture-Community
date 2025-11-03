from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models import User
from app.routes.dto.user import UserCreateDTO, UserUpdateDTO, Token, LoginDTO
from app.utils import hash_value, generate_random_string
from app.auth import authenticate_user, create_access_token
from app.routes import SessionDep

from .__init__ import get_session

router = APIRouter()


@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: UserCreateDTO, session: AsyncSession = Depends(get_session)
):
    seed = generate_random_string()
    hashed_password = hash_value(user.password + seed)
    try:
        db_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            password=hashed_password,
            seed=seed,
            city=user.city,
            company=user.company,
            work_position=user.work_position,
            linkedin_url=user.linkedin_url,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    try:
        session.add(db_user)
        await session.commit()
        await session.refresh(db_user)
        return db_user
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/", response_model=List[User])
async def list_users(session: AsyncSession = Depends(get_session)):
    result = await session.exec(select(User))
    return result.all()


@router.put("/{user_id}", response_model=User)
async def update_user(
    user_id: int,
    updated_user: UserUpdateDTO,
    session: AsyncSession = Depends(get_session),
):
    db_user = await session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    seed = generate_random_string()
    hashed_password = hash_value(updated_user.password + seed)

    db_user.name = updated_user.name
    db_user.password = hashed_password

    try:
        session.add(db_user)
        await session.commit()
        await session.refresh(db_user)
        return db_user
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, session: AsyncSession = Depends(get_session)):
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await session.delete(user)
    await session.commit()


@router.post("/login")
async def get_access_token(login_data: LoginDTO, session: SessionDep) -> Token:
    user = await authenticate_user(login_data.email, login_data.password, session)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    user_data = {"sub": user.email, "id": user.id}
    token = create_access_token(user_data)
    return Token(access_token=token, token_type="bearer")
