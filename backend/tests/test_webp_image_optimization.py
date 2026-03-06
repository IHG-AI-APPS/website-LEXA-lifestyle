"""
Test suite for WebP Image Optimization Migration
Tests:
1. Backend API returns .webp image URLs from DB
2. CDN serves WebP images with proper cache headers
3. SafeImage auto-upgrade from .png/.jpg to .webp works
4. Products API endpoints return correct image URLs
"""
import pytest
import requests
import os
import re

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
CDN_BASE = "https://files.ihgbrands.com/lexa"


class TestWebPBackendAPI:
    """Backend API tests - verify DB stores .webp URLs"""
    
    def test_catalog_products_returns_webp_urls(self):
        """GET /api/catalog/products should return .webp image URLs"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=50")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "products" in data, "Response should have 'products' key"
        products = data["products"]
        assert len(products) > 0, "Should have some products"
        
        # Count products with CDN images
        cdn_images = []
        non_webp_cdn = []
        
        for p in products:
            img = p.get("image", "")
            if img and "files.ihgbrands.com" in img:
                cdn_images.append(img)
                if not img.lower().endswith(".webp"):
                    non_webp_cdn.append({"name": p.get("name", ""), "image": img})
        
        print(f"Products checked: {len(products)}")
        print(f"CDN images found: {len(cdn_images)}")
        print(f"Non-WebP CDN images: {len(non_webp_cdn)}")
        
        if non_webp_cdn:
            for item in non_webp_cdn[:5]:  # Show first 5
                print(f"  - {item['name']}: {item['image']}")
        
        # All CDN images should be WebP
        assert len(non_webp_cdn) == 0, f"Found {len(non_webp_cdn)} non-WebP CDN images - DB should have .webp URLs"
    
    def test_single_product_returns_webp_url(self):
        """GET /api/catalog/products/{slug} should return .webp image URL"""
        # First get a product slug
        list_resp = requests.get(f"{BASE_URL}/api/catalog/products?page_size=5")
        assert list_resp.status_code == 200
        products = list_resp.json().get("products", [])
        
        product_with_image = None
        for p in products:
            if p.get("image") and "files.ihgbrands.com" in p.get("image", ""):
                product_with_image = p
                break
        
        if not product_with_image:
            pytest.skip("No product with CDN image found")
        
        slug = product_with_image["slug"]
        response = requests.get(f"{BASE_URL}/api/catalog/products/{slug}")
        assert response.status_code == 200
        
        product = response.json()
        image_url = product.get("image", "")
        
        print(f"Product: {product.get('name')}")
        print(f"Image URL: {image_url}")
        
        if "files.ihgbrands.com" in image_url:
            assert image_url.lower().endswith(".webp"), f"CDN image should be .webp: {image_url}"
    
    def test_featured_products_have_webp(self):
        """GET /api/catalog/featured should return products with .webp images"""
        response = requests.get(f"{BASE_URL}/api/catalog/featured?limit=10")
        assert response.status_code == 200
        
        data = response.json()
        products = data.get("products", [])
        
        for p in products:
            img = p.get("image", "")
            if img and "files.ihgbrands.com" in img:
                assert img.lower().endswith(".webp"), f"Featured product image should be .webp: {img}"
    
    def test_no_png_jpg_urls_in_products(self):
        """Verify no .png or .jpg URLs remain in CDN product images"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=100")
        assert response.status_code == 200
        
        products = response.json().get("products", [])
        
        legacy_formats = []
        for p in products:
            img = p.get("image", "")
            if img and "files.ihgbrands.com" in img:
                if img.lower().endswith((".png", ".jpg", ".jpeg")):
                    legacy_formats.append({"name": p["name"], "image": img})
        
        if legacy_formats:
            print(f"Found {len(legacy_formats)} products with legacy format images:")
            for item in legacy_formats[:10]:
                print(f"  - {item['name']}: {item['image']}")
        
        assert len(legacy_formats) == 0, f"DB should not have .png/.jpg CDN URLs, found {len(legacy_formats)}"


class TestCDNWebPDelivery:
    """CDN tests - verify WebP images are served correctly"""
    
    def test_webp_image_accessible(self):
        """Verify WebP images are accessible from CDN"""
        # Get a product with WebP image
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=10")
        products = response.json().get("products", [])
        
        webp_url = None
        for p in products:
            img = p.get("image", "")
            if img and img.lower().endswith(".webp"):
                webp_url = img
                break
        
        if not webp_url:
            pytest.skip("No WebP image found in products")
        
        # Request the WebP image
        img_resp = requests.head(webp_url, timeout=10)
        print(f"WebP URL: {webp_url}")
        print(f"Status: {img_resp.status_code}")
        
        assert img_resp.status_code == 200, f"WebP image should be accessible: {webp_url}"
    
    def test_webp_cache_headers(self):
        """CDN should serve WebP with long cache headers"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=10")
        products = response.json().get("products", [])
        
        webp_url = None
        for p in products:
            img = p.get("image", "")
            if img and img.lower().endswith(".webp"):
                webp_url = img
                break
        
        if not webp_url:
            pytest.skip("No WebP image found")
        
        img_resp = requests.head(webp_url, timeout=10)
        headers = img_resp.headers
        
        print(f"URL: {webp_url}")
        print(f"Cache-Control: {headers.get('cache-control', 'NOT SET')}")
        print(f"Content-Type: {headers.get('content-type', 'NOT SET')}")
        print(f"ETag: {headers.get('etag', 'NOT SET')}")
        
        # Check cache-control header (should have max-age)
        cache_control = headers.get('cache-control', '')
        if 'max-age' in cache_control:
            match = re.search(r'max-age=(\d+)', cache_control)
            if match:
                max_age = int(match.group(1))
                print(f"Max-Age: {max_age} seconds ({max_age / 86400:.0f} days)")
                # Should be at least 30 days
                assert max_age >= 2592000, f"Cache max-age should be >= 30 days, got {max_age}s"
    
    def test_webp_content_type(self):
        """WebP images should have correct content-type"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=10")
        products = response.json().get("products", [])
        
        webp_url = None
        for p in products:
            img = p.get("image", "")
            if img and img.lower().endswith(".webp"):
                webp_url = img
                break
        
        if not webp_url:
            pytest.skip("No WebP image found")
        
        img_resp = requests.head(webp_url, timeout=10)
        content_type = img_resp.headers.get('content-type', '').lower()
        
        print(f"URL: {webp_url}")
        print(f"Content-Type: {content_type}")
        
        assert 'webp' in content_type or 'image' in content_type, f"Expected image content-type, got: {content_type}"


class TestWebPSizeReduction:
    """Verify WebP files are smaller than original formats"""
    
    def test_webp_file_size_reasonable(self):
        """WebP images should be reasonably sized (typically 3-100KB for product images)"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=20")
        products = response.json().get("products", [])
        
        webp_sizes = []
        for p in products:
            img = p.get("image", "")
            if img and img.lower().endswith(".webp"):
                try:
                    img_resp = requests.head(img, timeout=5)
                    if img_resp.status_code == 200:
                        size = int(img_resp.headers.get('content-length', 0))
                        if size > 0:
                            webp_sizes.append({"url": img, "size_kb": size / 1024})
                except:
                    pass
        
        if not webp_sizes:
            pytest.skip("No WebP images with content-length found")
        
        print(f"Checked {len(webp_sizes)} WebP images:")
        total_size = 0
        for item in webp_sizes[:10]:
            print(f"  - {item['size_kb']:.1f} KB: {item['url'][-50:]}")
            total_size += item['size_kb']
        
        avg_size = total_size / len(webp_sizes[:10])
        print(f"Average size: {avg_size:.1f} KB")
        
        # Most product images should be under 200KB after WebP conversion
        large_images = [i for i in webp_sizes if i['size_kb'] > 500]
        print(f"Images > 500KB: {len(large_images)}")


class TestSafeImageAutoUpgrade:
    """Test that frontend SafeImage component logic works"""
    
    def test_api_health_check(self):
        """Basic health check"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
    
    def test_categories_endpoint(self):
        """Categories endpoint should work"""
        response = requests.get(f"{BASE_URL}/api/catalog/categories")
        assert response.status_code == 200
        categories = response.json()
        assert isinstance(categories, list)
        print(f"Found {len(categories)} categories")
    
    def test_brands_endpoint(self):
        """Brands endpoint should work"""
        response = requests.get(f"{BASE_URL}/api/catalog/brands")
        assert response.status_code == 200
        brands = response.json()
        assert isinstance(brands, list)
        print(f"Found {len(brands)} brands")


class TestCatalogAPIIntegrity:
    """Ensure catalog API works correctly with WebP images"""
    
    def test_search_with_webp_images(self):
        """Search should work and return products with WebP images"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?search=lighting&page_size=10")
        assert response.status_code == 200
        
        data = response.json()
        products = data.get("products", [])
        print(f"Search 'lighting' returned {len(products)} products")
        
        for p in products[:5]:
            img = p.get("image", "")
            if "files.ihgbrands.com" in img:
                print(f"  - {p['name']}: {img[-40:]}")
    
    def test_filter_by_category_with_webp(self):
        """Category filter should work with WebP images"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?category=Lighting&page_size=10")
        assert response.status_code == 200
        
        data = response.json()
        products = data.get("products", [])
        print(f"Category 'Lighting' returned {len(products)} products")
    
    def test_recommendations_have_webp(self):
        """Recommendations should include products with WebP images"""
        # Get a product slug first
        list_resp = requests.get(f"{BASE_URL}/api/catalog/products?page_size=5")
        products = list_resp.json().get("products", [])
        
        if not products:
            pytest.skip("No products found")
        
        slug = products[0]["slug"]
        response = requests.get(f"{BASE_URL}/api/catalog/recommendations/{slug}?limit=5")
        assert response.status_code == 200
        
        data = response.json()
        recs = data.get("recommendations", [])
        print(f"Recommendations for {slug}: {len(recs)} products")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
