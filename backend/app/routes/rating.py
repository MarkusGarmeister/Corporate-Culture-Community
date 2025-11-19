from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, Session
from app.models import Rating
from app.models.data_models import Location, User
from app.routes.dto import RatingCreateDto, RatingUpdateDto
from sqlalchemy.orm import selectinload
from app.auth import get_current_user
from .__init__ import get_session
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/", response_model=Rating, status_code=status.HTTP_201_CREATED)
def create_rating(
    rating: RatingCreateDto,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    try:
        db_rating = Rating(**rating.model_dump(), user_id=current_user.id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    try:
        session.add(db_rating)
        session.commit()
        session.refresh(db_rating)
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    try:
        stmt = (
            select(Location)
            .where(Location.id == db_rating.location_id)
            .options(
                selectinload(Location.ratings),
            )
        )
        location = session.exec(stmt).first()
        final_rating = (
            sum(map(lambda r: r.rating, location.ratings)) / len(location.ratings)
            if location.ratings
            else 0.0
        )
        location.final_rating = final_rating
        session.add(location)
        session.commit()
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return db_rating


@router.get("", response_model=List[Rating])
def list_ratings(session: Session = Depends(get_session)):
    result = session.exec(select(Rating))
    return result.all()


@router.put("/{rating_id}", response_model=Rating)
def update_rating(
    rating_id: int,
    updated_rating: RatingUpdateDto,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):

    db_rating = session.get(Rating, rating_id)
    if not db_rating:
        raise HTTPException(status_code=404, detail="Rating not found")

    if db_rating.user_id != current_user.id:
        logger.warning(
            f"User {current_user.id} attempted to update rating {rating_id} without permission",
            extra={"current_user_id": current_user.id, "rating_id": rating_id},
        )
        raise HTTPException(
            status_code=403, detail="Not authorized to update this rating"
        )

    db_rating.rating = updated_rating.rating
    db_rating.comment = updated_rating.comment

    try:
        session.add(db_rating)
        session.commit()
        session.refresh(db_rating)

    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    try:
        stmt = (
            select(Location)
            .where(Location.id == db_rating.location_id)
            .options(
                selectinload(Location.ratings),
            )
        )
        location = session.exec(stmt).first()
        final_rating = (
            sum(map(lambda r: r.rating, location.ratings)) / len(location.ratings)
            if location.ratings
            else 0.0
        )
        location.final_rating = final_rating
        session.add(location)
        session.commit()
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    return db_rating


@router.delete("/{rating_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_rating(rating_id: int, session: Session = Depends(get_session)):
    rating = session.get(Rating, rating_id)
    if not rating:
        raise HTTPException(status_code=404, detail="Rating not found")
    session.delete(rating)
    session.commit()

    try:
        stmt = (
            select(Location)
            .where(Location.id == rating.location_id)
            .options(
                selectinload(Location.ratings),
            )
        )
        location = session.exec(stmt).first()
        final_rating = (
            sum(map(lambda r: r.rating, location.ratings)) / len(location.ratings)
            if location.ratings
            else 0.0
        )
        location.final_rating = final_rating
        session.add(location)
        session.commit()
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
