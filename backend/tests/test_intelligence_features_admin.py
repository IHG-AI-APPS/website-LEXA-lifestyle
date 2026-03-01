"""
Intelligence Features Admin API Tests
Tests for the admin CRUD operations on intelligence features
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://micro-interactions-1.preview.emergentagent.com')

class TestIntelligenceFeaturesAdmin:
    """Test suite for Intelligence Features Admin API"""
    
    @pytest.fixture(scope="class")
    def admin_token(self):
        """Get admin authentication token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": "admin", "password": "lexa2026"}
        )
        assert response.status_code == 200, f"Admin login failed: {response.text}"
        return response.json().get("access_token")
    
    @pytest.fixture(scope="class")
    def auth_headers(self, admin_token):
        """Get authorization headers"""
        return {
            "Authorization": f"Bearer {admin_token}",
            "Content-Type": "application/json"
        }
    
    def test_admin_login(self):
        """Test admin login endpoint"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": "admin", "password": "lexa2026"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        print("SUCCESS: Admin login working")
    
    def test_get_intelligence_stats(self, auth_headers):
        """Test GET /api/intelligence/admin/stats"""
        response = requests.get(
            f"{BASE_URL}/api/intelligence/admin/stats",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify required fields
        assert "total_features" in data
        assert "featured_features" in data
        assert "total_categories" in data
        assert "total_sessions" in data
        assert "average_iq_score" in data
        
        # Verify data types
        assert isinstance(data["total_features"], int)
        assert isinstance(data["featured_features"], int)
        assert data["total_features"] >= 0
        
        print(f"SUCCESS: Stats endpoint - {data['total_features']} total features")
    
    def test_get_intelligence_features_list(self, auth_headers):
        """Test GET /api/intelligence/admin/features"""
        response = requests.get(
            f"{BASE_URL}/api/intelligence/admin/features",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "features" in data
        assert "total" in data
        assert isinstance(data["features"], list)
        
        # Verify feature structure if features exist
        if len(data["features"]) > 0:
            feature = data["features"][0]
            assert "id" in feature
            assert "title" in feature
            assert "slug" in feature
            assert "category" in feature
        
        print(f"SUCCESS: Features list - {len(data['features'])} features returned")
    
    def test_create_feature(self, auth_headers):
        """Test POST /api/intelligence/admin/features"""
        unique_slug = f"test-feature-{uuid.uuid4().hex[:8]}"
        
        feature_data = {
            "slug": unique_slug,
            "title": "TEST Automated Feature",
            "category": "scene_automation",
            "icon": "🧪",
            "short_description": "Test feature for automated testing",
            "detailed_description": "Full description for automated testing",
            "iq_points": 15,
            "scoring_category": "automation_coverage",
            "benefits": ["Test benefit 1", "Test benefit 2"],
            "required_devices": ["Test device"],
            "compatible_systems": ["Control4"],
            "lifestyle_tags": ["comfort", "convenience"],
            "is_premium": False,
            "featured": False,
            "display_order": 999
        }
        
        response = requests.post(
            f"{BASE_URL}/api/intelligence/admin/features",
            headers=auth_headers,
            json=feature_data
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["success"] == True
        assert "feature_id" in data
        assert data["message"] == "Feature created successfully"
        
        # Store feature_id for cleanup
        self.__class__.created_feature_id = data["feature_id"]
        print(f"SUCCESS: Feature created with ID: {data['feature_id']}")
    
    def test_toggle_featured(self, auth_headers):
        """Test PATCH /api/intelligence/admin/features/{id}/toggle-featured"""
        # Get first feature from list
        response = requests.get(
            f"{BASE_URL}/api/intelligence/admin/features",
            headers=auth_headers
        )
        features = response.json().get("features", [])
        assert len(features) > 0, "No features available to test toggle"
        
        feature_id = features[0]["id"]
        initial_featured = features[0].get("featured", False)
        
        # Toggle featured status
        response = requests.patch(
            f"{BASE_URL}/api/intelligence/admin/features/{feature_id}/toggle-featured",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["success"] == True
        assert "featured" in data
        assert data["featured"] != initial_featured
        
        # Toggle back to original state
        response = requests.patch(
            f"{BASE_URL}/api/intelligence/admin/features/{feature_id}/toggle-featured",
            headers=auth_headers
        )
        assert response.status_code == 200
        
        print(f"SUCCESS: Toggle featured working for feature {feature_id}")
    
    def test_delete_feature(self, auth_headers):
        """Test DELETE /api/intelligence/admin/features/{id}"""
        # Use the feature created in test_create_feature
        feature_id = getattr(self.__class__, 'created_feature_id', None)
        
        if not feature_id:
            # Create a feature to delete if none exists
            unique_slug = f"test-delete-{uuid.uuid4().hex[:8]}"
            create_response = requests.post(
                f"{BASE_URL}/api/intelligence/admin/features",
                headers=auth_headers,
                json={
                    "slug": unique_slug,
                    "title": "TEST Feature to Delete",
                    "category": "scene_automation",
                    "icon": "🗑️",
                    "short_description": "Feature to be deleted",
                    "detailed_description": "",
                    "iq_points": 5,
                    "scoring_category": "automation_coverage"
                }
            )
            feature_id = create_response.json().get("feature_id")
        
        # Delete the feature
        response = requests.delete(
            f"{BASE_URL}/api/intelligence/admin/features/{feature_id}",
            headers=auth_headers
        )
        assert response.status_code == 200
        data = response.json()
        
        assert data["success"] == True
        assert data["message"] == "Feature deleted successfully"
        
        # Verify deletion - should return 404
        verify_response = requests.delete(
            f"{BASE_URL}/api/intelligence/admin/features/{feature_id}",
            headers=auth_headers
        )
        assert verify_response.status_code == 404
        
        print(f"SUCCESS: Feature {feature_id} deleted successfully")
    
    def test_create_feature_duplicate_slug(self, auth_headers):
        """Test that duplicate slugs are rejected"""
        # Get an existing feature's slug
        response = requests.get(
            f"{BASE_URL}/api/intelligence/admin/features",
            headers=auth_headers
        )
        features = response.json().get("features", [])
        assert len(features) > 0
        
        existing_slug = features[0]["slug"]
        
        # Try to create feature with same slug
        response = requests.post(
            f"{BASE_URL}/api/intelligence/admin/features",
            headers=auth_headers,
            json={
                "slug": existing_slug,
                "title": "Duplicate Test",
                "category": "scene_automation",
                "icon": "❌",
                "short_description": "Should fail",
                "detailed_description": "",
                "iq_points": 5,
                "scoring_category": "automation_coverage"
            }
        )
        assert response.status_code == 400
        assert "already exists" in response.json().get("detail", "").lower()
        
        print("SUCCESS: Duplicate slug correctly rejected")
    
    def test_unauthorized_access(self):
        """Test that unauthorized requests are rejected"""
        response = requests.get(
            f"{BASE_URL}/api/intelligence/admin/features",
            headers={"Authorization": "Bearer invalid_token"}
        )
        assert response.status_code in [401, 403]
        print("SUCCESS: Unauthorized access correctly rejected")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
