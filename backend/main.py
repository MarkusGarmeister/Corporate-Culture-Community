from fastapi import FastAPI

from app.routes.user import router as user_router
from app.routes.location import router as location_router
from app.routes.rating import router as rating_router
from app.routes.labels import router as labels_router

app = FastAPI()

app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(location_router, prefix="/locations", tags=["locations"])
app.include_router(rating_router, prefix="/ratings", tags=["ratings"])
app.include_router(labels_router, prefix="/labels", tags=["labels"])
