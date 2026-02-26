"""
Test Static to CMS Pages Migration - 9 new pages converted to CMS-driven content
Pages: careers, media, support, warranty, developer-toolkit, privacy-policy, terms, terms-of-service, privacy
Each page uses useCms hook to pull content from MongoDB settings collection with hardcoded fallbacks.
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestStaticToCmsPagesAPI:
    """Test CMS API endpoints for 9 converted static pages"""
    
    def test_cms_api_page_careers(self):
        """Test /api/cms/sections/page_careers returns career content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_careers")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert 'key' in data, "Response should have 'key'"
        assert data['key'] == 'page_careers'
        # May or may not have value yet (uses fallback if null)
        print(f"page_careers API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")
    
    def test_cms_api_page_media(self):
        """Test /api/cms/sections/page_media returns media gallery content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_media")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'key' in data
        assert data['key'] == 'page_media'
        print(f"page_media API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")
    
    def test_cms_api_page_support(self):
        """Test /api/cms/sections/page_support returns 24/7 support content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_support")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'key' in data
        assert data['key'] == 'page_support'
        print(f"page_support API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")
    
    def test_cms_api_page_warranty(self):
        """Test /api/cms/sections/page_warranty returns warranty content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_warranty")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'key' in data
        assert data['key'] == 'page_warranty'
        print(f"page_warranty API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")
    
    def test_cms_api_page_developer_toolkit(self):
        """Test /api/cms/sections/page_developer_toolkit returns toolkit content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_developer_toolkit")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'key' in data
        assert data['key'] == 'page_developer_toolkit'
        print(f"page_developer_toolkit API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")
    
    def test_cms_api_page_privacy_policy(self):
        """Test /api/cms/sections/page_privacy_policy returns privacy policy content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_privacy_policy")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'key' in data
        assert data['key'] == 'page_privacy_policy'
        print(f"page_privacy_policy API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")
    
    def test_cms_api_page_terms(self):
        """Test /api/cms/sections/page_terms returns terms content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_terms")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'key' in data
        assert data['key'] == 'page_terms'
        print(f"page_terms API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")
    
    def test_cms_api_page_terms_of_service(self):
        """Test /api/cms/sections/page_terms_of_service returns TOS content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_terms_of_service")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'key' in data
        assert data['key'] == 'page_terms_of_service'
        print(f"page_terms_of_service API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")
    
    def test_cms_api_page_privacy(self):
        """Test /api/cms/sections/page_privacy returns short privacy content"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_privacy")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert 'key' in data
        assert data['key'] == 'page_privacy'
        print(f"page_privacy API: PASS - key={data.get('key')}, has_value={'value' in data and data['value'] is not None}")


class TestCmsUpdateEndpoint:
    """Test CMS update capability for page content"""
    
    def test_cms_update_endpoint_exists(self):
        """Verify PUT /api/cms/sections/{key} endpoint is accessible"""
        # First, get current data
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_careers")
        assert response.status_code == 200
        
        # Try update (may require auth)
        update_data = {"hero_title": "Join Our Team - Updated Test"}
        response = requests.put(
            f"{BASE_URL}/api/cms/sections/page_careers",
            json={"value": update_data}
        )
        # Should be either 200 (success) or 401/403 (auth required) - not 404/500
        assert response.status_code in [200, 401, 403], f"Expected 200/401/403, got {response.status_code}: {response.text}"
        print(f"CMS Update endpoint: {'PASS (updated)' if response.status_code == 200 else 'AUTH REQUIRED'}")


class TestBulkCmsEndpoint:
    """Test bulk CMS fetch for multiple page keys"""
    
    def test_bulk_cms_sections(self):
        """Test GET /api/cms/sections?keys=... returns multiple sections"""
        keys = "page_careers,page_media,page_support,page_warranty"
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # Should return dict with keys
        assert isinstance(data, dict), "Bulk response should be dict"
        print(f"Bulk CMS endpoint: PASS - returned {len(data)} keys")


class TestRegisterDefaultsEndpoint:
    """Test CMS register defaults endpoint (for auto-seeding)"""
    
    def test_register_defaults_endpoint(self):
        """Test POST /api/cms/register-defaults creates if not exists"""
        test_defaults = {
            "key": "page_careers",
            "defaults": {
                "hero_title": "Join Our Team",
                "hero_description": "Test description"
            }
        }
        response = requests.post(
            f"{BASE_URL}/api/cms/register-defaults",
            json=test_defaults
        )
        # Should return 200 with {created: bool}
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert 'created' in data or 'exists' in data or isinstance(data.get('created'), bool), \
            f"Response should have 'created' field: {data}"
        print(f"Register defaults: PASS - created={data.get('created', 'already exists')}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
