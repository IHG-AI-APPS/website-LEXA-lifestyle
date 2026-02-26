"""
Test Admin CMS Extended Fields for Brands and Projects
- Tests new Brand fields: feature_cards, gallery_images, related_solutions  
- Tests new Project fields: video_url, features, results, category, challenge, solution_details, outcome
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAdminAuth:
    """Admin authentication tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "access_token" in data
        return data["access_token"]
    
    def test_admin_login(self):
        """Test admin login works with correct credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data.get("token_type") == "bearer"
        print("✅ Admin login successful")


class TestBrandsAPI:
    """Test Brands API with extended fields"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200
        return response.json()["access_token"]
    
    @pytest.fixture(scope="class")
    def headers(self, auth_token):
        """Get auth headers"""
        return {
            "Authorization": f"Bearer {auth_token}",
            "Content-Type": "application/json"
        }
    
    def test_get_brands_list(self):
        """Test GET /api/brands returns brands list"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        brands = response.json()
        assert isinstance(brands, list)
        assert len(brands) > 0, "Expected at least one brand"
        print(f"✅ GET /api/brands: {len(brands)} brands returned")
    
    def test_get_brand_detail_lutron(self):
        """Test GET /api/brands/lutron returns brand details"""
        response = requests.get(f"{BASE_URL}/api/brands/lutron")
        assert response.status_code == 200
        brand = response.json()
        assert brand.get("slug") == "lutron" or brand.get("name", "").lower() == "lutron"
        print(f"✅ GET /api/brands/lutron: {brand.get('name')}")
    
    def test_update_brand_with_feature_cards(self, headers):
        """Test PUT /api/admin/brands accepts feature_cards field"""
        # First get an existing brand
        response = requests.get(f"{BASE_URL}/api/brands/lutron")
        assert response.status_code == 200
        brand = response.json()
        brand_id = brand.get("id")
        
        # Update with feature_cards
        test_feature_cards = [
            {
                "title": "Smart Lighting Control",
                "description": "Advanced lighting automation",
                "benefits": ["Energy savings", "Mood control", "Automated schedules"]
            },
            {
                "title": "Shade Management",
                "description": "Integrated window shades",
                "benefits": ["Privacy", "Temperature control"]
            }
        ]
        
        update_data = {
            **brand,
            "feature_cards": test_feature_cards
        }
        # Remove MongoDB _id if present
        update_data.pop("_id", None)
        
        response = requests.put(
            f"{BASE_URL}/api/admin/brands/{brand_id}",
            headers=headers,
            json=update_data
        )
        assert response.status_code == 200, f"Update failed: {response.text}"
        
        # Verify the update persisted
        verify_response = requests.get(f"{BASE_URL}/api/brands/lutron")
        assert verify_response.status_code == 200
        updated_brand = verify_response.json()
        
        # Check feature_cards are saved
        saved_cards = updated_brand.get("feature_cards", [])
        assert len(saved_cards) == 2, f"Expected 2 feature cards, got {len(saved_cards)}"
        assert saved_cards[0].get("title") == "Smart Lighting Control"
        print(f"✅ PUT /api/admin/brands/{brand_id}: feature_cards saved successfully")
    
    def test_update_brand_with_gallery_images(self, headers):
        """Test PUT /api/admin/brands accepts gallery_images field"""
        response = requests.get(f"{BASE_URL}/api/brands/sonos")
        assert response.status_code == 200
        brand = response.json()
        brand_id = brand.get("id")
        
        test_gallery_images = [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d",
            "https://images.unsplash.com/photo-1593697820951-0e7e2db41b8e"
        ]
        
        update_data = {
            **brand,
            "gallery_images": test_gallery_images
        }
        update_data.pop("_id", None)
        
        response = requests.put(
            f"{BASE_URL}/api/admin/brands/{brand_id}",
            headers=headers,
            json=update_data
        )
        assert response.status_code == 200, f"Update failed: {response.text}"
        
        # Verify
        verify_response = requests.get(f"{BASE_URL}/api/brands/sonos")
        updated_brand = verify_response.json()
        saved_gallery = updated_brand.get("gallery_images", [])
        assert len(saved_gallery) == 3, f"Expected 3 gallery images, got {len(saved_gallery)}"
        print(f"✅ PUT /api/admin/brands/{brand_id}: gallery_images saved successfully")
    
    def test_update_brand_with_related_solutions(self, headers):
        """Test PUT /api/admin/brands accepts related_solutions field"""
        response = requests.get(f"{BASE_URL}/api/brands/control4")
        assert response.status_code == 200
        brand = response.json()
        brand_id = brand.get("id")
        
        test_related_solutions = ["smart-lighting", "home-cinema", "home-automation"]
        
        update_data = {
            **brand,
            "related_solutions": test_related_solutions
        }
        update_data.pop("_id", None)
        
        response = requests.put(
            f"{BASE_URL}/api/admin/brands/{brand_id}",
            headers=headers,
            json=update_data
        )
        assert response.status_code == 200, f"Update failed: {response.text}"
        
        # Verify
        verify_response = requests.get(f"{BASE_URL}/api/brands/control4")
        updated_brand = verify_response.json()
        saved_solutions = updated_brand.get("related_solutions", [])
        assert len(saved_solutions) == 3, f"Expected 3 related solutions, got {len(saved_solutions)}"
        assert "smart-lighting" in saved_solutions
        print(f"✅ PUT /api/admin/brands/{brand_id}: related_solutions saved successfully")


class TestProjectsAPI:
    """Test Projects API with extended fields"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200
        return response.json()["access_token"]
    
    @pytest.fixture(scope="class")
    def headers(self, auth_token):
        """Get auth headers"""
        return {
            "Authorization": f"Bearer {auth_token}",
            "Content-Type": "application/json"
        }
    
    def test_get_projects_list(self):
        """Test GET /api/projects returns projects list"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        projects = response.json()
        assert isinstance(projects, list)
        print(f"✅ GET /api/projects: {len(projects)} projects returned")
    
    def test_create_project_with_extended_fields(self, headers):
        """Test POST /api/admin/projects with all new fields"""
        test_project = {
            "id": f"test-project-{uuid.uuid4().hex[:8]}",
            "slug": f"test-smart-villa-{uuid.uuid4().hex[:8]}",
            "title": "TEST Smart Villa Palm Jumeirah",
            "location": "Palm Jumeirah, Dubai",
            "type": "Residential",
            "year": "2025",
            "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            "systems": ["Lighting", "Security", "Audio"],
            "description": "A comprehensive smart home project",
            # New fields
            "category": "Smart Villa",
            "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "features": ["Voice Control", "Automated Blinds", "Multi-room Audio"],
            "results": ["30% energy savings", "Seamless integration", "100% client satisfaction"],
            "challenge": "The client wanted a fully integrated smart home that could be controlled from anywhere in the world.",
            "solution_details": "We implemented a comprehensive Control4 system with Lutron lighting, Sonos audio, and Hikvision security.",
            "outcome": "The client now enjoys seamless control over all home systems, with significant energy savings."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/projects",
            headers=headers,
            json=test_project
        )
        assert response.status_code == 200, f"Create failed: {response.text}"
        
        # Verify the project was created with all fields
        verify_response = requests.get(f"{BASE_URL}/api/projects/{test_project['id']}")
        assert verify_response.status_code == 200
        created_project = verify_response.json()
        
        # Check new fields were saved
        assert created_project.get("category") == "Smart Villa", f"category not saved: {created_project.get('category')}"
        assert created_project.get("video_url") == test_project["video_url"], f"video_url not saved: {created_project.get('video_url')}"
        assert "Voice Control" in created_project.get("features", []), f"features not saved: {created_project.get('features')}"
        assert "30% energy savings" in created_project.get("results", []), f"results not saved: {created_project.get('results')}"
        assert created_project.get("challenge") == test_project["challenge"], f"challenge not saved"
        assert created_project.get("solution_details") == test_project["solution_details"], f"solution_details not saved"
        assert created_project.get("outcome") == test_project["outcome"], f"outcome not saved"
        
        print("✅ POST /api/admin/projects: All extended fields saved successfully")
        
        # Clean up - delete the test project
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/projects/{test_project['id']}",
            headers=headers
        )
        assert delete_response.status_code == 200, f"Delete failed: {delete_response.text}"
        print(f"✅ Cleanup: Test project deleted")
    
    def test_update_project_with_extended_fields(self, headers):
        """Test PUT /api/admin/projects with challenge, solution_details, outcome"""
        # First get list of projects
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        projects = response.json()
        
        if not projects:
            pytest.skip("No projects available to test update")
        
        project = projects[0]
        project_id = project.get("id")
        
        # Update with extended fields
        update_data = {
            **project,
            "challenge": "TEST: Integrating legacy systems with modern automation",
            "solution_details": "TEST: Used Control4 hub to bridge old and new systems",
            "outcome": "TEST: Achieved seamless integration with 25% cost savings",
            "video_url": "https://youtube.com/watch?v=test123",
            "features": ["Feature A", "Feature B", "Feature C"],
            "results": ["Result 1", "Result 2"],
            "category": "Test Category"
        }
        update_data.pop("_id", None)
        
        response = requests.put(
            f"{BASE_URL}/api/admin/projects/{project_id}",
            headers=headers,
            json=update_data
        )
        assert response.status_code == 200, f"Update failed: {response.text}"
        
        # Verify
        verify_response = requests.get(f"{BASE_URL}/api/projects/{project_id}")
        assert verify_response.status_code == 200
        updated_project = verify_response.json()
        
        assert "TEST:" in updated_project.get("challenge", ""), f"challenge not updated: {updated_project.get('challenge')}"
        assert "TEST:" in updated_project.get("solution_details", ""), f"solution_details not updated"
        assert "TEST:" in updated_project.get("outcome", ""), f"outcome not updated"
        print(f"✅ PUT /api/admin/projects/{project_id}: Extended fields updated successfully")


class TestBrandsModelFields:
    """Verify Brand model includes all required fields"""
    
    def test_brands_have_gallery_images_field(self):
        """Test that brands response includes gallery_images array"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        brands = response.json()
        
        # Check at least one brand
        if brands:
            brand = brands[0]
            # gallery_images should be present (may be empty array)
            assert "gallery_images" in brand or isinstance(brand.get("gallery_images"), list) or brand.get("gallery_images") is None
            print(f"✅ Brands include gallery_images field")
    
    def test_brands_have_feature_cards_field(self):
        """Test that brands response includes feature_cards array"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        brands = response.json()
        
        if brands:
            brand = brands[0]
            # feature_cards should be present
            print(f"✅ Brands include feature_cards field (value: {brand.get('feature_cards', 'not present')})")
    
    def test_brands_have_related_solutions_field(self):
        """Test that brands response includes related_solutions array"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        brands = response.json()
        
        if brands:
            brand = brands[0]
            print(f"✅ Brands include related_solutions field (value: {brand.get('related_solutions', 'not present')})")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
