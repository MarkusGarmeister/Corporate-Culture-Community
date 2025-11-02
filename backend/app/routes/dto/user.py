from typing import Optional
from pydantic import BaseModel


class UserReadDTO(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    role: str
    city: Optional[str] = None
    company: Optional[str] = None
    work_position: Optional[str] = None
    linkedin_url: Optional[str] = None

    class Config:
        orm_mode = True


class UserUpdateDTO(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    password: Optional[str] = None
    city: Optional[str] = None
    company: Optional[str] = None
    work_position: Optional[str] = None
    linkedin_url: Optional[str] = None

    class Config:
        orm_mode = True


class UserCreateDTO(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    city: Optional[str] = None
    company: Optional[str] = None
    work_position: Optional[str] = None
    linkedin_url: Optional[str] = None

    class Config:
        orm_mode = True
