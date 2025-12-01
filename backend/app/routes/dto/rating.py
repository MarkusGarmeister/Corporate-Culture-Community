from datetime import datetime
from typing import Optional
from app.utils.sanitization import sanitize_text
from pydantic import BaseModel, Field, field_validator, ValidationInfo


class RatingCreateDto(BaseModel):
    """Payload for creating a Rating."""

    location_id: int
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None

    class Config:
        orm_mode = True

    @field_validator("comment")
    def sanitize_comment(cls, input_text, info: ValidationInfo):
        return sanitize_text(input_text, field_name=info.field_name, max_length=500)


class RatingUpdateDto(BaseModel):
    """Payload for updating a Rating (all fields optional)."""

    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None

    class Config:
        orm_mode = True

    @field_validator("comment")
    def sanitize_comment(cls, input_text, info: ValidationInfo):
        return sanitize_text(input_text, field_name=info.field_name, max_length=500)


class RatingReadDto(BaseModel):
    id: int
    location_id: int
    user_id: int
    rating: int
    comment: str | None
    created_at: datetime

    class Config:
        orm_mode = True
