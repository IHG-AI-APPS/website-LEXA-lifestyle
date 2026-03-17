"""
Comprehensive Backend CRUD Audit Test Suite
Tests all 30+ route files covering solutions, services, brands, projects, 
articles, news, catalogues, products, intelligence features, geo pages, 
locations, packages, CMS settings, bookings, submissions, and more.
"""
import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://health-check-deploy-3.preview.emergentagent.com').rstrip('/')

# ============= FIXTURES =============

@pytest.fixture(scope="module")
def auth_token():
    """Get JWT token from admin login"""
    response = requests.post(f"{BASE_URL}/api/admin/login", json={
        "username": "admin",
        "password": "lexa2026"
    })
    if response.status_code == 200:
        token = response.json().get("access_token")
        print(f"Auth token obtained: {token[:20]}...")
        return token
    else:
        pytest.fail(f"Admin login failed: {response.status_code} - {response.text}")

@pytest.fixture(scope="module")
def authenticated_headers(auth_token):
    """Headers with JWT auth"""
    return {
        "Authorization": f"Bearer {auth_token}",
        "Content-Type": "application/json"
    }

# ============= 1. ADMIN AUTHENTICATION =============

class TestAdminAuth:
    """Admin authentication tests"""
    
    def test_admin_login_success(self):
        """POST /api/admin/login - Valid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "access_token" in data, "No access_token in response"
        assert data.get("token_type") == "bearer", "Incorrect token_type"
        print("Admin login SUCCESS")
    
    def test_admin_login_invalid_credentials(self):
        """POST /api/admin/login - Invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "wrongpassword"
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("Invalid login correctly rejected")

    def test_admin_verify_token(self, authenticated_headers):
        """GET /api/admin/verify - Verify JWT token"""
        response = requests.get(f"{BASE_URL}/api/admin/verify", headers=authenticated_headers)
        assert response.status_code == 200, f"Token verification failed: {response.text}"
        data = response.json()
        assert data.get("valid") == True
        print("Token verification SUCCESS")

# ============= 2. SOLUTIONS CRUD =============

class TestSolutionsCRUD:
    """Solutions CRUD tests"""
    
    def test_get_solutions(self):
        """GET /api/solutions - Public read"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of solutions"
        print(f"GET /api/solutions: {len(data)} solutions found")
    
    def test_get_solution_by_slug(self):
        """GET /api/solutions/{slug} - Get single solution"""
        # First get all solutions to find a valid slug
        response = requests.get(f"{BASE_URL}/api/solutions")
        solutions = response.json()
        if solutions:
            slug = solutions[0].get("slug")
            if slug:
                response = requests.get(f"{BASE_URL}/api/solutions/{slug}")
                assert response.status_code == 200, f"Failed: {response.text}"
                data = response.json()
                assert data.get("slug") == slug
                print(f"GET /api/solutions/{slug} SUCCESS")
            else:
                pytest.skip("No slug in first solution")
        else:
            pytest.skip("No solutions in database")
    
    def test_crud_solution_full_cycle(self, authenticated_headers):
        """Full CRUD cycle: Create, Read, Update, Delete"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        solution_data = {
            "id": test_id,
            "slug": f"test-solution-{test_id}",
            "title": "TEST Solution CRUD",
            "category": "Test",
            "description": "Test solution for CRUD audit",
            "image": "https://example.com/test.jpg",
            "features": ["Feature 1", "Feature 2"],
            "brands": [],
            "tags": ["test"]
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/solutions", 
                                json=solution_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE solution: {test_id} SUCCESS")
        
        # READ - Verify via public API
        response = requests.get(f"{BASE_URL}/api/solutions/{solution_data['slug']}")
        assert response.status_code == 200, f"Read failed: {response.text}"
        data = response.json()
        assert data.get("title") == "TEST Solution CRUD"
        print("READ solution SUCCESS")
        
        # UPDATE
        solution_data["title"] = "TEST Solution UPDATED"
        response = requests.put(f"{BASE_URL}/api/admin/solutions/{test_id}", 
                               json=solution_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE solution SUCCESS")
        
        # VERIFY UPDATE
        response = requests.get(f"{BASE_URL}/api/solutions/{solution_data['slug']}")
        assert response.json().get("title") == "TEST Solution UPDATED"
        print("UPDATE verification SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/admin/solutions/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE solution SUCCESS")
        
        # VERIFY DELETE
        response = requests.get(f"{BASE_URL}/api/solutions/{solution_data['slug']}")
        assert response.status_code == 404, "Solution should be deleted"
        print("DELETE verification SUCCESS")

# ============= 3. SERVICES =============

class TestServicesCRUD:
    """Services tests"""
    
    def test_get_services(self):
        """GET /api/services - Public read"""
        response = requests.get(f"{BASE_URL}/api/services")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of services"
        print(f"GET /api/services: {len(data)} services found")
    
    def test_get_service_by_slug(self):
        """GET /api/services/{slug} - Get single service"""
        response = requests.get(f"{BASE_URL}/api/services")
        services = response.json()
        if services:
            slug = services[0].get("slug")
            if slug:
                response = requests.get(f"{BASE_URL}/api/services/{slug}")
                assert response.status_code == 200, f"Failed: {response.text}"
                print(f"GET /api/services/{slug} SUCCESS")
            else:
                pytest.skip("No slug in first service")
        else:
            pytest.skip("No services in database")

# ============= 4. PROJECTS CRUD =============

class TestProjectsCRUD:
    """Projects CRUD tests"""
    
    def test_get_projects(self):
        """GET /api/projects - Public read"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of projects"
        print(f"GET /api/projects: {len(data)} projects found")
    
    def test_get_project_by_id(self):
        """GET /api/projects/{id} - Get single project"""
        response = requests.get(f"{BASE_URL}/api/projects")
        projects = response.json()
        if projects:
            project_id = projects[0].get("id") or projects[0].get("slug")
            if project_id:
                response = requests.get(f"{BASE_URL}/api/projects/{project_id}")
                assert response.status_code == 200, f"Failed: {response.text}"
                print(f"GET /api/projects/{project_id} SUCCESS")
            else:
                pytest.skip("No ID in first project")
        else:
            pytest.skip("No projects in database")
    
    def test_crud_project_full_cycle(self, authenticated_headers):
        """Full CRUD cycle for projects"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        project_data = {
            "id": test_id,
            "slug": f"test-project-{test_id}",
            "title": "TEST Project CRUD",
            "location": "Dubai Test",
            "type": "Test Villa",
            "year": "2026",
            "image": "https://example.com/test.jpg",
            "systems": ["Lighting", "Security"],
            "description": "Test project for CRUD audit",
            "published": True
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/projects", 
                                json=project_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE project: {test_id} SUCCESS")
        
        # UPDATE
        project_data["title"] = "TEST Project UPDATED"
        response = requests.put(f"{BASE_URL}/api/admin/projects/{test_id}", 
                               json=project_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE project SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/admin/projects/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE project SUCCESS")

# ============= 5. BRANDS CRUD =============

class TestBrandsCRUD:
    """Brands CRUD tests"""
    
    def test_get_brands(self):
        """GET /api/brands - Public read"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of brands"
        print(f"GET /api/brands: {len(data)} brands found")
    
    def test_get_brand_by_slug(self):
        """GET /api/brands/{slug} - Get single brand"""
        response = requests.get(f"{BASE_URL}/api/brands")
        brands = response.json()
        if brands:
            slug = brands[0].get("slug")
            if slug:
                response = requests.get(f"{BASE_URL}/api/brands/{slug}")
                assert response.status_code == 200, f"Failed: {response.text}"
                print(f"GET /api/brands/{slug} SUCCESS")
            else:
                pytest.skip("No slug in first brand")
        else:
            pytest.skip("No brands in database")
    
    def test_crud_brand_full_cycle(self, authenticated_headers):
        """Full CRUD cycle for brands"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        brand_data = {
            "id": test_id,
            "slug": f"test-brand-{test_id}",
            "name": "TEST Brand CRUD",
            "logo": "https://example.com/logo.png",
            "description": "Test brand for CRUD audit",
            "categories": ["Test"],
            "featured": False
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/brands", 
                                json=brand_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE brand: {test_id} SUCCESS")
        
        # UPDATE
        brand_data["name"] = "TEST Brand UPDATED"
        response = requests.put(f"{BASE_URL}/api/admin/brands/{test_id}", 
                               json=brand_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE brand SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/admin/brands/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE brand SUCCESS")

# ============= 6. ARTICLES CRUD =============

class TestArticlesCRUD:
    """Articles CRUD tests"""
    
    def test_get_articles(self):
        """GET /api/articles - Public read"""
        response = requests.get(f"{BASE_URL}/api/articles")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of articles"
        print(f"GET /api/articles: {len(data)} articles found")
    
    def test_crud_article_full_cycle(self, authenticated_headers):
        """Full CRUD cycle for articles"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        article_data = {
            "id": test_id,
            "slug": f"test-article-{test_id}",
            "title": "TEST Article CRUD",
            "category": "Test",
            "excerpt": "Test excerpt",
            "content": "Test content for CRUD audit",
            "image": "https://example.com/test.jpg",
            "author": "Test Author",
            "read_time": 5,
            "published_date": "2026-02-26",
            "tags": ["test"]
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/articles", 
                                json=article_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE article: {test_id} SUCCESS")
        
        # UPDATE
        article_data["title"] = "TEST Article UPDATED"
        response = requests.put(f"{BASE_URL}/api/admin/articles/{test_id}", 
                               json=article_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE article SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/admin/articles/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE article SUCCESS")

# ============= 7. NEWS CRUD =============

class TestNewsCRUD:
    """News CRUD tests"""
    
    def test_crud_news_full_cycle(self, authenticated_headers):
        """Full CRUD cycle for news"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        news_data = {
            "id": test_id,
            "slug": f"test-news-{test_id}",
            "title": "TEST News CRUD",
            "excerpt": "Test news excerpt",
            "content": "Test news content for CRUD audit",
            "image": "https://example.com/test.jpg",
            "author": "Test Author",
            "published_date": "2026-02-26",
            "tags": ["test"],
            "featured": False
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/news", 
                                json=news_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE news: {test_id} SUCCESS")
        
        # UPDATE
        news_data["title"] = "TEST News UPDATED"
        response = requests.put(f"{BASE_URL}/api/admin/news/{test_id}", 
                               json=news_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE news SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/admin/news/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE news SUCCESS")

# ============= 8. PRODUCTS CRUD =============

class TestProductsCRUD:
    """Products/Product Categories CRUD tests"""
    
    def test_get_products(self):
        """GET /api/products - Public read"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of products"
        print(f"GET /api/products: {len(data)} products found")
    
    def test_crud_product_full_cycle(self, authenticated_headers):
        """Full CRUD cycle for products"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        product_data = {
            "id": test_id,
            "slug": f"test-product-{test_id}",
            "name": "TEST Product CRUD",
            "description": "Test product for CRUD audit",
            "image": "https://example.com/test.jpg",
            "brands": [],
            "related_solutions": [],
            "specifications": [],
            "featured": False
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/products", 
                                json=product_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE product: {test_id} SUCCESS")
        
        # UPDATE
        product_data["name"] = "TEST Product UPDATED"
        response = requests.put(f"{BASE_URL}/api/admin/products/{test_id}", 
                               json=product_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE product SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/admin/products/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE product SUCCESS")

# ============= 9. CATALOGUES CRUD =============

class TestCataloguesCRUD:
    """Catalogues CRUD tests"""
    
    def test_get_catalogues(self):
        """GET /api/catalogues - Public read"""
        response = requests.get(f"{BASE_URL}/api/catalogues")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of catalogues"
        print(f"GET /api/catalogues: {len(data)} catalogues found")
    
    def test_get_admin_catalogues(self, authenticated_headers):
        """GET /api/admin/catalogues - Admin read"""
        response = requests.get(f"{BASE_URL}/api/admin/catalogues", headers=authenticated_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of catalogues"
        print(f"GET /api/admin/catalogues: {len(data)} catalogues found")
    
    def test_crud_catalogue_full_cycle(self, authenticated_headers):
        """Full CRUD cycle for catalogues"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        catalogue_data = {
            "id": test_id,
            "slug": f"test-catalogue-{test_id}",
            "title": "TEST Catalogue CRUD",
            "description": "Test catalogue for CRUD audit",
            "thumbnail_url": "https://example.com/test.jpg",
            "pdf_url": "https://example.com/test.pdf",
            "category": "Test",
            "brand_slug": "test-brand",
            "published": True,
            "priority": 100
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/catalogues", 
                                json=catalogue_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE catalogue: {test_id} SUCCESS")
        
        # UPDATE
        catalogue_data["title"] = "TEST Catalogue UPDATED"
        response = requests.put(f"{BASE_URL}/api/admin/catalogues/{test_id}", 
                               json=catalogue_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE catalogue SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/admin/catalogues/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE catalogue SUCCESS")

# ============= 10. CMS SETTINGS =============

class TestCMSSettings:
    """CMS Settings tests"""
    
    def test_get_all_settings(self):
        """GET /api/settings - Public read"""
        response = requests.get(f"{BASE_URL}/api/settings")
        assert response.status_code == 200, f"Failed: {response.text}"
        print("GET /api/settings SUCCESS")
    
    def test_get_setting_by_key(self):
        """GET /api/settings/{key} - Get specific setting"""
        response = requests.get(f"{BASE_URL}/api/settings/homepage_stats")
        assert response.status_code == 200, f"Failed: {response.text}"
        print("GET /api/settings/homepage_stats SUCCESS")
    
    def test_update_setting(self, authenticated_headers):
        """PUT /api/admin/settings/{key} - Update setting"""
        test_key = f"test_setting_{uuid.uuid4().hex[:8]}"
        
        response = requests.put(f"{BASE_URL}/api/admin/settings/{test_key}", 
                               json={"value": {"test": "data"}}, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print(f"PUT /api/admin/settings/{test_key} SUCCESS")
        
        # Verify
        response = requests.get(f"{BASE_URL}/api/settings/{test_key}")
        assert response.status_code == 200

# ============= 11. VIDEOS CRUD =============

class TestVideosCRUD:
    """Videos CRUD tests"""
    
    def test_get_videos(self):
        """GET /api/videos - Public read"""
        response = requests.get(f"{BASE_URL}/api/videos")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of videos"
        print(f"GET /api/videos: {len(data)} videos found")
    
    def test_crud_video_full_cycle(self, authenticated_headers):
        """Full CRUD cycle for videos"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        video_data = {
            "id": test_id,
            "title": "TEST Video CRUD",
            "description": "Test video for CRUD audit",
            "video_url": "https://youtube.com/test",
            "thumbnail_url": "https://example.com/test.jpg",
            "duration": "3:45",
            "category": "test",
            "tags": ["test"],
            "featured": False,
            "view_count": 0,
            "published_date": "2026-02-26"
        }
        
        response = requests.post(f"{BASE_URL}/api/admin/videos", 
                                json=video_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE video: {test_id} SUCCESS")
        
        # UPDATE
        video_data["title"] = "TEST Video UPDATED"
        response = requests.put(f"{BASE_URL}/api/admin/videos/{test_id}", 
                               json=video_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE video SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/admin/videos/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE video SUCCESS")

# ============= 12. INTELLIGENCE FEATURES =============

class TestIntelligenceFeatures:
    """Intelligence Features CRUD tests"""
    
    def test_get_intelligence_features(self):
        """GET /api/intelligence/features - Public read"""
        response = requests.get(f"{BASE_URL}/api/intelligence/features")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "features" in data, "Expected 'features' key in response"
        print(f"GET /api/intelligence/features: {len(data['features'])} features found")
    
    def test_get_feature_categories(self):
        """GET /api/intelligence/features/categories - Get categories"""
        response = requests.get(f"{BASE_URL}/api/intelligence/features/categories")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "categories" in data, "Expected 'categories' key"
        print(f"GET /api/intelligence/features/categories: {len(data['categories'])} categories")
    
    def test_crud_intelligence_feature(self, authenticated_headers):
        """Full CRUD cycle for intelligence features"""
        test_id = f"test-{uuid.uuid4().hex[:8]}"
        
        # CREATE - IntelligenceFeature model requires: title, icon, short_description, 
        # detailed_description, scoring_category (not just 'name' and 'description')
        feature_data = {
            "id": test_id,
            "slug": f"test-feature-{test_id}",
            "title": "TEST Intelligence Feature",
            "category": "scene_automation",
            "icon": "Wand2",
            "short_description": "Test feature short desc",
            "detailed_description": "Test feature detailed description for CRUD audit",
            "iq_points": 5,
            "scoring_category": "automation_coverage",
            "featured": False,
            "display_order": 999,
            "scenarios": [],
            "benefits": [],
            "required_devices": [],
            "compatible_systems": [],
            "lifestyle_tags": [],
            "is_premium": False
        }
        
        response = requests.post(f"{BASE_URL}/api/intelligence/admin/features", 
                                json=feature_data, 
                                headers=authenticated_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE intelligence feature: {test_id} SUCCESS")
        
        # UPDATE
        feature_data["title"] = "TEST Feature UPDATED"
        response = requests.put(f"{BASE_URL}/api/intelligence/admin/features/{test_id}", 
                               json=feature_data, 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE intelligence feature SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/intelligence/admin/features/{test_id}", 
                                   headers=authenticated_headers)
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE intelligence feature SUCCESS")

# ============= 13. GEO PAGES =============

class TestGeoPages:
    """Geo Pages CRUD tests"""
    
    def test_get_geo_pages(self):
        """GET /api/geo-pages - Public read"""
        response = requests.get(f"{BASE_URL}/api/geo-pages")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "geo_pages" in data, "Expected 'geo_pages' key"
        print(f"GET /api/geo-pages: {len(data['geo_pages'])} pages found")
    
    def test_crud_geo_page_full_cycle(self):
        """Full CRUD cycle for geo pages (no auth required based on routes)"""
        test_slug = f"dubai/test-page-{uuid.uuid4().hex[:8]}"
        
        # CREATE
        geo_data = {
            "slug": test_slug,
            "locationName": "TEST Geo Page",
            "region": "Dubai",
            "heroTitle": "Smart Homes Test",
            "heroHighlight": "Testing",
            "active": True
        }
        
        response = requests.post(f"{BASE_URL}/api/geo-pages", json=geo_data)
        assert response.status_code == 200, f"Create failed: {response.text}"
        print(f"CREATE geo page: {test_slug} SUCCESS")
        
        # READ
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{test_slug}")
        assert response.status_code == 200, f"Read failed: {response.text}"
        print("READ geo page SUCCESS")
        
        # UPDATE
        geo_data["heroTitle"] = "Smart Homes UPDATED"
        response = requests.put(f"{BASE_URL}/api/geo-pages/slug/{test_slug}", json=geo_data)
        assert response.status_code == 200, f"Update failed: {response.text}"
        print("UPDATE geo page SUCCESS")
        
        # DELETE
        response = requests.delete(f"{BASE_URL}/api/geo-pages/slug/{test_slug}")
        assert response.status_code == 200, f"Delete failed: {response.text}"
        print("DELETE geo page SUCCESS")

# ============= 14. LOCATIONS =============

class TestLocations:
    """Locations tests"""
    
    def test_get_locations(self):
        """GET /api/locations - Public read"""
        response = requests.get(f"{BASE_URL}/api/locations")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "locations" in data, "Expected 'locations' key"
        print(f"GET /api/locations: {len(data['locations'])} locations found")

# ============= 15. PACKAGES =============

class TestPackages:
    """Packages tests"""
    
    def test_get_property_types(self):
        """GET /api/packages/property-types"""
        response = requests.get(f"{BASE_URL}/api/packages/property-types")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "packages" in data, "Expected 'packages' key"
        print(f"GET /api/packages/property-types: {len(data['packages'])} packages")
    
    def test_get_specialty_rooms(self):
        """GET /api/packages/specialty-rooms"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "specialty_rooms" in data, "Expected 'specialty_rooms' key"
        print(f"GET /api/packages/specialty-rooms: {len(data['specialty_rooms'])} rooms")
    
    def test_get_enhancements(self):
        """GET /api/packages/enhancements"""
        response = requests.get(f"{BASE_URL}/api/packages/enhancements")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "enhancements" in data, "Expected 'enhancements' key"
        print(f"GET /api/packages/enhancements: {len(data['enhancements'])} enhancements")
    
    def test_get_control_systems(self):
        """GET /api/packages/control-systems"""
        response = requests.get(f"{BASE_URL}/api/packages/control-systems")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "control_systems" in data, "Expected 'control_systems' key"
        print(f"GET /api/packages/control-systems: {len(data['control_systems'])} systems")
    
    def test_get_brand_options(self):
        """GET /api/packages/brand-options"""
        response = requests.get(f"{BASE_URL}/api/packages/brand-options")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "brand_options" in data, "Expected 'brand_options' key"
        print(f"GET /api/packages/brand-options: {len(data['brand_options'])} options")

# ============= 16. BOOKINGS =============

class TestBookings:
    """Bookings/Consultation tests"""
    
    def test_consultation_booking(self):
        """POST /api/consultation - Submit consultation"""
        booking_data = {
            "name": "TEST User Audit",
            "email": "testaudit@example.com",
            "phone": "+971501234567",
            "message": "Test booking for CRUD audit",
            "persona": "homeowner"
        }
        
        response = requests.post(f"{BASE_URL}/api/consultation", json=booking_data)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "id" in data, "Expected booking ID in response"
        print(f"POST /api/consultation SUCCESS - ID: {data.get('id')}")
    
    def test_contact_booking(self):
        """POST /api/contact/booking - Modal booking"""
        booking_data = {
            "name": "TEST User Modal",
            "email": "testmodal@example.com",
            "phone": "+971501234567",
            "preferredDate": "2026-03-01",
            "preferredTime": "10:00",
            "message": "Test modal booking",
            "bookingType": "site-visit"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact/booking", json=booking_data)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "id" in data, "Expected booking ID in response"
        print(f"POST /api/contact/booking SUCCESS - ID: {data.get('id')}")

# ============= 17. SUBMISSIONS =============

class TestSubmissions:
    """Form submissions tests"""
    
    def test_contact_submission(self):
        """POST /api/contact - Contact form"""
        contact_data = {
            "name": "TEST Contact Audit",
            "email": "testcontact@example.com",
            "phone": "+971501234567",
            "subject": "Test Subject",
            "message": "Test message for CRUD audit"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=contact_data)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "id" in data, "Expected submission ID"
        print(f"POST /api/contact SUCCESS - ID: {data.get('id')}")

# ============= 18. ADMIN STATS =============

class TestAdminStats:
    """Admin statistics tests"""
    
    def test_get_admin_stats(self, authenticated_headers):
        """GET /api/admin/stats - Dashboard stats"""
        response = requests.get(f"{BASE_URL}/api/admin/stats", headers=authenticated_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "solutions_count" in data, "Expected 'solutions_count'"
        assert "projects_count" in data, "Expected 'projects_count'"
        print(f"GET /api/admin/stats SUCCESS - {data}")

# ============= 19. ADMIN SUBMISSIONS =============

class TestAdminSubmissions:
    """Admin submissions viewer tests"""
    
    def test_get_consultation_submissions(self, authenticated_headers):
        """GET /api/admin/submissions/consultations"""
        response = requests.get(f"{BASE_URL}/api/admin/submissions/consultations", 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of submissions"
        print(f"GET /api/admin/submissions/consultations: {len(data)} submissions")
    
    def test_get_contact_submissions(self, authenticated_headers):
        """GET /api/admin/submissions/contacts"""
        response = requests.get(f"{BASE_URL}/api/admin/submissions/contacts", 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of submissions"
        print(f"GET /api/admin/submissions/contacts: {len(data)} submissions")

# ============= 20. PRICING =============

class TestPricing:
    """Pricing API tests"""
    
    def test_get_all_pricing(self):
        """GET /api/pricing/all"""
        response = requests.get(f"{BASE_URL}/api/pricing/all")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, dict), "Expected pricing config object"
        print(f"GET /api/pricing/all SUCCESS - keys: {list(data.keys())}")
    
    def test_get_calculator_solutions(self):
        """GET /api/pricing/calculator-solutions"""
        response = requests.get(f"{BASE_URL}/api/pricing/calculator-solutions")
        assert response.status_code == 200, f"Failed: {response.text}"
        print("GET /api/pricing/calculator-solutions SUCCESS")
    
    def test_get_budget_ranges(self):
        """GET /api/pricing/budget-ranges"""
        response = requests.get(f"{BASE_URL}/api/pricing/budget-ranges")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert isinstance(data, list), "Expected list of budget ranges"
        print(f"GET /api/pricing/budget-ranges: {len(data)} ranges")

# ============= 21. CALCULATOR =============

class TestCalculator:
    """Calculator API tests"""
    
    def test_calculator_estimate(self):
        """POST /api/calculator/cost - Basic estimate"""
        calc_data = {
            "property_type": "villa",
            "square_footage": 3000,
            "systems": ["lighting", "security", "climate"]
        }
        
        response = requests.post(f"{BASE_URL}/api/calculator/cost", json=calc_data)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "estimated_cost_min" in data, "Expected estimated_cost_min"
        assert "estimated_cost_max" in data, "Expected estimated_cost_max"
        print(f"POST /api/calculator/cost SUCCESS - Range: {data['estimated_cost_min']}-{data['estimated_cost_max']}")

# ============= 22. SEO =============

class TestSEO:
    """SEO schema tests"""
    
    def test_get_organization_schema(self):
        """GET /api/seo/schema/organization"""
        response = requests.get(f"{BASE_URL}/api/seo/schema/organization")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "@context" in data, "Expected JSON-LD @context"
        assert data.get("@type") == "LocalBusiness", "Expected LocalBusiness type"
        print("GET /api/seo/schema/organization SUCCESS")
    
    def test_get_sitemap_data(self):
        """GET /api/seo/sitemap-data"""
        response = requests.get(f"{BASE_URL}/api/seo/sitemap-data")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "static_pages" in data, "Expected static_pages key"
        print(f"GET /api/seo/sitemap-data SUCCESS - Static pages: {len(data.get('static_pages', []))}")

# ============= 23. ADMIN CONTENT =============

class TestAdminContent:
    """Admin content management tests"""
    
    def test_get_admin_content_solutions(self, authenticated_headers):
        """GET /api/admin/content/solutions"""
        response = requests.get(f"{BASE_URL}/api/admin/content/solutions", 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "success" in data or "data" in data, "Expected success or data key"
        print("GET /api/admin/content/solutions SUCCESS")
    
    def test_get_admin_content_settings(self, authenticated_headers):
        """GET /api/admin/content/settings"""
        response = requests.get(f"{BASE_URL}/api/admin/content/settings", 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        print("GET /api/admin/content/settings SUCCESS")

# ============= 24. ADMIN SYSTEM =============

class TestAdminSystem:
    """Admin system health tests"""
    
    def test_get_system_health(self, authenticated_headers):
        """GET /api/admin/system/health"""
        response = requests.get(f"{BASE_URL}/api/admin/system/health", 
                               headers=authenticated_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "status" in data, "Expected status key"
        assert "database" in data, "Expected database key"
        print(f"GET /api/admin/system/health SUCCESS - Status: {data.get('status')}")
    
    def test_get_system_version(self):
        """GET /api/admin/system/version"""
        response = requests.get(f"{BASE_URL}/api/admin/system/version")
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        assert "version" in data, "Expected version key"
        print(f"GET /api/admin/system/version SUCCESS - Version: {data.get('version')}")


# ============= RUN TESTS =============

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
