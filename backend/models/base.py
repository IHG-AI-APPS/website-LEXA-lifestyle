"""
Base models and shared configurations
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import uuid4


class TimestampedModel(BaseModel):
    """Base model with timestamp fields"""
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True
    )


def generate_id():
    """Generate UUID for models"""
    return str(uuid4())
