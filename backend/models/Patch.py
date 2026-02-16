"""
Patch model for tracking system patches and updates
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Patch(BaseModel):
    """Model for system patches"""
    id: str
    filename: str
    description: Optional[str] = None
    uploaded_by: str = "admin"
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)
    applied: bool = False
    applied_at: Optional[datetime] = None
    rollback_available: bool = True
    backup_path: Optional[str] = None
    files_modified: List[str] = []
    status: str = "uploaded"  # uploaded, applied, failed, rolled_back
    error_message: Optional[str] = None
    file_size: int = 0  # in bytes
    patch_path: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "patch-20240206-001",
                "filename": "feature-update.zip",
                "description": "Added new booking feature",
                "uploaded_by": "admin",
                "applied": True,
                "status": "applied"
            }
        }
