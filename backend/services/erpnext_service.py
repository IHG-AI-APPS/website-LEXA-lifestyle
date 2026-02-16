"""
ERPNext CRM Integration Service
Automatically creates leads in ERPNext when calculator is submitted
"""

import os
import logging
import httpx
from typing import Dict, Any

logger = logging.getLogger(__name__)

class ERPNextService:
    """ERPNext API integration for lead management"""
    
    def __init__(self):
        self.base_url = os.getenv('ERPNEXT_URL', '')
        self.api_key = os.getenv('ERPNEXT_API_KEY', '')
        self.api_secret = os.getenv('ERPNEXT_API_SECRET', '')
        self.enabled = bool(self.base_url and self.api_key and self.api_secret)
        
        if not self.enabled:
            logger.warning("ERPNext integration not configured. Set ERPNEXT_URL, ERPNEXT_API_KEY, and ERPNEXT_API_SECRET in .env")
    
    async def create_lead(
        self,
        submission_id: str,
        contact_name: str,
        contact_email: str,
        contact_phone: str,
        company: str,
        project_type: str,
        total_cost: int,
        emirate: str,
        notes: str = None,
    ) -> Dict[str, Any]:
        """
        Create a new lead in ERPNext
        
        Args:
            submission_id: Calculator submission ID
            contact_name: Lead name
            contact_email: Lead email
            contact_phone: Lead phone
            company: Company name (optional)
            project_type: Type of project (residential, commercial, etc.)
            total_cost: Estimated project cost
            emirate: Location
            notes: Additional notes
            
        Returns:
            Dict with lead_id and status
        """
        
        if not self.enabled:
            logger.info("ERPNext integration disabled, skipping lead creation")
            return {
                "status": "skipped",
                "reason": "ERPNext not configured"
            }
        
        try:
            # Prepare lead data - using minimal required fields
            lead_data = {
                "doctype": "Lead",
                "lead_name": contact_name,
                "email_id": contact_email,
                "mobile_no": contact_phone,
                "company_name": company or "",
                "source": "Website",
                "status": "Lead",
                "custom_project_type": project_type.replace('-', ' ').title(),
                "custom_estimated_value": total_cost,
                "custom_submission_id": submission_id,
            }
            
            # Make API request to ERPNext
            headers = {
                "Authorization": f"token {self.api_key}:{self.api_secret}",
                "Content-Type": "application/json",
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.base_url}/api/resource/Lead",
                    json=lead_data,
                    headers=headers,
                )
                
                if response.status_code in [200, 201]:
                    result = response.json()
                    lead_name = result.get("data", {}).get("name", "Unknown")
                    logger.info(f"ERPNext lead created: {lead_name}")
                    
                    return {
                        "status": "success",
                        "lead_id": lead_name,
                        "message": "Lead created successfully in ERPNext"
                    }
                else:
                    logger.error(f"ERPNext API error: {response.status_code} - {response.text}")
                    return {
                        "status": "error",
                        "error": f"API returned {response.status_code}",
                        "details": response.text
                    }
                    
        except httpx.TimeoutException:
            logger.error("ERPNext API timeout")
            return {
                "status": "error",
                "error": "API timeout"
            }
        except Exception as e:
            logger.error(f"ERPNext integration error: {str(e)}")
            return {
                "status": "error",
                "error": str(e)
            }
    
    async def update_lead(
        self,
        lead_id: str,
        status: str = None,
        notes: str = None,
    ) -> Dict[str, Any]:
        """
        Update existing lead in ERPNext
        
        Args:
            lead_id: ERPNext lead ID
            status: New status (Lead, Opportunity, Quotation, etc.)
            notes: Additional notes to append
            
        Returns:
            Dict with status
        """
        
        if not self.enabled:
            return {"status": "skipped", "reason": "ERPNext not configured"}
        
        try:
            update_data = {}
            if status:
                update_data["status"] = status
            if notes:
                update_data["notes"] = notes
            
            headers = {
                "Authorization": f"token {self.api_key}:{self.api_secret}",
                "Content-Type": "application/json",
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.put(
                    f"{self.base_url}/api/resource/Lead/{lead_id}",
                    json=update_data,
                    headers=headers,
                )
                
                if response.status_code == 200:
                    logger.info(f"ERPNext lead updated: {lead_id}")
                    return {"status": "success", "message": "Lead updated"}
                else:
                    logger.error(f"ERPNext update error: {response.status_code}")
                    return {"status": "error", "error": response.text}
                    
        except Exception as e:
            logger.error(f"ERPNext update error: {str(e)}")
            return {"status": "error", "error": str(e)}


# Global instance
erpnext_service = ERPNextService()
