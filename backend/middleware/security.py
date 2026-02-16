"""
Security Middleware for LEXA Backend
Implements rate limiting, input sanitization, and bot protection
"""

import re
import logging
import bleach
from typing import Dict, Any, Optional
from email_validator import validate_email, EmailNotValidError

logger = logging.getLogger(__name__)

# List of disposable email domains to block
DISPOSABLE_EMAIL_DOMAINS = {
    'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
    'maildrop.cc', 'mailinator.com', 'temp-mail.org', 'yopmail.com',
    'fakemailgenerator.com', 'trashmail.com', 'getnada.com', 'emailondeck.com',
    'mohmal.com', 'dispostable.com', 'mintemail.com', 'sharklasers.com'
}


class SecurityValidator:
    """Validates and sanitizes user input to prevent attacks"""
    
    @staticmethod
    def sanitize_text(text: str, max_length: int = 5000) -> str:
        """
        Remove potentially dangerous HTML/script content from text
        
        Args:
            text: Input text to sanitize
            max_length: Maximum allowed length
            
        Returns:
            Sanitized text
        """
        if not text:
            return ""
        
        # Truncate to max length
        text = text[:max_length]
        
        # Remove HTML tags and scripts
        cleaned = bleach.clean(
            text,
            tags=[],  # Allow no HTML tags
            attributes={},
            strip=True,
            strip_comments=True
        )
        
        # Remove null bytes
        cleaned = cleaned.replace('\x00', '')
        
        return cleaned.strip()
    
    @staticmethod
    def validate_email_address(email: str) -> Dict[str, Any]:
        """
        Validate email address and check for disposable emails
        
        Args:
            email: Email address to validate
            
        Returns:
            Dict with 'valid' boolean and optional 'error' message
        """
        try:
            # Validate email format
            validated = validate_email(email, check_deliverability=False)
            normalized_email = validated.normalized
            
            # Extract domain
            domain = normalized_email.split('@')[1].lower()
            
            # Check if disposable email
            if domain in DISPOSABLE_EMAIL_DOMAINS:
                return {
                    'valid': False,
                    'error': 'Disposable email addresses are not allowed',
                    'is_disposable': True
                }
            
            return {
                'valid': True,
                'normalized': normalized_email
            }
            
        except EmailNotValidError as e:
            return {
                'valid': False,
                'error': str(e)
            }
    
    @staticmethod
    def validate_phone(phone: str) -> Dict[str, Any]:
        """
        Validate phone number format
        
        Args:
            phone: Phone number to validate
            
        Returns:
            Dict with 'valid' boolean and optional 'error' message
        """
        # Remove common formatting characters
        cleaned = re.sub(r'[\s\-\(\)\.]', '', phone)
        
        # Check if it contains only digits and optional + prefix
        if not re.match(r'^\+?[0-9]{8,15}$', cleaned):
            return {
                'valid': False,
                'error': 'Invalid phone number format'
            }
        
        return {
            'valid': True,
            'normalized': cleaned
        }
    
    @staticmethod
    def check_honeypot(honeypot_value: Optional[str]) -> bool:
        """
        Check if honeypot field was filled (indicates bot)
        
        Args:
            honeypot_value: Value of honeypot field
            
        Returns:
            True if bot detected, False if legitimate user
        """
        # If honeypot field has any value, it's a bot
        return bool(honeypot_value and honeypot_value.strip())
    
    @staticmethod
    def validate_submission(data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Comprehensive validation of form submission
        
        Args:
            data: Form data dictionary
            
        Returns:
            Dict with 'valid' boolean, 'sanitized_data', and optional 'errors'
        """
        errors = []
        sanitized = {}
        
        # Check honeypot
        if 'website' in data or 'url' in data or 'homepage' in data:
            honeypot = data.get('website') or data.get('url') or data.get('homepage')
            if SecurityValidator.check_honeypot(honeypot):
                logger.warning(f"Bot detected via honeypot: {data.get('email', 'unknown')}")
                return {
                    'valid': False,
                    'error': 'Invalid submission',
                    'bot_detected': True
                }
        
        # Sanitize text fields
        text_fields = ['name', 'company', 'message', 'resource_type', 'project_scale']
        for field in text_fields:
            if field in data:
                sanitized[field] = SecurityValidator.sanitize_text(data[field], max_length=2000)
        
        # Validate email
        if 'email' in data:
            email_result = SecurityValidator.validate_email_address(data['email'])
            if not email_result['valid']:
                errors.append(f"Email: {email_result['error']}")
            else:
                sanitized['email'] = email_result['normalized']
        
        # Validate phone
        if 'phone' in data:
            phone_result = SecurityValidator.validate_phone(data['phone'])
            if not phone_result['valid']:
                errors.append(f"Phone: {phone_result['error']}")
            else:
                sanitized['phone'] = phone_result['normalized']
        
        # Copy other fields as-is (they're validated by Pydantic)
        for key, value in data.items():
            if key not in sanitized and key not in ['website', 'url', 'homepage']:
                sanitized[key] = value
        
        if errors:
            return {
                'valid': False,
                'errors': errors
            }
        
        return {
            'valid': True,
            'sanitized_data': sanitized
        }


def get_client_ip(request) -> str:
    """
    Extract client IP from request, considering proxies
    
    Args:
        request: FastAPI request object
        
    Returns:
        Client IP address
    """
    # Check for forwarded IP (behind proxy/load balancer)
    forwarded = request.headers.get('X-Forwarded-For')
    if forwarded:
        return forwarded.split(',')[0].strip()
    
    real_ip = request.headers.get('X-Real-IP')
    if real_ip:
        return real_ip
    
    # Fallback to direct client
    return request.client.host if request.client else 'unknown'
