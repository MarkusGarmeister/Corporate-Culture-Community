from typing import Optional
from pydantic import BaseModel, EmailStr, HttpUrl, field_validator, ValidationInfo
from app.utils.sanitization import sanitize_text


class UserReadDTO(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    role: str
    city: str
    company: str
    work_position: str
    linkedin_url: str
    department: str

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
    department: Optional[str] = None
    role: Optional[str] = None

    class Config:
        orm_mode = True

    @field_validator(
        "first_name", "last_name", "city", "company", "work_position", "department"
    )
    def sanitize_text_fields(cls, input_text, info: ValidationInfo):
        return sanitize_text(input_text, field_name=info.field_name, max_length=100)


class UserCreateDTO(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    city: str
    company: str
    work_position: str
    linkedin_url: HttpUrl
    department: str

    class Config:
        orm_mode = True

    @field_validator(
        "first_name", "last_name", "city", "company", "work_position", "department"
    )
    def sanitize_text_fields(cls, input_text, info: ValidationInfo):
        return sanitize_text(input_text, field_name=info.field_name, max_length=100)


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginDTO(BaseModel):
    email: str
    password: str


class SetPasswordDTO(BaseModel):
    token: str
    password: str
