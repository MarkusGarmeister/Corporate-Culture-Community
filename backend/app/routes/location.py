from fastapi import APIRouter, HTTPException, Depends, Query
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List, Optional
from app.models.data_models import Location, User
from app.routes.dto.location import (
    LocationCreateDTO,
    LocationUpdateDTO,
    LocationReadDTO,
    LocationSingleReadDTO,
)
from sqlalchemy.orm import selectinload


from .__init__ import get_session, get_current_user

router = APIRouter()


@router.post("/", response_model=LocationReadDTO)
async def create_location(
    location: LocationCreateDTO,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    try:
        db_location = Location(
            **location.model_dump(), created_by=current_user.id, final_rating=0.0
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    try:
        session.add(db_location)
        await session.commit()
        await session.refresh(db_location)
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    stmt = (
        select(Location)
        .where(Location.id == db_location.id)
        .options(selectinload(Location.labels))
    )
    db_location = (await session.exec(stmt)).one()

    return db_location


@router.get("/", response_model=List[LocationReadDTO])
async def read_locations(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
    min_capacity: Optional[int] = Query(None),
    max_price_range: Optional[int] = Query(None),
    session: AsyncSession = Depends(get_session),
):
    query = select(Location).options(selectinload(Location.labels))

    if status:
        query = query.where(Location.status == status)
    if city:
        query = query.where(Location.city == city)
    if min_capacity:
        query = query.where(Location.capacity >= min_capacity)
    if max_price_range:
        query = query.where(Location.price_range <= max_price_range)

    result = await session.exec(query.offset(skip).limit(limit))
    locations = result.all()

    return locations


@router.get("/{location_id}", response_model=LocationSingleReadDTO)
async def read_location(location_id: int, session: AsyncSession = Depends(get_session)):
    stmt = (
        select(Location)
        .where(Location.id == location_id)
        .options(
            selectinload(Location.labels),
            selectinload(Location.creator),
            selectinload(Location.ratings),
        )
    )
    result = await session.exec(stmt)
    location = result.first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location


@router.put("/{location_id}", response_model=Location)
async def update_location(
    location_id: int,
    updated: LocationUpdateDTO,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    location = await session.get(Location, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    if location.created_by != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not allowed to update this location"
        )

    location_data = updated.model_dump(exclude_unset=True, exclude={"created_by", "id"})
    for key, value in location_data.items():
        setattr(location, key, value)
    try:
        session.add(location)
        await session.commit()
        await session.refresh(location)
        return location
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{location_id}", status_code=204)
async def delete_location(
    location_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    location = await session.get(Location, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    if location.created_by != current_user.id:
        raise HTTPException(
            status_code=403, detail="Not allowed to delete this location"
        )

    await session.delete(location)
    await session.commit()
