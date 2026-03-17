"""Shared database connection module.

This module provides a centralized MongoDB connection that should be used
by all route modules instead of creating individual connections.

The connection is configured with appropriate timeouts to prevent hanging
during deployment.
"""
import os
from motor.motor_asyncio import AsyncIOMotorClient

# Connection configuration with deployment-safe timeouts
MONGO_TIMEOUT_MS = 5000  # 5 seconds

def get_database():
    """Get the shared database instance with proper timeouts."""
    mongo_url = os.environ.get('MONGO_URL')
    if not mongo_url:
        raise ValueError("MONGO_URL environment variable is required")
    
    db_name = os.environ.get('DB_NAME', 'lexa_lifestyle')
    
    client = AsyncIOMotorClient(
        mongo_url,
        serverSelectionTimeoutMS=MONGO_TIMEOUT_MS,
        connectTimeoutMS=MONGO_TIMEOUT_MS,
        socketTimeoutMS=30000,  # 30 seconds for operations
    )
    
    return client[db_name]

# Lazy initialization - only create connection when first accessed
_db_instance = None

def get_db():
    """Get or create the shared database instance (lazy singleton)."""
    global _db_instance
    if _db_instance is None:
        _db_instance = get_database()
    return _db_instance
