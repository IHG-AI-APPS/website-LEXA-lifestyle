"""
Rate Limiting Middleware for LEXA Backend
Prevents abuse, DDoS, and spam attacks
"""

from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)

# Initialize rate limiter
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per hour"],  # Global default
    storage_uri="memory://",  # Use in-memory storage
    headers_enabled=True  # Send rate limit info in headers
)


# Custom rate limit exceeded handler
async def rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    """
    Custom handler for rate limit exceeded errors
    """
    logger.warning(
        f"Rate limit exceeded for IP: {request.client.host} "
        f"on endpoint: {request.url.path}"
    )
    
    return JSONResponse(
        status_code=429,
        content={
            "detail": "Too many requests. Please try again later.",
            "retry_after": exc.detail
        },
        headers={
            "Retry-After": str(60)  # Suggest retry after 60 seconds
        }
    )


# Rate limit decorators for different endpoint types
RATE_LIMITS = {
    # Form submissions (strictest)
    "form_submission": "5 per hour",
    
    # API read operations
    "api_read": "100 per 15 minutes",
    
    # API write operations
    "api_write": "20 per hour",
    
    # Authentication attempts
    "auth": "10 per hour",
    
    # File uploads
    "upload": "10 per hour"
}


def get_rate_limit(endpoint_type: str) -> str:
    """Get rate limit string for endpoint type"""
    return RATE_LIMITS.get(endpoint_type, "100 per hour")
