"""
Security Headers Middleware
Adds security headers to all responses to prevent common web attacks
"""

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
import logging

logger = logging.getLogger(__name__)


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Middleware to add security headers to all responses
    Protects against XSS, clickjacking, MIME sniffing, etc.
    """
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Content Security Policy (CSP)
        # Prevents XSS attacks by controlling resource loading
        response.headers['Content-Security-Policy'] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data: https: blob:; "
            "connect-src 'self' https:; "
            "frame-ancestors 'none';"
        )
        
        # X-Content-Type-Options
        # Prevents MIME type sniffing
        response.headers['X-Content-Type-Options'] = 'nosniff'
        
        # X-Frame-Options
        # Prevents clickjacking attacks
        response.headers['X-Frame-Options'] = 'DENY'
        
        # X-XSS-Protection
        # Enables browser's XSS filter
        response.headers['X-XSS-Protection'] = '1; mode=block'
        
        # Referrer-Policy
        # Controls referrer information
        response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        # Permissions-Policy (formerly Feature-Policy)
        # Restricts browser features
        response.headers['Permissions-Policy'] = (
            'geolocation=(), microphone=(), camera=(), payment=()'
        )
        
        # Strict-Transport-Security (HSTS)
        # Forces HTTPS connections (only add if using HTTPS)
        # Uncomment in production with proper SSL
        # response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        
        return response
