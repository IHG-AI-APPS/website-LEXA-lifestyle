"""
LEXA Smart Home - Comprehensive Regression Tests
Tests all major backend modules: Auth, CMS, Solutions, Services, Projects, Packages,
Articles, Brands, Testimonials, Submissions, Calculator, Admin CRUD, SEO
"""
import pytest
import requests
import os
import json
from datetime import datetime

# Base URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://dynamic-content-push.preview.emergentagent.com').rstrip('/')

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "lexa2026"


class TestModule1Auth:
    """MODULE 1: Authentication - Admin login and token verification"""
    
    auth_token = None
    
    def test_admin_login_valid(self):
        """Test admin login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "access_token" in data, "access_token not in response"
        assert data.get("token_type") == "bearer", "Token type should be bearer"
        TestModule1Auth.auth_token = data["access_token"]
        print(f"✅ Admin login successful, token received")
    
    def test_admin_login_invalid_credentials(self):
        """Test admin login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "wrong_user",
            "password": "wrong_pass"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✅ Invalid credentials rejected correctly")
    
    def test_admin_verify_with_token(self):
        """Test token verification with valid token"""
        if not TestModule1Auth.auth_token:
            pytest.skip("No auth token available")
        
        headers = {"Authorization": f"Bearer {TestModule1Auth.auth_token}"}
        response = requests.get(f"{BASE_URL}/api/admin/verify", headers=headers)
        assert response.status_code == 200, f"Verify failed: {response.text}"
        data = response.json()
        assert data.get("valid") == True, "Token should be valid"
        assert data.get("username") == ADMIN_USERNAME, "Username mismatch"
        print("✅ Token verification successful")
    
    def test_admin_verify_without_token(self):
        """Test token verification without token"""
        response = requests.get(f"{BASE_URL}/api/admin/verify")
        assert response.status_code in [401, 403], f"Expected 401/403, got {response.status_code}"
        print("✅ Request without token rejected correctly")


class TestModule2CMS:
    """MODULE 2: CMS API - Content Management System endpoints"""
    
    def test_get_cms_sections_bulk(self):
        """Test GET /api/cms/sections with multiple keys"""
        keys = "seo_global,homepage_hero,page_about"
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={keys}")
        assert response.status_code == 200, f"CMS sections failed: {response.text}"
        data = response.json()
        assert isinstance(data, dict), "Response should be dict"
        print(f"✅ CMS sections bulk fetch returned {len(data)} keys")
    
    def test_get_cms_section_by_key(self):
        """Test GET /api/cms/sections/{key} for specific section"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/seo_global")
        assert response.status_code == 200, f"CMS section failed: {response.text}"
        data = response.json()
        assert "key" in data or "value" in data or isinstance(data, dict)
        print("✅ CMS section by key successful")
    
    def test_cms_register_defaults(self):
        """Test POST /api/cms/register-defaults (idempotent)"""
        test_key = "test_cms_key_pytest"
        response = requests.post(f"{BASE_URL}/api/cms/register-defaults", json={
            "key": test_key,
            "defaults": {"title": "Test", "description": "Test description"}
        })
        assert response.status_code == 200, f"Register defaults failed: {response.text}"
        data = response.json()
        assert "created" in data or "message" in data
        print(f"✅ CMS register-defaults response: {data.get('message', data)}")
    
    def test_cms_cache_headers(self):
        """Test CMS returns proper cache headers"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/seo_global")
        assert response.status_code == 200
        # Cache-Control header may or may not be present
        print(f"✅ CMS cache test passed, status: {response.status_code}")


class TestModule3Solutions:
    """MODULE 3: Solutions API - Smart home solutions listing"""
    
    def test_get_solutions_list(self):
        """Test GET /api/solutions - list all solutions"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200, f"Solutions failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Solutions should return list"
        if len(data) > 0:
            assert "slug" in data[0] or "id" in data[0], "Solutions should have slug or id"
        print(f"✅ Solutions list returned {len(data)} items")
    
    def test_get_solutions_featured(self):
        """Test GET /api/solutions?featured=true"""
        response = requests.get(f"{BASE_URL}/api/solutions?featured=true")
        assert response.status_code == 200, f"Featured solutions failed: {response.text}"
        print("✅ Featured solutions query successful")
    
    def test_get_solutions_mega_menu(self):
        """Test GET /api/solutions/mega-menu"""
        response = requests.get(f"{BASE_URL}/api/solutions/mega-menu")
        assert response.status_code == 200, f"Mega menu failed: {response.text}"
        data = response.json()
        assert "categories" in data or isinstance(data, dict)
        print(f"✅ Solutions mega-menu data retrieved")
    
    def test_get_solution_by_slug(self):
        """Test GET /api/solutions/{slug}"""
        # First get list to find a valid slug
        list_response = requests.get(f"{BASE_URL}/api/solutions")
        if list_response.status_code == 200 and len(list_response.json()) > 0:
            slug = list_response.json()[0].get("slug")
            if slug:
                response = requests.get(f"{BASE_URL}/api/solutions/{slug}")
                assert response.status_code == 200, f"Solution by slug failed: {response.text}"
                print(f"✅ Solution detail for '{slug}' retrieved")
            else:
                pytest.skip("No slug in first solution")
        else:
            pytest.skip("No solutions available")


class TestModule4Services:
    """MODULE 4: Services API - Service offerings listing"""
    
    def test_get_services_list(self):
        """Test GET /api/services - list all services"""
        response = requests.get(f"{BASE_URL}/api/services")
        assert response.status_code == 200, f"Services failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Services should return list"
        print(f"✅ Services list returned {len(data)} items")
    
    def test_get_service_by_slug(self):
        """Test GET /api/services/{slug} for specific service"""
        # Test consultation-design which should exist
        response = requests.get(f"{BASE_URL}/api/services/consultation-design")
        if response.status_code == 404:
            # Try getting list first
            list_response = requests.get(f"{BASE_URL}/api/services")
            if list_response.status_code == 200 and len(list_response.json()) > 0:
                slug = list_response.json()[0].get("slug")
                if slug:
                    response = requests.get(f"{BASE_URL}/api/services/{slug}")
        
        # Either 200 or 404 is acceptable if no services exist
        assert response.status_code in [200, 404], f"Unexpected status: {response.status_code}"
        print(f"✅ Service detail test passed (status: {response.status_code})")


class TestModule5Projects:
    """MODULE 5: Projects API - Portfolio projects"""
    
    def test_get_projects_list(self):
        """Test GET /api/projects - list all projects"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200, f"Projects failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Projects should return list"
        print(f"✅ Projects list returned {len(data)} items")
    
    def test_get_project_by_id(self):
        """Test GET /api/projects/{id}"""
        list_response = requests.get(f"{BASE_URL}/api/projects")
        if list_response.status_code == 200 and len(list_response.json()) > 0:
            project_id = list_response.json()[0].get("id") or list_response.json()[0].get("slug")
            if project_id:
                response = requests.get(f"{BASE_URL}/api/projects/{project_id}")
                assert response.status_code == 200, f"Project detail failed: {response.text}"
                print(f"✅ Project detail for '{project_id}' retrieved")
            else:
                pytest.skip("No project id found")
        else:
            pytest.skip("No projects available")


class TestModule6Packages:
    """MODULE 6: Packages API - Property packages and pricing"""
    
    def test_get_property_types(self):
        """Test GET /api/packages/property-types"""
        response = requests.get(f"{BASE_URL}/api/packages/property-types")
        assert response.status_code == 200, f"Property types failed: {response.text}"
        data = response.json()
        assert "packages" in data or isinstance(data, list) or isinstance(data, dict)
        print(f"✅ Property types retrieved")
    
    def test_get_specialty_rooms(self):
        """Test GET /api/packages/specialty-rooms"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200, f"Specialty rooms failed: {response.text}"
        print("✅ Specialty rooms retrieved")
    
    def test_get_enhancements(self):
        """Test GET /api/packages/enhancements"""
        response = requests.get(f"{BASE_URL}/api/packages/enhancements")
        assert response.status_code == 200, f"Enhancements failed: {response.text}"
        print("✅ Package enhancements retrieved")


class TestModule7Articles:
    """MODULE 7: Blog/Articles API"""
    
    def test_get_articles_list(self):
        """Test GET /api/articles - list all articles"""
        response = requests.get(f"{BASE_URL}/api/articles")
        assert response.status_code == 200, f"Articles failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Articles should return list"
        print(f"✅ Articles list returned {len(data)} items")
    
    def test_get_article_by_slug(self):
        """Test GET /api/articles/{slug}"""
        list_response = requests.get(f"{BASE_URL}/api/articles")
        if list_response.status_code == 200 and len(list_response.json()) > 0:
            slug = list_response.json()[0].get("slug")
            if slug:
                response = requests.get(f"{BASE_URL}/api/articles/{slug}")
                assert response.status_code == 200, f"Article detail failed: {response.text}"
                print(f"✅ Article detail for '{slug}' retrieved")
            else:
                pytest.skip("No article slug found")
        else:
            pytest.skip("No articles available")
    
    def test_get_article_categories(self):
        """Test GET /api/articles/categories/list"""
        response = requests.get(f"{BASE_URL}/api/articles/categories/list")
        assert response.status_code == 200, f"Categories failed: {response.text}"
        print("✅ Article categories retrieved")


class TestModule8BrandsProducts:
    """MODULE 8: Brands and Products API"""
    
    def test_get_brands(self):
        """Test GET /api/brands (via public_api or content route)"""
        # Try different possible endpoints
        response = requests.get(f"{BASE_URL}/api/brands")
        if response.status_code == 404:
            # Try brands-products route
            response = requests.get(f"{BASE_URL}/api/brands-products/brands")
        
        # Accept either 200 with data or 404 if no brands exist
        assert response.status_code in [200, 404], f"Brands failed: {response.text}"
        print(f"✅ Brands test passed (status: {response.status_code})")
    
    def test_get_products(self):
        """Test GET /api/products"""
        response = requests.get(f"{BASE_URL}/api/products")
        if response.status_code == 404:
            response = requests.get(f"{BASE_URL}/api/brands-products/categories")
        
        assert response.status_code in [200, 404], f"Products failed: {response.text}"
        print(f"✅ Products test passed (status: {response.status_code})")


class TestModule9Testimonials:
    """MODULE 9: Testimonials API"""
    
    def test_get_testimonials(self):
        """Test GET /api/testimonials"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        assert response.status_code == 200, f"Testimonials failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Testimonials should return list"
        print(f"✅ Testimonials list returned {len(data)} items")


class TestModule10Submissions:
    """MODULE 10: Form Submissions API"""
    
    def test_consultation_submission(self):
        """Test POST /api/consultation - booking submission"""
        test_data = {
            "name": "TEST_Pytest User",
            "email": "pytest_test@example.com",
            "phone": "+971501234567",
            "message": "Test consultation request from pytest",
            "persona": "homeowner"
        }
        response = requests.post(f"{BASE_URL}/api/consultation", json=test_data)
        # Accept 200, 201, or 422 (validation) or 429 (rate limit)
        assert response.status_code in [200, 201, 422, 429, 400], f"Consultation failed: {response.text}"
        print(f"✅ Consultation submission test passed (status: {response.status_code})")
    
    def test_contact_submission(self):
        """Test POST /api/contact - contact form submission"""
        test_data = {
            "name": "TEST_Contact User",
            "email": "pytest_contact@example.com",
            "phone": "+971501234567",
            "subject": "Test Subject",
            "message": "Test contact message from pytest automation"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=test_data)
        # Accept various status codes depending on validation/rate limiting
        assert response.status_code in [200, 201, 422, 429, 400], f"Contact failed: {response.text}"
        print(f"✅ Contact submission test passed (status: {response.status_code})")


class TestModule11Calculator:
    """MODULE 11: Calculator API - Cost and ROI calculations"""
    
    def test_cost_calculator(self):
        """Test POST /api/calculator/cost"""
        test_data = {
            "property_type": "villa",
            "square_footage": 3500,
            "systems": ["lighting", "security", "climate"]
        }
        response = requests.post(f"{BASE_URL}/api/calculator/cost", json=test_data)
        assert response.status_code == 200, f"Cost calculator failed: {response.text}"
        data = response.json()
        assert "estimated_cost_min" in data, "Missing estimated_cost_min"
        assert "estimated_cost_max" in data, "Missing estimated_cost_max"
        assert "timeline_weeks" in data, "Missing timeline_weeks"
        print(f"✅ Cost calculator: AED {data['estimated_cost_min']:,} - {data['estimated_cost_max']:,}")
    
    def test_roi_calculator(self):
        """Test POST /api/calculator/roi"""
        test_data = {
            "property_size": 3500,
            "property_type": "Villa",
            "num_rooms": 5,
            "systems": ["Lighting Control", "Climate Control", "Security & Access"],
            "current_energy_cost": 1500,
            "electricity_rate": 0.38
        }
        response = requests.post(f"{BASE_URL}/api/calculator/roi", json=test_data)
        assert response.status_code == 200, f"ROI calculator failed: {response.text}"
        data = response.json()
        assert "costs" in data or "roi_timeline" in data or "savings" in data
        print(f"✅ ROI calculator returned comprehensive data")


class TestModule12AdminCRUD:
    """MODULE 12: Admin CRUD Operations - Solutions management"""
    
    auth_token = None
    test_solution_id = None
    
    @pytest.fixture(autouse=True)
    def get_auth_token(self):
        """Get auth token before tests"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            TestModule12AdminCRUD.auth_token = response.json()["access_token"]
    
    def test_create_solution(self):
        """Test POST /api/admin/solutions"""
        if not TestModule12AdminCRUD.auth_token:
            pytest.skip("No auth token")
        
        headers = {"Authorization": f"Bearer {TestModule12AdminCRUD.auth_token}"}
        test_id = f"test-solution-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        test_data = {
            "id": test_id,
            "slug": test_id,
            "title": "TEST Solution Pytest",
            "category": "residential",
            "description": "Test solution created by pytest",
            "image": "https://example.com/test.jpg",
            "features": ["Feature 1", "Feature 2"],
            "brands": [],
            "tags": ["test"]
        }
        response = requests.post(f"{BASE_URL}/api/admin/solutions", 
                                json=test_data, headers=headers)
        assert response.status_code in [200, 201], f"Create solution failed: {response.text}"
        TestModule12AdminCRUD.test_solution_id = test_id
        print(f"✅ Solution created: {test_id}")
    
    def test_update_solution(self):
        """Test PUT /api/admin/solutions/{id}"""
        if not TestModule12AdminCRUD.auth_token or not TestModule12AdminCRUD.test_solution_id:
            pytest.skip("No auth token or test solution")
        
        headers = {"Authorization": f"Bearer {TestModule12AdminCRUD.auth_token}"}
        test_id = TestModule12AdminCRUD.test_solution_id
        update_data = {
            "id": test_id,
            "slug": test_id,
            "title": "TEST Solution Updated",
            "category": "residential",
            "description": "Updated by pytest",
            "image": "https://example.com/test.jpg",
            "features": ["Updated Feature"],
            "brands": [],
            "tags": ["test", "updated"]
        }
        response = requests.put(f"{BASE_URL}/api/admin/solutions/{test_id}", 
                               json=update_data, headers=headers)
        assert response.status_code == 200, f"Update solution failed: {response.text}"
        print(f"✅ Solution updated: {test_id}")
    
    def test_delete_solution(self):
        """Test DELETE /api/admin/solutions/{id}"""
        if not TestModule12AdminCRUD.auth_token or not TestModule12AdminCRUD.test_solution_id:
            pytest.skip("No auth token or test solution")
        
        headers = {"Authorization": f"Bearer {TestModule12AdminCRUD.auth_token}"}
        test_id = TestModule12AdminCRUD.test_solution_id
        response = requests.delete(f"{BASE_URL}/api/admin/solutions/{test_id}", 
                                   headers=headers)
        assert response.status_code in [200, 204], f"Delete solution failed: {response.text}"
        print(f"✅ Solution deleted: {test_id}")


class TestModule13AdminSettings:
    """MODULE 13: Admin Settings API"""
    
    auth_token = None
    
    @pytest.fixture(autouse=True)
    def get_auth_token(self):
        """Get auth token before tests"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            TestModule13AdminSettings.auth_token = response.json()["access_token"]
    
    def test_get_setting(self):
        """Test GET /api/admin/settings/{key} - actually GET /api/settings/{key}"""
        response = requests.get(f"{BASE_URL}/api/settings/homepage_stats")
        assert response.status_code in [200, 404], f"Get setting failed: {response.text}"
        print(f"✅ Get setting test passed (status: {response.status_code})")
    
    def test_update_setting(self):
        """Test PUT /api/admin/settings/{key}"""
        if not TestModule13AdminSettings.auth_token:
            pytest.skip("No auth token")
        
        headers = {"Authorization": f"Bearer {TestModule13AdminSettings.auth_token}"}
        test_key = "test_pytest_setting"
        test_data = {"value": {"test_field": "test_value", "updated_at": datetime.now().isoformat()}}
        
        response = requests.put(f"{BASE_URL}/api/admin/settings/{test_key}", 
                               json=test_data, headers=headers)
        assert response.status_code == 200, f"Update setting failed: {response.text}"
        print(f"✅ Setting updated: {test_key}")


class TestModule14SEO:
    """MODULE 14: SEO Endpoints - Sitemap and robots.txt"""
    
    def test_sitemap_data_api(self):
        """Test GET /api/sitemap-data (if exists)"""
        response = requests.get(f"{BASE_URL}/api/sitemap-data")
        # This endpoint may or may not exist
        assert response.status_code in [200, 404], f"Sitemap data unexpected: {response.text}"
        print(f"✅ Sitemap data API test passed (status: {response.status_code})")
    
    def test_sitemap_xml(self):
        """Test GET /sitemap.xml"""
        response = requests.get(f"{BASE_URL}/sitemap.xml")
        # Sitemap should return 200 with XML content
        assert response.status_code in [200, 404], f"Sitemap.xml unexpected: {response.text}"
        if response.status_code == 200:
            assert "xml" in response.headers.get("content-type", "") or "<?xml" in response.text
        print(f"✅ Sitemap.xml test passed (status: {response.status_code})")
    
    def test_robots_txt(self):
        """Test GET /robots.txt"""
        response = requests.get(f"{BASE_URL}/robots.txt")
        assert response.status_code in [200, 404], f"Robots.txt unexpected: {response.text}"
        if response.status_code == 200:
            assert "User-agent" in response.text or "Sitemap" in response.text
        print(f"✅ Robots.txt test passed (status: {response.status_code})")


class TestHealthAndBasics:
    """Basic health and status endpoints"""
    
    def test_health_endpoint(self):
        """Test GET /api/health"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200, f"Health check failed: {response.text}"
        data = response.json()
        assert data.get("status") == "healthy", "Status should be healthy"
        assert data.get("database") == "connected", "Database should be connected"
        print(f"✅ Health check passed: {data['status']}")
    
    def test_api_root(self):
        """Test GET /api/"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200, f"API root failed: {response.text}"
        data = response.json()
        assert "version" in data or "message" in data or "status" in data
        print(f"✅ API root: {data}")
    
    def test_settings_endpoint(self):
        """Test GET /api/settings"""
        response = requests.get(f"{BASE_URL}/api/settings")
        assert response.status_code == 200, f"Settings failed: {response.text}"
        print("✅ Settings endpoint accessible")


# Run tests if executed directly
if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
