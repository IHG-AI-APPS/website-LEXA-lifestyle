"""
Test file for Image Migration and File Manager features (Iteration 90)
- Verifies all Emergent URLs replaced with files.ihgbrands.com CDN URLs
- Tests /api/uploads/management/list endpoint for File Manager
- Validates product images use CDN URLs
"""

import pytest
import requests
import os
import re

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
CDN_URL = "https://files.ihgbrands.com/lexa"
EMERGENT_URLS = ["static.prod-images.emergentagent.com", "emergentagent.com"]


class TestProductImageMigration:
    """Verify all product images use files.ihgbrands.com CDN URLs"""

    def test_products_endpoint_returns_cdn_urls(self):
        """GET /api/catalog/products should return images with CDN URLs"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page=1&page_size=50")
        assert response.status_code == 200
        
        data = response.json()
        assert "products" in data
        assert len(data["products"]) > 0
        
        # Check all products have CDN URLs
        for product in data["products"]:
            if product.get("image"):
                assert CDN_URL in product["image"], f"Product {product['name']} has non-CDN image: {product['image']}"
                for emergent_url in EMERGENT_URLS:
                    assert emergent_url not in product["image"], f"Product {product['name']} still has Emergent URL"

    def test_specific_product_has_cdn_url(self):
        """GET /api/catalog/products/{slug} should return CDN image URL"""
        response = requests.get(f"{BASE_URL}/api/catalog/products/sonos-arc-ultra-white")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("image"):
                assert CDN_URL in data["image"], f"Product image not from CDN: {data['image']}"
                for emergent_url in EMERGENT_URLS:
                    assert emergent_url not in data["image"]
        elif response.status_code == 404:
            pytest.skip("Product sonos-arc-ultra-white not found - checking alternative products")

    def test_no_emergent_urls_in_product_responses(self):
        """Verify no Emergent URLs in any product response"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page=1&page_size=100")
        assert response.status_code == 200
        
        # Convert entire response to string to check for Emergent URLs
        response_text = str(response.json())
        
        for emergent_url in EMERGENT_URLS:
            assert emergent_url not in response_text, f"Found Emergent URL '{emergent_url}' in product response"

    def test_product_count_and_pagination(self):
        """Verify products API returns expected data"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page=1&page_size=10")
        assert response.status_code == 200
        
        data = response.json()
        assert data["total"] > 200, f"Expected 200+ products, got {data['total']}"
        assert data["page"] == 1
        assert data["page_size"] == 10
        assert len(data["products"]) == 10


class TestFileManagementList:
    """Test /api/uploads/management/list endpoint for File Manager"""

    def test_management_list_returns_files(self):
        """GET /api/uploads/management/list should return file listing"""
        response = requests.get(f"{BASE_URL}/api/uploads/management/list", timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert "images" in data
        assert "categories" in data
        assert "total" in data
        assert "total_size" in data

    def test_management_list_file_count(self):
        """File listing should have 700+ files (migrated + original)"""
        response = requests.get(f"{BASE_URL}/api/uploads/management/list", timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        # Should have at least 700 files (735 mentioned in context)
        assert data["total"] >= 700, f"Expected 700+ files, got {data['total']}"

    def test_management_list_file_structure(self):
        """Each file should have required metadata fields"""
        response = requests.get(f"{BASE_URL}/api/uploads/management/list", timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["images"]) > 0
        
        # Check first file has all required fields
        first_file = data["images"][0]
        required_fields = ["filename", "category", "url", "size", "modified", "content_type", "extension"]
        
        for field in required_fields:
            assert field in first_file, f"Missing field '{field}' in file metadata"

    def test_management_list_cdn_urls(self):
        """All file URLs should point to files.ihgbrands.com"""
        response = requests.get(f"{BASE_URL}/api/uploads/management/list", timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        
        # Check sample of files have CDN URLs
        for file in data["images"][:50]:
            assert file["url"].startswith(CDN_URL), f"File URL not CDN: {file['url']}"

    def test_management_list_categories(self):
        """Should return list of file categories"""
        response = requests.get(f"{BASE_URL}/api/uploads/management/list", timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["categories"]) > 0, "Expected at least one category"
        
        # Should have 'migrated' and 'products' categories
        assert "migrated" in data["categories"] or "products" in data["categories"], \
            f"Expected 'migrated' or 'products' category, got {data['categories']}"

    def test_management_list_total_size(self):
        """Total size should be a positive number"""
        response = requests.get(f"{BASE_URL}/api/uploads/management/list", timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert data["total_size"] > 0, "Expected positive total size"
        # With 700+ image files, expect at least 100MB
        assert data["total_size"] > 100 * 1024 * 1024, f"Expected >100MB, got {data['total_size'] / (1024*1024):.1f}MB"


class TestCatalogsAndBrands:
    """Test catalogues and brands also use CDN URLs"""

    def test_catalogues_use_cdn_urls(self):
        """GET /api/catalogues should return PDF URLs from CDN"""
        response = requests.get(f"{BASE_URL}/api/catalogues")
        assert response.status_code == 200
        
        data = response.json()
        response_text = str(data)
        
        for emergent_url in EMERGENT_URLS:
            assert emergent_url not in response_text, f"Found Emergent URL in catalogues"

    def test_brands_endpoint(self):
        """GET /api/brands should work and not have Emergent URLs"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        
        data = response.json()
        response_text = str(data)
        
        for emergent_url in EMERGENT_URLS:
            assert emergent_url not in response_text, f"Found Emergent URL in brands"


class TestImageUpload:
    """Test image upload creates CDN URLs"""

    def test_upload_image_endpoint_exists(self):
        """POST /api/uploads/image endpoint should be available"""
        # Just test endpoint is accessible (don't actually upload)
        # Send malformed request to check endpoint exists
        response = requests.post(f"{BASE_URL}/api/uploads/image")
        # Should get 422 (validation error) not 404
        assert response.status_code != 404, "Upload endpoint not found"


class TestHealthAndBasicAPIs:
    """Basic API health checks"""

    def test_health_endpoint(self):
        """GET /api/health should return healthy"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "healthy"

    def test_catalog_categories_endpoint(self):
        """GET /api/catalog/categories should work"""
        response = requests.get(f"{BASE_URL}/api/catalog/categories")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)

    def test_catalog_brands_endpoint(self):
        """GET /api/catalog/brands should work"""
        response = requests.get(f"{BASE_URL}/api/catalog/brands")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
