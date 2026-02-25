"""
Test suite for Gallery Images fix and Solution Page verification
Tests the boardrooms-auditoriums solution page and API
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestBoardroomsAuditoriumsSolution:
    """Test cases for boardrooms-auditoriums solution with gallery images fix"""
    
    def test_boardrooms_solution_api_returns_200(self):
        """Test that boardrooms-auditoriums API endpoint returns 200"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("✓ API endpoint returns 200")
    
    def test_boardrooms_solution_has_gallery_images(self):
        """Test that solution has gallery_images array with 6 items"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        assert "gallery_images" in data, "gallery_images field missing from response"
        gallery_images = data["gallery_images"]
        
        assert len(gallery_images) == 6, f"Expected 6 gallery images, got {len(gallery_images)}"
        print(f"✓ Found {len(gallery_images)} gallery images")
    
    def test_gallery_images_are_real_stock_photos(self):
        """Test that gallery images are from Unsplash/Pexels (not AI monitors)"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        gallery_images = data.get("gallery_images", [])
        unsplash_pexels_count = 0
        
        for img in gallery_images:
            if "unsplash" in img.lower() or "pexels" in img.lower():
                unsplash_pexels_count += 1
        
        assert unsplash_pexels_count == 6, f"Expected 6 Unsplash/Pexels images, found {unsplash_pexels_count}"
        print(f"✓ All {unsplash_pexels_count} images are real stock photos from Unsplash/Pexels")
    
    def test_boardrooms_solution_has_required_fields(self):
        """Test that solution has all required fields for SolutionClient template"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        required_fields = ["title", "description", "category", "image", "features", "brands", "faqs"]
        
        for field in required_fields:
            assert field in data, f"Required field '{field}' missing"
        
        print("✓ All required fields present")
        print(f"  - Title: {data['title']}")
        print(f"  - Category: {data['category']}")
        print(f"  - Features count: {len(data.get('features', []))}")
        print(f"  - Brands count: {len(data.get('brands', []))}")
        print(f"  - FAQs count: {len(data.get('faqs', []))}")
    
    def test_boardrooms_solution_faqs(self):
        """Test that FAQs have question and answer fields"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        faqs = data.get("faqs", [])
        assert len(faqs) > 0, "Expected at least 1 FAQ"
        
        for i, faq in enumerate(faqs):
            assert "question" in faq, f"FAQ {i} missing 'question' field"
            assert "answer" in faq, f"FAQ {i} missing 'answer' field"
        
        print(f"✓ All {len(faqs)} FAQs have question and answer fields")


class TestSolutionsListingAPI:
    """Test cases for solutions listing API"""
    
    def test_solutions_list_returns_200(self):
        """Test that /api/solutions returns 200"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        print("✓ Solutions list API returns 200")
    
    def test_solutions_list_has_items(self):
        """Test that solutions list has items"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        data = response.json()
        
        assert len(data) > 0, "Expected solutions list to have items"
        print(f"✓ Found {len(data)} solutions")
    
    def test_solutions_mega_menu_returns_200(self):
        """Test that mega-menu endpoint works"""
        response = requests.get(f"{BASE_URL}/api/solutions/mega-menu")
        assert response.status_code == 200
        print("✓ Mega menu API returns 200")


class TestStaticSolutionPages:
    """Test cases for static solution pages like lighting-automation"""
    
    def test_lighting_automation_api_returns_200(self):
        """Test that lighting-automation solution API returns 200"""
        response = requests.get(f"{BASE_URL}/api/solutions/lighting-automation")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("✓ Lighting automation API returns 200")
    
    def test_lighting_automation_has_required_fields(self):
        """Test that lighting-automation has required fields"""
        response = requests.get(f"{BASE_URL}/api/solutions/lighting-automation")
        data = response.json()
        
        assert "title" in data
        assert "description" in data
        assert "features" in data
        
        print(f"✓ Lighting Automation solution verified: {data['title']}")


class TestHomepageAndCoreAPIs:
    """Test cases for homepage and core APIs"""
    
    def test_settings_api_returns_200(self):
        """Test that /api/settings returns 200"""
        response = requests.get(f"{BASE_URL}/api/settings")
        assert response.status_code == 200
        print("✓ Settings API returns 200")
    
    def test_projects_api_returns_200(self):
        """Test that /api/projects returns 200"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        data = response.json()
        print(f"✓ Projects API returns 200 with {len(data)} projects")
    
    def test_services_api_returns_200(self):
        """Test that /api/services returns 200"""
        response = requests.get(f"{BASE_URL}/api/services")
        assert response.status_code == 200
        data = response.json()
        print(f"✓ Services API returns 200 with {len(data)} services")
    
    def test_testimonials_api_returns_200(self):
        """Test that /api/testimonials returns 200"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        assert response.status_code == 200
        print("✓ Testimonials API returns 200")


class TestAdminAuthentication:
    """Test cases for admin authentication"""
    
    def test_admin_login_with_valid_credentials(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "token" in data or "access_token" in data, "Token not in response"
        print("✓ Admin login successful with valid credentials")
    
    def test_admin_login_with_invalid_credentials(self):
        """Test admin login with invalid credentials returns 401"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "wrongpassword"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✓ Admin login correctly rejects invalid credentials")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
