from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, ForeignKey
from enum import Enum as PyEnum


class RoleEnum(PyEnum):
    ADMIN = "admin"
    USER = "user"
    PENDING = "pending"


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str = Field(unique=True)
    password: str
    city: Optional[str]
    company: Optional[str]
    work_position: Optional[str]
    linkedin_url: Optional[str]
    created_at: datetime = Field(default_factory=datetime.now)
    role: str = Field(default=RoleEnum.PENDING.value)

    # Relationships
    locations: List["Location"] = Relationship(back_populates="creator")
    ratings: List["Rating"] = Relationship(back_populates="user")


class LocationLabel(SQLModel, table=True):
    __tablename__ = "location_labels"

    location_id: int = Field(
        sa_column=Column(
            ForeignKey("locations.id", ondelete="CASCADE"), primary_key=True
        )
    )
    label_id: int = Field(
        sa_column=Column(ForeignKey("labels.id", ondelete="CASCADE"), primary_key=True)
    )


class Location(SQLModel, table=True):
    __tablename__ = "locations"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    status: str
    address_line_1: str
    address_line_2: str
    city: str
    state: str
    zip_code: str
    country: str
    created_by: int = Field(
        sa_column=Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    )
    capacity: int
    price_range: int
    final_rating: Optional[float] = None

    # Relationships
    creator: Optional[User] = Relationship(back_populates="locations")
    ratings: List["Rating"] = Relationship(back_populates="location")
    labels: List["Label"] = Relationship(
        back_populates="locations", link_model=LocationLabel
    )


class Rating(SQLModel, table=True):
    __tablename__ = "rating"

    id: Optional[int] = Field(default=None, primary_key=True)
    location_id: int = Field(
        sa_column=Column(ForeignKey("locations.id", ondelete="CASCADE"), nullable=False)
    )
    user_id: int = Field(
        sa_column=Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    )
    rating: int
    comment: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)

    # Relationships
    location: Optional[Location] = Relationship(back_populates="ratings")
    user: Optional[User] = Relationship(back_populates="ratings")


class Label(SQLModel, table=True):
    __tablename__ = "labels"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True)

    # Relationships
    locations: List["Location"] = Relationship(
        back_populates="labels", link_model=LocationLabel
    )
