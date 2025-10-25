from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models import User
from app.routes.dto import UserUpdateDTO
from app.routes.dto.user import UserCreateDTO
from app.utils import hash_value, generate_random_string


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
            e_mail=user.e_mail,
            name=user.name,
            password=hashed_password,
            seed=seed,
            role=user.role,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    try:
        session.add(db_user)
        await session.commit()
        await session.refresh(user)
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
