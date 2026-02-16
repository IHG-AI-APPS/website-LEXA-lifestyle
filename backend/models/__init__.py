"""
Models package - Import all models for easy access
"""
from .base import TimestampedModel, generate_id
from .bookings import (
    ConsultationBooking,
    ConsultationBookingCreate,
    ExperienceCentreBooking,
    ExperienceCentreBookingCreate
)
from .submissions import (
    VillaDesignSubmission,
    VillaDesignSubmissionCreate,
    CinemaConfigRequest,
    ContactMessage,
    ContactMessageCreate
)
from .resources import (
    ArchitectResourceRequest,
    ArchitectResourceRequestCreate,
    ContractorProjectRequest,
    ContractorProjectRequestCreate,
    DeveloperToolkitRequest,
    DeveloperToolkitRequestCreate
)
from .content import (
    Solution,
    Service,
    Project,
    Testimonial,
    Article
)
from .admin import (
    User,
    UserLogin,
    Lead
)

__all__ = [
    # Base
    "TimestampedModel",
    "generate_id",
    # Bookings
    "ConsultationBooking",
    "ConsultationBookingCreate",
    "ExperienceCentreBooking",
    "ExperienceCentreBookingCreate",
    # Submissions
    "VillaDesignSubmission",
    "VillaDesignSubmissionCreate",
    "CinemaConfigRequest",
    "ContactMessage",
    "ContactMessageCreate",
    # Resources
    "ArchitectResourceRequest",
    "ArchitectResourceRequestCreate",
    "ContractorProjectRequest",
    "ContractorProjectRequestCreate",
    "DeveloperToolkitRequest",
    "DeveloperToolkitRequestCreate",
    # Content
    "Solution",
    "Service",
    "Project",
    "Testimonial",
    "Article",
    # Admin
    "User",
    "UserLogin",
    "Lead",
]
