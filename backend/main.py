from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import Config

from app.routes.user import router as user_router
from app.routes.location import router as location_router
from app.routes.rating import router as rating_router
from app.routes.labels import router as labels_router

app = FastAPI()

# checking JWT_SECRET_KEY
config = Config()
config.validate()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Range"],
)

app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(location_router, prefix="/locations", tags=["locations"])
app.include_router(rating_router, prefix="/ratings", tags=["ratings"])
app.include_router(labels_router, prefix="/labels", tags=["labels"])

app.mount(
    "/",
    StaticFiles(directory="./static/dist", html=True),
)
