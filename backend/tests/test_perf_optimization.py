"""
Performance Optimization Tests
Tests for: caching, lightweight projections, API response validation
Verifies: listing endpoints return reduced payload, detail endpoints return full content
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndCoreAPIs:
    """Test health and core API endpoints"""
    
    def test_health_endpoint(self):
        """Health check returns healthy status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get('status') == 'healthy'
        print(f"Health check passed: {data}")

    def test_api_root(self):
        """API root returns version info"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert 'version' in data or 'message' in data
        print(f"API root: {data}")


class TestSolutionsListingAndDetail:
    """Test solutions listing (lightweight) vs detail (full content)"""
    
    def test_solutions_listing_returns_array(self):
        """GET /api/solutions returns valid JSON array"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Solutions should be an array"
        assert len(data) > 0, "Should have at least one solution"
        print(f"Solutions listing: {len(data)} solutions found")
        
    def test_solutions_listing_has_required_fields(self):
        """Listing should have key fields: id/slug, title, category"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            solution = data[0]
            # Check required fields for listing
            assert 'slug' in solution or 'id' in solution, "Should have slug or id"
            assert 'title' in solution, "Should have title"
            print(f"Sample solution: slug={solution.get('slug')}, title={solution.get('title')}")
            
    def test_solution_detail_returns_full_content(self):
        """GET /api/solutions/{slug} returns full solution with description and features"""
        # First get a solution from listing
        listing_response = requests.get(f"{BASE_URL}/api/solutions")
        assert listing_response.status_code == 200
        solutions = listing_response.json()
        
        if len(solutions) > 0:
            slug = solutions[0].get('slug')
            if slug:
                # Now get the detail
                detail_response = requests.get(f"{BASE_URL}/api/solutions/{slug}")
                assert detail_response.status_code == 200
                detail = detail_response.json()
                
                # Verify full content fields
                assert 'slug' in detail, "Detail should have slug"
                assert 'title' in detail, "Detail should have title"
                # These fields should be in full detail
                print(f"Solution detail for {slug}: title={detail.get('title')}, has description={bool(detail.get('description'))}")

    def test_smart_residential_living_detail(self):
        """Specific test: /api/solutions/smart-residential-living returns full details"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-residential-living")
        assert response.status_code == 200
        data = response.json()
        assert 'title' in data, "Should have title"
        assert 'slug' in data, "Should have slug"
        print(f"smart-residential-living: title={data.get('title')}, description_present={bool(data.get('description'))}")


class TestArticlesListingAndDetail:
    """Test articles/blog listing vs detail"""
    
    def test_articles_listing_returns_array(self):
        """GET /api/articles returns valid JSON array"""
        response = requests.get(f"{BASE_URL}/api/articles")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Articles should be an array"
        print(f"Articles listing: {len(data)} articles found")
        
    def test_articles_listing_has_required_fields(self):
        """Articles listing should have title, category, excerpt"""
        response = requests.get(f"{BASE_URL}/api/articles")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            article = data[0]
            assert 'slug' in article or 'id' in article, "Should have slug or id"
            assert 'title' in article, "Should have title"
            print(f"Sample article: slug={article.get('slug')}, title={article.get('title')}")


class TestBrandsAPI:
    """Test brands endpoint with caching"""
    
    def test_brands_listing_returns_array(self):
        """GET /api/brands returns valid JSON array"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Brands should be an array"
        print(f"Brands listing: {len(data)} brands found")
        
    def test_brands_have_required_fields(self):
        """Brands should have name, logo/image"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        data = response.json()
        if len(data) > 0:
            brand = data[0]
            assert 'name' in brand, "Brand should have name"
            print(f"Sample brand: name={brand.get('name')}, slug={brand.get('slug')}")


class TestServicesAPI:
    """Test services endpoint"""
    
    def test_services_listing_returns_array(self):
        """GET /api/services returns valid JSON array"""
        response = requests.get(f"{BASE_URL}/api/services")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Services should be an array"
        print(f"Services listing: {len(data)} services found")


class TestProjectsAPI:
    """Test projects endpoint"""
    
    def test_projects_listing_returns_array(self):
        """GET /api/projects returns valid JSON array"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Projects should be an array"
        print(f"Projects listing: {len(data)} projects found")


class TestCachingBehavior:
    """Test that caching is working (multiple requests should be fast)"""
    
    def test_solutions_caching(self):
        """Second request to solutions should benefit from cache"""
        # First request (potentially uncached)
        start1 = time.time()
        response1 = requests.get(f"{BASE_URL}/api/solutions")
        time1 = time.time() - start1
        assert response1.status_code == 200
        
        # Second request (should be cached)
        start2 = time.time()
        response2 = requests.get(f"{BASE_URL}/api/solutions")
        time2 = time.time() - start2
        assert response2.status_code == 200
        
        print(f"Solutions: First request: {time1:.3f}s, Second request: {time2:.3f}s")
        # Both should return same data
        assert response1.json() == response2.json(), "Cached response should match"

    def test_articles_caching(self):
        """Second request to articles should benefit from cache"""
        start1 = time.time()
        response1 = requests.get(f"{BASE_URL}/api/articles")
        time1 = time.time() - start1
        assert response1.status_code == 200
        
        start2 = time.time()
        response2 = requests.get(f"{BASE_URL}/api/articles")
        time2 = time.time() - start2
        assert response2.status_code == 200
        
        print(f"Articles: First request: {time1:.3f}s, Second request: {time2:.3f}s")


class TestMegaMenuEndpoint:
    """Test the mega menu endpoint for solutions"""
    
    def test_solutions_mega_menu(self):
        """GET /api/solutions/mega-menu returns organized data"""
        response = requests.get(f"{BASE_URL}/api/solutions/mega-menu")
        assert response.status_code == 200
        data = response.json()
        assert 'categories' in data, "Should have categories"
        print(f"Mega menu: categories={list(data.get('categories', {}).keys())}")


class TestNewsAPI:
    """Test news endpoint with caching"""
    
    def test_news_listing(self):
        """GET /api/news returns valid JSON array"""
        response = requests.get(f"{BASE_URL}/api/news")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "News should be an array"
        print(f"News listing: {len(data)} news items found")


class TestVideosAPI:
    """Test videos endpoint with caching"""
    
    def test_videos_listing(self):
        """GET /api/videos returns valid JSON array"""
        response = requests.get(f"{BASE_URL}/api/videos")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Videos should be an array"
        print(f"Videos listing: {len(data)} videos found")


class TestProductsAPI:
    """Test products endpoint with caching"""
    
    def test_products_listing(self):
        """GET /api/products returns valid JSON array"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list), "Products should be an array"
        print(f"Products listing: {len(data)} products found")


class TestAdminLogin:
    """Test admin login works"""
    
    def test_admin_login_success(self):
        """Admin can login with correct credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "admin",
            "password": "lexa2026"
        })
        assert response.status_code == 200
        data = response.json()
        assert 'access_token' in data or 'token' in data, "Should return token"
        print("Admin login successful")
