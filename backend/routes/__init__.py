"""
Routes package - All API routers
"""
from fastapi import APIRouter

# Import route modules
from . import bookings, content, admin_auth

# Create main API router
api_router = APIRouter()

# Include all sub-routers
api_router.include_router(bookings.router)
api_router.include_router(content.router)
api_router.include_router(admin_auth.router)

# Export all routers
__all__ = [
    "api_router",
    "bookings",
    "content", 
    "admin_auth"
]
