"""
Analytics API Routes
Track page views, form submissions, calculator completions, and user interactions
"""

from fastapi import APIRouter, Request, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from uuid import uuid4

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/analytics", tags=["analytics"])

# Database connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'lexa_lifestyle')]


# ===== MODELS =====

class PageViewEvent(BaseModel):
    page_url: str
    page_title: Optional[str] = None
    referrer: Optional[str] = None
    session_id: Optional[str] = None
    user_agent: Optional[str] = None
    screen_width: Optional[int] = None
    screen_height: Optional[int] = None

class FormSubmissionEvent(BaseModel):
    form_type: str  # contact, consultation, experience_centre, calculator, quiz
    form_name: Optional[str] = None
    page_url: Optional[str] = None
    session_id: Optional[str] = None
    success: bool = True
    metadata: Optional[Dict[str, Any]] = None

class CalculatorEvent(BaseModel):
    event_type: str  # start, step_complete, submit, pdf_download
    step: Optional[int] = None
    session_id: Optional[str] = None
    project_type: Optional[str] = None
    total_cost: Optional[int] = None
    metadata: Optional[Dict[str, Any]] = None

class ButtonClickEvent(BaseModel):
    button_id: str
    button_text: Optional[str] = None
    page_url: str
    session_id: Optional[str] = None


# ===== HELPER FUNCTIONS =====

def get_client_ip(request: Request) -> str:
    """Extract client IP from request"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# ===== TRACKING ENDPOINTS =====

@router.post("/pageview")
async def track_pageview(event: PageViewEvent, request: Request):
    """Track page view event"""
    try:
        doc = {
            "id": str(uuid4()),
            "type": "pageview",
            "page_url": event.page_url,
            "page_title": event.page_title,
            "referrer": event.referrer,
            "session_id": event.session_id,
            "user_agent": event.user_agent,
            "screen_width": event.screen_width,
            "screen_height": event.screen_height,
            "ip_address": get_client_ip(request),
            "timestamp": datetime.now(timezone.utc)
        }
        await db.analytics_events.insert_one(doc)
        return {"success": True, "event_id": doc["id"]}
    except Exception as e:
        logger.error(f"Error tracking pageview: {e}")
        return {"success": False, "error": str(e)}


@router.post("/form-submission")
async def track_form_submission(event: FormSubmissionEvent, request: Request):
    """Track form submission event"""
    try:
        doc = {
            "id": str(uuid4()),
            "type": "form_submission",
            "form_type": event.form_type,
            "form_name": event.form_name,
            "page_url": event.page_url,
            "session_id": event.session_id,
            "success": event.success,
            "metadata": event.metadata,
            "ip_address": get_client_ip(request),
            "timestamp": datetime.now(timezone.utc)
        }
        await db.analytics_events.insert_one(doc)
        return {"success": True, "event_id": doc["id"]}
    except Exception as e:
        logger.error(f"Error tracking form submission: {e}")
        return {"success": False, "error": str(e)}


@router.post("/calculator")
async def track_calculator_event(event: CalculatorEvent, request: Request):
    """Track calculator interaction event"""
    try:
        doc = {
            "id": str(uuid4()),
            "type": "calculator",
            "event_type": event.event_type,
            "step": event.step,
            "session_id": event.session_id,
            "project_type": event.project_type,
            "total_cost": event.total_cost,
            "metadata": event.metadata,
            "ip_address": get_client_ip(request),
            "timestamp": datetime.now(timezone.utc)
        }
        await db.analytics_events.insert_one(doc)
        return {"success": True, "event_id": doc["id"]}
    except Exception as e:
        logger.error(f"Error tracking calculator event: {e}")
        return {"success": False, "error": str(e)}


@router.post("/button-click")
async def track_button_click(event: ButtonClickEvent, request: Request):
    """Track button click event"""
    try:
        doc = {
            "id": str(uuid4()),
            "type": "button_click",
            "button_id": event.button_id,
            "button_text": event.button_text,
            "page_url": event.page_url,
            "session_id": event.session_id,
            "ip_address": get_client_ip(request),
            "timestamp": datetime.now(timezone.utc)
        }
        await db.analytics_events.insert_one(doc)
        return {"success": True, "event_id": doc["id"]}
    except Exception as e:
        logger.error(f"Error tracking button click: {e}")
        return {"success": False, "error": str(e)}


# ===== ADMIN ANALYTICS ENDPOINTS =====

from utils.auth import verify_admin_token as verify_token

@router.get("/dashboard")
async def get_analytics_dashboard(
    days: int = 30,
    token: dict = Depends(verify_token)
):
    """Get analytics dashboard data for admin"""
    try:
        start_date = datetime.now(timezone.utc) - timedelta(days=days)
        
        # Get counts by event type
        pipeline_counts = [
            {"$match": {"timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$type", "count": {"$sum": 1}}}
        ]
        type_counts = {}
        async for doc in db.analytics_events.aggregate(pipeline_counts):
            type_counts[doc["_id"]] = doc["count"]
        
        # Get page views by page
        pipeline_pages = [
            {"$match": {"type": "pageview", "timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$page_url", "views": {"$sum": 1}}},
            {"$sort": {"views": -1}},
            {"$limit": 20}
        ]
        top_pages = []
        async for doc in db.analytics_events.aggregate(pipeline_pages):
            top_pages.append({"page": doc["_id"], "views": doc["views"]})
        
        # Get form submissions by type
        pipeline_forms = [
            {"$match": {"type": "form_submission", "timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$form_type", "submissions": {"$sum": 1}, "successful": {"$sum": {"$cond": ["$success", 1, 0]}}}},
            {"$sort": {"submissions": -1}}
        ]
        form_stats = []
        async for doc in db.analytics_events.aggregate(pipeline_forms):
            form_stats.append({
                "form_type": doc["_id"],
                "submissions": doc["submissions"],
                "successful": doc["successful"],
                "conversion_rate": round((doc["successful"] / doc["submissions"]) * 100, 1) if doc["submissions"] > 0 else 0
            })
        
        # Get calculator funnel
        pipeline_calculator = [
            {"$match": {"type": "calculator", "timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$event_type", "count": {"$sum": 1}}}
        ]
        calculator_funnel = {}
        async for doc in db.analytics_events.aggregate(pipeline_calculator):
            calculator_funnel[doc["_id"]] = doc["count"]
        
        # Get daily pageviews trend
        pipeline_daily = [
            {"$match": {"type": "pageview", "timestamp": {"$gte": start_date}}},
            {"$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$timestamp"}},
                "views": {"$sum": 1}
            }},
            {"$sort": {"_id": 1}}
        ]
        daily_views = []
        async for doc in db.analytics_events.aggregate(pipeline_daily):
            daily_views.append({"date": doc["_id"], "views": doc["views"]})
        
        # Get unique visitors (by IP)
        pipeline_visitors = [
            {"$match": {"type": "pageview", "timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$ip_address"}},
            {"$count": "unique_visitors"}
        ]
        unique_visitors = 0
        async for doc in db.analytics_events.aggregate(pipeline_visitors):
            unique_visitors = doc["unique_visitors"]
        
        # Get referrer sources
        pipeline_referrers = [
            {"$match": {"type": "pageview", "referrer": {"$nin": [None, ""]}, "timestamp": {"$gte": start_date}}},
            {"$group": {"_id": "$referrer", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]
        top_referrers = []
        async for doc in db.analytics_events.aggregate(pipeline_referrers):
            top_referrers.append({"referrer": doc["_id"], "count": doc["count"]})
        
        return {
            "period_days": days,
            "summary": {
                "total_pageviews": type_counts.get("pageview", 0),
                "unique_visitors": unique_visitors,
                "form_submissions": type_counts.get("form_submission", 0),
                "calculator_interactions": type_counts.get("calculator", 0),
                "button_clicks": type_counts.get("button_click", 0)
            },
            "top_pages": top_pages,
            "form_stats": form_stats,
            "calculator_funnel": calculator_funnel,
            "daily_pageviews": daily_views,
            "top_referrers": top_referrers
        }
        
    except Exception as e:
        logger.error(f"Error getting analytics dashboard: {e}")
        raise HTTPException(status_code=500, detail="Failed to get analytics data")


@router.get("/conversions")
async def get_conversion_metrics(
    days: int = 30,
    token: dict = Depends(verify_token)
):
    """Get conversion metrics for admin"""
    try:
        start_date = datetime.now(timezone.utc) - timedelta(days=days)
        
        # Get total pageviews
        total_pageviews = await db.analytics_events.count_documents({
            "type": "pageview",
            "timestamp": {"$gte": start_date}
        })
        
        # Get form submissions
        form_submissions = await db.analytics_events.count_documents({
            "type": "form_submission",
            "success": True,
            "timestamp": {"$gte": start_date}
        })
        
        # Get calculator completions
        calculator_completions = await db.analytics_events.count_documents({
            "type": "calculator",
            "event_type": "submit",
            "timestamp": {"$gte": start_date}
        })
        
        # Get PDF downloads
        pdf_downloads = await db.analytics_events.count_documents({
            "type": "calculator",
            "event_type": "pdf_download",
            "timestamp": {"$gte": start_date}
        })
        
        # Calculate conversion rates
        form_conversion = round((form_submissions / total_pageviews) * 100, 2) if total_pageviews > 0 else 0
        calculator_conversion = round((calculator_completions / total_pageviews) * 100, 2) if total_pageviews > 0 else 0
        
        return {
            "period_days": days,
            "metrics": {
                "total_pageviews": total_pageviews,
                "form_submissions": form_submissions,
                "calculator_completions": calculator_completions,
                "pdf_downloads": pdf_downloads
            },
            "conversion_rates": {
                "form_conversion": f"{form_conversion}%",
                "calculator_conversion": f"{calculator_conversion}%",
                "pdf_download_rate": f"{round((pdf_downloads / calculator_completions) * 100, 2) if calculator_completions > 0 else 0}%"
            }
        }
        
    except Exception as e:
        logger.error(f"Error getting conversion metrics: {e}")
        raise HTTPException(status_code=500, detail="Failed to get conversion metrics")


@router.get("/events")
async def get_recent_events(
    event_type: Optional[str] = None,
    limit: int = 50,
    token: dict = Depends(verify_token)
):
    """Get recent analytics events for admin"""
    try:
        query = {}
        if event_type:
            query["type"] = event_type
        
        events = await db.analytics_events.find(
            query,
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        return {"events": events, "count": len(events)}
        
    except Exception as e:
        logger.error(f"Error getting events: {e}")
        raise HTTPException(status_code=500, detail="Failed to get events")
