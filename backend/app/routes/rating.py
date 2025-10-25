from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models import Rating
from app.models.data_models import Location, User
from app.routes.dto import RatingCreateDto, RatingUpdateDto
from sqlalchemy.orm import selectinload

from .__init__ import get_session, get_current_user

router = APIRouter()


@router.post("/", response_model=Rating, status_code=status.HTTP_201_CREATED)
async def create_rating(
    rating: RatingCreateDto,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    try:
        db_rating = Rating(**rating.model_dump(), user_id=current_user.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    try:
        session.add(db_rating)
        await session.commit()
        await session.refresh(db_rating)
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    try:
        stmt = (
            select(Location)
            .where(Location.id == db_rating.location_id)
            .options(
                selectinload(Location.ratings),
            )
        )
        location = (await session.exec(stmt)).first()
        final_rating = (
            sum(map(lambda r: r.rating, location.ratings)) / len(location.ratings)
            if location.ratings
            else 0.0
        )
        location.final_rating = final_rating
        session.add(location)
        await session.commit()
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return db_rating


@router.get("/", response_model=List[Rating])
async def list_ratings(session: AsyncSession = Depends(get_session)):
    result = await session.exec(select(Rating))
    return result.all()


@router.put("/{rating_id}", response_model=Rating)
async def update_rating(
    rating_id: int,
    updated_rating: RatingUpdateDto,
    session: AsyncSession = Depends(get_session),
):
    db_rating = await session.get(Rating, rating_id)
    if not db_rating:
        raise HTTPException(status_code=404, detail="Rating not found")

    db_rating.rating = updated_rating.rating
    db_rating.comment = updated_rating.comment

    try:
        session.add(db_rating)
        await session.commit()
        await session.refresh(db_rating)

    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    try:
        stmt = (
            select(Location)
            .where(Location.id == db_rating.location_id)
            .options(
                selectinload(Location.ratings),
            )
        )
        location = (await session.exec(stmt)).first()
        final_rating = (
            sum(map(lambda r: r.rating, location.ratings)) / len(location.ratings)
            if location.ratings
            else 0.0
        )
        location.final_rating = final_rating
        session.add(location)
        await session.commit()
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return db_rating


@router.delete("/{rating_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_rating(rating_id: int, session: AsyncSession = Depends(get_session)):
    rating = await session.get(Rating, rating_id)
    if not rating:
        raise HTTPException(status_code=404, detail="Rating not found")
    await session.delete(rating)
    await session.commit()

    try:
        stmt = (
            select(Location)
            .where(Location.id == rating.location_id)
            .options(
                selectinload(Location.ratings),
            )
        )
        location = (await session.exec(stmt)).first()
        final_rating = (
            sum(map(lambda r: r.rating, location.ratings)) / len(location.ratings)
            if location.ratings
            else 0.0
        )
        location.final_rating = final_rating
        session.add(location)
        await session.commit()
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
