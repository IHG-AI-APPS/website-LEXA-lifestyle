"""
Analytics Service
Flexible analytics tracking that supports multiple providers (GA4, Mixpanel, PostHog, etc.)
"""

import os
import logging
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorDatabase

logger = logging.getLogger(__name__)


class AnalyticsService:
    """
    Unified analytics tracking service
    Logs events to database and can integrate with external providers
    """
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.enabled = os.getenv('ANALYTICS_ENABLED', 'true').lower() == 'true'
        
        # Provider configuration (can be extended)
        self.ga4_measurement_id = os.getenv('GA4_MEASUREMENT_ID')
        self.mixpanel_token = os.getenv('MIXPANEL_TOKEN')
        self.posthog_api_key = os.getenv('POSTHOG_API_KEY')
    
    async def track_event(
        self,
        event_name: str,
        session_id: Optional[str] = None,
        user_id: Optional[str] = None,
        properties: Optional[Dict[str, Any]] = None
    ):
        """
        Track an analytics event
        
        Args:
            event_name: Name of the event (e.g., 'project_started')
            session_id: Optional session/project ID
            user_id: Optional user ID
            properties: Additional event properties
        """
        if not self.enabled:
            return
        
        try:
            event_data = {
                "event_name": event_name,
                "session_id": session_id,
                "user_id": user_id,
                "properties": properties or {},
                "timestamp": datetime.now(timezone.utc),
                "source": "project_builder"
            }
            
            # Store in database
            await self.db.analytics_events.insert_one(event_data)
            
            logger.info(f"Analytics event tracked: {event_name} (session: {session_id})")
            
            # Send to external providers (async, non-blocking)
            # await self._send_to_providers(event_data)
            
        except Exception as e:
            # Analytics failures should not break the app
            logger.error(f"Analytics tracking error: {str(e)}")
    
    async def track_conversion(
        self,
        conversion_type: str,
        session_id: str,
        value: Optional[float] = None,
        metadata: Optional[Dict[str, Any]] = None
    ):
        """
        Track a conversion event (e.g., BOQ generated, email sent)
        
        Args:
            conversion_type: Type of conversion (e.g., 'boq_generated')
            session_id: Session ID
            value: Optional monetary value
            metadata: Additional conversion metadata
        """
        await self.track_event(
            event_name=f"conversion_{conversion_type}",
            session_id=session_id,
            properties={
                "conversion_type": conversion_type,
                "value": value,
                **(metadata or {})
            }
        )
    
    async def track_funnel_step(
        self,
        step_name: str,
        step_number: int,
        session_id: str,
        completed: bool = True,
        metadata: Optional[Dict[str, Any]] = None
    ):
        """
        Track funnel progression
        
        Args:
            step_name: Name of the step (e.g., 'dna_capture')
            step_number: Step number in funnel (1-8)
            session_id: Session ID
            completed: Whether step was completed
            metadata: Additional step data
        """
        await self.track_event(
            event_name=f"funnel_step_{step_name}",
            session_id=session_id,
            properties={
                "step_name": step_name,
                "step_number": step_number,
                "completed": completed,
                "funnel": "project_builder",
                **(metadata or {})
            }
        )
    
    async def get_session_analytics(self, session_id: str) -> Dict[str, Any]:
        """
        Get analytics summary for a session
        
        Args:
            session_id: Session ID
            
        Returns:
            Dict with event counts, timestamps, and funnel progress
        """
        try:
            events = await self.db.analytics_events.find(
                {"session_id": session_id},
                {"_id": 0}
            ).to_list(1000)
            
            return {
                "session_id": session_id,
                "total_events": len(events),
                "events": events,
                "first_event": events[0]["timestamp"] if events else None,
                "last_event": events[-1]["timestamp"] if events else None
            }
        except Exception as e:
            logger.error(f"Get session analytics error: {str(e)}")
            return {"session_id": session_id, "error": str(e)}
    
    async def get_conversion_metrics(
        self,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None
    ) -> Dict[str, Any]:
        """
        Get conversion metrics for a date range
        
        Args:
            start_date: Start date (default: 30 days ago)
            end_date: End date (default: now)
            
        Returns:
            Dict with conversion counts and rates
        """
        try:
            query = {"event_name": {"$regex": "^conversion_"}}
            
            if start_date or end_date:
                query["timestamp"] = {}
                if start_date:
                    query["timestamp"]["$gte"] = start_date
                if end_date:
                    query["timestamp"]["$lte"] = end_date
            
            conversions = await self.db.analytics_events.find(
                query,
                {"_id": 0}
            ).to_list(10000)
            
            # Group by conversion type
            conversion_counts = {}
            for conv in conversions:
                conv_type = conv["event_name"].replace("conversion_", "")
                conversion_counts[conv_type] = conversion_counts.get(conv_type, 0) + 1
            
            return {
                "total_conversions": len(conversions),
                "conversion_counts": conversion_counts,
                "date_range": {
                    "start": start_date.isoformat() if start_date else None,
                    "end": end_date.isoformat() if end_date else None
                }
            }
        except Exception as e:
            logger.error(f"Get conversion metrics error: {str(e)}")
            return {"error": str(e)}


# Singleton instance
_analytics_service = None

def get_analytics_service(db: AsyncIOMotorDatabase) -> AnalyticsService:
    """Get analytics service instance"""
    global _analytics_service
    if _analytics_service is None:
        _analytics_service = AnalyticsService(db)
    return _analytics_service
