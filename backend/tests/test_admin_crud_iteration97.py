"""
Admin CRUD Tests for Projects and Blog/Articles - Iteration 97
Tests both Project CRUD and Blog CRUD functionality through API endpoints
"""

import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://cms-integration-dev.preview.emergentagent.com')

class TestAdminLogin:
    """Test admin authentication"""
    
    def test_admin_login_success(self):
        """Test that admin can login with correct credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "access_token" in data, "No access_token in response"
        print(f"✅ Admin login successful, token received")
        return data["access_token"]


class TestProjectCRUD:
    """Test Project CRUD operations via admin API"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get admin auth token"""
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
    
    def test_get_admin_projects(self, headers):
        """Test GET /api/admin/projects returns all projects"""
        response = requests.get(f"{BASE_URL}/api/admin/projects", headers=headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        projects = response.json()
        assert isinstance(projects, list), "Response should be a list"
        print(f"✅ Admin projects endpoint returned {len(projects)} projects")
        return len(projects)
    
    def test_create_project(self, headers):
        """Test POST /api/admin/projects creates a new project"""
        test_id = f"test-project-{uuid.uuid4().hex[:8]}"
        project_data = {
            "id": test_id,
            "slug": test_id,
            "title": "TEST_PROJECT_PLAYWRIGHT",
            "location": "Dubai Test Location",
            "type": "Residential",
            "year": "2026",
            "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "systems": ["Lighting", "Security"],
            "description": "Test project for CRUD verification",
            "published": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/projects", 
                                headers=headers, json=project_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        data = response.json()
        assert "message" in data, "No message in response"
        print(f"✅ Project created: {test_id}")
        return test_id
    
    def test_project_appears_in_list(self, headers):
        """Test that created project appears in admin list"""
        # First create a project
        test_id = f"test-verify-{uuid.uuid4().hex[:8]}"
        project_data = {
            "id": test_id,
            "slug": test_id,
            "title": "TEST_VERIFY_PROJECT",
            "location": "Dubai Verification",
            "type": "Commercial",
            "year": "2026",
            "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            "systems": [],
            "description": "Verification test",
            "published": True
        }
        
        create_resp = requests.post(f"{BASE_URL}/api/admin/projects", 
                                   headers=headers, json=project_data)
        assert create_resp.status_code == 200
        
        # Now verify it appears in list
        list_resp = requests.get(f"{BASE_URL}/api/admin/projects", headers=headers)
        assert list_resp.status_code == 200
        projects = list_resp.json()
        
        found = any(p.get('id') == test_id for p in projects)
        assert found, f"Created project {test_id} not found in list"
        print(f"✅ Project {test_id} verified in list")
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/projects/{test_id}", headers=headers)
        return test_id
    
    def test_delete_project(self, headers):
        """Test DELETE /api/admin/projects/{id} removes project"""
        # First create a project to delete
        test_id = f"test-delete-{uuid.uuid4().hex[:8]}"
        project_data = {
            "id": test_id,
            "slug": test_id,
            "title": "TEST_DELETE_PROJECT",
            "location": "Delete Test",
            "type": "Villa",
            "year": "2026",
            "image": "https://example.com/image.jpg",
            "systems": [],
            "published": True
        }
        
        create_resp = requests.post(f"{BASE_URL}/api/admin/projects", 
                                   headers=headers, json=project_data)
        assert create_resp.status_code == 200
        
        # Delete the project
        delete_resp = requests.delete(f"{BASE_URL}/api/admin/projects/{test_id}", 
                                     headers=headers)
        assert delete_resp.status_code == 200, f"Delete failed: {delete_resp.text}"
        
        # Verify it's gone
        list_resp = requests.get(f"{BASE_URL}/api/admin/projects", headers=headers)
        projects = list_resp.json()
        found = any(p.get('id') == test_id for p in projects)
        assert not found, f"Deleted project {test_id} still in list"
        
        print(f"✅ Project {test_id} deleted successfully")


class TestBlogCRUD:
    """Test Blog/Article CRUD operations via admin API"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get admin auth token"""
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
    
    def test_get_articles(self, headers):
        """Test GET /api/articles returns all articles"""
        response = requests.get(f"{BASE_URL}/api/articles?limit=100")
        assert response.status_code == 200, f"Failed: {response.text}"
        articles = response.json()
        assert isinstance(articles, list), "Response should be a list"
        print(f"✅ Articles endpoint returned {len(articles)} articles")
        return len(articles)
    
    def test_create_article(self, headers):
        """Test POST /api/admin/articles creates a new blog post"""
        test_id = f"blog-{uuid.uuid4().hex[:8]}"
        article_data = {
            "id": test_id,
            "slug": test_id,
            "title": "TEST_BLOG_POST_PLAYWRIGHT",
            "category": "smart-home",
            "excerpt": "Test blog post excerpt for verification",
            "content": "This is the full content of the test blog post. It contains multiple sentences to ensure the content field works correctly.",
            "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "author": "Test Author",
            "read_time": 5,
            "published_date": datetime.now().strftime("%Y-%m-%d"),
            "tags": ["test", "automation"],
            "published": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/articles", 
                                headers=headers, json=article_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        data = response.json()
        assert "message" in data, f"Unexpected response: {data}"
        print(f"✅ Blog post created: {test_id}")
        return test_id
    
    def test_article_appears_in_list(self, headers):
        """Test that created article appears in list"""
        test_id = f"blog-verify-{uuid.uuid4().hex[:8]}"
        article_data = {
            "id": test_id,
            "slug": test_id,
            "title": "TEST_VERIFY_BLOG",
            "category": "automation",
            "excerpt": "Verification test excerpt",
            "content": "Verification test content with enough words to be valid.",
            "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
            "author": "Test Author",
            "read_time": 3,
            "published_date": datetime.now().strftime("%Y-%m-%d"),
            "tags": ["test"],
            "published": True
        }
        
        create_resp = requests.post(f"{BASE_URL}/api/admin/articles", 
                                   headers=headers, json=article_data)
        assert create_resp.status_code == 200, f"Create failed: {create_resp.text}"
        
        # Verify it appears in list
        list_resp = requests.get(f"{BASE_URL}/api/articles?limit=100")
        assert list_resp.status_code == 200
        articles = list_resp.json()
        
        found = any(a.get('id') == test_id for a in articles)
        assert found, f"Created article {test_id} not found in list"
        print(f"✅ Article {test_id} verified in list")
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/admin/articles/{test_id}", headers=headers)
        return test_id
    
    def test_delete_article(self, headers):
        """Test DELETE /api/admin/articles/{id} removes article"""
        # First create an article to delete
        test_id = f"blog-delete-{uuid.uuid4().hex[:8]}"
        article_data = {
            "id": test_id,
            "slug": test_id,
            "title": "TEST_DELETE_BLOG",
            "category": "news",
            "excerpt": "Delete test excerpt",
            "content": "Delete test content that will be removed.",
            "image": "https://example.com/image.jpg",
            "author": "Test Author",
            "read_time": 2,
            "published_date": datetime.now().strftime("%Y-%m-%d"),
            "tags": [],
            "published": True
        }
        
        create_resp = requests.post(f"{BASE_URL}/api/admin/articles", 
                                   headers=headers, json=article_data)
        assert create_resp.status_code == 200
        
        # Delete the article
        delete_resp = requests.delete(f"{BASE_URL}/api/admin/articles/{test_id}", 
                                     headers=headers)
        assert delete_resp.status_code == 200, f"Delete failed: {delete_resp.text}"
        
        # Verify it's gone
        list_resp = requests.get(f"{BASE_URL}/api/articles?limit=200")
        articles = list_resp.json()
        found = any(a.get('id') == test_id for a in articles)
        assert not found, f"Deleted article {test_id} still in list"
        
        print(f"✅ Article {test_id} deleted successfully")


class TestCleanup:
    """Cleanup test data created during testing"""
    
    @pytest.fixture(scope="class")
    def headers(self):
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        return {
            "Authorization": f"Bearer {response.json()['access_token']}",
            "Content-Type": "application/json"
        }
    
    def test_cleanup_test_projects(self, headers):
        """Remove any TEST_ prefixed projects"""
        response = requests.get(f"{BASE_URL}/api/admin/projects", headers=headers)
        if response.status_code == 200:
            projects = response.json()
            test_projects = [p for p in projects if p.get('title', '').startswith('TEST_') or p.get('id', '').startswith('test-')]
            for project in test_projects:
                requests.delete(f"{BASE_URL}/api/admin/projects/{project['id']}", headers=headers)
            print(f"✅ Cleaned up {len(test_projects)} test projects")
    
    def test_cleanup_test_articles(self, headers):
        """Remove any TEST_ prefixed articles"""
        response = requests.get(f"{BASE_URL}/api/articles?limit=200")
        if response.status_code == 200:
            articles = response.json()
            test_articles = [a for a in articles if a.get('title', '').startswith('TEST_') or a.get('id', '').startswith('blog-')]
            for article in test_articles:
                requests.delete(f"{BASE_URL}/api/admin/articles/{article['id']}", headers=headers)
            print(f"✅ Cleaned up {len(test_articles)} test articles")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
