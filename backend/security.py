"""
Security middleware and utilities for production
"""

from functools import wraps
from flask import request, jsonify
from datetime import datetime, timedelta
import re

# Rate limiting storage (in production, use Redis)
rate_limit_storage = {}

def rate_limit(max_requests=100, window_seconds=60):
    """
    Rate limiting decorator
    Usage: @rate_limit(max_requests=10, window_seconds=60)
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Get client identifier (IP address)
            client_id = request.remote_addr
            
            # Get current time
            now = datetime.now()
            
            # Initialize client record if not exists
            if client_id not in rate_limit_storage:
                rate_limit_storage[client_id] = []
            
            # Remove old requests outside the window
            rate_limit_storage[client_id] = [
                req_time for req_time in rate_limit_storage[client_id]
                if now - req_time < timedelta(seconds=window_seconds)
            ]
            
            # Check if limit exceeded
            if len(rate_limit_storage[client_id]) >= max_requests:
                return jsonify({
                    'error': 'Rate limit exceeded',
                    'message': f'Maximum {max_requests} requests per {window_seconds} seconds'
                }), 429
            
            # Add current request
            rate_limit_storage[client_id].append(now)
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator


def sanitize_input(text):
    """
    Sanitize user input to prevent XSS and injection attacks
    """
    if not text:
        return text
    
    # Remove potentially dangerous characters
    text = str(text)
    
    # Remove script tags
    text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove SQL injection patterns
    dangerous_patterns = [
        r'(\bOR\b|\bAND\b).*?=.*?',
        r'UNION.*?SELECT',
        r'DROP\s+TABLE',
        r'INSERT\s+INTO',
        r'DELETE\s+FROM',
        r'--',
        r';',
    ]
    
    for pattern in dangerous_patterns:
        text = re.sub(pattern, '', text, flags=re.IGNORECASE)
    
    return text.strip()


def validate_email(email):
    """
    Validate email format
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_phone(phone):
    """
    Validate phone number format (UAE format)
    """
    # Remove spaces and dashes
    phone = re.sub(r'[\s-]', '', phone)
    
    # Check UAE format: +971, 00971, or 05
    pattern = r'^(\+971|00971|0)?5[0-9]{8}$'
    return re.match(pattern, phone) is not None


def secure_headers():
    """
    Add security headers to response
    Apply this to all routes in production
    """
    return {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    }


class InputValidator:
    """
    Comprehensive input validation class
    """
    
    @staticmethod
    def validate_string(value, min_length=1, max_length=1000):
        """Validate string input"""
        if not value or not isinstance(value, str):
            return False, "Invalid string"
        
        value = value.strip()
        if len(value) < min_length:
            return False, f"Minimum length is {min_length}"
        if len(value) > max_length:
            return False, f"Maximum length is {max_length}"
        
        return True, sanitize_input(value)
    
    @staticmethod
    def validate_number(value, min_val=None, max_val=None):
        """Validate numeric input"""
        try:
            num = float(value)
            if min_val is not None and num < min_val:
                return False, f"Minimum value is {min_val}"
            if max_val is not None and num > max_val:
                return False, f"Maximum value is {max_val}"
            return True, num
        except (ValueError, TypeError):
            return False, "Invalid number"
    
    @staticmethod
    def validate_form_data(data, required_fields):
        """Validate form submission data"""
        errors = {}
        
        for field in required_fields:
            if field not in data or not data[field]:
                errors[field] = f"{field} is required"
        
        # Specific validations
        if 'email' in data:
            if not validate_email(data['email']):
                errors['email'] = "Invalid email format"
        
        if 'phone' in data:
            if not validate_phone(data['phone']):
                errors['phone'] = "Invalid phone number format"
        
        return len(errors) == 0, errors
