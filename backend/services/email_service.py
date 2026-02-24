"""
Email Service for LEXA Lifestyle
Professional, branded emails using Gmail SMTP
Styled according to LEXA brand guidelines with letterhead
"""

import os
import logging
import aiosmtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import Dict, Any, List, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

# SMTP Configuration
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USE_TLS = os.environ.get("SMTP_USE_TLS", "true").lower() == "true"
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", SMTP_USER)
SALES_EMAIL = os.environ.get("SALES_EMAIL", "sales@lexalifestyle.com")


class LEXAEmailTemplate:
    """
    Professional HTML email templates with LEXA letterhead
    All emails use consistent branding and styling
    """
    
    # Brand colors
    BRAND_BLACK = "#1A1A1A"
    BRAND_GRAY = "#6B7280"
    BRAND_LIGHT_GRAY = "#9CA3AF"
    BRAND_BG = "#F9F9F7"
    BRAND_WHITE = "#FFFFFF"
    BRAND_ACCENT = "#C9A962"  # Gold accent
    
    @staticmethod
    def _base_styles() -> str:
        """Common CSS styles for all emails"""
        return """
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        </style>
        """
    
    @staticmethod
    def _letterhead() -> str:
        """LEXA branded letterhead header"""
        return '''
        <!-- LEXA Letterhead -->
        <tr>
            <td style="background-color: #1A1A1A; padding: 0;">
                <!-- Top gold accent line -->
                <div style="height: 3px; background: linear-gradient(90deg, #C9A962 0%, #E8D5A3 50%, #C9A962 100%);"></div>
                
                <table width="100%" cellpadding="0" cellspacing="0" style="padding: 28px 40px;">
                    <tr>
                        <td style="vertical-align: middle;">
                            <!-- Logo -->
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 6px; font-family: 'Inter', 'Helvetica Neue', sans-serif;">LEXA</h1>
                                        <p style="color: #C9A962; margin: 2px 0 0 0; font-size: 9px; letter-spacing: 4px; text-transform: uppercase; font-weight: 500;">LIFE STYLE</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td style="text-align: right; vertical-align: middle;">
                            <!-- Brand Pillars -->
                            <table cellpadding="0" cellspacing="0" style="margin-left: auto;">
                                <tr>
                                    <td style="text-align: right;">
                                        <p style="color: #6B7280; margin: 0; font-size: 9px; letter-spacing: 2px; font-family: 'Inter', sans-serif;">LIGHTING</p>
                                        <p style="color: #6B7280; margin: 3px 0 0 0; font-size: 9px; letter-spacing: 2px;">ELECTRONICS</p>
                                    </td>
                                    <td style="padding: 0 12px;">
                                        <div style="width: 1px; height: 32px; background-color: #333;"></div>
                                    </td>
                                    <td style="text-align: left;">
                                        <p style="color: #6B7280; margin: 0; font-size: 9px; letter-spacing: 2px;">AUTOMATION</p>
                                        <p style="color: #6B7280; margin: 3px 0 0 0; font-size: 9px; letter-spacing: 2px;">AUDIO</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        '''
    
    @staticmethod
    def _footer() -> str:
        """LEXA branded email footer with contact info"""
        year = datetime.now().year
        return f'''
        <!-- Footer -->
        <tr>
            <td style="background-color: #1A1A1A; padding: 32px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <!-- Contact Info Row -->
                    <tr>
                        <td style="padding-bottom: 20px; border-bottom: 1px solid #333;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="width: 33%; vertical-align: top;">
                                        <p style="color: #C9A962; margin: 0 0 8px 0; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Visit Us</p>
                                        <p style="color: #9CA3AF; margin: 0; font-size: 12px; line-height: 1.5;">Al Quoz Industrial 1<br/>SZR - Interchange No 3<br/>Dubai, UAE</p>
                                    </td>
                                    <td style="width: 33%; vertical-align: top; text-align: center;">
                                        <p style="color: #C9A962; margin: 0 0 8px 0; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Call Us</p>
                                        <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
                                            <a href="tel:+97142670470" style="color: #FFFFFF; text-decoration: none;">+971 4 267 0470</a>
                                        </p>
                                        <p style="color: #9CA3AF; margin: 4px 0 0 0; font-size: 12px;">
                                            <a href="tel:+971501234567" style="color: #9CA3AF; text-decoration: none;">+971 50 123 4567</a>
                                        </p>
                                    </td>
                                    <td style="width: 33%; vertical-align: top; text-align: right;">
                                        <p style="color: #C9A962; margin: 0 0 8px 0; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Email Us</p>
                                        <p style="color: #9CA3AF; margin: 0; font-size: 12px;">
                                            <a href="mailto:info@lexalifestyle.com" style="color: #FFFFFF; text-decoration: none;">info@lexalifestyle.com</a>
                                        </p>
                                        <p style="color: #9CA3AF; margin: 4px 0 0 0; font-size: 12px;">
                                            <a href="mailto:sales@lexalifestyle.com" style="color: #9CA3AF; text-decoration: none;">sales@lexalifestyle.com</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Legal Row -->
                    <tr>
                        <td style="padding-top: 20px; text-align: center;">
                            <p style="color: #FFFFFF; margin: 0 0 4px 0; font-size: 11px; font-weight: 600; letter-spacing: 1px;">LEXA LIFESTYLE TRADING LLC</p>
                            <p style="color: #6B7280; margin: 0 0 12px 0; font-size: 10px;">TRN: 104472899400003</p>
                            <p style="color: #6B7280; margin: 0; font-size: 10px;">
                                <a href="https://lexalifestyle.com" style="color: #C9A962; text-decoration: none;">www.lexalifestyle.com</a>
                            </p>
                            <p style="color: #4B5563; margin: 16px 0 0 0; font-size: 9px;">© {year} LEXA Lifestyle. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Bottom gold accent line -->
        <tr>
            <td>
                <div style="height: 3px; background: linear-gradient(90deg, #C9A962 0%, #E8D5A3 50%, #C9A962 100%);"></div>
            </td>
        </tr>
        '''
    
    @staticmethod
    def _wrap_content(content: str, notification_type: str = "") -> str:
        """Wrap content with letterhead and footer"""
        return f'''
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>LEXA Lifestyle</title>
            {LEXAEmailTemplate._base_styles()}
        </head>
        <body style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #F3F4F6; -webkit-font-smoothing: antialiased;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.12); border-radius: 0;">
                            {LEXAEmailTemplate._letterhead()}
                            {content}
                            {LEXAEmailTemplate._footer()}
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        '''
    
    @staticmethod
    def lead_notification(
        lead_type: str,
        name: str,
        email: str,
        phone: str,
        company: str = "",
        details: str = "",
        submission_id: str = "",
        extra_fields: Dict[str, Any] = None
    ) -> str:
        """Universal lead notification template for sales team"""
        
        current_date = datetime.now().strftime("%B %d, %Y at %I:%M %p")
        
        # Build extra fields HTML if provided
        extra_html = ""
        if extra_fields:
            for key, value in extra_fields.items():
                if value:
                    label = key.replace('_', ' ').title()
                    extra_html += f'''
                    <tr>
                        <td style="padding: 8px 0; color: #6B7280; font-size: 12px; width: 120px; vertical-align: top;">{label}</td>
                        <td style="padding: 8px 0; color: #1A1A1A; font-size: 13px; font-weight: 500;">{value}</td>
                    </tr>
                    '''
        
        content = f'''
        <!-- Notification Banner -->
        <tr>
            <td style="background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%); padding: 24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <p style="color: #C9A962; margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">New Lead Alert</p>
                            <h2 style="color: #FFFFFF; margin: 8px 0 0 0; font-size: 22px; font-weight: 600;">{lead_type}</h2>
                        </td>
                        <td style="text-align: right;">
                            <p style="color: #6B7280; margin: 0; font-size: 11px;">{current_date}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 32px 40px; background-color: #FFFFFF;">
                <!-- Contact Card -->
                <div style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #C9A962;">
                    <h3 style="color: #1A1A1A; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Contact Information</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #6B7280; font-size: 12px; display: inline-block; width: 60px;">Name</span>
                                <span style="color: #1A1A1A; font-size: 14px; font-weight: 600;">{name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #6B7280; font-size: 12px; display: inline-block; width: 60px;">Email</span>
                                <a href="mailto:{email}" style="color: #1A1A1A; font-size: 14px; text-decoration: none; font-weight: 500;">{email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #6B7280; font-size: 12px; display: inline-block; width: 60px;">Phone</span>
                                <a href="tel:{phone}" style="color: #1A1A1A; font-size: 14px; text-decoration: none; font-weight: 500;">{phone}</a>
                            </td>
                        </tr>
                        {f'<tr><td style="padding: 6px 0;"><span style="color: #6B7280; font-size: 12px; display: inline-block; width: 60px;">Company</span><span style="color: #1A1A1A; font-size: 14px;">{company}</span></td></tr>' if company else ''}
                    </table>
                </div>
                
                {f"""
                <!-- Additional Details -->
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #1A1A1A; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Details</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        {extra_html}
                    </table>
                </div>
                """ if extra_html else ""}
                
                {f"""
                <!-- Message/Notes -->
                <div style="background-color: #FFFBEB; border-radius: 8px; padding: 24px; margin-bottom: 24px; border: 1px solid #FDE68A;">
                    <h3 style="color: #92400E; font-size: 10px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Message</h3>
                    <p style="color: #1A1A1A; font-size: 14px; margin: 0; white-space: pre-wrap; line-height: 1.6;">{details}</p>
                </div>
                """ if details else ""}
                
                <!-- Action Buttons -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 16px 0;">
                            <a href="mailto:{email}?subject=Re:%20Your%20LEXA%20Lifestyle%20Inquiry" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 14px 32px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px; margin-right: 12px;">REPLY VIA EMAIL</a>
                            <a href="tel:{phone}" style="display: inline-block; background-color: #FFFFFF; color: #1A1A1A; text-decoration: none; padding: 14px 32px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px; border: 2px solid #1A1A1A;">CALL NOW</a>
                        </td>
                    </tr>
                </table>
                
                {f'<p style="color: #9CA3AF; font-size: 10px; margin: 24px 0 0 0; text-align: center;">Reference ID: <code style="background-color: #F3F4F6; padding: 2px 8px; border-radius: 4px; font-size: 10px;">{submission_id[:16] if submission_id else "N/A"}</code></p>' if submission_id else ''}
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)
    
    @staticmethod
    def consultation_booking(
        name: str,
        email: str,
        phone: str,
        persona: str = "",
        message: str = "",
        booking_time: str = ""
    ) -> str:
        """Consultation booking notification"""
        
        current_date = datetime.now().strftime("%B %d, %Y at %I:%M %p")
        
        content = f'''
        <!-- Notification Banner -->
        <tr>
            <td style="background: linear-gradient(135deg, #065F46 0%, #047857 100%); padding: 24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <p style="color: #A7F3D0; margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Consultation Request</p>
                            <h2 style="color: #FFFFFF; margin: 8px 0 0 0; font-size: 22px; font-weight: 600;">New Booking Received</h2>
                        </td>
                        <td style="text-align: right;">
                            <p style="color: #A7F3D0; margin: 0; font-size: 11px;">{current_date}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 32px 40px; background-color: #FFFFFF;">
                <!-- Client Card -->
                <div style="background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%); border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #10B981;">
                    <h3 style="color: #065F46; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Client Details</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #047857; font-size: 12px; display: inline-block; width: 80px;">Name</span>
                                <span style="color: #1A1A1A; font-size: 15px; font-weight: 600;">{name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #047857; font-size: 12px; display: inline-block; width: 80px;">Email</span>
                                <a href="mailto:{email}" style="color: #1A1A1A; font-size: 14px; text-decoration: none;">{email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #047857; font-size: 12px; display: inline-block; width: 80px;">Phone</span>
                                <a href="tel:{phone}" style="color: #1A1A1A; font-size: 14px; text-decoration: none;">{phone}</a>
                            </td>
                        </tr>
                        {f'<tr><td style="padding: 6px 0;"><span style="color: #047857; font-size: 12px; display: inline-block; width: 80px;">Interest</span><span style="color: #1A1A1A; font-size: 14px;">{persona}</span></td></tr>' if persona else ''}
                    </table>
                </div>
                
                {f"""
                <!-- Message -->
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #1A1A1A; font-size: 10px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Additional Notes</h3>
                    <p style="color: #1A1A1A; font-size: 14px; margin: 0; line-height: 1.6;">{message}</p>
                </div>
                """ if message else ""}
                
                <!-- Action -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 16px 0;">
                            <a href="mailto:{email}?subject=LEXA%20Consultation%20-%20Confirming%20Your%20Appointment" style="display: inline-block; background-color: #065F46; color: #FFFFFF; text-decoration: none; padding: 14px 40px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px;">CONFIRM APPOINTMENT</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)
    
    @staticmethod
    def experience_centre_booking(
        name: str,
        email: str,
        phone: str,
        date: str,
        time: str,
        interests: List[str] = None,
        message: str = ""
    ) -> str:
        """Experience Centre booking notification"""
        
        interests_str = ", ".join(interests) if interests else "Not specified"
        
        content = f'''
        <!-- Notification Banner -->
        <tr>
            <td style="background: linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%); padding: 24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <p style="color: #DDD6FE; margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Experience Centre</p>
                            <h2 style="color: #FFFFFF; margin: 8px 0 0 0; font-size: 22px; font-weight: 600;">Visit Scheduled</h2>
                        </td>
                        <td style="text-align: right;">
                            <div style="background-color: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px 20px; display: inline-block;">
                                <p style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 700;">{date}</p>
                                <p style="color: #DDD6FE; margin: 4px 0 0 0; font-size: 14px;">{time}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 32px 40px; background-color: #FFFFFF;">
                <!-- Visitor Card -->
                <div style="background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%); border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #7C3AED;">
                    <h3 style="color: #5B21B6; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Visitor Information</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #7C3AED; font-size: 12px; display: inline-block; width: 80px;">Name</span>
                                <span style="color: #1A1A1A; font-size: 15px; font-weight: 600;">{name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #7C3AED; font-size: 12px; display: inline-block; width: 80px;">Email</span>
                                <a href="mailto:{email}" style="color: #1A1A1A; font-size: 14px; text-decoration: none;">{email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #7C3AED; font-size: 12px; display: inline-block; width: 80px;">Phone</span>
                                <a href="tel:{phone}" style="color: #1A1A1A; font-size: 14px; text-decoration: none;">{phone}</a>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Interests -->
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #1A1A1A; font-size: 10px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Areas of Interest</h3>
                    <p style="color: #1A1A1A; font-size: 14px; margin: 0;">{interests_str}</p>
                </div>
                
                {f"""
                <!-- Message -->
                <div style="background-color: #FFFBEB; border-radius: 8px; padding: 24px; margin-bottom: 24px; border: 1px solid #FDE68A;">
                    <h3 style="color: #92400E; font-size: 10px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Special Requests</h3>
                    <p style="color: #1A1A1A; font-size: 14px; margin: 0; line-height: 1.6;">{message}</p>
                </div>
                """ if message else ""}
                
                <!-- Actions -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 16px 0;">
                            <a href="mailto:{email}?subject=LEXA%20Experience%20Centre%20-%20Your%20Visit%20on%20{date}" style="display: inline-block; background-color: #7C3AED; color: #FFFFFF; text-decoration: none; padding: 14px 32px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px; margin-right: 12px;">SEND CONFIRMATION</a>
                            <a href="tel:{phone}" style="display: inline-block; background-color: #FFFFFF; color: #7C3AED; text-decoration: none; padding: 14px 32px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px; border: 2px solid #7C3AED;">CALL VISITOR</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)
    
    @staticmethod
    def contact_form(
        name: str,
        email: str,
        phone: str,
        subject: str,
        message: str
    ) -> str:
        """Contact form submission notification"""
        
        current_date = datetime.now().strftime("%B %d, %Y at %I:%M %p")
        
        content = f'''
        <!-- Notification Banner -->
        <tr>
            <td style="background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%); padding: 24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <p style="color: #BFDBFE; margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Website Contact</p>
                            <h2 style="color: #FFFFFF; margin: 8px 0 0 0; font-size: 22px; font-weight: 600;">New Message Received</h2>
                        </td>
                        <td style="text-align: right;">
                            <p style="color: #BFDBFE; margin: 0; font-size: 11px;">{current_date}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 32px 40px; background-color: #FFFFFF;">
                <!-- Sender Card -->
                <div style="background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%); border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #3B82F6;">
                    <h3 style="color: #1E40AF; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">From</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #3B82F6; font-size: 12px; display: inline-block; width: 60px;">Name</span>
                                <span style="color: #1A1A1A; font-size: 15px; font-weight: 600;">{name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #3B82F6; font-size: 12px; display: inline-block; width: 60px;">Email</span>
                                <a href="mailto:{email}" style="color: #1A1A1A; font-size: 14px; text-decoration: none;">{email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #3B82F6; font-size: 12px; display: inline-block; width: 60px;">Phone</span>
                                <a href="tel:{phone}" style="color: #1A1A1A; font-size: 14px; text-decoration: none;">{phone}</a>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Subject -->
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
                    <h3 style="color: #6B7280; font-size: 10px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Subject</h3>
                    <p style="color: #1A1A1A; font-size: 16px; font-weight: 600; margin: 0;">{subject}</p>
                </div>
                
                <!-- Message -->
                <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #6B7280; font-size: 10px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Message</h3>
                    <p style="color: #1A1A1A; font-size: 14px; margin: 0; line-height: 1.7; white-space: pre-wrap;">{message}</p>
                </div>
                
                <!-- Action -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 16px 0;">
                            <a href="mailto:{email}?subject=Re:%20{subject}" style="display: inline-block; background-color: #1E40AF; color: #FFFFFF; text-decoration: none; padding: 14px 40px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px;">REPLY TO MESSAGE</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)
    
    @staticmethod
    def calculator_quote(
        customer_name: str,
        project_type: str,
        total_cost: int,
        estimated_timeline: int,
        cost_breakdown: List[Dict[str, Any]]
    ) -> str:
        """Customer quote confirmation email"""
        
        breakdown_html = ""
        for item in cost_breakdown:
            breakdown_html += f'''
            <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; font-size: 13px; color: #1A1A1A;">{item['name']}</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; text-align: right; font-weight: 600; font-size: 13px; color: #1A1A1A;">AED {item['cost']:,}</td>
            </tr>
            '''
        
        content = f'''
        <!-- Welcome Banner -->
        <tr>
            <td style="padding: 40px; background-color: #FFFFFF;">
                <h2 style="color: #1A1A1A; font-size: 24px; margin: 0 0 8px 0; font-weight: 600;">Thank You, {customer_name}</h2>
                <p style="color: #6B7280; font-size: 15px; margin: 0;">We've prepared your personalized smart home automation estimate.</p>
            </td>
        </tr>
        
        <!-- Total Cost Box -->
        <tr>
            <td style="padding: 0 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%); border-radius: 8px; overflow: hidden;">
                    <tr>
                        <td style="padding: 32px; text-align: center;">
                            <p style="color: #C9A962; margin: 0 0 8px 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Estimated Investment</p>
                            <h3 style="color: #FFFFFF; margin: 0; font-size: 42px; font-weight: 700;">AED {total_cost:,}</h3>
                            <p style="color: #9CA3AF; margin: 12px 0 0 0; font-size: 13px;">Timeline: {estimated_timeline} weeks</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Project Info -->
        <tr>
            <td style="padding: 32px 40px;">
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 8px 0; color: #6B7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Project Type</td>
                            <td style="padding: 8px 0; color: #1A1A1A; font-weight: 600; text-align: right; font-size: 14px;">{project_type.title()}</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Cost Breakdown -->
                <h3 style="color: #1A1A1A; font-size: 12px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Cost Breakdown</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
                    <tr>
                        <td style="padding: 12px 16px; background-color: #F9FAFB; font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Solution</td>
                        <td style="padding: 12px 16px; background-color: #F9FAFB; text-align: right; font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Amount</td>
                    </tr>
                    {breakdown_html}
                    <tr>
                        <td style="padding: 16px; background-color: #1A1A1A; font-size: 14px; color: #FFFFFF; font-weight: 600;">TOTAL</td>
                        <td style="padding: 16px; background-color: #1A1A1A; text-align: right; font-size: 16px; color: #C9A962; font-weight: 700;">AED {total_cost:,}</td>
                    </tr>
                </table>
                
                <!-- Next Steps -->
                <div style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); border-left: 4px solid #C9A962; border-radius: 0 8px 8px 0; padding: 24px; margin-bottom: 32px;">
                    <h4 style="color: #1A1A1A; margin: 0 0 16px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">What Happens Next?</h4>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 8px 0; vertical-align: top;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #1A1A1A; color: #FFFFFF; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; margin-right: 12px;">1</span>
                            </td>
                            <td style="padding: 8px 0; color: #4B5563; font-size: 14px;">Our team will contact you within 24 hours</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; vertical-align: top;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #1A1A1A; color: #FFFFFF; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; margin-right: 12px;">2</span>
                            </td>
                            <td style="padding: 8px 0; color: #4B5563; font-size: 14px;">Schedule a complimentary site survey</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; vertical-align: top;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #1A1A1A; color: #FFFFFF; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; margin-right: 12px;">3</span>
                            </td>
                            <td style="padding: 8px 0; color: #4B5563; font-size: 14px;">Receive final proposal with detailed scope</td>
                        </tr>
                    </table>
                </div>
                
                <!-- CTA -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center">
                            <a href="https://lexalifestyle.com/contact" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 16px 48px; font-weight: 600; font-size: 13px; letter-spacing: 1px; border-radius: 4px;">SCHEDULE CONSULTATION</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)
    
    @staticmethod  
    def sales_lead_notification(
        submission_id: str,
        customer_name: str,
        customer_email: str,
        customer_phone: str,
        project_type: str,
        sub_category: str,
        total_area: int,
        emirate: str,
        city: str,
        total_cost: int,
        timeline: str,
        budget_range: str,
        selected_solutions: Dict[str, str]
    ) -> str:
        """Sales team notification for calculator leads"""
        
        current_date = datetime.now().strftime("%B %d, %Y at %I:%M %p")
        
        solutions_html = ""
        for solution_id, level_id in selected_solutions.items():
            solutions_html += f'''
            <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #E5E7EB; font-size: 13px; color: #1A1A1A;">{solution_id.replace('-', ' ').title()}</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #E5E7EB; text-align: right; font-size: 13px; color: #6B7280;">{level_id.title()}</td>
            </tr>
            '''
        
        content = f'''
        <!-- Alert Banner -->
        <tr>
            <td style="background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%); padding: 24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <p style="color: #C9A962; margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Calculator Lead</p>
                            <h2 style="color: #FFFFFF; margin: 8px 0 0 0; font-size: 20px; font-weight: 600;">{customer_name}</h2>
                            <p style="color: #9CA3AF; margin: 4px 0 0 0; font-size: 12px;">{current_date}</p>
                        </td>
                        <td style="text-align: right;">
                            <p style="color: #10B981; margin: 0; font-size: 28px; font-weight: 700;">AED {total_cost:,}</p>
                            <p style="color: #6EE7B7; margin: 4px 0 0 0; font-size: 11px; letter-spacing: 1px;">ESTIMATED VALUE</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 32px 40px; background-color: #FFFFFF;">
                <!-- Quick Contact -->
                <div style="background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%); border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #22C55E;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>
                                <p style="margin: 0 0 4px 0; font-size: 15px; font-weight: 600; color: #1A1A1A;">{customer_name}</p>
                                <p style="margin: 0; font-size: 13px; color: #6B7280;">
                                    <a href="mailto:{customer_email}" style="color: #1A1A1A; text-decoration: none;">{customer_email}</a> · 
                                    <a href="tel:{customer_phone}" style="color: #1A1A1A; text-decoration: none;">{customer_phone}</a>
                                </p>
                            </td>
                            <td style="text-align: right;">
                                <a href="tel:{customer_phone}" style="display: inline-block; background-color: #22C55E; color: #FFFFFF; text-decoration: none; padding: 10px 20px; font-weight: 600; font-size: 11px; letter-spacing: 1px; border-radius: 4px;">CALL NOW</a>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Project Details -->
                <h3 style="color: #1A1A1A; font-size: 11px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Project Details</h3>
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 6px 0; color: #6B7280; font-size: 12px; width: 100px;">Type</td>
                            <td style="padding: 6px 0; color: #1A1A1A; font-size: 13px; font-weight: 500;">{project_type.title()} - {sub_category.replace('-', ' ').title()}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #6B7280; font-size: 12px;">Area</td>
                            <td style="padding: 6px 0; color: #1A1A1A; font-size: 13px; font-weight: 500;">{total_area:,} sq ft</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #6B7280; font-size: 12px;">Location</td>
                            <td style="padding: 6px 0; color: #1A1A1A; font-size: 13px; font-weight: 500;">{city or ''} {emirate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #6B7280; font-size: 12px;">Timeline</td>
                            <td style="padding: 6px 0; color: #1A1A1A; font-size: 13px; font-weight: 500;">{timeline}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #6B7280; font-size: 12px;">Budget</td>
                            <td style="padding: 6px 0; color: #1A1A1A; font-size: 13px; font-weight: 500;">{budget_range}</td>
                        </tr>
                    </table>
                </div>
                
                <!-- Selected Solutions -->
                <h3 style="color: #1A1A1A; font-size: 11px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Selected Solutions</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E5E7EB; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                    {solutions_html}
                </table>
                
                <!-- Reference -->
                <p style="color: #9CA3AF; font-size: 10px; margin: 0; text-align: center;">
                    Submission ID: <code style="background-color: #F3F4F6; padding: 2px 8px; border-radius: 4px; font-size: 10px;">{submission_id[:16]}</code>
                </p>
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)
    
    @staticmethod
    def package_inquiry(
        name: str,
        email: str,
        phone: str,
        package_name: str,
        property_type: str,
        property_size: str,
        message: str = "",
        submission_id: str = ""
    ) -> str:
        """Package inquiry notification"""
        
        current_date = datetime.now().strftime("%B %d, %Y at %I:%M %p")
        
        content = f'''
        <!-- Alert Banner -->
        <tr>
            <td style="background: linear-gradient(135deg, #B45309 0%, #D97706 100%); padding: 24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <p style="color: #FDE68A; margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Package Inquiry</p>
                            <h2 style="color: #FFFFFF; margin: 8px 0 0 0; font-size: 22px; font-weight: 600;">{package_name}</h2>
                        </td>
                        <td style="text-align: right;">
                            <p style="color: #FDE68A; margin: 0; font-size: 11px;">{current_date}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 32px 40px; background-color: #FFFFFF;">
                <!-- Contact Card -->
                <div style="background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #F59E0B;">
                    <h3 style="color: #92400E; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Interested Customer</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #B45309; font-size: 12px; display: inline-block; width: 80px;">Name</span>
                                <span style="color: #1A1A1A; font-size: 15px; font-weight: 600;">{name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #B45309; font-size: 12px; display: inline-block; width: 80px;">Email</span>
                                <a href="mailto:{email}" style="color: #1A1A1A; font-size: 14px; text-decoration: none;">{email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0;">
                                <span style="color: #B45309; font-size: 12px; display: inline-block; width: 80px;">Phone</span>
                                <a href="tel:{phone}" style="color: #1A1A1A; font-size: 14px; text-decoration: none;">{phone}</a>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Property Details -->
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #1A1A1A; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Property Information</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 6px 0; color: #6B7280; font-size: 12px; width: 100px;">Package</td>
                            <td style="padding: 6px 0; color: #1A1A1A; font-size: 14px; font-weight: 600;">{package_name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #6B7280; font-size: 12px;">Type</td>
                            <td style="padding: 6px 0; color: #1A1A1A; font-size: 14px;">{property_type}</td>
                        </tr>
                        <tr>
                            <td style="padding: 6px 0; color: #6B7280; font-size: 12px;">Size</td>
                            <td style="padding: 6px 0; color: #1A1A1A; font-size: 14px;">{property_size}</td>
                        </tr>
                    </table>
                </div>
                
                {f"""
                <!-- Message -->
                <div style="background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #6B7280; font-size: 10px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Additional Requirements</h3>
                    <p style="color: #1A1A1A; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">{message}</p>
                </div>
                """ if message else ""}
                
                <!-- Action -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 16px 0;">
                            <a href="mailto:{email}?subject=LEXA%20{package_name}%20-%20Your%20Inquiry" style="display: inline-block; background-color: #B45309; color: #FFFFFF; text-decoration: none; padding: 14px 40px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px;">SEND QUOTE</a>
                        </td>
                    </tr>
                </table>
                
                {f'<p style="color: #9CA3AF; font-size: 10px; margin: 24px 0 0 0; text-align: center;">Reference: <code style="background-color: #F3F4F6; padding: 2px 8px; border-radius: 4px; font-size: 10px;">{submission_id[:16]}</code></p>' if submission_id else ''}
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)

    @staticmethod
    def schedule_visit_admin(
        name: str,
        email: str,
        phone: str,
        visit_date: str,
        visit_time: str,
        message: str = "",
        booking_id: str = ""
    ) -> str:
        """Admin notification for scheduled visit"""
        
        current_date = datetime.now().strftime("%B %d, %Y at %I:%M %p")
        
        content = f'''
        <!-- Notification Banner -->
        <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10B981 100%); padding: 24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <p style="color: #A7F3D0; margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Experience Centre</p>
                            <h2 style="color: #FFFFFF; margin: 8px 0 0 0; font-size: 22px; font-weight: 600;">New Visit Scheduled</h2>
                        </td>
                        <td style="text-align: right;">
                            <p style="color: #A7F3D0; margin: 0; font-size: 11px;">Booked: {current_date}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Body -->
        <tr>
            <td style="padding: 32px 40px; background-color: #FFFFFF;">
                <!-- Visit Details Card -->
                <div style="background: linear-gradient(135deg, #059669 0%, #10B981 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
                    <p style="color: #A7F3D0; margin: 0 0 8px 0; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Scheduled For</p>
                    <h3 style="color: #FFFFFF; margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">{visit_date}</h3>
                    <p style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 500;">{visit_time}</p>
                </div>
                
                <!-- Visitor Info -->
                <div style="background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%); border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #10B981;">
                    <h3 style="color: #059669; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Visitor Information</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 8px 0;">
                                <span style="color: #059669; font-size: 12px; display: inline-block; width: 60px;">Name</span>
                                <span style="color: #1A1A1A; font-size: 15px; font-weight: 600;">{name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;">
                                <span style="color: #059669; font-size: 12px; display: inline-block; width: 60px;">Email</span>
                                <a href="mailto:{email}" style="color: #1A1A1A; font-size: 14px; text-decoration: none; font-weight: 500;">{email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0;">
                                <span style="color: #059669; font-size: 12px; display: inline-block; width: 60px;">Phone</span>
                                <a href="tel:{phone}" style="color: #1A1A1A; font-size: 14px; text-decoration: none; font-weight: 500;">{phone}</a>
                            </td>
                        </tr>
                    </table>
                </div>
                
                {f"""
                <!-- Notes -->
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                    <h3 style="color: #6B7280; font-size: 10px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Notes</h3>
                    <p style="color: #1A1A1A; font-size: 14px; margin: 0; line-height: 1.7;">{message}</p>
                </div>
                """ if message else ""}
                
                <!-- Actions -->
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="padding: 16px 0;">
                            <a href="tel:{phone}" style="display: inline-block; background-color: #059669; color: #FFFFFF; text-decoration: none; padding: 14px 40px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px; margin-right: 12px;">CALL VISITOR</a>
                            <a href="mailto:{email}?subject=Your%20LEXA%20Visit%20on%20{visit_date}" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 14px 40px; font-weight: 600; font-size: 12px; letter-spacing: 1px; border-radius: 4px;">SEND EMAIL</a>
                        </td>
                    </tr>
                </table>
                
                {f'<p style="color: #9CA3AF; font-size: 10px; margin: 24px 0 0 0; text-align: center;">Booking ID: <code style="background-color: #F3F4F6; padding: 2px 8px; border-radius: 4px; font-size: 10px;">{booking_id[:16]}</code></p>' if booking_id else ''}
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)

    @staticmethod
    def schedule_visit_confirmation(
        name: str,
        visit_date: str,
        visit_time: str,
        booking_id: str = ""
    ) -> str:
        """Customer confirmation email for scheduled visit"""
        
        content = f'''
        <!-- Welcome Banner -->
        <tr>
            <td style="padding: 48px 40px; background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);">
                <h2 style="color: #FFFFFF; font-size: 28px; margin: 0 0 8px 0; font-weight: 600;">Visit Confirmed!</h2>
                <p style="color: #9CA3AF; font-size: 15px; margin: 0;">Thank you, {name}. We're excited to welcome you.</p>
            </td>
        </tr>
        
        <!-- Visit Details -->
        <tr>
            <td style="padding: 40px; background-color: #FFFFFF;">
                <!-- Date/Time Card -->
                <div style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); border-radius: 12px; padding: 32px; margin-bottom: 32px; text-align: center; border: 2px solid #E5E7EB;">
                    <p style="color: #C9A962; margin: 0 0 8px 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">Your Visit</p>
                    <h3 style="color: #1A1A1A; margin: 0 0 8px 0; font-size: 32px; font-weight: 700;">{visit_date}</h3>
                    <p style="color: #1A1A1A; margin: 0; font-size: 20px; font-weight: 600;">{visit_time}</p>
                </div>
                
                <!-- Location -->
                <div style="background-color: #F9FAFB; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                    <h3 style="color: #1A1A1A; font-size: 10px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Experience Centre Location</h3>
                    <p style="color: #1A1A1A; font-size: 15px; margin: 0 0 8px 0; font-weight: 600;">LEXA Lifestyle Experience Centre</p>
                    <p style="color: #6B7280; font-size: 14px; margin: 0 0 16px 0; line-height: 1.6;">
                        Dubai Investment Park 1<br>
                        Dubai, United Arab Emirates
                    </p>
                    <a href="https://maps.google.com/?q=LEXA+Lifestyle+Dubai" target="_blank" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 10px 24px; font-weight: 600; font-size: 11px; letter-spacing: 1px; border-radius: 4px;">GET DIRECTIONS</a>
                </div>
                
                <!-- What to Expect -->
                <div style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); border-left: 4px solid #C9A962; border-radius: 0 8px 8px 0; padding: 24px; margin-bottom: 32px;">
                    <h4 style="color: #1A1A1A; margin: 0 0 16px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">What to Expect</h4>
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding: 8px 0; vertical-align: top;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #C9A962; color: #1A1A1A; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; margin-right: 12px;">1</span>
                            </td>
                            <td style="padding: 8px 0;">
                                <p style="margin: 0; font-size: 14px; color: #1A1A1A; font-weight: 500;">Live Smart Home Demonstrations</p>
                                <p style="margin: 4px 0 0 0; font-size: 13px; color: #6B7280;">Experience our solutions in action</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; vertical-align: top;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #C9A962; color: #1A1A1A; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; margin-right: 12px;">2</span>
                            </td>
                            <td style="padding: 8px 0;">
                                <p style="margin: 0; font-size: 14px; color: #1A1A1A; font-weight: 500;">Personalized Consultation</p>
                                <p style="margin: 4px 0 0 0; font-size: 13px; color: #6B7280;">Discuss your specific requirements</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; vertical-align: top;">
                                <span style="display: inline-block; width: 24px; height: 24px; background-color: #C9A962; color: #1A1A1A; border-radius: 50%; text-align: center; line-height: 24px; font-size: 12px; font-weight: 600; margin-right: 12px;">3</span>
                            </td>
                            <td style="padding: 8px 0;">
                                <p style="margin: 0; font-size: 14px; color: #1A1A1A; font-weight: 500;">Custom Solution Design</p>
                                <p style="margin: 4px 0 0 0; font-size: 13px; color: #6B7280;">Get a tailored proposal for your project</p>
                            </td>
                        </tr>
                    </table>
                </div>
                
                <!-- Contact -->
                <div style="background-color: #1A1A1A; border-radius: 8px; padding: 24px; text-align: center;">
                    <p style="color: #9CA3AF; font-size: 12px; margin: 0 0 8px 0;">Need to reschedule?</p>
                    <p style="color: #FFFFFF; font-size: 14px; margin: 0;">
                        Call us at <a href="tel:+971503267227" style="color: #C9A962; text-decoration: none; font-weight: 600;">+971 50 326 7227</a>
                    </p>
                </div>
                
                {f'<p style="color: #9CA3AF; font-size: 10px; margin: 24px 0 0 0; text-align: center;">Booking Reference: <code style="background-color: #F3F4F6; padding: 2px 8px; border-radius: 4px; font-size: 10px;">{booking_id[:16]}</code></p>' if booking_id else ''}
            </td>
        </tr>
        '''
        
        return LEXAEmailTemplate._wrap_content(content)


class EmailService:
    """Email sending service using Gmail SMTP"""
    
    @staticmethod
    async def send_email(
        to_email: str,
        subject: str,
        html_content: str,
        from_name: str = "LEXA Lifestyle",
        from_email: str = None,
        cc_email: str = None,
        attachments: List[tuple] = None
    ) -> bool:
        """
        Send email via Gmail SMTP
        
        Args:
            to_email: Recipient email
            subject: Email subject
            html_content: HTML email content
            from_name: Sender name
            from_email: Override sender email address
            cc_email: CC recipient email
            attachments: List of (filename, content, mime_type) tuples
            
        Returns:
            bool: Success status
        """
        if not SMTP_USER or not SMTP_PASSWORD:
            logger.warning("SMTP credentials not configured, skipping email")
            return False
        
        try:
            message = MIMEMultipart("mixed")
            message["From"] = f"{from_name} <{from_email or SENDER_EMAIL}>"
            message["To"] = to_email
            message["Subject"] = subject
            if cc_email:
                message["Cc"] = cc_email
            
            # Create alternative part for HTML
            alt_part = MIMEMultipart("alternative")
            html_part = MIMEText(html_content, "html", "utf-8")
            alt_part.attach(html_part)
            message.attach(alt_part)
            
            # Add attachments if any
            if attachments:
                for filename, content, mime_type in attachments:
                    part = MIMEBase(*mime_type.split('/'))
                    part.set_payload(content)
                    encoders.encode_base64(part)
                    part.add_header('Content-Disposition', f'attachment; filename="{filename}"')
                    message.attach(part)
            
            if SMTP_USE_TLS:
                async with aiosmtplib.SMTP(
                    hostname=SMTP_HOST,
                    port=SMTP_PORT,
                    start_tls=True
                ) as smtp:
                    await smtp.login(SMTP_USER, SMTP_PASSWORD)
                    await smtp.send_message(message)
            else:
                async with aiosmtplib.SMTP(
                    hostname=SMTP_HOST,
                    port=SMTP_PORT
                ) as smtp:
                    await smtp.login(SMTP_USER, SMTP_PASSWORD)
                    await smtp.send_message(message)
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False
    
    @staticmethod
    async def send_calculator_confirmation(
        customer_name: str,
        customer_email: str,
        project_type: str,
        total_cost: int,
        estimated_timeline: int,
        cost_breakdown: List[Dict[str, Any]],
    ) -> bool:
        """Send calculator confirmation to customer"""
        
        html_content = LEXAEmailTemplate.calculator_quote(
            customer_name=customer_name,
            project_type=project_type,
            total_cost=total_cost,
            estimated_timeline=estimated_timeline,
            cost_breakdown=cost_breakdown,
        )
        
        return await EmailService.send_email(
            to_email=customer_email,
            subject=f"Your Smart Home Quote - AED {total_cost:,} | LEXA Lifestyle",
            html_content=html_content,
        )
    
    @staticmethod
    async def send_sales_notification(
        submission_id: str,
        customer_name: str,
        customer_email: str,
        customer_phone: str,
        project_type: str,
        sub_category: str,
        total_area: int,
        emirate: str,
        city: str,
        total_cost: int,
        timeline: str,
        budget_range: str,
        selected_solutions: Dict[str, str],
        sales_email: str = None,
    ) -> bool:
        """Send notification to sales team"""
        
        html_content = LEXAEmailTemplate.sales_lead_notification(
            submission_id=submission_id,
            customer_name=customer_name,
            customer_email=customer_email,
            customer_phone=customer_phone,
            project_type=project_type,
            sub_category=sub_category,
            total_area=total_area,
            emirate=emirate,
            city=city,
            total_cost=total_cost,
            timeline=timeline,
            budget_range=budget_range,
            selected_solutions=selected_solutions,
        )
        
        to_email = sales_email or SALES_EMAIL
        
        return await EmailService.send_email(
            to_email=to_email,
            subject=f"[NEW LEAD] {customer_name} - AED {total_cost:,} | {project_type.title()}",
            html_content=html_content,
        )
    
    @staticmethod
    async def send_contact_notification(
        name: str,
        email: str,
        phone: str,
        subject: str,
        message: str,
    ) -> bool:
        """Send contact form notification to sales team"""
        
        html_content = LEXAEmailTemplate.contact_form(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message,
        )
        
        return await EmailService.send_email(
            to_email=SALES_EMAIL,
            subject=f"[CONTACT] {name} - {subject}",
            html_content=html_content,
        )
    
    @staticmethod
    async def send_consultation_notification(
        name: str,
        email: str,
        phone: str,
        persona: str = "",
        message: str = "",
    ) -> bool:
        """Send consultation booking notification"""
        
        html_content = LEXAEmailTemplate.consultation_booking(
            name=name,
            email=email,
            phone=phone,
            persona=persona,
            message=message,
        )
        
        return await EmailService.send_email(
            to_email=SALES_EMAIL,
            subject=f"[CONSULTATION] New Booking from {name}",
            html_content=html_content,
        )
    
    @staticmethod
    async def send_experience_centre_notification(
        name: str,
        email: str,
        phone: str,
        date: str,
        time: str,
        interests: List[str] = None,
        message: str = "",
    ) -> bool:
        """Send experience centre booking notification"""
        
        html_content = LEXAEmailTemplate.experience_centre_booking(
            name=name,
            email=email,
            phone=phone,
            date=date,
            time=time,
            interests=interests,
            message=message,
        )
        
        return await EmailService.send_email(
            to_email=SALES_EMAIL,
            subject=f"[EXPERIENCE CENTRE] Visit Scheduled - {date} at {time}",
            html_content=html_content,
        )
    
    @staticmethod
    async def send_lead_notification(
        lead_type: str,
        name: str,
        email: str,
        phone: str,
        company: str = "",
        details: str = "",
        submission_id: str = "",
        extra_fields: Dict[str, Any] = None,
    ) -> bool:
        """Send generic lead notification"""
        
        html_content = LEXAEmailTemplate.lead_notification(
            lead_type=lead_type,
            name=name,
            email=email,
            phone=phone,
            company=company,
            details=details,
            submission_id=submission_id,
            extra_fields=extra_fields,
        )
        
        return await EmailService.send_email(
            to_email=SALES_EMAIL,
            subject=f"[NEW LEAD] {lead_type} from {name}",
            html_content=html_content,
        )
    
    @staticmethod
    async def send_package_inquiry_notification(
        name: str,
        email: str,
        phone: str,
        package_name: str,
        property_type: str,
        property_size: str,
        message: str = "",
        submission_id: str = "",
    ) -> bool:
        """Send package inquiry notification"""
        
        html_content = LEXAEmailTemplate.package_inquiry(
            name=name,
            email=email,
            phone=phone,
            package_name=package_name,
            property_type=property_type,
            property_size=property_size,
            message=message,
            submission_id=submission_id,
        )
        
        return await EmailService.send_email(
            to_email=SALES_EMAIL,
            subject=f"[PACKAGE INQUIRY] {package_name} - {name}",
            html_content=html_content,
        )

    @staticmethod
    async def send_schedule_visit_notifications(
        name: str,
        email: str,
        phone: str,
        visit_date: str,
        visit_time: str,
        message: str = "",
        booking_id: str = "",
    ) -> bool:
        """Send visit confirmation to customer and notification to sales"""
        
        # Send admin notification
        admin_html = LEXAEmailTemplate.schedule_visit_admin(
            name=name,
            email=email,
            phone=phone,
            visit_date=visit_date,
            visit_time=visit_time,
            message=message,
            booking_id=booking_id,
        )
        
        admin_sent = await EmailService.send_email(
            to_email=SALES_EMAIL,
            subject=f"[NEW VISIT] {visit_date} at {visit_time} - {name}",
            html_content=admin_html,
        )
        
        # Send customer confirmation
        customer_html = LEXAEmailTemplate.schedule_visit_confirmation(
            name=name,
            visit_date=visit_date,
            visit_time=visit_time,
            booking_id=booking_id,
        )
        
        customer_sent = await EmailService.send_email(
            to_email=email,
            subject=f"Your LEXA Visit Confirmed - {visit_date}",
            html_content=customer_html,
        )
        
        return admin_sent and customer_sent


# Backwards compatibility - keep old class name as alias
EmailTemplates = LEXAEmailTemplate
