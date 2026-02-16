"""
Test Email Integration
Quick test to verify Gmail SMTP is working with the fixed configuration
"""

import asyncio
import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path('/app/backend')
load_dotenv(ROOT_DIR / '.env')

sys.path.insert(0, '/app/backend')

from services.email_service import EmailService

async def test_email():
    """Test email sending"""
    print("🧪 Testing Gmail SMTP Integration...")
    print(f"SMTP Host: {os.getenv('SMTP_HOST', 'smtp.gmail.com')}")
    print(f"SMTP Port: {os.getenv('SMTP_PORT', '587')}")
    print(f"SMTP User: {os.getenv('SMTP_USER', 'Not set')}")
    print(f"SMTP TLS: {os.getenv('SMTP_USE_TLS', 'true')}")
    print()
    
    # Test sending a simple email
    result = await EmailService.send_email(
        to_email=os.getenv('SMTP_USER', 'test@example.com'),  # Send to self for testing
        subject="LEXA - Email Integration Test",
        html_content="""
        <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #000;">✅ Email Integration Test Successful</h2>
                <p>Your Gmail SMTP configuration is working correctly!</p>
                <p><strong>Configuration:</strong></p>
                <ul>
                    <li>Host: smtp.gmail.com</li>
                    <li>Port: 587</li>
                    <li>TLS: Enabled</li>
                </ul>
                <p style="color: #666; font-size: 12px;">Sent from LEXA Lifestyle Backend</p>
            </body>
        </html>
        """
    )
    
    print(f"✅ Result: {result}")
    return result

if __name__ == "__main__":
    result = asyncio.run(test_email())
    if result.get("status") == "success":
        print("\n✅ EMAIL INTEGRATION WORKING!")
        sys.exit(0)
    else:
        print(f"\n❌ EMAIL INTEGRATION FAILED: {result.get('error', 'Unknown error')}")
        sys.exit(1)
