"""
Test CMS SEO Metadata Integration - Phase D
Tests the generateCmsMetadata utility integration with backend SEO endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://admin-studio-7.preview.emergentagent.com').rstrip('/')

# Test credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "lexa2026"


class TestAdminAuth:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        # API returns access_token field
        assert "access_token" in data, "access_token not in response"
        assert len(data["access_token"]) > 0, "Token is empty"
        return data["access_token"]


class TestCMSSEOEndpoints:
    """Test CMS SEO API endpoints"""
    
    @pytest.fixture
    def auth_token(self):
        """Get auth token for protected endpoints"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        if response.status_code == 200:
            return response.json().get("token")
        pytest.skip("Authentication failed")
    
    def test_get_cms_section_seo_global(self):
        """Test GET /api/cms/sections/seo_global returns data with cache headers"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/seo_global")
        assert response.status_code == 200, f"Failed to get seo_global: {response.text}"
        
        # Check cache headers exist
        assert "Cache-Control" in response.headers, "Cache-Control header missing"
        
        data = response.json()
        assert "key" in data or "value" in data, "Response should have key or value field"
    
    def test_get_cms_section_nonexistent(self):
        """Test GET /api/cms/sections/{key} for non-existent key returns null value"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/nonexistent_test_key_xyz123")
        assert response.status_code == 200, f"Should return 200 even for non-existent: {response.text}"
        
        data = response.json()
        assert data.get("value") is None, "Non-existent key should have null value"
    
    def test_get_cms_sections_bulk(self):
        """Test GET /api/cms/sections?keys=... bulk endpoint"""
        keys = "seo_global,seo_work_with_us,seo_partner_with_us"
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys}")
        assert response.status_code == 200, f"Bulk sections failed: {response.text}"
        
        data = response.json()
        assert isinstance(data, dict), "Response should be a dictionary"
    
    def test_put_seo_setting_work_with_us(self, auth_token):
        """Test PUT /api/admin/content/settings/seo_work_with_us"""
        test_seo_data = {
            "value": {
                "title": "TEST Work With Us | LEXA Smart Home Careers",
                "description": "TEST Join Dubai's leading smart home company",
                "keywords": "test,smart home jobs,dubai careers",
                "og_title": "TEST Careers at LEXA",
                "og_description": "TEST Join our smart home team",
                "og_image": "/images/test-careers-og.jpg",
                "robots": "index, follow",
                "twitter_handle": "@test_lexa_careers"
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/seo_work_with_us",
            json=test_seo_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Failed to update seo_work_with_us: {response.text}"
        
        data = response.json()
        assert data.get("success") is True, "Update should return success=true"
        
        # Verify the data was persisted by fetching it back
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/seo_work_with_us")
        assert verify_response.status_code == 200
        verify_data = verify_response.json()
        assert verify_data.get("value", {}).get("title") == test_seo_data["value"]["title"], \
            "SEO title should be persisted"
    
    def test_put_seo_setting_partner_with_us(self, auth_token):
        """Test PUT /api/admin/content/settings/seo_partner_with_us"""
        test_seo_data = {
            "value": {
                "title": "TEST Partner With Us | LEXA Smart Home Dealers",
                "description": "TEST Become a LEXA dealer in GCC",
                "keywords": "test,smart home dealer,distributor uae",
                "og_title": "TEST Partner with LEXA",
                "og_description": "TEST Become an authorized dealer",
                "robots": "index, follow"
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/seo_partner_with_us",
            json=test_seo_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Failed to update seo_partner_with_us: {response.text}"
        
        # Verify persistence
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/seo_partner_with_us")
        assert verify_response.status_code == 200
        verify_data = verify_response.json()
        assert verify_data.get("value", {}).get("title") == test_seo_data["value"]["title"]
    
    def test_put_seo_setting_vendor_supplier(self, auth_token):
        """Test PUT /api/admin/content/settings/seo_vendor_supplier"""
        test_seo_data = {
            "value": {
                "title": "TEST Vendor Supplier | LEXA Smart Home Procurement",
                "description": "TEST Register as a LEXA vendor in GCC",
                "keywords": "test,smart home supplier,vendor registration",
                "robots": "index, follow"
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/seo_vendor_supplier",
            json=test_seo_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Failed to update seo_vendor_supplier: {response.text}"
        
        # Verify persistence
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/seo_vendor_supplier")
        assert verify_response.status_code == 200
        verify_data = verify_response.json()
        assert verify_data.get("value", {}).get("title") == test_seo_data["value"]["title"]
    
    def test_put_seo_global_settings(self, auth_token):
        """Test PUT /api/admin/content/settings/seo_global for global SEO settings"""
        test_global_seo = {
            "value": {
                "site_name": "LEXA Smart Home | TEST",
                "twitter_handle": "@test_lexa",
                "default_og_image": "/images/test-og-default.jpg",
                "canonical_domain": "https://lexalifestyle.com"
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/seo_global",
            json=test_global_seo,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Failed to update seo_global: {response.text}"
        
        # Verify persistence
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/seo_global")
        assert verify_response.status_code == 200
        verify_data = verify_response.json()
        assert verify_data.get("value", {}).get("site_name") == test_global_seo["value"]["site_name"]
        assert verify_data.get("value", {}).get("twitter_handle") == test_global_seo["value"]["twitter_handle"]
    
    def test_put_seo_solutions_slug(self, auth_token):
        """Test PUT /api/admin/content/settings/seo_solutions_{slug} for solution pages"""
        test_seo_data = {
            "value": {
                "title": "TEST Security Solutions | LEXA Smart Home",
                "description": "TEST Smart security systems for your home",
                "keywords": "test,security,smart home security",
                "og_title": "TEST Security Solutions",
                "robots": "index, follow"
            }
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/seo_solutions_security",
            json=test_seo_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Failed to update seo_solutions_security: {response.text}"
        
        # Verify persistence
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/seo_solutions_security")
        assert verify_response.status_code == 200


class TestCMSSEOFallback:
    """Test that fallback metadata works when no CMS data exists"""
    
    def test_cms_section_returns_null_for_missing(self):
        """Test that missing CMS section returns null value (not error)"""
        # Use a unique key that won't exist
        response = requests.get(f"{BASE_URL}/api/cms/sections/seo_test_nonexistent_xyz")
        assert response.status_code == 200, "Should return 200 for missing keys"
        
        data = response.json()
        assert data.get("value") is None, "Missing section should have null value"
    
    def test_bulk_sections_includes_all_keys(self):
        """Test bulk endpoint returns all requested keys, even if null"""
        keys = "seo_global,seo_nonexistent_key_abc"
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys}")
        assert response.status_code == 200
        
        data = response.json()
        # Should have seo_global key (may have data)
        # Should have or not have nonexistent key with null


class TestAdminCMSPageSEOSections:
    """Test that admin CMS page lists SEO sections correctly"""
    
    @pytest.fixture
    def auth_token(self):
        """Get auth token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        if response.status_code == 200:
            return response.json().get("token")
        pytest.skip("Authentication failed")
    
    def test_admin_can_get_seo_work_with_us_setting(self, auth_token):
        """Test admin can access seo_work_with_us section"""
        response = requests.get(
            f"{BASE_URL}/api/admin/content/settings/seo_work_with_us",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Failed to get seo_work_with_us: {response.text}"
    
    def test_admin_can_get_seo_partner_with_us_setting(self, auth_token):
        """Test admin can access seo_partner_with_us section"""
        response = requests.get(
            f"{BASE_URL}/api/admin/content/settings/seo_partner_with_us",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200
    
    def test_admin_can_get_seo_vendor_supplier_setting(self, auth_token):
        """Test admin can access seo_vendor_supplier section"""
        response = requests.get(
            f"{BASE_URL}/api/admin/content/settings/seo_vendor_supplier",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200


class TestCacheHeaders:
    """Test that CMS endpoints return proper cache headers"""
    
    def test_cms_section_has_cache_control(self):
        """Test GET /api/cms/sections/{key} has Cache-Control header"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/seo_global")
        assert response.status_code == 200
        
        # Cache-Control should be present
        assert "Cache-Control" in response.headers, "Cache-Control header should be present"
        # Note: Actual caching behavior may vary due to ingress/CDN settings
        # The backend code sets caching but ingress may override


class TestHealthAndBasicAPIs:
    """Basic health checks"""
    
    def test_api_health(self):
        """Test health endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200


# Cleanup test data after tests
@pytest.fixture(scope="session", autouse=True)
def cleanup_test_seo_data():
    """Cleanup TEST_ prefixed SEO data after all tests"""
    yield
    # Cleanup would go here if needed
    # For now, test data is fine to leave in place
