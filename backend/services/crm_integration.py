"""
CRM Integration Service
Sends lead data to n8n webhook for automation
"""

import os
import logging
import aiohttp
from typing import Dict, Any
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)


class CRMIntegrationService:
    """Handle CRM webhook integrations"""
    
    def __init__(self):
        self.webhook_url = os.getenv('N8N_WEBHOOK_URL', '')
        self.enabled = bool(self.webhook_url and self.webhook_url != 'https://webhook.example.com/project-builder')
    
    async def send_lead_to_crm(
        self,
        session_data: Dict[str, Any],
        lead_score: int,
        routing: Dict[str, Any]
    ) -> Dict[str, str]:
        """
        Send lead data to CRM via n8n webhook
        
        Args:
            session_data: Complete session information
            lead_score: Calculated lead quality score (0-100)
            routing: Team routing information
            
        Returns:
            Dict with status and webhook response
        """
        try:
            if not self.enabled:
                logger.info("CRM webhook not configured - skipping")
                return {
                    "status": "skipped",
                    "message": "CRM integration not configured",
                    "webhook_response": None
                }
            
            # Build CRM payload
            payload = self._build_crm_payload(session_data, lead_score, routing)
            
            # Send to webhook
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    self.webhook_url,
                    json=payload,
                    headers={"Content-Type": "application/json"},
                    timeout=aiohttp.ClientTimeout(total=10)
                ) as response:
                    response_data = await response.json() if response.status == 200 else {}
                    
                    if response.status == 200:
                        logger.info(f"Lead sent to CRM: {session_data.get('session_id')}")
                        return {
                            "status": "success",
                            "message": "Lead sent to CRM",
                            "webhook_response": response_data
                        }
                    else:
                        logger.error(f"CRM webhook failed: {response.status}")
                        return {
                            "status": "error",
                            "message": f"Webhook returned {response.status}",
                            "webhook_response": None
                        }
            
        except aiohttp.ClientError as e:
            logger.error(f"CRM webhook network error: {str(e)}")
            return {
                "status": "error",
                "message": f"Network error: {str(e)}",
                "webhook_response": None
            }
        except Exception as e:
            logger.error(f"CRM integration error: {str(e)}")
            return {
                "status": "error",
                "message": str(e),
                "webhook_response": None
            }
    
    def _build_crm_payload(
        self,
        session_data: Dict[str, Any],
        lead_score: int,
        routing: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Build standardized CRM payload"""
        
        return {
            "lead_id": session_data.get('session_id'),
            "source": "Smart Project Builder",
            "timestamp": datetime.now().isoformat(),
            
            # Contact Information
            "contact": {
                "name": session_data.get('contact_name'),
                "email": session_data.get('contact_email'),
                "phone": session_data.get('contact_phone'),
            },
            
            # Project Details
            "project": {
                "property_type": session_data.get('property_type'),
                "segment": session_data.get('segment'),
                "area_sqft": session_data.get('area_sqft'),
                "project_stage": session_data.get('project_stage'),
                "location": session_data.get('location'),
                "num_floors": session_data.get('num_floors'),
                "num_rooms": session_data.get('num_rooms'),
            },
            
            # Requirements
            "requirements": {
                "objectives": session_data.get('selected_objectives', []),
                "selected_proposal": session_data.get('selected_proposal'),
                "selected_services": session_data.get('selected_services', []),
                "timeline": session_data.get('timeline'),
                "budget_band": session_data.get('budget_band'),
                "notes": session_data.get('notes'),
            },
            
            # Lead Qualification
            "qualification": {
                "lead_score": lead_score,
                "lead_tier": routing.get('tier'),
                "assigned_team": routing.get('team'),
                "priority": routing.get('priority'),
                "next_steps": routing.get('next_steps', []),
            },
            
            # Metadata
            "metadata": {
                "session_id": session_data.get('session_id'),
                "project_scale": session_data.get('project_scale'),
                "created_at": session_data.get('created_at'),
                "completed_at": session_data.get('completed_at'),
                "boq_emailed": bool(session_data.get('boq_emailed_to')),
            }
        }
    
    async def send_status_update(
        self,
        session_id: str,
        status: str,
        message: str,
        metadata: Dict[str, Any] = None
    ) -> Dict[str, str]:
        """
        Send status update to CRM (e.g., BOQ downloaded, email sent)
        
        Args:
            session_id: Session ID
            status: Status type (boq_downloaded, email_sent, etc.)
            message: Human-readable message
            metadata: Additional data
            
        Returns:
            Dict with status
        """
        try:
            if not self.enabled:
                return {"status": "skipped"}
            
            payload = {
                "event": "status_update",
                "session_id": session_id,
                "status": status,
                "message": message,
                "metadata": metadata or {},
                "timestamp": datetime.now().isoformat()
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    self.webhook_url,
                    json=payload,
                    timeout=aiohttp.ClientTimeout(total=5)
                ) as response:
                    return {
                        "status": "success" if response.status == 200 else "error"
                    }
        
        except Exception as e:
            logger.error(f"Status update error: {str(e)}")
            return {"status": "error"}


# Singleton instance
_crm_service = None

def get_crm_service() -> CRMIntegrationService:
    """Get singleton CRM service instance"""
    global _crm_service
    if _crm_service is None:
        _crm_service = CRMIntegrationService()
    return _crm_service
