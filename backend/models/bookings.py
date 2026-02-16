"""
Booking-related models
"""
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional, List
from datetime import datetime, timezone
from uuid import uuid4


class ConsultationBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = None
    persona: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ConsultationBookingCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    message: Optional[str] = None
    persona: Optional[str] = None


class ExperienceCentreBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    date: str
    time: str
    name: str
    email: EmailStr
    phone: str
    interests: List[str] = []
    message: Optional[str] = None
    status: str = "confirmed"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ExperienceCentreBookingCreate(BaseModel):
    date: str
    time: str
    name: str
    email: EmailStr
    phone: str
    interests: List[str] = []
    message: Optional[str] = None
