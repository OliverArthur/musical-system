from fastapi import APIRouter

from calendar.urls import router as event_router


api_router = APIRouter()

api_router.include_router(event_router, prefix='/event', tags=['events'])
