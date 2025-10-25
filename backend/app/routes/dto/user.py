from pydantic import BaseModel


class UserReadDTO(BaseModel):
    id: int
    name: str
    e_mail: str
    role: str

    class Config:
        orm_mode = True


class UserUpdateDTO(BaseModel):
    name: str
    password: str

    class Config:
        orm_mode = True


class UserCreateDTO(BaseModel):
    name: str
    e_mail: str
    password: str
    role: str = "admin"

    class Config:
        orm_mode = True
