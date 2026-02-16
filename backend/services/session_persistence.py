"""
Session Persistence Service
Handles save/resume functionality for project sessions
"""

import os
import logging
from typing import Optional, Dict, Any
from datetime import datetime, timezone, timedelta
from motor.motor_asyncio import AsyncIOMotorDatabase

logger = logging.getLogger(__name__)


class SessionPersistenceService:
    """Manage session save/resume functionality"""
    
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.base_url = os.getenv('FRONTEND_URL', 'https://lexalifestyle.com')
    
    async def generate_resume_link(self, session_id: str) -> str:
        """
        Generate unique resume link for session
        
        Args:
            session_id: Project session ID
            
        Returns:
            str: Resume URL
        """
        try:
            # Update session with resume link metadata
            await self.db.project_sessions.update_one(
                {"session_id": session_id},
                {"$set": {
                    "resume_link_generated": True,
                    "resume_link_generated_at": datetime.now(timezone.utc),
                    "resume_link_expires_at": datetime.now(timezone.utc) + timedelta(days=30)
                }}
            )
            
            resume_url = f"{self.base_url}/project-builder/resume/{session_id}"
            
            logger.info(f"Resume link generated for session {session_id}")
            
            return resume_url
            
        except Exception as e:
            logger.error(f"Failed to generate resume link: {str(e)}")
            raise
    
    async def validate_resume_link(self, session_id: str) -> Dict[str, Any]:
        """
        Validate if resume link is still valid
        
        Args:
            session_id: Session ID from URL
            
        Returns:
            Dict with validation result and session data
        """
        try:
            session = await self.db.project_sessions.find_one(
                {"session_id": session_id},
                {"_id": 0}
            )
            
            if not session:
                return {
                    "valid": False,
                    "reason": "Session not found",
                    "session": None
                }
            
            # Check if link has expired (if expiry is set)
            expires_at = session.get('resume_link_expires_at')
            if expires_at:
                # Handle both datetime objects and strings
                if isinstance(expires_at, str):
                    from dateutil import parser
                    expires_at = parser.parse(expires_at)
                
                # Ensure expires_at is timezone-aware
                if expires_at.tzinfo is None:
                    expires_at = expires_at.replace(tzinfo=timezone.utc)
                
                now = datetime.now(timezone.utc)
                if expires_at < now:
                    return {
                        "valid": False,
                        "reason": "Resume link expired (30 days)",
                        "session": None
                    }
            
            # Check if already completed
            if session.get('completed'):
                return {
                    "valid": False,
                    "reason": "Project already submitted",
                    "session": session
                }
            
            return {
                "valid": True,
                "reason": "Session valid",
                "session": session
            }
            
        except Exception as e:
            logger.error(f"Resume link validation error: {str(e)}")
            return {
                "valid": False,
                "reason": f"Validation error: {str(e)}",
                "session": None
            }
    
    async def get_session_state(self, session_id: str) -> Dict[str, Any]:
        """
        Get current session state for resumption
        
        Args:
            session_id: Session ID
            
        Returns:
            Dict with current step and data
        """
        try:
            session = await self.db.project_sessions.find_one(
                {"session_id": session_id},
                {"_id": 0}
            )
            
            if not session:
                raise ValueError("Session not found")
            
            # Determine current step based on completed data
            current_step = self._determine_current_step(session)
            
            return {
                "session_id": session_id,
                "current_step": current_step,
                "project_data": {
                    "segment": session.get('segment'),
                    "property_type": session.get('property_type'),
                    "project_stage": session.get('project_stage'),
                    "area_sqft": session.get('area_sqft'),
                    "location": session.get('location'),
                    "num_floors": session.get('num_floors'),
                    "num_rooms": session.get('num_rooms'),
                    "selected_objectives": session.get('selected_objectives', []),
                    "selected_proposal": session.get('selected_proposal'),
                    "selected_services": session.get('selected_services', [])
                },
                "completed_steps": self._get_completed_steps(session),
                "created_at": session.get('created_at'),
                "last_updated": session.get('updated_at', session.get('created_at'))
            }
            
        except Exception as e:
            logger.error(f"Get session state error: {str(e)}")
            raise
    
    def _determine_current_step(self, session: Dict[str, Any]) -> str:
        """Determine which step user should resume at"""
        
        if session.get('completed'):
            return 'submission_complete'
        elif session.get('contact_name'):
            return 'submission'
        elif session.get('selected_services'):
            return 'boq'
        elif session.get('selected_proposal'):
            return 'services'
        elif session.get('recommended_bundles'):
            return 'proposals'
        elif session.get('selected_objectives'):
            return 'intelligence'
        elif session.get('segment'):
            return 'objectives'
        else:
            return 'dna'
    
    def _get_completed_steps(self, session: Dict[str, Any]) -> list:
        """Get list of completed steps"""
        completed = []
        
        if session.get('segment'):
            completed.append('dna')
        if session.get('selected_objectives'):
            completed.append('objectives')
        if session.get('recommended_bundles'):
            completed.append('intelligence')
        if session.get('selected_proposal'):
            completed.append('proposals')
        if session.get('selected_services'):
            completed.append('services')
        if session.get('contact_name'):
            completed.append('submission')
        if session.get('completed'):
            completed.append('complete')
        
        return completed


# Factory function
def get_session_persistence_service(db: AsyncIOMotorDatabase) -> SessionPersistenceService:
    """Get session persistence service instance"""
    return SessionPersistenceService(db)
