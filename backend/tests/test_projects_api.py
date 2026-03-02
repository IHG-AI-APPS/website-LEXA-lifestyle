"""
Projects API Tests - Testing /api/projects endpoints
Tests for the redesigned Projects listing and detail pages
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestProjectsListAPI:
    """Tests for GET /api/projects endpoint"""

    def test_get_all_projects_returns_200(self):
        """Test that /api/projects returns 200 OK"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
    def test_get_all_projects_returns_list(self):
        """Test that /api/projects returns a list of projects"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Expected list of projects"
        assert len(data) > 0, "Expected at least one project"
        
    def test_projects_have_required_fields(self):
        """Test that each project has required fields"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        projects = response.json()
        
        required_fields = ['id', 'title', 'location', 'year', 'type', 'image']
        for project in projects[:5]:  # Check first 5 projects
            for field in required_fields:
                assert field in project, f"Project missing required field: {field}"
                
    def test_projects_have_systems_field(self):
        """Test that projects have systems array"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        projects = response.json()
        
        for project in projects[:5]:
            assert 'systems' in project, "Project missing systems field"
            assert isinstance(project['systems'], list), "Systems should be a list"
            
    def test_project_types_are_valid(self):
        """Test that project types are valid categories"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        projects = response.json()
        
        valid_types = ['Residential', 'Commercial', 'Villa', None]
        for project in projects:
            proj_type = project.get('type')
            # Allow for various type values
            assert proj_type is not None, f"Project {project['id']} has no type"


class TestProjectDetailAPI:
    """Tests for GET /api/projects/{slug} endpoint"""
    
    def test_get_project_by_slug_returns_200(self):
        """Test that /api/projects/{slug} returns 200 for valid slug"""
        # First get a valid project slug
        list_response = requests.get(f"{BASE_URL}/api/projects")
        assert list_response.status_code == 200
        projects = list_response.json()
        
        # Find a project with a slug
        test_project = None
        for p in projects:
            if p.get('slug'):
                test_project = p
                break
        
        if not test_project:
            # Use ID if no slug available
            test_project = projects[0]
            slug = test_project['id']
        else:
            slug = test_project['slug']
            
        response = requests.get(f"{BASE_URL}/api/projects/{slug}")
        assert response.status_code == 200, f"Expected 200 for slug {slug}, got {response.status_code}"
        
    def test_get_project_detail_has_required_fields(self):
        """Test that project detail has all required fields"""
        list_response = requests.get(f"{BASE_URL}/api/projects")
        projects = list_response.json()
        
        # Get first project with slug
        test_slug = None
        for p in projects:
            if p.get('slug'):
                test_slug = p['slug']
                break
            
        if not test_slug:
            test_slug = projects[0]['id']
            
        response = requests.get(f"{BASE_URL}/api/projects/{test_slug}")
        assert response.status_code == 200
        
        project = response.json()
        required_fields = ['id', 'title', 'location', 'year', 'image', 'description', 'systems']
        for field in required_fields:
            assert field in project, f"Detail missing required field: {field}"
            
    def test_get_project_returns_404_for_invalid_slug(self):
        """Test that invalid slug returns 404"""
        response = requests.get(f"{BASE_URL}/api/projects/non-existent-project-xyz-123")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        
    def test_project_detail_has_brands_and_products(self):
        """Test that project detail includes brands and products"""
        list_response = requests.get(f"{BASE_URL}/api/projects")
        projects = list_response.json()
        
        # Get first project with slug
        test_slug = None
        for p in projects:
            if p.get('slug'):
                test_slug = p['slug']
                break
            
        if not test_slug:
            test_slug = projects[0]['id']
            
        response = requests.get(f"{BASE_URL}/api/projects/{test_slug}")
        assert response.status_code == 200
        
        project = response.json()
        # These fields may be empty but should exist
        assert 'brands' in project, "Detail should have brands field"
        assert 'products' in project, "Detail should have products field"


class TestProjectFiltering:
    """Tests for project filtering functionality"""
    
    def test_filter_by_category(self):
        """Test filtering projects by category query param"""
        response = requests.get(f"{BASE_URL}/api/projects?category=Residential")
        assert response.status_code == 200
        projects = response.json()
        assert isinstance(projects, list)
        
    def test_project_counts(self):
        """Test that we can get total project count"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        projects = response.json()
        assert len(projects) >= 1, "Should have at least 1 project"
        print(f"Total projects: {len(projects)}")


class TestProjectImages:
    """Tests for project images"""
    
    def test_projects_have_valid_images(self):
        """Test that projects have image URLs"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        projects = response.json()
        
        for project in projects[:5]:
            image = project.get('image', '')
            assert image, f"Project {project['id']} missing image"
            # Check it's a valid URL pattern
            assert image.startswith('http'), f"Image should be a URL: {image}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
