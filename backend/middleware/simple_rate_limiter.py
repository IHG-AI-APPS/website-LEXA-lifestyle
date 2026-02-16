"""
Simple Rate Limiter using in-memory storage
Tracks requests per IP address to prevent abuse
"""

import time
from collections import defaultdict
from typing import Dict, Tuple
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

class SimpleRateLimiter:
    """
    Simple in-memory rate limiter
    Tracks requests by IP and endpoint
    """
    
    def __init__(self):
        # Structure: {ip_address: {endpoint: [(timestamp, count), ...]}}
        self.requests: Dict[str, Dict[str, list]] = defaultdict(lambda: defaultdict(list))
        self.cleanup_interval = 3600  # Clean old entries every hour
        self.last_cleanup = time.time()
    
    def check_rate_limit(
        self,
        ip_address: str,
        endpoint: str,
        max_requests: int = 5,
        window_seconds: int = 3600
    ) -> Tuple[bool, int]:
        """
        Check if request is within rate limit
        
        Args:
            ip_address: Client IP address
            endpoint: API endpoint being accessed
            max_requests: Maximum requests allowed
            window_seconds: Time window in seconds
            
        Returns:
            Tuple of (is_allowed: bool, remaining_requests: int)
        """
        current_time = time.time()
        cutoff_time = current_time - window_seconds
        
        # Clean up old requests
        if current_time - self.last_cleanup > self.cleanup_interval:
            self._cleanup_old_requests()
        
        # Get requests for this IP and endpoint
        ip_requests = self.requests[ip_address][endpoint]
        
        # Filter out old requests
        recent_requests = [ts for ts in ip_requests if ts > cutoff_time]
        self.requests[ip_address][endpoint] = recent_requests
        
        # Check limit
        if len(recent_requests) >= max_requests:
            logger.warning(f"Rate limit exceeded for {ip_address} on {endpoint}")
            return False, 0
        
        # Add current request
        self.requests[ip_address][endpoint].append(current_time)
        remaining = max_requests - len(recent_requests) - 1
        
        return True, remaining
    
    def _cleanup_old_requests(self):
        """Remove old request records"""
        current_time = time.time()
        cutoff = current_time - 7200  # Keep last 2 hours
        
        for ip in list(self.requests.keys()):
            for endpoint in list(self.requests[ip].keys()):
                self.requests[ip][endpoint] = [
                    ts for ts in self.requests[ip][endpoint]
                    if ts > cutoff
                ]
                if not self.requests[ip][endpoint]:
                    del self.requests[ip][endpoint]
            
            if not self.requests[ip]:
                del self.requests[ip]
        
        self.last_cleanup = current_time
        logger.info("Rate limiter cleanup completed")


# Global rate limiter instance
rate_limiter = SimpleRateLimiter()


def check_rate_limit(ip_address: str, endpoint: str, limit_type: str = "form"):
    """
    Check rate limit and raise HTTPException if exceeded
    
    Args:
        ip_address: Client IP
        endpoint: Endpoint name
        limit_type: Type of limit ("form", "api", etc.)
    """
    # Define limits
    limits = {
        "form": (5, 3600),  # 5 requests per hour
        "api": (100, 900),  # 100 requests per 15 minutes
        "auth": (10, 3600)  # 10 attempts per hour
    }
    
    max_requests, window = limits.get(limit_type, (50, 3600))
    
    allowed, remaining = rate_limiter.check_rate_limit(
        ip_address=ip_address,
        endpoint=endpoint,
        max_requests=max_requests,
        window_seconds=window
    )
    
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail=f"Too many requests. Please try again in {window // 60} minutes.",
            headers={"Retry-After": str(window)}
        )
    
    logger.info(f"Rate limit check passed for {ip_address} on {endpoint}. Remaining: {remaining}")
