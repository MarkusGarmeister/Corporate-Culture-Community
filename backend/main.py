from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.user import router as user_router
from app.routes.location import router as location_router
from app.routes.rating import router as rating_router
from app.routes.labels import router as labels_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Range"],
)

app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(location_router, prefix="/locations", tags=["locations"])
app.include_router(rating_router, prefix="/ratings", tags=["ratings"])
app.include_router(labels_router, prefix="/labels", tags=["labels"])
