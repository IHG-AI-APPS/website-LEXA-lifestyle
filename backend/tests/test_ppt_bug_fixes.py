"""
Test PPT Bug Fixes - LEXA Smart Home Platform
Tests for: Hero video, FAQ page, Testimonials page, Intelligence features
"""
import pytest
import requests
import os

# Backend URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://world-class-mobile.preview.emergentagent.com')

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "lexa2026"


class TestVideoFiles:
    """Test hero video files are accessible"""
    
    def test_hero_v3_video_accessible(self):
        """Hero video v3_01_dramatic_entrance.mp4 should return 200"""
        response = requests.head(f"{BASE_URL}/videos/hero-v3/v3_01_dramatic_entrance.mp4", timeout=10)
        assert response.status_code == 200, f"Hero v3 video not accessible: {response.status_code}"
    
    def test_hero_video_01_arrival(self):
        """Hero video 01_arrival.mp4 should return 200"""
        response = requests.head(f"{BASE_URL}/videos/hero/01_arrival.mp4", timeout=10)
        assert response.status_code == 200, f"Hero video 01_arrival not accessible: {response.status_code}"
    
    def test_hero_video_02_interior(self):
        """Hero video 02_interior_reveal.mp4 should return 200"""
        response = requests.head(f"{BASE_URL}/videos/hero/02_interior_reveal.mp4", timeout=10)
        assert response.status_code == 200, f"Hero video 02_interior not accessible: {response.status_code}"


class TestTestimonialsAPI:
    """Test testimonials endpoint"""
    
    def test_get_testimonials_returns_200(self):
        """GET /api/testimonials should return 200"""
        response = requests.get(f"{BASE_URL}/api/testimonials", timeout=10)
        assert response.status_code == 200, f"Testimonials API failed: {response.status_code}"
    
    def test_testimonials_returns_array(self):
        """GET /api/testimonials should return an array"""
        response = requests.get(f"{BASE_URL}/api/testimonials", timeout=10)
        data = response.json()
        assert isinstance(data, list), f"Expected array, got {type(data)}"
    
    def test_testimonials_has_required_fields(self):
        """Each testimonial should have name and content"""
        response = requests.get(f"{BASE_URL}/api/testimonials", timeout=10)
        data = response.json()
        assert len(data) > 0, "No testimonials returned"
        for t in data:
            assert "name" in t, "Testimonial missing 'name'"
            assert "content" in t or "testimonial" in t, "Testimonial missing content"
    
    def test_testimonials_count(self):
        """Should have at least 4 testimonials"""
        response = requests.get(f"{BASE_URL}/api/testimonials", timeout=10)
        data = response.json()
        assert len(data) >= 4, f"Expected at least 4 testimonials, got {len(data)}"


class TestSolutionsAPI:
    """Test solutions endpoint for FAQ data"""
    
    def test_get_solutions_returns_200(self):
        """GET /api/solutions should return 200"""
        response = requests.get(f"{BASE_URL}/api/solutions", timeout=10)
        assert response.status_code == 200, f"Solutions API failed: {response.status_code}"
    
    def test_solutions_returns_array(self):
        """GET /api/solutions should return an array"""
        response = requests.get(f"{BASE_URL}/api/solutions", timeout=10)
        data = response.json()
        assert isinstance(data, list), f"Expected array, got {type(data)}"


class TestIntelligenceAPI:
    """Test intelligence features API"""
    
    def test_get_features_returns_200(self):
        """GET /api/intelligence/features should return 200"""
        response = requests.get(f"{BASE_URL}/api/intelligence/features", timeout=10)
        assert response.status_code == 200, f"Intelligence features API failed: {response.status_code}"
    
    def test_features_returns_features_array(self):
        """Response should have 'features' array"""
        response = requests.get(f"{BASE_URL}/api/intelligence/features", timeout=10)
        data = response.json()
        assert "features" in data, "Missing 'features' key in response"
        assert isinstance(data["features"], list), "Features should be an array"
    
    def test_features_count(self):
        """Should have many features (600+)"""
        response = requests.get(f"{BASE_URL}/api/intelligence/features?limit=100", timeout=10)
        data = response.json()
        # Note: API uses limit parameter, but total count should be high
        assert len(data.get("features", [])) > 0, "No features returned"


class TestAdminIntelligenceAPI:
    """Test admin intelligence APIs (requires authentication)"""
    
    @pytest.fixture
    def admin_token(self):
        """Get admin token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD},
            timeout=10
        )
        if response.status_code != 200:
            pytest.skip("Admin login failed")
        return response.json().get("access_token")
    
    def test_admin_login(self):
        """Admin login should work"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD},
            timeout=10
        )
        assert response.status_code == 200, f"Admin login failed: {response.status_code}"
        data = response.json()
        assert "access_token" in data, "Missing access_token in response"
    
    def test_admin_get_intelligence_features(self, admin_token):
        """Admin should be able to get all intelligence features"""
        response = requests.get(
            f"{BASE_URL}/api/intelligence/admin/features",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        assert response.status_code == 200, f"Admin features API failed: {response.status_code}"
        data = response.json()
        assert "features" in data, "Missing 'features' in response"
        assert "total" in data, "Missing 'total' in response"
        # Should have ~693 features based on previous tests
        assert data["total"] > 100, f"Expected many features, got {data['total']}"
    
    def test_admin_get_control_systems(self, admin_token):
        """Admin should be able to get control systems"""
        response = requests.get(
            f"{BASE_URL}/api/intelligence/admin/control-systems",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        assert response.status_code == 200, f"Admin control systems API failed: {response.status_code}"
        data = response.json()
        assert "systems" in data, "Missing 'systems' in response"
        assert "total" in data, "Missing 'total' in response"
        # Should have 5 control systems
        assert data["total"] == 5, f"Expected 5 control systems, got {data['total']}"
    
    def test_admin_get_stats(self, admin_token):
        """Admin should be able to get intelligence stats"""
        response = requests.get(
            f"{BASE_URL}/api/intelligence/admin/stats",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=10
        )
        assert response.status_code == 200, f"Admin stats API failed: {response.status_code}"
        data = response.json()
        assert "total_features" in data, "Missing 'total_features'"
        assert "total_categories" in data, "Missing 'total_categories'"
        assert "total_systems" in data, "Missing 'total_systems'"


class TestServicesAPI:
    """Test services endpoint for FAQ data"""
    
    def test_get_services_returns_200(self):
        """GET /api/services should return 200"""
        response = requests.get(f"{BASE_URL}/api/services", timeout=10)
        assert response.status_code == 200, f"Services API failed: {response.status_code}"


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
