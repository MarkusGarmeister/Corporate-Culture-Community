from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.data_models import Rating
from app.routes.dto import UserReadDTO


class LocationCreateDTO(BaseModel):
    """Payload for creating a Location."""

    name: str
    status: str
    address_line_1: str
    address_line_2: str
    city: str
    state: str
    zip_code: str
    country: str
    capacity: int
    price_range: int

    class Config:
        orm_mode = True


class LocationUpdateDTO(BaseModel):
    """Payload for updating a Location (all fields optional)."""

    name: Optional[str] = None
    status: Optional[str] = None
    address_line_1: Optional[str] = None
    address_line_2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    capacity: Optional[int] = None
    price_range: Optional[int] = None

    class Config:
        orm_mode = True


class LocationReadDTO(BaseModel):
    """Returned representation of a Location."""

    id: int
    name: str
    status: str
    address_line_1: str
    address_line_2: str
    city: str
    state: str
    zip_code: str
    country: str
    created_by: int
    capacity: int
    price_range: int
    final_rating: Optional[float] = None
    labels: List[str] = Field(default_factory=list)

    class Config:
        orm_mode = True


class LocationSingleReadDTO(BaseModel):
    """Returned representation of a Location."""

    id: int
    name: str
    status: str
    address_line_1: str
    address_line_2: str
    city: str
    state: str
    zip_code: str
    country: str
    created_by: int
    capacity: int
    price_range: int
    final_rating: Optional[float] = None
    labels: List[str] = Field(default_factory=list)
    creator: UserReadDTO
    ratings: List[Rating] = Field(default_factory=list)

    class Config:
        orm_mode = True
