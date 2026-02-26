"""
Catalogues Feature Backend Tests
Tests public and admin API endpoints for catalogues/flipbook functionality
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestCataloguesPublicAPI:
    """Public API tests for catalogues - no auth required"""
    
    def test_get_catalogues_list(self):
        """GET /api/catalogues - returns list of published catalogues"""
        response = requests.get(f"{BASE_URL}/api/catalogues")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list), "Expected list response"
        print(f"Found {len(data)} published catalogues")
        
    def test_get_catalogues_returns_data_structure(self):
        """Verify catalogue response has required fields"""
        response = requests.get(f"{BASE_URL}/api/catalogues")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            cat = data[0]
            required_fields = ['id', 'slug', 'title', 'category', 'pdf_url', 'published']
            for field in required_fields:
                assert field in cat, f"Missing required field: {field}"
            print(f"Catalogue structure validated: {cat['title']}")
            
    def test_get_catalogue_by_slug(self):
        """GET /api/catalogues/lexa-company-profile-2026 - returns single catalogue"""
        response = requests.get(f"{BASE_URL}/api/catalogues/lexa-company-profile-2026")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data['slug'] == 'lexa-company-profile-2026'
        assert data['title'] == 'LEXA Company Profile 2026'
        assert data['category'] == 'company-profile'
        assert 'pdf_url' in data and data['pdf_url']
        print(f"Catalogue found: {data['title']} - {data['description']}")
        
    def test_get_catalogue_not_found(self):
        """GET /api/catalogues/non-existent returns 404"""
        response = requests.get(f"{BASE_URL}/api/catalogues/non-existent-catalogue")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        
    def test_catalogues_filter_by_category(self):
        """GET /api/catalogues?category=company-profile - filter by category"""
        response = requests.get(f"{BASE_URL}/api/catalogues?category=company-profile")
        assert response.status_code == 200
        data = response.json()
        for cat in data:
            assert cat['category'] == 'company-profile', f"Expected company-profile, got {cat['category']}"
        print(f"Category filter works: {len(data)} company-profile catalogues")


class TestPDFServing:
    """Tests for PDF file serving endpoint"""
    
    def test_pdf_file_serves_with_200(self):
        """GET /api/uploads/files/catalogues/test_company_profile.pdf - returns PDF"""
        response = requests.get(f"{BASE_URL}/api/uploads/files/catalogues/test_company_profile.pdf")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        assert response.headers.get('content-type') == 'application/pdf'
        assert len(response.content) > 0, "PDF content should not be empty"
        print(f"PDF served successfully: {len(response.content)} bytes")
        
    def test_pdf_file_not_found(self):
        """GET /api/uploads/files/catalogues/non-existent.pdf - returns 404"""
        response = requests.get(f"{BASE_URL}/api/uploads/files/catalogues/non-existent.pdf")
        assert response.status_code == 404


class TestCataloguesAdminAPI:
    """Admin API tests for catalogues - requires authentication"""
    
    @pytest.fixture
    def auth_token(self):
        """Get admin authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200, f"Admin login failed: {response.status_code}"
        token = response.json().get('access_token')
        assert token, "No access token returned"
        return token
    
    def test_admin_login(self, auth_token):
        """POST /api/admin/login - admin can login"""
        assert auth_token is not None
        print("Admin login successful")
        
    def test_admin_get_catalogues(self, auth_token):
        """GET /api/admin/catalogues - returns all catalogues including unpublished"""
        response = requests.get(
            f"{BASE_URL}/api/admin/catalogues",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list)
        print(f"Admin can see {len(data)} catalogues")
        
    def test_admin_catalogues_unauthorized(self):
        """GET /api/admin/catalogues without token returns 401/403"""
        response = requests.get(f"{BASE_URL}/api/admin/catalogues")
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"
        
    def test_admin_create_catalogue(self, auth_token):
        """POST /api/admin/catalogues - create new catalogue"""
        test_slug = f"test-catalogue-{uuid.uuid4().hex[:8]}"
        catalogue_data = {
            "slug": test_slug,
            "title": "TEST Catalogue Pytest",
            "description": "Created by pytest for testing",
            "category": "pre-qualification",
            "pdf_url": "/api/uploads/files/catalogues/test_company_profile.pdf",
            "thumbnail": "",
            "page_count": 4,
            "brand_slug": "",
            "featured": False,
            "priority": 999,
            "published": False
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/catalogues",
            json=catalogue_data,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Create failed: {response.status_code} - {response.text}"
        data = response.json()
        assert 'id' in data
        print(f"Created test catalogue: {test_slug}")
        
        # Cleanup - delete the test catalogue
        catalogue_id = data['id']
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/catalogues/{catalogue_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert delete_response.status_code == 200, f"Delete cleanup failed"
        print("Cleaned up test catalogue")
        
    def test_admin_update_catalogue(self, auth_token):
        """PUT /api/admin/catalogues/{id} - update existing catalogue"""
        # First get the test catalogue
        response = requests.get(f"{BASE_URL}/api/catalogues/lexa-company-profile-2026")
        assert response.status_code == 200
        catalogue = response.json()
        catalogue_id = catalogue['id']
        
        # Update description
        original_description = catalogue['description']
        updated_description = "Updated description for testing"
        catalogue['description'] = updated_description
        
        update_response = requests.put(
            f"{BASE_URL}/api/admin/catalogues/{catalogue_id}",
            json=catalogue,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert update_response.status_code == 200, f"Update failed: {update_response.status_code}"
        
        # Verify update
        verify_response = requests.get(f"{BASE_URL}/api/catalogues/lexa-company-profile-2026")
        assert verify_response.json()['description'] == updated_description
        print("Catalogue updated successfully")
        
        # Restore original description
        catalogue['description'] = original_description
        requests.put(
            f"{BASE_URL}/api/admin/catalogues/{catalogue_id}",
            json=catalogue,
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        print("Restored original description")
        
    def test_admin_delete_catalogue(self, auth_token):
        """DELETE /api/admin/catalogues/{id} - delete catalogue"""
        # Create test catalogue first
        test_slug = f"delete-test-{uuid.uuid4().hex[:8]}"
        create_response = requests.post(
            f"{BASE_URL}/api/admin/catalogues",
            json={
                "slug": test_slug,
                "title": "TEST Delete Catalogue",
                "description": "To be deleted",
                "category": "brand-catalogues",
                "pdf_url": "/api/uploads/files/catalogues/test_company_profile.pdf",
                "thumbnail": "",
                "page_count": 0,
                "published": False
            },
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert create_response.status_code == 200
        catalogue_id = create_response.json()['id']
        
        # Delete it
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/catalogues/{catalogue_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert delete_response.status_code == 200
        
        # Verify it's gone
        verify_response = requests.get(f"{BASE_URL}/api/catalogues/{test_slug}")
        assert verify_response.status_code == 404, "Catalogue should be deleted"
        print("Delete works correctly")


class TestPDFUploadEndpoint:
    """Tests for PDF upload functionality"""
    
    @pytest.fixture
    def auth_token(self):
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        return response.json().get('access_token')
    
    def test_pdf_upload_endpoint_exists(self):
        """POST /api/uploads/pdf endpoint exists"""
        # Send empty request to verify endpoint exists
        response = requests.post(f"{BASE_URL}/api/uploads/pdf")
        # Should get 422 (unprocessable entity) not 404, since no file was sent
        assert response.status_code != 404, "PDF upload endpoint should exist"
        print(f"PDF upload endpoint status: {response.status_code}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
