"""
Comprehensive QA API Tests for LEXA Lifestyle Website
Tests all major API endpoints for site-wide functionality
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndBasicAPIs:
    """Health check and basic API connectivity tests"""
    
    def test_health_endpoint(self):
        """Test API health endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["database"] == "connected"
        print(f"Health check passed: {data}")
    
    def test_solutions_api(self):
        """Test solutions listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        # Verify solution structure
        solution = data[0]
        assert "title" in solution or "name" in solution
        print(f"Solutions API: {len(data)} solutions found")
    
    def test_services_api(self):
        """Test services listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/services")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        print(f"Services API: {len(data)} services found")
    
    def test_articles_api(self):
        """Test articles/blog listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/articles")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        print(f"Articles API: {len(data)} articles found")
    
    def test_projects_api(self):
        """Test projects listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        print(f"Projects API: {len(data)} projects found")
    
    def test_brands_api(self):
        """Test brands listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        print(f"Brands API: {len(data)} brands found")
    
    def test_testimonials_api(self):
        """Test testimonials listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Testimonials API: {len(data)} testimonials found")
    
    def test_property_types_api(self):
        """Test packages property types endpoint"""
        response = requests.get(f"{BASE_URL}/api/packages/property-types")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Property Types API: {len(data)} property types found")
    
    def test_catalogues_api(self):
        """Test catalogues listing endpoint"""
        response = requests.get(f"{BASE_URL}/api/catalogues")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Catalogues API: {len(data)} catalogues found")


class TestAdminAuthentication:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data or "access_token" in data
        print("Admin login successful")
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "wronguser",
            "password": "wrongpass"
        })
        assert response.status_code in [401, 403, 400]
        print("Invalid credentials correctly rejected")


class TestDetailEndpoints:
    """Test individual detail page endpoints"""
    
    def test_solution_detail(self):
        """Test single solution detail endpoint"""
        # First get list to find a valid slug
        list_response = requests.get(f"{BASE_URL}/api/solutions")
        solutions = list_response.json()
        if solutions:
            slug = solutions[0].get("slug", solutions[0].get("id"))
            detail_response = requests.get(f"{BASE_URL}/api/solutions/{slug}")
            assert detail_response.status_code == 200
            print(f"Solution detail '{slug}' loaded")
    
    def test_service_detail(self):
        """Test single service detail endpoint"""
        list_response = requests.get(f"{BASE_URL}/api/services")
        services = list_response.json()
        if services:
            slug = services[0].get("slug", services[0].get("id"))
            detail_response = requests.get(f"{BASE_URL}/api/services/{slug}")
            assert detail_response.status_code == 200
            print(f"Service detail '{slug}' loaded")
    
    def test_article_detail(self):
        """Test single article detail endpoint"""
        list_response = requests.get(f"{BASE_URL}/api/articles")
        articles = list_response.json()
        if articles:
            slug = articles[0].get("slug", articles[0].get("id"))
            detail_response = requests.get(f"{BASE_URL}/api/articles/{slug}")
            assert detail_response.status_code == 200
            data = detail_response.json()
            # Verify author field exists
            assert "author" in data or "author_name" in data
            print(f"Article detail '{slug}' loaded with author")
    
    def test_project_detail(self):
        """Test single project detail endpoint"""
        list_response = requests.get(f"{BASE_URL}/api/projects")
        projects = list_response.json()
        if projects:
            slug = projects[0].get("slug", projects[0].get("id"))
            detail_response = requests.get(f"{BASE_URL}/api/projects/{slug}")
            assert detail_response.status_code == 200
            print(f"Project detail '{slug}' loaded")
    
    def test_brand_detail(self):
        """Test single brand detail endpoint"""
        list_response = requests.get(f"{BASE_URL}/api/brands")
        brands = list_response.json()
        if brands:
            slug = brands[0].get("slug", brands[0].get("id"))
            detail_response = requests.get(f"{BASE_URL}/api/brands/{slug}")
            assert detail_response.status_code == 200
            print(f"Brand detail '{slug}' loaded")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
