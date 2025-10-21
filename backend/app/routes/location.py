from fastapi import APIRouter, HTTPException, Depends, Query
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import List, Optional
from app.models.data_models import Location, User

from .__init__ import get_session

router = APIRouter()

# Fake async current_user dependency
async def get_current_user() -> User:
    return User(id=1, name="test", e_mail="a@b.com", password="", seed="", role="user")

 
@router.post("/locations/", response_model=Location)
async def create_location(location: Location, session: AsyncSession = Depends(get_session), current_user: User = Depends(get_current_user)):
    location.created_by = current_user.id
    session.add(location)
    await session.commit()
    await session.refresh(location)
    return location
 
@router.get("/locations/", response_model=List[Location])
async def read_locations(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = Query(None),
    city: Optional[str] = Query(None),
    min_capacity: Optional[int] = Query(None),
    max_price_range: Optional[int] = Query(None),
    session: AsyncSession = Depends(get_session)
):
    query = select(Location)

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

 
@router.get("/locations/{location_id}", response_model=Location)
async def read_location(location_id: int, session: AsyncSession = Depends(get_session)):
    location = await session.get(Location, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location

 
@router.put("/locations/{location_id}", response_model=Location)
async def update_location(
    location_id: int,
    updated: Location,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    location = await session.get(Location, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    if location.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed to update this location")

    location_data = updated.dict(exclude_unset=True, exclude={"created_by", "id"})
    for key, value in location_data.items():
        setattr(location, key, value)

    session.add(location)
    await session.commit()
    await session.refresh(location)
    return location


@router.delete("/locations/{location_id}", status_code=204)
async def delete_location(
    location_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    location = await session.get(Location, location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    if location.created_by != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed to delete this location")

    await session.delete(location)
    await session.commit()