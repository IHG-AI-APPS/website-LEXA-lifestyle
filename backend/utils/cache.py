"""
Simple in-memory cache for API responses
Thread-safe, TTL-based cache to reduce database load
"""

import asyncio
from typing import Any, Optional, Callable
from datetime import datetime, timezone, timedelta
from functools import wraps
import logging

logger = logging.getLogger(__name__)


class SimpleCache:
    """Simple in-memory cache with TTL support"""
    
    def __init__(self):
        self._cache = {}
        self._lock = asyncio.Lock()
    
    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache if not expired"""
        async with self._lock:
            if key in self._cache:
                value, expiry = self._cache[key]
                if datetime.now(timezone.utc) < expiry:
                    logger.debug(f"Cache HIT: {key}")
                    return value
                else:
                    # Expired, remove it
                    del self._cache[key]
                    logger.debug(f"Cache EXPIRED: {key}")
            logger.debug(f"Cache MISS: {key}")
            return None
    
    async def set(self, key: str, value: Any, ttl_seconds: int = 300):
        """Set value in cache with TTL"""
        async with self._lock:
            expiry = datetime.now(timezone.utc) + timedelta(seconds=ttl_seconds)
            self._cache[key] = (value, expiry)
            logger.debug(f"Cache SET: {key} (TTL: {ttl_seconds}s)")
    
    async def delete(self, key: str):
        """Delete a specific key from cache"""
        async with self._lock:
            if key in self._cache:
                del self._cache[key]
                logger.debug(f"Cache DELETE: {key}")
    
    async def clear(self):
        """Clear all cache"""
        async with self._lock:
            self._cache.clear()
            logger.info("Cache CLEARED")
    
    async def stats(self) -> dict:
        """Get cache statistics"""
        async with self._lock:
            total_items = len(self._cache)
            expired_items = 0
            now = datetime.now(timezone.utc)
            
            for key, (value, expiry) in list(self._cache.items()):
                if now >= expiry:
                    expired_items += 1
            
            return {
                "total_items": total_items,
                "active_items": total_items - expired_items,
                "expired_items": expired_items
            }


# Global cache instance
cache = SimpleCache()


def cached(ttl_seconds: int = 300, key_prefix: str = ""):
    """
    Decorator for caching async function results
    
    Usage:
        @cached(ttl_seconds=600, key_prefix="articles")
        async def get_all_articles():
            return await db.articles.find().to_list(1000)
    """
    def decorator(func: Callable):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate cache key from function name and arguments
            key_parts = [key_prefix or func.__name__]
            
            # Add args to key
            if args:
                key_parts.extend(str(arg) for arg in args)
            
            # Add kwargs to key (sorted for consistency)
            if kwargs:
                key_parts.extend(f"{k}={v}" for k, v in sorted(kwargs.items()))
            
            cache_key = ":".join(key_parts)
            
            # Try to get from cache
            cached_value = await cache.get(cache_key)
            if cached_value is not None:
                return cached_value
            
            # Cache miss - execute function
            result = await func(*args, **kwargs)
            
            # Store in cache
            await cache.set(cache_key, result, ttl_seconds)
            
            return result
        
        return wrapper
    return decorator
