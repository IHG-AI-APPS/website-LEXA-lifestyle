"""
Test Admin Projects CRUD Operations
This test validates the fix for the recurring admin projects issue:
- New /api/admin/projects endpoint that returns ALL projects (including unpublished)
- Full CRUD operations: Create, Read, Update, Delete
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "lexa2026"


class TestAdminProjectsCRUD:
    """Test suite for Admin Projects CRUD operations - CRITICAL FIX"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get authentication token for admin"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "access_token" in data, "No access_token in response"
        return data["access_token"]
    
    @pytest.fixture(scope="class")
    def auth_headers(self, auth_token):
        """Create headers with auth token"""
        return {
            "Authorization": f"Bearer {auth_token}",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        }
    
    def test_01_admin_login(self):
        """Test admin login with correct credentials"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "access_token" in data
        print(f"✅ Admin login successful, token received")
    
    def test_02_admin_projects_endpoint_exists(self, auth_headers):
        """Test that the NEW /api/admin/projects endpoint exists and returns data"""
        response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        assert response.status_code == 200, f"Admin projects endpoint failed: {response.status_code} - {response.text}"
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"✅ Admin projects endpoint returns {len(data)} projects")
        return data
    
    def test_03_admin_projects_vs_public_projects(self, auth_headers):
        """Compare admin endpoint with public endpoint - admin should include unpublished"""
        # Get admin projects (ALL)
        admin_response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        assert admin_response.status_code == 200
        admin_projects = admin_response.json()
        
        # Get public projects (only published=True)
        public_response = requests.get(f"{BASE_URL}/api/projects")
        assert public_response.status_code == 200
        public_projects = public_response.json()
        
        print(f"Admin endpoint: {len(admin_projects)} projects")
        print(f"Public endpoint: {len(public_projects)} projects")
        
        # Admin should have >= public (may have unpublished ones)
        assert len(admin_projects) >= len(public_projects), \
            "Admin endpoint should return at least as many projects as public endpoint"
        print(f"✅ Admin endpoint correctly returns ALL projects (including unpublished)")
    
    def test_04_create_project(self, auth_headers):
        """Test creating a new project via admin endpoint"""
        test_project = {
            "id": f"TEST_PROJECT_{uuid.uuid4().hex[:8]}",
            "slug": f"test-project-{uuid.uuid4().hex[:8]}",
            "title": "TEST_PROJECT_FOR_DELETION",
            "location": "Test Location",
            "type": "Residential",
            "year": "2026",
            "image": "https://example.com/test.jpg",
            "systems": ["Lighting", "Security"],
            "description": "Test project for CRUD testing",
            "published": True
        }
        
        response = requests.post(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers,
            json=test_project
        )
        assert response.status_code == 200, f"Create project failed: {response.status_code} - {response.text}"
        data = response.json()
        assert "message" in data
        assert data.get("id") == test_project["id"]
        print(f"✅ Created test project: {test_project['id']}")
        return test_project["id"]
    
    def test_05_verify_created_project_in_list(self, auth_headers):
        """Verify the newly created project appears in admin list"""
        response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        assert response.status_code == 200
        projects = response.json()
        
        # Find our test project
        test_projects = [p for p in projects if p.get("title") == "TEST_PROJECT_FOR_DELETION"]
        assert len(test_projects) >= 1, "Created project not found in admin list"
        print(f"✅ Created project found in admin projects list")
        return test_projects[0]["id"]
    
    def test_06_update_project(self, auth_headers):
        """Test updating the created project"""
        # First get the project ID
        response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        projects = response.json()
        test_projects = [p for p in projects if p.get("title") == "TEST_PROJECT_FOR_DELETION"]
        
        if not test_projects:
            pytest.skip("No test project found to update")
        
        project_id = test_projects[0]["id"]
        
        # Update the project
        updated_data = {
            **test_projects[0],
            "title": "TEST_PROJECT_FOR_DELETION_UPDATED",
            "description": "Updated description for testing"
        }
        
        response = requests.put(
            f"{BASE_URL}/api/admin/projects/{project_id}",
            headers=auth_headers,
            json=updated_data
        )
        assert response.status_code == 200, f"Update failed: {response.status_code} - {response.text}"
        print(f"✅ Updated project: {project_id}")
        return project_id
    
    def test_07_verify_updated_project(self, auth_headers):
        """Verify the update was persisted"""
        response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        projects = response.json()
        
        updated_projects = [p for p in projects if "TEST_PROJECT_FOR_DELETION_UPDATED" in p.get("title", "")]
        assert len(updated_projects) >= 1, "Updated project not found"
        assert updated_projects[0].get("description") == "Updated description for testing"
        print(f"✅ Project update verified in database")
        return updated_projects[0]["id"]
    
    def test_08_delete_project(self, auth_headers):
        """Test deleting the test project"""
        # Get the project to delete
        response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        projects = response.json()
        test_projects = [p for p in projects if "TEST_PROJECT_FOR_DELETION" in p.get("title", "")]
        
        if not test_projects:
            pytest.skip("No test project found to delete")
        
        project_id = test_projects[0]["id"]
        
        # Delete the project
        response = requests.delete(
            f"{BASE_URL}/api/admin/projects/{project_id}",
            headers=auth_headers
        )
        assert response.status_code == 200, f"Delete failed: {response.status_code} - {response.text}"
        print(f"✅ Deleted project: {project_id}")
        return project_id
    
    def test_09_verify_project_deleted(self, auth_headers):
        """Verify the project was removed from the list"""
        response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        projects = response.json()
        
        # Check that no TEST_PROJECT_FOR_DELETION remains
        test_projects = [p for p in projects if "TEST_PROJECT_FOR_DELETION" in p.get("title", "")]
        assert len(test_projects) == 0, f"Deleted project still exists in list: {test_projects}"
        print(f"✅ Project deletion verified - project no longer in list")
    
    def test_10_no_cache_headers(self, auth_headers):
        """Verify admin endpoint returns no-cache headers"""
        response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        cache_control = response.headers.get("Cache-Control", "")
        assert "no-cache" in cache_control or "no-store" in cache_control, \
            f"Expected no-cache headers, got: {cache_control}"
        print(f"✅ Admin endpoint has proper no-cache headers: {cache_control}")


class TestCleanup:
    """Cleanup any remaining test data"""
    
    @pytest.fixture(scope="class")
    def auth_headers(self):
        """Get auth headers"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        if response.status_code != 200:
            pytest.skip("Cannot login for cleanup")
        token = response.json()["access_token"]
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    
    def test_cleanup_test_projects(self, auth_headers):
        """Remove any leftover TEST_ projects"""
        response = requests.get(
            f"{BASE_URL}/api/admin/projects",
            headers=auth_headers
        )
        if response.status_code != 200:
            return
        
        projects = response.json()
        test_projects = [p for p in projects if "TEST_PROJECT" in p.get("title", "") or p.get("id", "").startswith("TEST_")]
        
        deleted_count = 0
        for project in test_projects:
            delete_response = requests.delete(
                f"{BASE_URL}/api/admin/projects/{project['id']}",
                headers=auth_headers
            )
            if delete_response.status_code == 200:
                deleted_count += 1
        
        print(f"✅ Cleanup: Removed {deleted_count} test projects")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
