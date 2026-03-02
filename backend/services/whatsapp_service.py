"""
WhatsApp Integration Service using Interakt
Sends WhatsApp messages to leads and notifications to sales team
"""

import os
import logging
import httpx
from typing import Dict, Any, List, Optional

logger = logging.getLogger(__name__)


class WhatsAppService:
    """WhatsApp messaging service using Interakt API"""
    
    def __init__(self):
        self.api_url = os.getenv('INTERAKT_API_URL', 'https://api.interakt.ai/v1/public/message/')
        self.auth_token = os.getenv('INTERAKT_AUTH_TOKEN', '')
        self.enabled = bool(self.auth_token)
        self.max_retries = 2
        
        if not self.enabled:
            logger.warning("WhatsApp integration not configured. Set INTERAKT_AUTH_TOKEN in .env")
    
    async def _make_request(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        """Make API request to Interakt with retry logic"""
        headers = {
            "Authorization": self.auth_token,
            "Content-Type": "application/json",
        }
        
        last_error = None
        for attempt in range(self.max_retries + 1):
            try:
                async with httpx.AsyncClient(timeout=30.0) as client:
                    response = await client.post(
                        self.api_url,
                        json=payload,
                        headers=headers,
                    )
                    
                    if response.status_code in [200, 201]:
                        result = response.json()
                        return {"status": "success", "message_id": result.get("id"), "response": result}
                    elif response.status_code == 429:
                        # Rate limited — wait and retry
                        if attempt < self.max_retries:
                            import asyncio
                            await asyncio.sleep(2 ** attempt)
                            continue
                    
                    last_error = f"API returned {response.status_code}: {response.text}"
                    logger.error(f"Interakt API error (attempt {attempt + 1}): {last_error}")
                    
            except httpx.TimeoutException:
                last_error = "API timeout"
                logger.error(f"Interakt API timeout (attempt {attempt + 1})")
            except Exception as e:
                last_error = str(e)
                logger.error(f"WhatsApp error (attempt {attempt + 1}): {last_error}")
        
        return {"status": "error", "error": last_error}
    
    async def send_template_message(
        self,
        country_code: str,
        phone_number: str,
        template_name: str,
        body_values: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        """
        Send a WhatsApp template message via Interakt
        
        Args:
            country_code: Country code (e.g., "+971" for UAE)
            phone_number: Phone number without country code
            template_name: Name of approved WhatsApp template
            body_values: List of values to fill template placeholders
            
        Returns:
            Dict with status and message_id
        """
        
        if not self.enabled:
            logger.info("WhatsApp integration disabled, skipping message")
            return {
                "status": "skipped",
                "reason": "WhatsApp not configured"
            }
        
        try:
            # Clean phone number (remove spaces, hyphens, etc.)
            clean_phone = ''.join(filter(str.isdigit, phone_number))
            
            # Prepare payload
            payload = {
                "countryCode": country_code,
                "phoneNumber": clean_phone,
                "type": "Template",
                "template": {
                    "name": template_name,
                    "languageCode": "en",
                    "bodyValues": body_values or [],
                }
            }
            
            # Make API request
            headers = {
                "Authorization": self.auth_token,
                "Content-Type": "application/json",
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.api_url,
                    json=payload,
                    headers=headers,
                )
                
                if response.status_code in [200, 201]:
                    result = response.json()
                    logger.info(f"WhatsApp message sent to {country_code}{clean_phone}")
                    
                    return {
                        "status": "success",
                        "message_id": result.get("id"),
                        "message": "WhatsApp message sent successfully"
                    }
                else:
                    logger.error(f"Interakt API error: {response.status_code} - {response.text}")
                    return {
                        "status": "error",
                        "error": f"API returned {response.status_code}",
                        "details": response.text
                    }
                    
        except httpx.TimeoutException:
            logger.error("Interakt API timeout")
            return {
                "status": "error",
                "error": "API timeout"
            }
        except Exception as e:
            logger.error(f"WhatsApp integration error: {str(e)}")
            return {
                "status": "error",
                "error": str(e)
            }
    
    async def send_text_message(
        self,
        country_code: str,
        phone_number: str,
        text: str,
    ) -> Dict[str, Any]:
        """
        Send a plain text WhatsApp message (note: may not work for business-initiated messages)
        
        Args:
            country_code: Country code (e.g., "+971")
            phone_number: Phone number without country code
            text: Message text
            
        Returns:
            Dict with status and message_id
        """
        
        if not self.enabled:
            return {"status": "skipped", "reason": "WhatsApp not configured"}
        
        try:
            clean_phone = ''.join(filter(str.isdigit, phone_number))
            
            payload = {
                "countryCode": country_code,
                "phoneNumber": clean_phone,
                "type": "Text",
                "text": {
                    "body": text
                }
            }
            
            headers = {
                "Authorization": self.auth_token,
                "Content-Type": "application/json",
            }
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.api_url,
                    json=payload,
                    headers=headers,
                )
                
                if response.status_code in [200, 201]:
                    result = response.json()
                    logger.info(f"WhatsApp text sent to {country_code}{clean_phone}")
                    return {
                        "status": "success",
                        "message_id": result.get("id")
                    }
                else:
                    logger.error(f"Interakt text message error: {response.status_code}")
                    return {
                        "status": "error",
                        "error": response.text
                    }
                    
        except Exception as e:
            logger.error(f"WhatsApp text message error: {str(e)}")
            return {"status": "error", "error": str(e)}
    
    async def send_lead_notification(
        self,
        lead_name: str,
        lead_email: str,
        lead_phone: str,
        lead_type: str,
        country_code: str = "+971"
    ) -> Dict[str, Any]:
        """
        Send WhatsApp notification for new lead (requires approved template)
        
        Args:
            lead_name: Name of the lead
            lead_email: Email of the lead
            lead_phone: Phone number (with or without country code)
            lead_type: Type of lead (e.g., "Partner Inquiry", "Booking")
            country_code: Country code, defaults to +971 (UAE)
            
        Returns:
            Dict with status
        """
        
        # Extract just the phone number without country code
        clean_phone = ''.join(filter(str.isdigit, lead_phone))
        
        # Remove country code if already in phone number
        if clean_phone.startswith('971'):
            clean_phone = clean_phone[3:]
        elif clean_phone.startswith('00971'):
            clean_phone = clean_phone[5:]
        
        # Try to send using template (template must be created and approved in Interakt)
        # Template name example: "lead_notification"
        # Template variables: {1} = lead_name, {2} = lead_type
        
        return await self.send_template_message(
            country_code=country_code,
            phone_number=clean_phone,
            template_name="lead_notification",
            body_values=[lead_name, lead_type]
        )


# Global instance
whatsapp_service = WhatsAppService()
