"""
CMS API Tests - Testing all CMS endpoints for the Content Management System
Covers:
- Public CMS section endpoints (GET)
- Bulk CMS section retrieval (GET)
- Admin CMS section update (PUT)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://sunday-hours-update.preview.emergentagent.com').rstrip('/')

# CMS Section keys to test
CMS_SECTIONS = [
    'homepage_hero',
    'homepage_experience_cta',
    'homepage_calculator_cards',
    'homepage_trusted_uae',
    'careers_positions'
]


class TestPublicCMSEndpoints:
    """Test public CMS section retrieval endpoints"""
    
    def test_get_homepage_hero_section(self):
        """Test GET /api/cms/sections/homepage_hero returns seeded data"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_hero")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "key" in data, "Response should contain 'key'"
        assert data["key"] == "homepage_hero"
        assert "value" in data, "Response should contain 'value'"
        
        value = data["value"]
        assert "video_clips" in value, "homepage_hero should have video_clips"
        assert "heading_en" in value, "homepage_hero should have heading_en"
        assert "heading_ar" in value, "homepage_hero should have heading_ar"
        assert "cta_primary_text_en" in value, "homepage_hero should have cta_primary_text_en"
        assert len(value["video_clips"]) > 0, "video_clips should not be empty"
        
    def test_get_experience_cta_section(self):
        """Test GET /api/cms/sections/homepage_experience_cta returns seeded data"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_experience_cta")
        assert response.status_code == 200
        
        data = response.json()
        assert data["key"] == "homepage_experience_cta"
        
        value = data["value"]
        assert "gallery_images" in value, "Should have gallery_images"
        assert "highlights" in value, "Should have highlights"
        assert "time_slots" in value, "Should have time_slots"
        assert "address" in value, "Should have address"
        assert len(value["gallery_images"]) > 0, "gallery_images should not be empty"
        
    def test_get_calculator_cards_section(self):
        """Test GET /api/cms/sections/homepage_calculator_cards returns seeded data"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_calculator_cards")
        assert response.status_code == 200
        
        data = response.json()
        assert data["key"] == "homepage_calculator_cards"
        
        value = data["value"]
        assert "featured_tool" in value, "Should have featured_tool"
        assert "tools" in value, "Should have tools array"
        assert len(value["tools"]) > 0, "tools should not be empty"
        
    def test_get_trusted_uae_section(self):
        """Test GET /api/cms/sections/homepage_trusted_uae returns seeded data"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_trusted_uae")
        assert response.status_code == 200
        
        data = response.json()
        assert data["key"] == "homepage_trusted_uae"
        
        value = data["value"]
        assert "technology_partners" in value, "Should have technology_partners"
        assert "trusted_by" in value, "Should have trusted_by"
        assert "certifications" in value, "Should have certifications"
        assert "stats" in value, "Should have stats"
        
    def test_get_careers_positions_section(self):
        """Test GET /api/cms/sections/careers_positions returns seeded data"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/careers_positions")
        assert response.status_code == 200
        
        data = response.json()
        assert data["key"] == "careers_positions"
        
        value = data["value"]
        assert "heading_en" in value, "Should have heading_en"
        assert "positions" in value, "Should have positions array"
        assert len(value["positions"]) > 0, "positions should not be empty"
        
        # Verify position structure
        position = value["positions"][0]
        assert "title" in position, "Position should have title"
        assert "department" in position, "Position should have department"
        assert "location" in position, "Position should have location"
        
    def test_get_nonexistent_section(self):
        """Test GET /api/cms/sections/{key} for non-existent key returns null value"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/nonexistent_section")
        assert response.status_code == 200
        
        data = response.json()
        assert data["key"] == "nonexistent_section"
        assert data["value"] is None, "Non-existent section should return null value"


class TestBulkCMSEndpoints:
    """Test bulk CMS section retrieval"""
    
    def test_get_bulk_cms_sections(self):
        """Test GET /api/cms/sections?keys=... returns multiple sections"""
        keys = "homepage_hero,careers_positions"
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys}")
        assert response.status_code == 200
        
        data = response.json()
        assert "homepage_hero" in data, "Should contain homepage_hero"
        assert "careers_positions" in data, "Should contain careers_positions"
        
        # Verify homepage_hero data
        hero = data["homepage_hero"]
        assert "video_clips" in hero, "homepage_hero should have video_clips"
        
        # Verify careers_positions data
        careers = data["careers_positions"]
        assert "positions" in careers, "careers_positions should have positions"
        
    def test_get_all_cms_sections_bulk(self):
        """Test bulk retrieval of all 5 CMS sections"""
        keys = ",".join(CMS_SECTIONS)
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys}")
        assert response.status_code == 200
        
        data = response.json()
        for section_key in CMS_SECTIONS:
            assert section_key in data, f"Should contain {section_key}"
            assert data[section_key] is not None, f"{section_key} should not be null"
            
    def test_get_bulk_with_empty_keys(self):
        """Test GET /api/cms/sections?keys= returns empty object"""
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys=")
        assert response.status_code == 200
        
        data = response.json()
        assert data == {}, "Empty keys should return empty object"


class TestAdminCMSEndpoints:
    """Test admin CMS section update endpoints (requires authentication)"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin authentication token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": "admin", "password": "lexa2026"}
        )
        if response.status_code == 200:
            data = response.json()
            return data.get("access_token") or data.get("token")
        pytest.skip("Admin login failed")
        
    def test_admin_login(self):
        """Test admin login works"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": "admin", "password": "lexa2026"}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        
        data = response.json()
        assert "access_token" in data or "token" in data, "Should return access token"
        
    def test_admin_update_cms_section(self, admin_token):
        """Test PUT /api/admin/content/settings/{key} updates CMS section"""
        test_key = "homepage_hero"
        
        # First, get current data
        get_response = requests.get(f"{BASE_URL}/api/cms/sections/{test_key}")
        assert get_response.status_code == 200
        original_data = get_response.json()["value"]
        
        # Modify heading_en for test
        test_heading = f"TEST_HEADING_{os.urandom(4).hex()}"
        updated_data = {**original_data, "heading_en": test_heading}
        
        # Update via admin endpoint
        update_response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/{test_key}",
            json={"value": updated_data},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert update_response.status_code == 200, f"Update failed: {update_response.text}"
        
        # Verify update persisted
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/{test_key}")
        assert verify_response.status_code == 200
        verify_data = verify_response.json()["value"]
        assert verify_data["heading_en"] == test_heading, "Update should persist"
        
        # Restore original data
        restore_response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/{test_key}",
            json={"value": original_data},
            headers={"Authorization": f"Bearer {admin_token}"}
        )
        assert restore_response.status_code == 200, "Restore should succeed"
        
    def test_admin_update_without_auth(self):
        """Test PUT without auth token returns 401/403"""
        response = requests.put(
            f"{BASE_URL}/api/admin/content/settings/homepage_hero",
            json={"value": {"test": "data"}}
        )
        assert response.status_code in [401, 403], "Should reject unauthorized request"


class TestCMSDataIntegrity:
    """Test CMS data structure integrity for frontend consumption"""
    
    def test_homepage_hero_structure_for_herocurator(self):
        """Verify homepage_hero structure matches HeroCurator.tsx expectations"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_hero")
        data = response.json()["value"]
        
        # HeroCurator.tsx expects these fields
        assert isinstance(data.get("video_clips"), list), "video_clips should be list"
        assert isinstance(data.get("heading_en"), str), "heading_en should be string"
        assert isinstance(data.get("heading_ar"), str), "heading_ar should be string"
        assert isinstance(data.get("subheading_en"), str), "subheading_en should be string"
        assert isinstance(data.get("cta_primary_text_en"), str), "cta_primary_text_en should be string"
        
    def test_experience_cta_structure(self):
        """Verify homepage_experience_cta structure matches ExperienceCentreCTA.tsx"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_experience_cta")
        data = response.json()["value"]
        
        # ExperienceCentreCTA.tsx expects these fields
        assert isinstance(data.get("gallery_images"), list), "gallery_images should be list"
        assert isinstance(data.get("highlights"), list), "highlights should be list"
        assert isinstance(data.get("time_slots"), list), "time_slots should be list"
        assert isinstance(data.get("address"), str), "address should be string"
        
        # Verify gallery image structure
        if data["gallery_images"]:
            img = data["gallery_images"][0]
            assert "src" in img, "Gallery image should have src"
            assert "title" in img, "Gallery image should have title"
            
    def test_calculator_cards_structure(self):
        """Verify homepage_calculator_cards structure matches CalculatorCardsSection.tsx"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_calculator_cards")
        data = response.json()["value"]
        
        assert "featured_tool" in data, "Should have featured_tool"
        assert "tools" in data, "Should have tools"
        
        featured = data["featured_tool"]
        assert "title" in featured, "featured_tool should have title"
        assert "description" in featured, "featured_tool should have description"
        assert "href" in featured, "featured_tool should have href"
        
    def test_trusted_uae_structure(self):
        """Verify homepage_trusted_uae structure matches TrustedInUAE.tsx"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/homepage_trusted_uae")
        data = response.json()["value"]
        
        assert isinstance(data.get("technology_partners"), list), "technology_partners should be list"
        assert isinstance(data.get("trusted_by"), list), "trusted_by should be list"
        assert isinstance(data.get("certifications"), list), "certifications should be list"
        assert isinstance(data.get("stats"), list), "stats should be list"
        
    def test_careers_positions_structure(self):
        """Verify careers_positions structure matches work-with-us page"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/careers_positions")
        data = response.json()["value"]
        
        assert "positions" in data, "Should have positions"
        assert isinstance(data["positions"], list), "positions should be list"
        
        if data["positions"]:
            pos = data["positions"][0]
            assert "title" in pos, "Position should have title"
            assert "department" in pos, "Position should have department"
            assert "description" in pos, "Position should have description"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
