"""
Schedule Visit Routes
Handles booking visits to the LEXA Experience Centre
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone
import uuid
import os

# Email service
from services.email_service import EmailService

router = APIRouter(prefix="/api", tags=["Schedule Visit"])

# Get backend URL for ICS file
BACKEND_URL = os.environ.get("BACKEND_URL", "")


class ScheduleVisitRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str
    date: str  # e.g., "Mon, Jan 15"
    time: str  # e.g., "10:00 AM"
    message: Optional[str] = ""


def generate_ics_content(
    name: str,
    email: str,
    visit_date: str,
    visit_time: str,
    booking_id: str
) -> str:
    """Generate ICS calendar file content"""
    
    # Parse the date and time
    # Expected format: "Mon, Jan 15" and "10:00 AM"
    try:
        # Get current year
        current_year = datetime.now().year
        
        # Parse date string like "Mon, Jan 15"
        date_parts = visit_date.replace(',', '').split()
        month_str = date_parts[1]
        day = int(date_parts[2])
        
        # Month mapping
        months = {
            'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
            'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
        }
        month = months.get(month_str, 1)
        
        # Parse time string like "10:00 AM"
        time_parts = visit_time.split()
        time_num = time_parts[0].split(':')
        hour = int(time_num[0])
        minute = int(time_num[1]) if len(time_num) > 1 else 0
        
        # Handle AM/PM
        if len(time_parts) > 1:
            if time_parts[1].upper() == 'PM' and hour != 12:
                hour += 12
            elif time_parts[1].upper() == 'AM' and hour == 12:
                hour = 0
        
        # Create datetime for start (UAE timezone is UTC+4)
        start_dt = datetime(current_year, month, day, hour, minute)
        end_dt = datetime(current_year, month, day, hour + 1, minute)  # 1 hour duration
        
        # Format for ICS (UTC time - subtract 4 hours for UAE)
        start_utc = f"{start_dt.strftime('%Y%m%d')}T{start_dt.strftime('%H%M%S')}"
        end_utc = f"{end_dt.strftime('%Y%m%d')}T{end_dt.strftime('%H%M%S')}"
        now_utc = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
        
    except Exception:
        # Fallback to current date if parsing fails
        now = datetime.now()
        start_utc = now.strftime('%Y%m%dT100000')
        end_utc = now.strftime('%Y%m%dT110000')
        now_utc = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    
    ics_content = f"""BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LEXA Lifestyle//Experience Centre Visit//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:{booking_id}@lexalifestyle.com
DTSTAMP:{now_utc}
DTSTART;TZID=Asia/Dubai:{start_utc}
DTEND;TZID=Asia/Dubai:{end_utc}
SUMMARY:LEXA Experience Centre Visit
DESCRIPTION:Your scheduled visit to the LEXA Lifestyle Experience Centre.\\n\\nVisitor: {name}\\nEmail: {email}\\n\\nLocation: Dubai Investment Park 1, Dubai, UAE\\n\\nWhat to expect:\\n- Live smart home demonstrations\\n- Personalized consultation\\n- Custom solution design
LOCATION:LEXA Lifestyle Experience Centre, Dubai Investment Park 1, Dubai, UAE
ORGANIZER;CN=LEXA Lifestyle:mailto:admin@lexalifestyle.com
ATTENDEE;CN={name}:mailto:{email}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR"""
    
    return ics_content


@router.post("/schedule-visit")
async def schedule_visit(request: ScheduleVisitRequest):
    """Schedule a visit to the LEXA Experience Centre"""
    
    try:
        # Generate booking ID
        booking_id = str(uuid.uuid4())
        
        # Send email notifications
        email_sent = await EmailService.send_schedule_visit_notifications(
            name=request.name,
            email=request.email,
            phone=request.phone,
            visit_date=request.date,
            visit_time=request.time,
            message=request.message or "",
            booking_id=booking_id,
        )
        
        # Generate ICS download URL
        ics_url = f"{BACKEND_URL}/api/schedule-visit/calendar/{booking_id}?name={request.name}&email={request.email}&date={request.date}&time={request.time}"
        
        return {
            "success": True,
            "message": "Visit scheduled successfully",
            "booking_id": booking_id,
            "ics_url": ics_url,
            "email_sent": email_sent
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/schedule-visit/calendar/{booking_id}")
async def download_calendar(
    booking_id: str,
    name: str = "Guest",
    email: str = "guest@example.com",
    date: str = "",
    time: str = ""
):
    """Download ICS calendar file for the visit"""
    
    from fastapi.responses import Response
    
    ics_content = generate_ics_content(
        name=name,
        email=email,
        visit_date=date,
        visit_time=time,
        booking_id=booking_id
    )
    
    return Response(
        content=ics_content,
        media_type="text/calendar",
        headers={
            "Content-Disposition": f"attachment; filename=lexa-visit-{booking_id[:8]}.ics"
        }
    )
