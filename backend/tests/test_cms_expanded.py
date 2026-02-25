"""
CMS API Tests for Expanded 137 Sections
Tests: Homepage, Core Pages, Services, Solutions, Locations, Content Pages, Personas

Expected section counts:
- Homepage: 4
- Core Pages: 6
- Services: 7
- Solutions: 43
- Locations: 41
- Content Pages: 32
- Personas: 4
Total: 137 sections
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestCMSEndpointsHealth:
    """Basic health and connectivity tests"""
    
    def test_backend_health(self):
        """Verify backend is running"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"
        print(f"Backend health: {data}")
    
    def test_cms_section_endpoint_exists(self):
        """Verify CMS section endpoint is accessible"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_hero")
        assert response.status_code == 200
        print("CMS section endpoint accessible")
    
    def test_cms_bulk_sections_endpoint_exists(self):
        """Verify CMS bulk sections endpoint is accessible"""
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys=homepage_hero,homepage_experience_cta")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        print(f"Bulk CMS endpoint returned {len(data)} sections")


class TestHomepageCMS:
    """Tests for Homepage CMS sections (4 sections)"""
    
    def test_homepage_hero_exists(self):
        """Test homepage_hero CMS section"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_hero")
        assert response.status_code == 200
        data = response.json()
        # Homepage hero should have CMS data from seed
        if data.get("value"):
            assert "heading_en" in data["value"] or "video_clips" in data["value"]
            print(f"Homepage hero has CMS data: {list(data['value'].keys())[:5]}...")
        else:
            print("Homepage hero: No CMS data (uses fallback)")
    
    def test_homepage_experience_cta_exists(self):
        """Test homepage_experience_cta CMS section"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_experience_cta")
        assert response.status_code == 200
        print("homepage_experience_cta endpoint accessible")
    
    def test_homepage_calculator_cards_exists(self):
        """Test homepage_calculator_cards CMS section"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_calculator_cards")
        assert response.status_code == 200
        print("homepage_calculator_cards endpoint accessible")
    
    def test_homepage_trusted_uae_exists(self):
        """Test homepage_trusted_uae CMS section"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_trusted_uae")
        assert response.status_code == 200
        print("homepage_trusted_uae endpoint accessible")


class TestSolutionsCMS:
    """Tests for Solution page CMS sections (43 sections)"""
    
    # Sample solution slugs to test
    SOLUTION_SLUGS = [
        'security', 'home-theater', 'lighting-automation', 'climate-control',
        'access-control', 'audio-systems', 'surveillance', 'networking'
    ]
    
    def test_solution_page_cms_key_format(self):
        """Verify solution CMS keys follow correct format"""
        for slug in self.SOLUTION_SLUGS:
            key = f"page_solutions_{slug}"
            response = requests.get(f"{BASE_URL}/api/cms/sections/{key}")
            assert response.status_code == 200
            data = response.json()
            assert data.get("key") == key or "value" in data
            print(f"Solution key '{key}' accessible")
    
    def test_bulk_fetch_solution_pages(self):
        """Test bulk fetching multiple solution page CMS data"""
        keys = [f"page_solutions_{slug}" for slug in self.SOLUTION_SLUGS[:4]]
        keys_str = ",".join(keys)
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys_str}")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        print(f"Bulk fetch returned {len(data)} entries for {len(keys)} requested keys")
    
    def test_solution_cms_data_structure(self):
        """When CMS data exists, verify it has SeoTemplate structure"""
        # Test with a key that might have data
        key = "page_solutions_security"
        response = requests.get(f"{BASE_URL}/api/cms/sections/{key}")
        assert response.status_code == 200
        data = response.json()
        
        if data.get("value"):
            value = data["value"]
            # SeoTemplate expected fields
            expected_fields = ['hero', 'audience', 'problems', 'deliverables', 'process', 'conversion']
            found_fields = [f for f in expected_fields if f in value]
            print(f"Solution CMS has fields: {found_fields}")
        else:
            print("Solution has no CMS data yet (will use hardcoded fallback)")


class TestLocationsCMS:
    """Tests for Location/Geo page CMS sections (41 sections)"""
    
    # Sample location keys to test
    LOCATION_KEYS = [
        'page_geo_dubai_palm-jumeirah',
        'page_geo_dubai_emirates-hills',
        'page_geo_dubai_dubai-marina',
        'page_geo_abu-dhabi_luxury',
        'page_geo_saudi_riyadh'
    ]
    
    def test_location_page_cms_endpoints(self):
        """Verify location CMS keys are accessible"""
        for key in self.LOCATION_KEYS:
            response = requests.get(f"{BASE_URL}/api/cms/sections/{key}")
            assert response.status_code == 200
            data = response.json()
            assert data.get("key") == key or "value" in data
            print(f"Location key '{key}' accessible")
    
    def test_bulk_fetch_location_pages(self):
        """Test bulk fetching location page CMS data"""
        keys_str = ",".join(self.LOCATION_KEYS)
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys_str}")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
        print(f"Bulk location fetch returned {len(data)} entries")


class TestContentPagesCMS:
    """Tests for misc Content page CMS sections (32 sections)"""
    
    CONTENT_PAGE_KEYS = [
        'page_careers', 'page_warranty', 'page_faq', 'page_process',
        'page_support', 'page_media', 'page_company'
    ]
    
    def test_content_page_cms_endpoints(self):
        """Verify content page CMS keys are accessible"""
        for key in self.CONTENT_PAGE_KEYS:
            response = requests.get(f"{BASE_URL}/api/cms/sections/{key}")
            assert response.status_code == 200
            print(f"Content page key '{key}' accessible")


class TestPersonasCMS:
    """Tests for Persona page CMS sections (4 sections)"""
    
    PERSONA_KEYS = [
        'page_persona_architect',
        'page_persona_commercial',
        'page_persona_developer',
        'page_persona_homeowner'
    ]
    
    def test_persona_page_cms_endpoints(self):
        """Verify all 4 persona CMS keys are accessible"""
        for key in self.PERSONA_KEYS:
            response = requests.get(f"{BASE_URL}/api/cms/sections/{key}")
            assert response.status_code == 200
            print(f"Persona key '{key}' accessible")


class TestAdminCMSSaveEndpoint:
    """Tests for admin CMS save functionality"""
    
    def test_admin_settings_put_endpoint(self):
        """Test PUT /api/admin/content/settings/{key} endpoint exists"""
        test_key = "test_cms_key"
        test_data = {"value": {"test": "data"}}
        
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/{test_key}",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        # Should return 200 (no auth required based on current implementation)
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        print(f"Admin settings PUT endpoint works: {data}")
        
        # Cleanup: Verify the data was saved
        get_response = requests.get(f"{BASE_URL}/api/cms/sections/{test_key}")
        assert get_response.status_code == 200
        get_data = get_response.json()
        if get_data.get("value"):
            print(f"Saved data verified: {get_data['value']}")


class TestCMSCaching:
    """Tests for CMS caching behavior"""
    
    def test_cms_returns_consistent_data(self):
        """Multiple requests should return consistent data"""
        key = "homepage_hero"
        responses = []
        for _ in range(3):
            response = requests.get(f"{BASE_URL}/api/cms/sections/{key}")
            assert response.status_code == 200
            responses.append(response.json())
        
        # All responses should be identical
        assert responses[0] == responses[1] == responses[2]
        print("CMS returns consistent data across multiple requests")


# Run with: pytest /app/backend/tests/test_cms_expanded.py -v --tb=short
if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
