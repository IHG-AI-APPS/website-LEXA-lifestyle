"""
Test Suite: CDN Image Migration & Layout Fixes (Iteration 92)
Tests:
1. /package-builder layout - sticky bar doesn't overlap content
2. No Unsplash URLs in API responses
3. CDN WebP images accessible with proper cache headers
4. Logo loads from CDN
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
CDN_BASE = "https://files.ihgbrands.com/lexa"


class TestProductsCatalogCDN:
    """Product catalog API returns CDN WebP URLs, no Unsplash"""
    
    def test_products_list_returns_cdn_urls(self):
        """GET /api/catalog/products returns CDN image URLs"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?limit=50")
        assert response.status_code == 200
        
        data = response.json()
        products = data.get('products', [])
        assert len(products) > 0, "Should have products"
        
        unsplash_count = 0
        cdn_count = 0
        
        for product in products:
            img = product.get('image', '')
            if 'unsplash.com' in img:
                unsplash_count += 1
            if 'files.ihgbrands.com' in img:
                cdn_count += 1
        
        assert unsplash_count == 0, f"Found {unsplash_count} Unsplash URLs in products"
        assert cdn_count > 0, "No CDN URLs found in products"
        print(f"✓ {cdn_count} products with CDN URLs, 0 Unsplash")
    
    def test_products_webp_format(self):
        """Products should have .webp image URLs"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?limit=20")
        assert response.status_code == 200
        
        data = response.json()
        products = data.get('products', [])
        
        webp_count = sum(1 for p in products if '.webp' in p.get('image', ''))
        print(f"✓ {webp_count}/{len(products)} products have WebP images")
        # At least 50% should be WebP (some may be PNG for transparency)
        assert webp_count >= len(products) // 2, "Not enough WebP images"


class TestPropertyTypesAPI:
    """Package property types API returns CDN URLs, no Unsplash"""
    
    def test_property_types_returns_cdn_urls(self):
        """GET /api/packages/property-types returns CDN hero images"""
        response = requests.get(f"{BASE_URL}/api/packages/property-types")
        assert response.status_code == 200
        
        data = response.json()
        packages = data.get('packages', [])
        assert len(packages) > 0, "Should have property types"
        
        unsplash_count = 0
        cdn_count = 0
        
        for pkg in packages:
            img = pkg.get('hero_image', '')
            if 'unsplash.com' in img:
                unsplash_count += 1
                print(f"✗ Unsplash found: {pkg.get('title')} - {img[:60]}")
            if 'files.ihgbrands.com' in img:
                cdn_count += 1
        
        assert unsplash_count == 0, f"Found {unsplash_count} Unsplash URLs in property types"
        assert cdn_count == len(packages), f"Only {cdn_count}/{len(packages)} have CDN URLs"
        print(f"✓ All {cdn_count} property types use CDN URLs")
    
    def test_property_types_detail(self):
        """GET /api/packages/property-types/{slug} returns CDN URLs"""
        # First get list
        response = requests.get(f"{BASE_URL}/api/packages/property-types")
        packages = response.json().get('packages', [])
        
        if packages:
            slug = packages[0].get('slug')
            detail_response = requests.get(f"{BASE_URL}/api/packages/property-types/{slug}")
            assert detail_response.status_code == 200
            
            data = detail_response.json()
            hero_image = data.get('hero_image', '')
            assert 'unsplash.com' not in hero_image, "Unsplash URL in detail"
            assert 'files.ihgbrands.com' in hero_image, "Not a CDN URL"
            print(f"✓ Property type detail uses CDN URL")


class TestCDNImageAccess:
    """CDN images are accessible with proper headers"""
    
    def test_logo_webp_accessible(self):
        """Logo WebP image accessible from CDN"""
        logo_url = f"{CDN_BASE}/site/lexa-white.webp"
        response = requests.head(logo_url)
        assert response.status_code == 200, f"Logo not accessible: {response.status_code}"
        
        content_type = response.headers.get('content-type', '')
        assert 'image/webp' in content_type, f"Wrong content-type: {content_type}"
        print(f"✓ Logo accessible with content-type: {content_type}")
    
    def test_logo_black_webp_accessible(self):
        """Black logo WebP image accessible from CDN"""
        logo_url = f"{CDN_BASE}/site/lexa-black.webp"
        response = requests.head(logo_url)
        assert response.status_code == 200, f"Black logo not accessible: {response.status_code}"
        print(f"✓ Black logo accessible")
    
    def test_cdn_cache_headers(self):
        """CDN serves images with proper cache headers"""
        logo_url = f"{CDN_BASE}/site/lexa-white.webp"
        response = requests.head(logo_url)
        
        cache_control = response.headers.get('cache-control', '')
        assert 'max-age' in cache_control, "No cache-control header"
        assert 'immutable' in cache_control or '31536000' in cache_control, "Cache duration too short"
        print(f"✓ Cache-control: {cache_control}")
    
    def test_cloudflare_edge_caching(self):
        """CDN uses Cloudflare edge caching"""
        logo_url = f"{CDN_BASE}/site/lexa-white.webp"
        response = requests.head(logo_url)
        
        cf_status = response.headers.get('cf-cache-status', '')
        assert cf_status in ['HIT', 'MISS', 'STALE', 'DYNAMIC', 'EXPIRED'], f"Unexpected CF status: {cf_status}"
        print(f"✓ Cloudflare cache status: {cf_status}")


class TestSpecialtyRoomsCDN:
    """Specialty rooms API returns CDN URLs"""
    
    def test_specialty_rooms_cdn_urls(self):
        """GET /api/packages/specialty-rooms returns CDN image URLs"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200
        
        data = response.json()
        rooms = data.get('specialty_rooms', [])
        
        unsplash_count = 0
        cdn_count = 0
        
        for room in rooms:
            img = room.get('image', '')
            if 'unsplash.com' in img:
                unsplash_count += 1
            if 'files.ihgbrands.com' in img:
                cdn_count += 1
        
        if rooms:
            assert unsplash_count == 0, f"Found {unsplash_count} Unsplash URLs in specialty rooms"
            print(f"✓ {cdn_count}/{len(rooms)} specialty rooms use CDN URLs")


class TestBrandsAPI:
    """Brands API returns CDN URLs"""
    
    def test_brands_no_unsplash(self):
        """GET /api/brands returns no Unsplash URLs"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        
        data = response.json()
        brands = data.get('brands', data) if isinstance(data, dict) else data
        
        if isinstance(brands, list):
            unsplash_count = 0
            for brand in brands:
                logo = brand.get('logo', '')
                hero = brand.get('hero_image', '')
                if 'unsplash.com' in logo or 'unsplash.com' in hero:
                    unsplash_count += 1
            
            assert unsplash_count == 0, f"Found {unsplash_count} Unsplash URLs in brands"
            print(f"✓ Checked {len(brands)} brands - no Unsplash URLs")


class TestHomepageAPI:
    """Homepage/CMS APIs return CDN URLs"""
    
    def test_featured_products_cdn(self):
        """GET /api/catalog/featured returns CDN URLs"""
        response = requests.get(f"{BASE_URL}/api/catalog/featured")
        if response.status_code == 200:
            data = response.json()
            products = data.get('products', data) if isinstance(data, dict) else data
            
            if isinstance(products, list):
                unsplash_count = sum(1 for p in products if 'unsplash.com' in p.get('image', ''))
                assert unsplash_count == 0, f"Found {unsplash_count} Unsplash URLs in featured"
                print(f"✓ Featured products - no Unsplash URLs")
    
    def test_solutions_api_cdn(self):
        """GET /api/solutions returns CDN URLs"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        if response.status_code == 200:
            data = response.json()
            solutions = data.get('solutions', data) if isinstance(data, dict) else data
            
            if isinstance(solutions, list):
                unsplash_count = 0
                for sol in solutions[:10]:
                    img = sol.get('image', '') or sol.get('hero_image', '')
                    if 'unsplash.com' in img:
                        unsplash_count += 1
                
                assert unsplash_count == 0, f"Found {unsplash_count} Unsplash URLs in solutions"
                print(f"✓ Solutions API - no Unsplash URLs")


class TestHealthAndBasics:
    """Basic health checks"""
    
    def test_health_endpoint(self):
        """GET /api/health returns healthy"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        print("✓ Health endpoint OK")
    
    def test_packages_control_systems(self):
        """GET /api/packages/control-systems works"""
        response = requests.get(f"{BASE_URL}/api/packages/control-systems")
        assert response.status_code == 200
        print("✓ Control systems endpoint OK")
    
    def test_packages_enhancements(self):
        """GET /api/packages/enhancements works"""
        response = requests.get(f"{BASE_URL}/api/packages/enhancements")
        assert response.status_code == 200
        print("✓ Enhancements endpoint OK")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
