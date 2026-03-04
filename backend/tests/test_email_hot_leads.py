"""
Email Notification Feature Tests - Hot Leads (Score 70+)
Tests for:
- EmailService.send_hot_lead_alert method exists and parameters
- EmailService.send_lead_acknowledgement method exists with cc_email 
- send_email method supports from_email and cc_email parameters
- _send_hot_lead_emails background task in sales_intelligence.py
- sales_pipeline collection email_sent flag

NOTE: These tests verify code structure and API responses. 
Actual email delivery depends on SMTP credentials - tests do NOT trigger actual email sending.
"""

import pytest
import requests
import os
import ast
import sys

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://preview-stable-1.preview.emergentagent.com')


@pytest.fixture(scope="module")
def auth_token():
    """Get authentication token for admin user"""
    response = requests.post(
        f"{BASE_URL}/api/admin/login",
        json={"username": "admin", "password": "lexa2026"}
    )
    assert response.status_code == 200, f"Login failed: {response.text}"
    token = response.json().get("access_token")
    assert token, "No access_token in login response"
    return token


@pytest.fixture(scope="module")
def auth_headers(auth_token):
    """Return headers with auth token"""
    return {
        "Authorization": f"Bearer {auth_token}",
        "Content-Type": "application/json"
    }


class TestEmailServiceStructure:
    """Verify EmailService has required methods with correct signatures"""
    
    def test_send_hot_lead_alert_method_exists(self):
        """EmailService.send_hot_lead_alert should exist with correct parameters"""
        email_service_path = "/app/backend/services/email_service.py"
        
        with open(email_service_path, 'r') as f:
            content = f.read()
        
        # Parse the file to find the method
        assert "async def send_hot_lead_alert(" in content, "send_hot_lead_alert method not found"
        
        # Check parameters
        required_params = [
            "lead_name", "lead_email", "lead_phone", 
            "lead_score", "lead_source", "score_breakdown", "assigned_to"
        ]
        
        # Find the method and extract its signature
        start_idx = content.find("async def send_hot_lead_alert(")
        end_idx = content.find(")", start_idx) + 1
        method_sig = content[start_idx:end_idx]
        
        for param in required_params:
            assert param in method_sig, f"Missing parameter '{param}' in send_hot_lead_alert"
        
        print(f"✅ send_hot_lead_alert method exists with all required parameters:")
        print(f"   {required_params}")
    
    def test_send_lead_acknowledgement_method_exists(self):
        """EmailService.send_lead_acknowledgement should exist with cc_email support"""
        email_service_path = "/app/backend/services/email_service.py"
        
        with open(email_service_path, 'r') as f:
            content = f.read()
        
        # Check method exists
        assert "async def send_lead_acknowledgement(" in content, "send_lead_acknowledgement method not found"
        
        # Check that it uses cc_email in its implementation
        # Find the method body
        start_idx = content.find("async def send_lead_acknowledgement(")
        # Find next method or class
        end_candidates = [
            content.find("async def ", start_idx + 50),
            content.find("@staticmethod", start_idx + 50),
            content.find("class ", start_idx + 50),
            len(content)
        ]
        end_idx = min([e for e in end_candidates if e > 0])
        method_body = content[start_idx:end_idx]
        
        assert "cc_email" in method_body, "send_lead_acknowledgement should use cc_email parameter"
        assert "SALES_EMAIL" in method_body, "send_lead_acknowledgement should CC to SALES_EMAIL"
        
        print(f"✅ send_lead_acknowledgement method exists with cc_email parameter for CC to sales")
    
    def test_send_email_supports_from_and_cc(self):
        """send_email method should support from_email and cc_email optional parameters"""
        email_service_path = "/app/backend/services/email_service.py"
        
        with open(email_service_path, 'r') as f:
            content = f.read()
        
        # Find send_email method signature
        start_idx = content.find("async def send_email(")
        assert start_idx != -1, "send_email method not found"
        
        # Get signature (until closing parenthesis + colon)
        paren_count = 0
        end_idx = start_idx
        for i, c in enumerate(content[start_idx:]):
            if c == '(':
                paren_count += 1
            elif c == ')':
                paren_count -= 1
                if paren_count == 0:
                    end_idx = start_idx + i + 1
                    break
        
        method_sig = content[start_idx:end_idx]
        
        assert "from_email" in method_sig, "send_email missing from_email parameter"
        assert "cc_email" in method_sig, "send_email missing cc_email parameter"
        
        # Check both have defaults (optional)
        assert "from_email: str = None" in method_sig or "from_email: str=None" in method_sig or "from_email = None" in method_sig, \
            "from_email should be optional (have default)"
        assert "cc_email: str = None" in method_sig or "cc_email: str=None" in method_sig or "cc_email = None" in method_sig, \
            "cc_email should be optional (have default)"
        
        print(f"✅ send_email method supports from_email and cc_email optional parameters")


class TestSalesIntelligenceEmailTrigger:
    """Verify _send_hot_lead_emails background task exists in sales_intelligence.py"""
    
    def test_send_hot_lead_emails_task_exists(self):
        """_send_hot_lead_emails async task should exist in sales_intelligence.py"""
        si_path = "/app/backend/routes/sales_intelligence.py"
        
        with open(si_path, 'r') as f:
            content = f.read()
        
        # Check the task function exists
        assert "async def _send_hot_lead_emails(" in content, "_send_hot_lead_emails task not found"
        
        # Check it's called with asyncio.create_task
        assert "asyncio.create_task(_send_hot_lead_emails" in content, \
            "_send_hot_lead_emails should be called with asyncio.create_task"
        
        # Check it sends both emails
        assert "send_hot_lead_alert" in content, "Should call send_hot_lead_alert"
        assert "send_lead_acknowledgement" in content, "Should call send_lead_acknowledgement"
        
        print(f"✅ _send_hot_lead_emails background task exists and:")
        print(f"   - Is called via asyncio.create_task")
        print(f"   - Calls send_hot_lead_alert (internal alert)")
        print(f"   - Calls send_lead_acknowledgement (customer acknowledgement)")
    
    def test_email_triggered_for_hot_leads_only(self):
        """Email should only be triggered for leads with score >= 70"""
        si_path = "/app/backend/routes/sales_intelligence.py"
        
        with open(si_path, 'r') as f:
            content = f.read()
        
        # Check score threshold is 70
        assert 'lead["lead_score"] >= 70' in content or "lead_score >= 70" in content.replace(" ", "").replace('"', "'").replace("'", '"'), \
            "Hot lead email should only trigger for score >= 70"
        
        print(f"✅ Email trigger is conditional on lead_score >= 70 (hot leads only)")
    
    def test_email_sent_flag_update(self):
        """sales_pipeline should update email_sent flag after sending"""
        si_path = "/app/backend/routes/sales_intelligence.py"
        
        with open(si_path, 'r') as f:
            content = f.read()
        
        # Check that email_sent is set to True after emails sent
        assert '"email_sent": True' in content or "'email_sent': True" in content, \
            "Should update email_sent flag to True in sales_pipeline"
        
        print(f"✅ sales_pipeline collection updates email_sent flag after emails sent")


class TestSalesDashboardAPIStillWorks:
    """Verify existing Sales Intelligence APIs still work after email feature addition"""
    
    def test_dashboard_stats_api(self, auth_headers):
        """GET /api/sales-intelligence/dashboard-stats should still return correct data"""
        response = requests.get(
            f"{BASE_URL}/api/sales-intelligence/dashboard-stats",
            headers=auth_headers
        )
        assert response.status_code == 200, f"Dashboard stats failed: {response.text}"
        
        data = response.json()
        
        # Verify key fields
        assert "total_leads" in data, "Missing total_leads"
        assert "score_distribution" in data, "Missing score_distribution"
        
        total_leads = data.get("total_leads", 0)
        hot_leads = data.get("score_distribution", {}).get("hot", 0)
        
        # Based on previous tests, should have 113+ leads, 49+ hot
        assert total_leads >= 100, f"Expected >= 100 total leads, got {total_leads}"
        assert hot_leads >= 40, f"Expected >= 40 hot leads, got {hot_leads}"
        
        print(f"✅ Dashboard stats API still works: {total_leads} total leads, {hot_leads} hot leads")
    
    def test_pipeline_api_with_min_score_filter(self, auth_headers):
        """GET /api/sales-intelligence/pipeline?min_score=70 should return only hot leads"""
        response = requests.get(
            f"{BASE_URL}/api/sales-intelligence/pipeline?min_score=70",
            headers=auth_headers
        )
        assert response.status_code == 200, f"Pipeline API failed: {response.text}"
        
        data = response.json()
        leads = data.get("leads", [])
        
        # All leads should have score >= 70
        for lead in leads[:10]:  # Check first 10
            score = lead.get("lead_score", 0)
            assert score >= 70, f"Lead has score {score}, expected >= 70"
            assert "assigned_to" in lead, "Lead missing assigned_to field"
        
        print(f"✅ Pipeline API min_score=70 filter works: {len(leads)} hot leads returned")
    
    def test_lead_status_update_api(self, auth_headers):
        """PUT /api/sales-intelligence/lead/{id}/status should still work"""
        # Get a lead first
        response = requests.get(
            f"{BASE_URL}/api/sales-intelligence/pipeline?limit=1",
            headers=auth_headers
        )
        leads = response.json().get("leads", [])
        if not leads:
            pytest.skip("No leads available")
        
        lead_id = leads[0].get("id")
        
        # Update status
        response = requests.put(
            f"{BASE_URL}/api/sales-intelligence/lead/{lead_id}/status",
            headers=auth_headers,
            json={"status": "new"}  # Reset to new
        )
        assert response.status_code == 200, f"Status update failed: {response.text}"
        
        data = response.json()
        assert data.get("success") == True
        
        print(f"✅ Lead status update API still works: {lead_id}")


class TestEmailServiceConfiguration:
    """Verify email configuration is correct"""
    
    def test_sender_and_sales_email_defined(self):
        """SENDER_EMAIL and SALES_EMAIL should be defined in email_service.py"""
        email_service_path = "/app/backend/services/email_service.py"
        
        with open(email_service_path, 'r') as f:
            content = f.read()
        
        assert "SENDER_EMAIL" in content, "SENDER_EMAIL not defined"
        assert "SALES_EMAIL" in content, "SALES_EMAIL not defined"
        
        # Check they're loaded from env
        assert "os.environ.get" in content or "os.getenv" in content, \
            "Email addresses should be loaded from environment"
        
        print(f"✅ SENDER_EMAIL and SALES_EMAIL are defined and loaded from environment")
    
    def test_hot_lead_alert_uses_correct_recipients(self):
        """Hot lead alert should go to sales@, from admin@"""
        email_service_path = "/app/backend/services/email_service.py"
        
        with open(email_service_path, 'r') as f:
            content = f.read()
        
        # Find send_hot_lead_alert method
        start_idx = content.find("async def send_hot_lead_alert(")
        end_idx = content.find("async def send_lead_acknowledgement(", start_idx)
        method_body = content[start_idx:end_idx]
        
        assert "to_email=SALES_EMAIL" in method_body, "Hot lead alert should be sent to SALES_EMAIL"
        assert 'from_name="LEXA Web Admin"' in method_body or "from_name='LEXA Web Admin'" in method_body, \
            "Hot lead alert should be from 'LEXA Web Admin'"
        
        print(f"✅ Hot lead alert correctly configured: webadmin@ → sales@")
    
    def test_lead_acknowledgement_uses_correct_recipients(self):
        """Lead acknowledgement should go to customer, CC sales@"""
        email_service_path = "/app/backend/services/email_service.py"
        
        with open(email_service_path, 'r') as f:
            content = f.read()
        
        # Find send_lead_acknowledgement method
        start_idx = content.find("async def send_lead_acknowledgement(")
        end_idx = content.find("class ", start_idx + 50) if content.find("class ", start_idx + 50) > 0 else len(content)
        method_body = content[start_idx:end_idx]
        
        assert "to_email=customer_email" in method_body, "Acknowledgement should be sent to customer_email"
        assert "cc_email=SALES_EMAIL" in method_body, "Acknowledgement should CC SALES_EMAIL"
        
        print(f"✅ Lead acknowledgement correctly configured: webadmin@ → customer, CC sales@")


class TestEmailTemplateStructure:
    """Verify email templates are LEXA branded HTML"""
    
    def test_hot_lead_alert_is_branded_html(self):
        """Hot lead alert email should be LEXA branded HTML"""
        email_service_path = "/app/backend/services/email_service.py"
        
        with open(email_service_path, 'r') as f:
            content = f.read()
        
        # Find send_hot_lead_alert method body
        start_idx = content.find("async def send_hot_lead_alert(")
        end_idx = content.find("async def send_lead_acknowledgement(", start_idx)
        method_body = content[start_idx:end_idx]
        
        # Check for HTML content
        assert "<div" in method_body, "Template should contain HTML div elements"
        assert "LEXA" in method_body, "Template should be LEXA branded"
        assert "HOT LEAD ALERT" in method_body or "Hot Lead" in method_body, "Should indicate hot lead"
        assert "Score Breakdown" in method_body or "score" in method_body.lower(), "Should show score info"
        
        print(f"✅ Hot lead alert uses LEXA branded HTML template with score breakdown")
    
    def test_lead_acknowledgement_is_branded_html(self):
        """Lead acknowledgement email should be LEXA branded HTML"""
        email_service_path = "/app/backend/services/email_service.py"
        
        with open(email_service_path, 'r') as f:
            content = f.read()
        
        # Find send_lead_acknowledgement method body
        start_idx = content.find("async def send_lead_acknowledgement(")
        end_idx = min(
            [e for e in [
                content.find("async def ", start_idx + 50),
                content.find("class ", start_idx + 50),
                len(content)
            ] if e > 0]
        )
        method_body = content[start_idx:end_idx]
        
        # Check for HTML content
        assert "<div" in method_body, "Template should contain HTML div elements"
        assert "LEXA" in method_body, "Template should be LEXA branded"
        assert "Thank you" in method_body or "thank you" in method_body.lower(), "Should thank the customer"
        
        print(f"✅ Lead acknowledgement uses LEXA branded HTML template")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
