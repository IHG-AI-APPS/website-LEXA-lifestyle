"""
Test Static Pages to CMS Migration
Tests that 9 static pages were removed and their content is now served from the database.
- 4 resource articles (knx-vs-control4-luxury, architect-automation-guide, best-home-automation-uae, smart-home-cost-dubai-villas)
- 1 blog article (smart-home-guide-dubai-2025)
- 3 locations (palm-jumeirah, emirates-hills, downtown-dubai)
- 1 intelligence feature (staff-accountability)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestArticleEndpoints:
    """Test article API endpoints for migrated content"""
    
    def test_knx_vs_control4_article(self):
        """Test GET /api/articles/knx-vs-control4-luxury returns correct article"""
        response = requests.get(f"{BASE_URL}/api/articles/knx-vs-control4-luxury")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "title" in data
        assert "KNX" in data["title"] and "Control4" in data["title"], f"Title should contain KNX and Control4: {data['title']}"
        assert data["slug"] == "knx-vs-control4-luxury"
        assert "content" in data and len(data["content"]) > 100

    def test_architect_automation_guide_article(self):
        """Test GET /api/articles/architect-automation-guide returns correct article"""
        response = requests.get(f"{BASE_URL}/api/articles/architect-automation-guide")
        assert response.status_code == 200
        
        data = response.json()
        assert "Architect" in data["title"], f"Title should contain 'Architect': {data['title']}"
        assert data["slug"] == "architect-automation-guide"

    def test_best_home_automation_uae_article(self):
        """Test GET /api/articles/best-home-automation-uae returns correct article"""
        response = requests.get(f"{BASE_URL}/api/articles/best-home-automation-uae")
        assert response.status_code == 200
        
        data = response.json()
        assert "Best" in data["title"] or "Home" in data["title"], f"Title should contain 'Best' or 'Home': {data['title']}"
        assert data["slug"] == "best-home-automation-uae"

    def test_smart_home_cost_dubai_villas_article(self):
        """Test GET /api/articles/smart-home-cost-dubai-villas returns correct article"""
        response = requests.get(f"{BASE_URL}/api/articles/smart-home-cost-dubai-villas")
        assert response.status_code == 200
        
        data = response.json()
        assert "Cost" in data["title"], f"Title should contain 'Cost': {data['title']}"
        assert data["slug"] == "smart-home-cost-dubai-villas"

    def test_smart_home_guide_dubai_2025_article(self):
        """Test GET /api/articles/smart-home-guide-dubai-2025 returns correct article (for blog)"""
        response = requests.get(f"{BASE_URL}/api/articles/smart-home-guide-dubai-2025")
        assert response.status_code == 200
        
        data = response.json()
        assert "Guide" in data["title"] and "Dubai" in data["title"], f"Title should contain 'Guide' and 'Dubai': {data['title']}"
        assert data["slug"] == "smart-home-guide-dubai-2025"


class TestLocationEndpoints:
    """Test location API endpoints for migrated content"""
    
    def test_palm_jumeirah_location(self):
        """Test GET /api/locations/palm-jumeirah returns correct location"""
        response = requests.get(f"{BASE_URL}/api/locations/palm-jumeirah")
        assert response.status_code == 200
        
        data = response.json()
        assert "name" in data
        assert "Palm Jumeirah" in data["name"] or "palm" in data["name"].lower()
        assert data["slug"] == "palm-jumeirah"

    def test_emirates_hills_location(self):
        """Test GET /api/locations/emirates-hills returns correct location"""
        response = requests.get(f"{BASE_URL}/api/locations/emirates-hills")
        assert response.status_code == 200
        
        data = response.json()
        assert "Emirates Hills" in data["name"] or "emirates" in data["name"].lower()
        assert data["slug"] == "emirates-hills"

    def test_downtown_dubai_location(self):
        """Test GET /api/locations/downtown-dubai returns correct location"""
        response = requests.get(f"{BASE_URL}/api/locations/downtown-dubai")
        assert response.status_code == 200
        
        data = response.json()
        assert "Downtown" in data["name"] or "downtown" in data["name"].lower()
        assert data["slug"] == "downtown-dubai"


class TestIntelligenceFeature:
    """Test intelligence feature slug-based lookup"""
    
    def test_staff_accountability_feature_exists(self):
        """Test that staff-accountability feature exists in intelligence features"""
        response = requests.get(f"{BASE_URL}/api/intelligence/features?limit=200")
        assert response.status_code == 200
        
        data = response.json()
        features = data.get("features", [])
        
        # Find staff-accountability by slug
        found_feature = None
        for f in features:
            if f.get("slug") == "staff-accountability":
                found_feature = f
                break
        
        assert found_feature is not None, "staff-accountability feature not found by slug"
        assert "Staff" in found_feature["title"] and "Accountability" in found_feature["title"], f"Title should contain 'Staff' and 'Accountability': {found_feature['title']}"


class TestArticleResponseStructure:
    """Test that article responses have required fields"""
    
    @pytest.mark.parametrize("slug", [
        "knx-vs-control4-luxury",
        "architect-automation-guide",
        "best-home-automation-uae",
        "smart-home-cost-dubai-villas",
        "smart-home-guide-dubai-2025"
    ])
    def test_article_has_required_fields(self, slug):
        """Test each article has id, slug, title, content, category"""
        response = requests.get(f"{BASE_URL}/api/articles/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        required_fields = ["id", "slug", "title", "content", "category"]
        
        for field in required_fields:
            assert field in data, f"Missing required field '{field}' for article {slug}"


class TestLocationResponseStructure:
    """Test that location responses have required fields"""
    
    @pytest.mark.parametrize("slug", [
        "palm-jumeirah",
        "emirates-hills",
        "downtown-dubai"
    ])
    def test_location_has_required_fields(self, slug):
        """Test each location has required fields"""
        response = requests.get(f"{BASE_URL}/api/locations/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        required_fields = ["id", "slug", "name", "description"]
        
        for field in required_fields:
            assert field in data, f"Missing required field '{field}' for location {slug}"
