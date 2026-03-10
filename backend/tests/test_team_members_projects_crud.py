"""
Test file for Team Members CRUD and Projects CRUD with loading states
Tests the new features:
1. Team Members API (public + admin CRUD)
2. Projects API (CRUD with loading states)
3. Admin authentication
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    BASE_URL = "https://admin-studio-7.preview.emergentagent.com"

# Test credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "lexa2026"


class TestAdminAuthentication:
    """Test admin login and token verification"""
    
    def test_admin_login_success(self):
        """Test successful admin login"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "access_token" in data
        assert "token_type" in data
        assert data["token_type"] == "bearer"
        print(f"✅ Admin login successful, got token")
        
    def test_admin_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "invalid",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✅ Invalid credentials correctly rejected")
        
    def test_admin_verify_token(self):
        """Test token verification endpoint"""
        # First get token
        login_response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = login_response.json()["access_token"]
        
        # Verify token
        response = requests.get(f"{BASE_URL}/api/admin/verify", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == True
        print("✅ Token verification successful")


class TestTeamMembersPublicAPI:
    """Test public team members endpoint"""
    
    def test_get_team_members_public(self):
        """Test GET /api/team-members returns active members"""
        response = requests.get(f"{BASE_URL}/api/team-members")
        assert response.status_code == 200, f"Failed: {response.text}"
        members = response.json()
        assert isinstance(members, list)
        assert len(members) > 0, "Expected at least 1 team member"
        
        # Check data structure
        first_member = members[0]
        assert "id" in first_member
        assert "name" in first_member
        assert "role" in first_member
        assert "is_active" in first_member
        
        # All returned members should be active
        for member in members:
            assert member["is_active"] == True, f"Member {member['name']} should be active"
        
        print(f"✅ Got {len(members)} active team members")
        

class TestTeamMembersCRUD:
    """Test Team Members Admin CRUD operations"""
    
    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        return response.json()["access_token"]
    
    @pytest.fixture
    def auth_headers(self, auth_token):
        """Get headers with auth token"""
        return {
            "Authorization": f"Bearer {auth_token}",
            "Content-Type": "application/json"
        }
    
    def test_get_all_team_members_admin(self, auth_headers):
        """Test admin GET all team members (including inactive)"""
        response = requests.get(f"{BASE_URL}/api/admin/team-members", headers=auth_headers)
        assert response.status_code == 200
        members = response.json()
        assert isinstance(members, list)
        print(f"✅ Admin can see {len(members)} team members (all)")
        
    def test_create_team_member(self, auth_headers):
        """Test creating a new team member"""
        unique_id = str(uuid.uuid4())[:8]
        new_member = {
            "id": f"TEST_member_{unique_id}",
            "name": f"TEST Team Member {unique_id}",
            "role": "Test Role",
            "image": "https://example.com/test.jpg",
            "bio": "Test bio",
            "linkedin": "https://linkedin.com/in/test",
            "email": f"test_{unique_id}@example.com",
            "order": 99,
            "is_active": False  # Inactive so it won't show on public page
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/team-members", 
                                headers=auth_headers, 
                                json=new_member)
        assert response.status_code == 200, f"Failed to create: {response.text}"
        data = response.json()
        assert "id" in data
        print(f"✅ Created team member with ID: {data.get('id')}")
        
        # Verify it exists
        get_response = requests.get(f"{BASE_URL}/api/admin/team-members", headers=auth_headers)
        members = get_response.json()
        member_ids = [m['id'] for m in members]
        assert new_member['id'] in member_ids, "Created member not found"
        print("✅ Verified team member was persisted")
        
        return new_member['id']
        
    def test_update_team_member(self, auth_headers):
        """Test updating a team member"""
        # First create a member
        unique_id = str(uuid.uuid4())[:8]
        member_id = f"TEST_update_{unique_id}"
        new_member = {
            "id": member_id,
            "name": f"Original Name {unique_id}",
            "role": "Original Role",
            "image": "",
            "order": 99,
            "is_active": False
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/team-members", 
                                       headers=auth_headers, 
                                       json=new_member)
        assert create_response.status_code == 200
        
        # Update the member
        updated_member = {
            **new_member,
            "name": f"Updated Name {unique_id}",
            "role": "Updated Role"
        }
        
        update_response = requests.put(f"{BASE_URL}/api/admin/team-members/{member_id}", 
                                      headers=auth_headers, 
                                      json=updated_member)
        assert update_response.status_code == 200, f"Update failed: {update_response.text}"
        print("✅ Team member updated successfully")
        
        # Verify update was persisted
        get_response = requests.get(f"{BASE_URL}/api/admin/team-members", headers=auth_headers)
        members = get_response.json()
        updated = next((m for m in members if m['id'] == member_id), None)
        assert updated is not None, "Updated member not found"
        assert updated['name'] == f"Updated Name {unique_id}"
        assert updated['role'] == "Updated Role"
        print("✅ Verified update was persisted")
        
        return member_id
        
    def test_delete_team_member(self, auth_headers):
        """Test deleting a team member"""
        # First create a member to delete
        unique_id = str(uuid.uuid4())[:8]
        member_id = f"TEST_delete_{unique_id}"
        new_member = {
            "id": member_id,
            "name": f"To Delete {unique_id}",
            "role": "Delete Test",
            "image": "",
            "order": 99,
            "is_active": False
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/team-members", 
                                       headers=auth_headers, 
                                       json=new_member)
        assert create_response.status_code == 200
        
        # Delete the member
        delete_response = requests.delete(f"{BASE_URL}/api/admin/team-members/{member_id}", 
                                         headers=auth_headers)
        assert delete_response.status_code == 200, f"Delete failed: {delete_response.text}"
        print("✅ Team member deleted successfully")
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/admin/team-members", headers=auth_headers)
        members = get_response.json()
        member_ids = [m['id'] for m in members]
        assert member_id not in member_ids, "Deleted member still exists"
        print("✅ Verified deletion was successful")
        
    def test_delete_nonexistent_member_returns_404(self, auth_headers):
        """Test deleting a non-existent member returns 404"""
        response = requests.delete(f"{BASE_URL}/api/admin/team-members/NONEXISTENT_ID_12345", 
                                  headers=auth_headers)
        assert response.status_code == 404
        print("✅ Correctly returned 404 for non-existent member")


class TestProjectsCRUD:
    """Test Projects Admin CRUD operations"""
    
    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        return response.json()["access_token"]
    
    @pytest.fixture
    def auth_headers(self, auth_token):
        """Get headers with auth token"""
        return {
            "Authorization": f"Bearer {auth_token}",
            "Content-Type": "application/json"
        }
    
    def test_get_projects_public(self):
        """Test GET /api/projects returns published projects"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        projects = response.json()
        assert isinstance(projects, list)
        assert len(projects) > 0, "Expected at least 1 project"
        print(f"✅ Got {len(projects)} projects")
        
    def test_create_project(self, auth_headers):
        """Test creating a new project"""
        unique_id = str(uuid.uuid4())[:8]
        new_project = {
            "id": f"TEST_project_{unique_id}",
            "slug": f"test-project-{unique_id}",
            "title": f"TEST Project {unique_id}",
            "location": "Test Location",
            "type": "Residential",
            "year": "2026",
            "image": "https://example.com/test.jpg",
            "systems": ["Lighting", "Security"],
            "description": "Test project description",
            "published": False,  # Don't show on public page
            "featured": False
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/projects", 
                                headers=auth_headers, 
                                json=new_project)
        assert response.status_code == 200, f"Failed to create: {response.text}"
        data = response.json()
        assert "id" in data
        print(f"✅ Created project with ID: {data.get('id')}")
        
        return new_project['id']
        
    def test_update_project(self, auth_headers):
        """Test updating a project"""
        # First create a project
        unique_id = str(uuid.uuid4())[:8]
        project_id = f"TEST_update_project_{unique_id}"
        new_project = {
            "id": project_id,
            "slug": f"test-update-{unique_id}",
            "title": f"Original Title {unique_id}",
            "location": "Original Location",
            "type": "Residential",
            "year": "2026",
            "image": "",
            "systems": [],
            "description": "Original description",
            "published": False
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/projects", 
                                       headers=auth_headers, 
                                       json=new_project)
        assert create_response.status_code == 200
        
        # Update the project
        updated_project = {
            **new_project,
            "title": f"Updated Title {unique_id}",
            "location": "Updated Location",
            "systems": ["Audio", "Climate"]
        }
        
        update_response = requests.put(f"{BASE_URL}/api/admin/projects/{project_id}", 
                                      headers=auth_headers, 
                                      json=updated_project)
        assert update_response.status_code == 200, f"Update failed: {update_response.text}"
        print("✅ Project updated successfully")
        
        # Verify update was persisted by getting the specific project
        get_response = requests.get(f"{BASE_URL}/api/projects/{project_id}")
        if get_response.status_code == 200:
            project = get_response.json()
            assert project['title'] == f"Updated Title {unique_id}"
            assert project['location'] == "Updated Location"
            print("✅ Verified project update was persisted")
        
        return project_id
        
    def test_delete_project(self, auth_headers):
        """Test deleting a project"""
        # First create a project to delete
        unique_id = str(uuid.uuid4())[:8]
        project_id = f"TEST_delete_project_{unique_id}"
        new_project = {
            "id": project_id,
            "slug": f"test-delete-{unique_id}",
            "title": f"To Delete {unique_id}",
            "location": "Delete Location",
            "type": "Commercial",
            "year": "2026",
            "image": "",
            "systems": [],
            "published": False
        }
        
        create_response = requests.post(f"{BASE_URL}/api/admin/projects", 
                                       headers=auth_headers, 
                                       json=new_project)
        assert create_response.status_code == 200
        print(f"Created project {project_id} for deletion test")
        
        # Delete the project
        delete_response = requests.delete(f"{BASE_URL}/api/admin/projects/{project_id}", 
                                         headers=auth_headers)
        assert delete_response.status_code == 200, f"Delete failed: {delete_response.text}"
        print("✅ Project deleted successfully")
        
        # Verify deletion - should return 404
        get_response = requests.get(f"{BASE_URL}/api/projects/{project_id}")
        assert get_response.status_code == 404, "Deleted project still exists"
        print("✅ Verified deletion was successful - project returns 404")
        
    def test_delete_nonexistent_project_returns_404(self, auth_headers):
        """Test deleting a non-existent project returns 404"""
        response = requests.delete(f"{BASE_URL}/api/admin/projects/NONEXISTENT_PROJECT_12345", 
                                  headers=auth_headers)
        assert response.status_code == 404
        print("✅ Correctly returned 404 for non-existent project")


class TestCleanup:
    """Cleanup test data after tests"""
    
    @pytest.fixture
    def auth_headers(self):
        """Get headers with auth token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        token = response.json()["access_token"]
        return {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
    
    def test_cleanup_test_team_members(self, auth_headers):
        """Clean up TEST_ prefixed team members"""
        response = requests.get(f"{BASE_URL}/api/admin/team-members", headers=auth_headers)
        if response.status_code == 200:
            members = response.json()
            for member in members:
                if member['id'].startswith('TEST_') or member['name'].startswith('TEST'):
                    delete_response = requests.delete(
                        f"{BASE_URL}/api/admin/team-members/{member['id']}", 
                        headers=auth_headers
                    )
                    if delete_response.status_code == 200:
                        print(f"Cleaned up test member: {member['id']}")
        print("✅ Test team members cleanup complete")
        
    def test_cleanup_test_projects(self, auth_headers):
        """Clean up TEST_ prefixed projects"""
        response = requests.get(f"{BASE_URL}/api/projects")
        if response.status_code == 200:
            projects = response.json()
            for project in projects:
                if project['id'].startswith('TEST_') or project.get('title', '').startswith('TEST'):
                    delete_response = requests.delete(
                        f"{BASE_URL}/api/admin/projects/{project['id']}", 
                        headers=auth_headers
                    )
                    if delete_response.status_code == 200:
                        print(f"Cleaned up test project: {project['id']}")
        print("✅ Test projects cleanup complete")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
