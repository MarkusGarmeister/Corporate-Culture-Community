from pydantic import BaseModel


class LabelDto(BaseModel):
    name: str
