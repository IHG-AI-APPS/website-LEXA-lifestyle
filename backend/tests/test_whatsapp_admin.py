"""
WhatsApp Admin API Tests - P4 Feature Testing
Tests for WhatsApp/Interakt admin template management:
- Template CRUD operations
- Auth protection (401 without token)
- Integration status endpoint
- Message logs endpoint
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Admin credentials from request
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "lexa2026"


class TestWhatsAppAdminAuth:
    """Test that all WhatsApp admin endpoints require authentication"""
    
    def test_status_requires_auth(self):
        """GET /api/admin/whatsapp/status should return 401 without token"""
        response = requests.get(f"{BASE_URL}/api/admin/whatsapp/status")
        assert response.status_code == 401 or response.status_code == 403, \
            f"Expected 401/403 without auth, got {response.status_code}"
        print(f"PASS: Status endpoint requires auth (got {response.status_code})")
    
    def test_templates_list_requires_auth(self):
        """GET /api/admin/whatsapp/templates should return 401 without token"""
        response = requests.get(f"{BASE_URL}/api/admin/whatsapp/templates")
        assert response.status_code == 401 or response.status_code == 403, \
            f"Expected 401/403 without auth, got {response.status_code}"
        print(f"PASS: Templates list endpoint requires auth (got {response.status_code})")
    
    def test_create_template_requires_auth(self):
        """POST /api/admin/whatsapp/templates should return 401 without token"""
        response = requests.post(f"{BASE_URL}/api/admin/whatsapp/templates", json={
            "name": "test",
            "description": "test",
            "body_text": "test"
        })
        assert response.status_code == 401 or response.status_code == 403, \
            f"Expected 401/403 without auth, got {response.status_code}"
        print(f"PASS: Create template endpoint requires auth (got {response.status_code})")
    
    def test_logs_requires_auth(self):
        """GET /api/admin/whatsapp/logs should return 401 without token"""
        response = requests.get(f"{BASE_URL}/api/admin/whatsapp/logs")
        assert response.status_code == 401 or response.status_code == 403, \
            f"Expected 401/403 without auth, got {response.status_code}"
        print(f"PASS: Logs endpoint requires auth (got {response.status_code})")
    
    def test_test_endpoint_requires_auth(self):
        """POST /api/admin/whatsapp/test should return 401 without token"""
        response = requests.post(f"{BASE_URL}/api/admin/whatsapp/test", json={
            "phone_number": "501234567",
            "template_name": "test"
        })
        assert response.status_code == 401 or response.status_code == 403, \
            f"Expected 401/403 without auth, got {response.status_code}"
        print(f"PASS: Test endpoint requires auth (got {response.status_code})")


class TestWhatsAppStatus:
    """Test WhatsApp status endpoint returns correct structure"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get admin auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Admin login failed: {response.text}"
        data = response.json()
        return data.get("access_token") or data.get("token")
    
    def test_status_returns_correct_fields(self, auth_token):
        """GET /api/admin/whatsapp/status returns enabled, has_token, templates, recent_messages, etc."""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/whatsapp/status", headers=headers)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify required fields exist
        assert "enabled" in data, "Missing 'enabled' field"
        assert "has_token" in data, "Missing 'has_token' field"
        assert "templates" in data, "Missing 'templates' field"
        assert "recent_messages" in data, "Missing 'recent_messages' field"
        assert "total_sent" in data, "Missing 'total_sent' field"
        assert "total_failed" in data, "Missing 'total_failed' field"
        
        # Verify types
        assert isinstance(data["enabled"], bool), "enabled should be boolean"
        assert isinstance(data["has_token"], bool), "has_token should be boolean"
        assert isinstance(data["templates"], list), "templates should be list"
        assert isinstance(data["recent_messages"], list), "recent_messages should be list"
        assert isinstance(data["total_sent"], int), "total_sent should be int"
        assert isinstance(data["total_failed"], int), "total_failed should be int"
        
        print(f"PASS: Status endpoint returns correct structure")
        print(f"  - enabled: {data['enabled']}")
        print(f"  - has_token: {data['has_token']}")
        print(f"  - templates count: {len(data['templates'])}")
        print(f"  - total_sent: {data['total_sent']}")
        print(f"  - total_failed: {data['total_failed']}")


class TestWhatsAppTemplates:
    """Test WhatsApp template CRUD operations"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get admin auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Admin login failed: {response.text}"
        data = response.json()
        return data.get("access_token") or data.get("token")
    
    @pytest.fixture(scope="class")
    def auth_headers(self, auth_token):
        return {"Authorization": f"Bearer {auth_token}"}
    
    def test_list_templates_returns_seeded_templates(self, auth_headers):
        """GET /api/admin/whatsapp/templates returns 3 seeded templates"""
        response = requests.get(f"{BASE_URL}/api/admin/whatsapp/templates", headers=auth_headers)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert isinstance(data, list), "Response should be a list"
        # Check for seeded templates by name
        template_names = [t.get("name") for t in data]
        
        # The 3 seeded templates mentioned: lead_notification, booking_confirmation, project_update
        expected_templates = ["lead_notification", "booking_confirmation", "project_update"]
        for expected in expected_templates:
            assert expected in template_names, f"Missing seeded template: {expected}"
        
        print(f"PASS: Found {len(data)} templates including seeded ones")
        print(f"  - Template names: {template_names}")
        
        # Verify lead_notification has approved status
        lead_template = next((t for t in data if t.get("name") == "lead_notification"), None)
        if lead_template:
            assert lead_template.get("status") == "approved", \
                f"lead_notification should be 'approved', got '{lead_template.get('status')}'"
            print(f"  - lead_notification status: {lead_template.get('status')} (correct)")
    
    def test_create_template(self, auth_headers):
        """POST /api/admin/whatsapp/templates creates a new template"""
        # First, clean up any existing test template
        requests.delete(f"{BASE_URL}/api/admin/whatsapp/templates/TEST_template_create", headers=auth_headers)
        
        payload = {
            "name": "TEST_template_create",
            "description": "Test template for pytest",
            "body_text": "Hello {{1}}, your appointment is confirmed.",
            "variables": ["customer_name"],
            "status": "pending"
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/whatsapp/templates", headers=auth_headers, json=payload)
        
        assert response.status_code in [200, 201], f"Expected 200/201, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert data.get("name") == "TEST_template_create", "Template name mismatch"
        assert data.get("description") == "Test template for pytest", "Description mismatch"
        assert data.get("status") == "pending", "Status should be pending"
        
        print(f"PASS: Created template 'TEST_template_create'")
        
        # Clean up
        requests.delete(f"{BASE_URL}/api/admin/whatsapp/templates/TEST_template_create", headers=auth_headers)
    
    def test_create_duplicate_template_returns_409(self, auth_headers):
        """POST /api/admin/whatsapp/templates with duplicate name returns 409"""
        # Create first template
        payload = {
            "name": "TEST_duplicate_check",
            "description": "First template",
            "body_text": "Hello"
        }
        
        # Clean up first
        requests.delete(f"{BASE_URL}/api/admin/whatsapp/templates/TEST_duplicate_check", headers=auth_headers)
        
        # Create first
        response1 = requests.post(f"{BASE_URL}/api/admin/whatsapp/templates", headers=auth_headers, json=payload)
        assert response1.status_code in [200, 201], f"First create failed: {response1.text}"
        
        # Try to create duplicate
        response2 = requests.post(f"{BASE_URL}/api/admin/whatsapp/templates", headers=auth_headers, json=payload)
        assert response2.status_code == 409, f"Expected 409 for duplicate, got {response2.status_code}: {response2.text}"
        
        print(f"PASS: Duplicate template returns 409 Conflict")
        
        # Clean up
        requests.delete(f"{BASE_URL}/api/admin/whatsapp/templates/TEST_duplicate_check", headers=auth_headers)
    
    def test_update_template_status(self, auth_headers):
        """PUT /api/admin/whatsapp/templates/{name}?status=approved updates template status"""
        # Create a test template first
        payload = {
            "name": "TEST_status_update",
            "description": "Test status update",
            "body_text": "Hello",
            "status": "pending"
        }
        
        # Clean up first
        requests.delete(f"{BASE_URL}/api/admin/whatsapp/templates/TEST_status_update", headers=auth_headers)
        
        # Create
        create_response = requests.post(f"{BASE_URL}/api/admin/whatsapp/templates", headers=auth_headers, json=payload)
        assert create_response.status_code in [200, 201], f"Create failed: {create_response.text}"
        
        # Update status to approved
        update_response = requests.put(
            f"{BASE_URL}/api/admin/whatsapp/templates/TEST_status_update?status=approved",
            headers=auth_headers
        )
        assert update_response.status_code == 200, f"Expected 200, got {update_response.status_code}: {update_response.text}"
        data = update_response.json()
        
        assert data.get("new_status") == "approved", f"Status should be 'approved', got '{data.get('new_status')}'"
        
        print(f"PASS: Updated template status to 'approved'")
        
        # Verify update persisted by fetching templates
        list_response = requests.get(f"{BASE_URL}/api/admin/whatsapp/templates", headers=auth_headers)
        templates = list_response.json()
        updated = next((t for t in templates if t.get("name") == "TEST_status_update"), None)
        assert updated and updated.get("status") == "approved", "Status update not persisted"
        
        print(f"PASS: Status update persisted in database")
        
        # Clean up
        requests.delete(f"{BASE_URL}/api/admin/whatsapp/templates/TEST_status_update", headers=auth_headers)
    
    def test_delete_template(self, auth_headers):
        """DELETE /api/admin/whatsapp/templates/{name} deletes the template"""
        # Create a test template first
        payload = {
            "name": "TEST_delete_me",
            "description": "To be deleted",
            "body_text": "Hello"
        }
        
        # Create
        requests.post(f"{BASE_URL}/api/admin/whatsapp/templates", headers=auth_headers, json=payload)
        
        # Delete
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/whatsapp/templates/TEST_delete_me",
            headers=auth_headers
        )
        assert delete_response.status_code == 200, f"Expected 200, got {delete_response.status_code}: {delete_response.text}"
        data = delete_response.json()
        assert data.get("status") == "deleted", "Response should confirm deletion"
        
        print(f"PASS: Deleted template 'TEST_delete_me'")
        
        # Verify deletion - GET should not contain it
        list_response = requests.get(f"{BASE_URL}/api/admin/whatsapp/templates", headers=auth_headers)
        templates = list_response.json()
        names = [t.get("name") for t in templates]
        assert "TEST_delete_me" not in names, "Template still exists after deletion"
        
        print(f"PASS: Template verified as deleted from database")
    
    def test_delete_nonexistent_template_returns_404(self, auth_headers):
        """DELETE /api/admin/whatsapp/templates/{name} returns 404 for non-existent template"""
        response = requests.delete(
            f"{BASE_URL}/api/admin/whatsapp/templates/nonexistent_template_xyz123",
            headers=auth_headers
        )
        assert response.status_code == 404, f"Expected 404, got {response.status_code}: {response.text}"
        print(f"PASS: Deleting non-existent template returns 404")


class TestWhatsAppLogs:
    """Test WhatsApp message logs endpoint"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get admin auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Admin login failed: {response.text}"
        data = response.json()
        return data.get("access_token") or data.get("token")
    
    def test_logs_returns_list(self, auth_token):
        """GET /api/admin/whatsapp/logs returns message log entries as list"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/whatsapp/logs", headers=headers)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert isinstance(data, list), "Response should be a list"
        print(f"PASS: Logs endpoint returns list with {len(data)} entries")
        
        # If there are logs, verify structure
        if len(data) > 0:
            log = data[0]
            print(f"  - Sample log keys: {list(log.keys())}")


class TestServiceWorker:
    """Test Service Worker v3 is accessible and configured correctly"""
    
    def test_sw_accessible(self):
        """GET /sw.js is accessible"""
        response = requests.get(f"{BASE_URL}/sw.js")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print(f"PASS: Service worker accessible at /sw.js")
    
    def test_sw_contains_v3_cache_names(self):
        """Service worker contains 'lexa-static-v3' and 'lexa-api-v1' cache names"""
        response = requests.get(f"{BASE_URL}/sw.js")
        content = response.text
        
        assert "lexa-static-v3" in content, "Missing 'lexa-static-v3' cache name"
        assert "lexa-api-v1" in content, "Missing 'lexa-api-v1' cache name"
        print(f"PASS: Service worker contains v3 cache names (lexa-static-v3, lexa-api-v1)")
    
    def test_sw_has_api_cache_patterns(self):
        """Service worker has API_CACHE_PATTERNS for /api/solutions, /api/projects, /api/articles"""
        response = requests.get(f"{BASE_URL}/sw.js")
        content = response.text
        
        assert "API_CACHE_PATTERNS" in content, "Missing API_CACHE_PATTERNS constant"
        assert "/api/solutions" in content, "Missing /api/solutions in cache patterns"
        assert "/api/projects" in content, "Missing /api/projects in cache patterns"
        assert "/api/articles" in content, "Missing /api/articles in cache patterns"
        print(f"PASS: Service worker has API_CACHE_PATTERNS with expected endpoints")
    
    def test_sw_never_cache_admin_and_auth(self):
        """Service worker NEVER_CACHE includes /api/admin and /api/auth patterns"""
        response = requests.get(f"{BASE_URL}/sw.js")
        content = response.text
        
        assert "NEVER_CACHE" in content, "Missing NEVER_CACHE constant"
        assert "/api/admin" in content, "Missing /api/admin in NEVER_CACHE"
        assert "/api/auth" in content, "Missing /api/auth in NEVER_CACHE"
        print(f"PASS: Service worker NEVER_CACHE includes /api/admin and /api/auth")
    
    def test_sw_has_image_svg_ico_patterns(self):
        """Service worker has .svg and .ico in cacheable patterns"""
        response = requests.get(f"{BASE_URL}/sw.js")
        content = response.text
        
        assert ".svg" in content, "Missing .svg in cache patterns"
        assert ".ico" in content, "Missing .ico in cache patterns"
        print(f"PASS: Service worker caches .svg and .ico files")
    
    def test_sw_has_clear_api_cache_support(self):
        """Service worker supports 'clearAPICache' message"""
        response = requests.get(f"{BASE_URL}/sw.js")
        content = response.text
        
        assert "clearAPICache" in content, "Missing clearAPICache message support"
        print(f"PASS: Service worker supports clearAPICache message")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
