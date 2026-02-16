"""
BOQ Email Service for sending project proposals
Uses Gmail SMTP for transactional email delivery
Styled according to LEXA brand guidelines
"""

import os
import logging
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from typing import Optional, Dict, Any
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

# SMTP Configuration
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USE_TLS = os.environ.get("SMTP_USE_TLS", "true").lower() == "true"
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", SMTP_USER)
SENDER_NAME = os.environ.get("SENDER_NAME", "LEXA Lifestyle")


class BOQEmailService:
    """Handle BOQ email communications via Gmail SMTP - LEXA branded"""
    
    def __init__(self):
        self.smtp_host = SMTP_HOST
        self.smtp_port = SMTP_PORT
        self.smtp_user = SMTP_USER
        self.smtp_password = SMTP_PASSWORD
        self.sender_email = SENDER_EMAIL
        self.sender_name = SENDER_NAME
        
        if not self.smtp_user or not self.smtp_password:
            logger.warning("SMTP credentials not configured. Email sending will be skipped.")
    
    async def send_boq_email(
        self,
        recipient_email: str,
        recipient_name: str,
        session_id: str,
        client_summary: Dict[str, Any],
        pdf_bytes: Optional[bytes] = None
    ) -> Dict[str, str]:
        """
        Send BOQ email with PDF attachment via Gmail SMTP
        
        Args:
            recipient_email: Customer email
            recipient_name: Customer name
            session_id: Project session ID
            client_summary: BOQ summary data
            pdf_bytes: PDF file bytes (optional)
            
        Returns:
            Dict with status and message
        """
        try:
            # Check if SMTP is configured
            if not self.smtp_user or not self.smtp_password:
                logger.warning("SMTP credentials not configured - skipping email")
                return {
                    "status": "skipped",
                    "message": "SMTP not configured",
                    "email_id": None
                }
            
            # Create message
            message = MIMEMultipart("mixed")
            message["From"] = f"{self.sender_name} <{self.sender_email}>"
            message["To"] = recipient_email
            message["Subject"] = "Your Smart Home Project Proposal | LEXA Lifestyle"
            
            # Generate HTML content
            html_content = self._generate_boq_html(
                recipient_name,
                client_summary,
                session_id
            )
            
            # Create HTML part
            html_part = MIMEMultipart("alternative")
            html_part.attach(MIMEText(html_content, "html"))
            message.attach(html_part)
            
            # Add PDF attachment if provided
            if pdf_bytes:
                pdf_attachment = MIMEBase("application", "pdf")
                pdf_attachment.set_payload(pdf_bytes)
                encoders.encode_base64(pdf_attachment)
                pdf_attachment.add_header(
                    "Content-Disposition",
                    f"attachment; filename=LEXA_Proposal_{session_id[:8].upper()}.pdf"
                )
                message.attach(pdf_attachment)
                logger.info(f"PDF attachment added: LEXA_Proposal_{session_id[:8].upper()}.pdf")
            
            # Send email via SMTP
            if SMTP_USE_TLS:
                async with aiosmtplib.SMTP(
                    hostname=self.smtp_host,
                    port=self.smtp_port,
                    start_tls=True
                ) as smtp:
                    await smtp.login(self.smtp_user, self.smtp_password)
                    await smtp.send_message(message)
            else:
                async with aiosmtplib.SMTP(
                    hostname=self.smtp_host,
                    port=self.smtp_port
                ) as smtp:
                    await smtp.login(self.smtp_user, self.smtp_password)
                    await smtp.send_message(message)
            
            logger.info(f"BOQ email sent successfully to {recipient_email}")
            
            return {
                "status": "success",
                "message": f"Email sent to {recipient_email}",
                "email_id": f"smtp_{session_id[:8]}"
            }
            
        except Exception as e:
            logger.error(f"Failed to send BOQ email: {str(e)}")
            return {
                "status": "error",
                "message": str(e),
                "email_id": None
            }
    
    def _generate_boq_html(
        self,
        name: str,
        client_summary: Dict[str, Any],
        session_id: str
    ) -> str:
        """Generate professional HTML email for BOQ - LEXA branded"""
        
        overview = client_summary.get('project_overview', {})
        systems = client_summary.get('selected_systems', [])
        current_date = datetime.now().strftime("%B %d, %Y")
        
        # Build systems table rows
        systems_html = ""
        for idx, sys in enumerate(systems[:6], 1):  # Show top 6
            systems_html += f"""
            <tr>
                <td style="padding: 14px 16px; border-bottom: 1px solid #E5E7EB; font-size: 13px; color: #1A1A1A;">
                    <strong>{sys.get('system_name', 'Unknown')}</strong><br/>
                    <span style="color: #6B7280; font-size: 12px;">{sys.get('tier', 'Premium')} Tier • Complexity: {sys.get('complexity', 5)}/10</span>
                </td>
                <td style="padding: 14px 16px; border-bottom: 1px solid #E5E7EB; text-align: right; font-weight: 600; font-size: 13px; color: #1A1A1A;">
                    {sys.get('estimated_price', 'TBD')}
                </td>
            </tr>
            """
        
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1A1A1A; margin: 0; padding: 0; background-color: #F9F9F7;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F9F9F7; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                            <!-- Header with Brand -->
                            <tr>
                                <td style="background-color: #1A1A1A; padding: 32px 40px;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td>
                                                <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 4px;">LEXA</h1>
                                                <p style="color: #9CA3AF; margin: 4px 0 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">LIFE STYLE</p>
                                            </td>
                                            <td style="text-align: right;">
                                                <p style="color: #6B7280; margin: 0; font-size: 10px; letter-spacing: 1px;">LIGHTING • ELECTRONICS</p>
                                                <p style="color: #6B7280; margin: 2px 0 0 0; font-size: 10px; letter-spacing: 1px;">AUTOMATION • AUDIO</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <h2 style="color: #1A1A1A; font-size: 22px; margin: 0 0 8px 0; font-weight: 600;">Hello {name},</h2>
                                    <p style="color: #6B7280; font-size: 15px; margin: 0 0 32px 0;">Thank you for using our Smart Project Builder. We're excited to share your personalized project proposal.</p>
                                    
                                    <!-- Reference Info -->
                                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                                        <tr>
                                            <td style="font-size: 12px; color: #6B7280;">
                                                <span style="text-transform: uppercase; letter-spacing: 1px;">Reference:</span> <strong style="color: #1A1A1A;">{session_id[:8].upper()}</strong>
                                            </td>
                                            <td style="text-align: right; font-size: 12px; color: #6B7280;">
                                                <span style="text-transform: uppercase; letter-spacing: 1px;">Date:</span> <strong style="color: #1A1A1A;">{current_date}</strong>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Project Overview Box -->
                                    <div style="background-color: #F9F9F7; border-left: 3px solid #1A1A1A; padding: 20px; margin-bottom: 32px;">
                                        <h3 style="color: #1A1A1A; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Project Overview</h3>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 4px 0; color: #6B7280; font-size: 13px; width: 100px;">Property</td>
                                                <td style="padding: 4px 0; color: #1A1A1A; font-size: 13px; font-weight: 600;">{overview.get('property_type', 'N/A')}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 4px 0; color: #6B7280; font-size: 13px;">Area</td>
                                                <td style="padding: 4px 0; color: #1A1A1A; font-size: 13px; font-weight: 600;">{overview.get('area_sqft', 0):,} sqft</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 4px 0; color: #6B7280; font-size: 13px;">Stage</td>
                                                <td style="padding: 4px 0; color: #1A1A1A; font-size: 13px; font-weight: 600;">{overview.get('project_stage', 'N/A')}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                    <!-- Recommended Systems -->
                                    <h3 style="color: #1A1A1A; font-size: 14px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Recommended Systems</h3>
                                    <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #E5E7EB; margin-bottom: 32px;">
                                        <tr>
                                            <td style="padding: 12px 16px; background-color: #F9F9F7; font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">System</td>
                                            <td style="padding: 12px 16px; background-color: #F9F9F7; text-align: right; font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Est. Price</td>
                                        </tr>
                                        {systems_html}
                                    </table>
                                    
                                    <!-- PDF Notice -->
                                    <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; padding: 16px 20px; margin-bottom: 32px;">
                                        <p style="margin: 0; font-size: 13px; color: #166534;">
                                            <strong>📎 Detailed Proposal Attached</strong><br/>
                                            <span style="color: #6B7280;">Please review the attached PDF for complete system details, pricing breakdown, and terms.</span>
                                        </p>
                                    </div>
                                    
                                    <!-- Next Steps -->
                                    <h3 style="color: #1A1A1A; font-size: 14px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px;">What Happens Next?</h3>
                                    <ol style="color: #6B7280; margin: 0 0 32px 0; padding-left: 20px; font-size: 14px;">
                                        <li style="margin-bottom: 8px;">Our team will contact you within 24 hours</li>
                                        <li style="margin-bottom: 8px;">Schedule a complimentary site survey</li>
                                        <li style="margin-bottom: 8px;">Discuss your specific requirements</li>
                                        <li>Receive detailed quotation with timeline</li>
                                    </ol>
                                    
                                    <!-- CTA -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 8px 0;">
                                                <a href="https://lexalifestyle.com/contact" style="display: inline-block; background-color: #1A1A1A; color: #FFFFFF; text-decoration: none; padding: 14px 40px; font-weight: 600; font-size: 14px; letter-spacing: 1px;">SCHEDULE CONSULTATION</a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style="margin: 24px 0 0 0; font-size: 13px; color: #6B7280; text-align: center;">
                                        Questions? Reply to this email or call <strong style="color: #1A1A1A;">+971 4 267 0470</strong>
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #F9F9F7; padding: 32px 40px; border-top: 1px solid #E5E7EB;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="text-align: center;">
                                                <p style="color: #1A1A1A; margin: 0; font-size: 13px; font-weight: 600;">LEXA LIFESTYLE TRADING LLC</p>
                                                <p style="color: #6B7280; margin: 8px 0 0 0; font-size: 12px;">Al Quoz IND 1, SZR - Interchange No 3 - Dubai</p>
                                                <p style="color: #6B7280; margin: 4px 0 0 0; font-size: 12px;">
                                                    <a href="tel:+97142670470" style="color: #1A1A1A; text-decoration: none;">+971 4 267 0470</a> | 
                                                    <a href="mailto:info@lexalifestyle.com" style="color: #1A1A1A; text-decoration: none;">info@lexalifestyle.com</a>
                                                </p>
                                                <p style="color: #9CA3AF; margin: 12px 0 0 0; font-size: 10px;">TRN: 104472899400003</p>
                                                <p style="color: #9CA3AF; margin: 16px 0 0 0; font-size: 10px;">© {datetime.now().year} LEXA Lifestyle. All rights reserved.</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """


# Singleton instance
_boq_email_service = None

def get_boq_email_service() -> BOQEmailService:
    """Get singleton BOQ email service instance"""
    global _boq_email_service
    if _boq_email_service is None:
        _boq_email_service = BOQEmailService()
    return _boq_email_service
