from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class RatingCreateDto(BaseModel):
    """Payload for creating a Rating."""
    
    location_id: int
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None

    class Config:
        orm_mode = True


class RatingUpdateDto(BaseModel):
    """Payload for updating a Rating (all fields optional)."""

    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None

    class Config:
        orm_mode = True

class RatingReadDto(BaseModel):
    id: int
    location_id: int
    user_id: int
    rating: int
    comment: str | None
    created_at: datetime

    class Config:
        orm_mode = True