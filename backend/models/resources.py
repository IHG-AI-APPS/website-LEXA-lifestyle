"""
Resource request models (Architect, Contractor, Developer)
"""
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional, List
from datetime import datetime, timezone
from uuid import uuid4


class ArchitectResourceRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    resource_type: str
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class ArchitectResourceRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: Optional[str] = None
    resource_type: str = Field(..., min_length=2)
    message: Optional[str] = None


class ContractorProjectRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: str
    project_type: str
    systems_needed: List[str]
    project_timeline: str
    drawings_uploaded: bool = False
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class ContractorProjectRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: str = Field(..., min_length=2, max_length=100)
    project_type: str = Field(..., min_length=2)
    systems_needed: List[str] = Field(..., min_items=1)
    project_timeline: str = Field(..., min_length=2)
    message: Optional[str] = None


class DeveloperToolkitRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    email: EmailStr
    phone: str
    company: str
    project_scale: str
    units_count: Optional[int] = None
    resource_type: str
    timeline: str
    message: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class DeveloperToolkitRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    company: str = Field(..., min_length=2, max_length=100)
    project_scale: str = Field(..., min_length=2)
    units_count: Optional[int] = None
    resource_type: str = Field(..., min_length=2)
    timeline: str = Field(..., min_length=2)
    message: Optional[str] = None
