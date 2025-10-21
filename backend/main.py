from fastapi import FastAPI

from app.routes.user import router as user_router
from app.routes.location import router as location_router

app = FastAPI()

app.include_router(user_router, prefix="/user", tags=["users"])
app.include_router(location_router, prefix="/location", tags=["locations"])
