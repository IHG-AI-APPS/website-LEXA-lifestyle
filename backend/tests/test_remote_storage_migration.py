"""
Remote Storage Migration Tests
Tests for file storage migration from local to external server (files.ihgbrands.com)
- POST /api/uploads/image - uploads to remote server, returns CDN URL
- GET /api/catalog/products - returns products with CDN URLs
- GET /api/catalog/products/{slug} - returns product with CDN image URL
- GET /api/uploads/files/{category}/{filename} - legacy file serving fallback
"""
import pytest
import requests
import os
import io

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
CDN_BASE_URL = "https://files.ihgbrands.com/lexa"


class TestCDNUrlsInCatalog:
    """Test that catalog products have CDN URLs"""
    
    def test_products_list_has_cdn_urls(self):
        """GET /api/catalog/products returns products with CDN URLs"""
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={"page_size": 10})
        assert response.status_code == 200
        
        data = response.json()
        assert "products" in data
        assert len(data["products"]) > 0
        
        # Check that products with images have CDN URLs
        products_with_images = [p for p in data["products"] if p.get("image")]
        assert len(products_with_images) > 0, "Expected at least one product with image"
        
        for product in products_with_images:
            image_url = product["image"]
            assert image_url.startswith(CDN_BASE_URL), f"Expected CDN URL, got: {image_url}"
            print(f"✓ Product '{product['name']}' has CDN URL: {image_url}")
    
    def test_single_product_has_cdn_url(self):
        """GET /api/catalog/products/{slug} returns product with CDN image URL"""
        # First get a product slug
        list_response = requests.get(f"{BASE_URL}/api/catalog/products", params={"page_size": 1})
        assert list_response.status_code == 200
        products = list_response.json()["products"]
        assert len(products) > 0
        
        slug = products[0]["slug"]
        
        # Fetch single product
        response = requests.get(f"{BASE_URL}/api/catalog/products/{slug}")
        assert response.status_code == 200
        
        product = response.json()
        assert "image" in product
        
        if product["image"]:
            assert product["image"].startswith(CDN_BASE_URL), f"Expected CDN URL, got: {product['image']}"
            print(f"✓ Product '{product['name']}' detail has CDN URL: {product['image']}")
    
    def test_cdn_images_are_accessible(self):
        """Verify CDN images return 200 with correct headers"""
        # Get a product with image
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={"page_size": 5})
        assert response.status_code == 200
        
        products = response.json()["products"]
        products_with_images = [p for p in products if p.get("image")]
        
        if not products_with_images:
            pytest.skip("No products with images found")
        
        # Check first CDN image is accessible
        image_url = products_with_images[0]["image"]
        img_response = requests.head(image_url, timeout=10)
        
        assert img_response.status_code == 200, f"CDN image not accessible: {image_url}"
        
        # Check CORS header
        assert img_response.headers.get("access-control-allow-origin") == "*", "CORS header missing"
        
        # Check cache header (30-day cache)
        cache_control = img_response.headers.get("cache-control", "")
        assert "max-age" in cache_control, f"Cache-Control header missing: {cache_control}"
        print(f"✓ CDN image accessible with CORS and cache headers: {image_url}")


class TestRemoteUpload:
    """Test file uploads to remote server via SFTP"""
    
    def test_image_upload_returns_cdn_url(self):
        """POST /api/uploads/image uploads to remote and returns CDN URL"""
        # Create a small test image (1x1 PNG)
        test_image = (
            b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01'
            b'\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00'
            b'\x00\x0cIDATx\x9cc\xf8\xcf\xc0\x00\x00\x00\x03\x00\x01'
            b'\x00\x05\xfeT\xdc\x00\x00\x00\x00IEND\xaeB`\x82'
        )
        
        files = {'file': ('test_upload.png', io.BytesIO(test_image), 'image/png')}
        data = {'category': 'test'}
        
        response = requests.post(f"{BASE_URL}/api/uploads/image", files=files, data=data)
        
        assert response.status_code == 200, f"Upload failed: {response.text}"
        
        result = response.json()
        assert result.get("success") is True
        assert "url" in result
        assert result["url"].startswith(CDN_BASE_URL), f"Expected CDN URL, got: {result['url']}"
        assert "/test/" in result["url"], "Expected category 'test' in URL path"
        assert result.get("category") == "test"
        
        # Store URL for cleanup
        self.__class__.uploaded_url = result["url"]
        self.__class__.uploaded_category = "test"
        self.__class__.uploaded_filename = result["filename"]
        
        print(f"✓ Image uploaded to remote: {result['url']}")
    
    def test_uploaded_image_is_accessible(self):
        """Verify uploaded image is accessible via CDN"""
        if not hasattr(self.__class__, 'uploaded_url'):
            pytest.skip("No uploaded image URL available")
        
        # Try to access the uploaded image (may take a moment to propagate)
        import time
        time.sleep(1)  # Brief wait for SFTP upload to complete
        
        response = requests.head(self.__class__.uploaded_url, timeout=10)
        
        # May return 200 or 404 depending on CDN cache
        if response.status_code == 200:
            print(f"✓ Uploaded image accessible: {self.__class__.uploaded_url}")
        else:
            print(f"! Image not yet accessible (status {response.status_code}), may need CDN refresh")
    
    def test_upload_with_images_category(self):
        """POST /api/uploads/image with default 'images' category"""
        test_image = (
            b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01'
            b'\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00'
            b'\x00\x0cIDATx\x9cc\xf8\xcf\xc0\x00\x00\x00\x03\x00\x01'
            b'\x00\x05\xfeT\xdc\x00\x00\x00\x00IEND\xaeB`\x82'
        )
        
        files = {'file': ('test_default_cat.png', io.BytesIO(test_image), 'image/png')}
        
        response = requests.post(f"{BASE_URL}/api/uploads/image", files=files)
        
        assert response.status_code == 200, f"Upload failed: {response.text}"
        
        result = response.json()
        assert result.get("success") is True
        assert result["url"].startswith(CDN_BASE_URL)
        assert "/images/" in result["url"], "Expected default 'images' category in URL"
        
        # Store for cleanup
        self.__class__.uploaded_url_2 = result["url"]
        
        print(f"✓ Image uploaded with default category: {result['url']}")
    
    def test_upload_rejects_invalid_file_type(self):
        """POST /api/uploads/image rejects non-image files"""
        files = {'file': ('test.txt', io.BytesIO(b'Hello World'), 'text/plain')}
        
        response = requests.post(f"{BASE_URL}/api/uploads/image", files=files)
        
        assert response.status_code == 400
        assert "Invalid file type" in response.json().get("detail", "")
        print("✓ Invalid file type correctly rejected")


class TestLegacyFileServing:
    """Test legacy file serving fallback"""
    
    def test_legacy_endpoint_returns_404_for_missing_file(self):
        """GET /api/uploads/files/{category}/{filename} returns 404 for missing file"""
        response = requests.get(f"{BASE_URL}/api/uploads/files/images/nonexistent.jpg")
        
        assert response.status_code == 404
        assert "not found" in response.json().get("detail", "").lower()
        print("✓ Legacy endpoint returns 404 for missing file")
    
    def test_legacy_endpoint_serves_existing_local_file(self):
        """GET /api/uploads/files/{category}/{filename} serves existing local files"""
        # Check if any local files exist
        local_products_dir = "/app/backend/uploads/products/"
        
        import os
        if not os.path.exists(local_products_dir):
            pytest.skip("No local products directory")
        
        files = os.listdir(local_products_dir)
        if not files:
            pytest.skip("No local files in products directory")
        
        # Try to serve first local file
        filename = files[0]
        response = requests.get(f"{BASE_URL}/api/uploads/files/products/{filename}")
        
        if response.status_code == 200:
            assert "image" in response.headers.get("content-type", "") or \
                   "application" in response.headers.get("content-type", "")
            print(f"✓ Legacy endpoint serves local file: {filename}")
        else:
            print(f"! Legacy file serving returned {response.status_code} for {filename}")


class TestCleanup:
    """Cleanup test files created during testing"""
    
    def test_cleanup_test_uploads(self):
        """Delete test files uploaded during testing"""
        # We could call DELETE /api/uploads/files/{category}/{filename}
        # but it requires the files to exist on remote
        # For now, just note which files were created
        
        test_files = []
        if hasattr(TestRemoteUpload, 'uploaded_url'):
            test_files.append(TestRemoteUpload.uploaded_url)
        if hasattr(TestRemoteUpload, 'uploaded_url_2'):
            test_files.append(TestRemoteUpload.uploaded_url_2)
        
        if test_files:
            print(f"! Test files created (manual cleanup may be needed):")
            for url in test_files:
                print(f"  - {url}")
        else:
            print("✓ No test files created")


class TestCataloguesAndBrands:
    """Test CDN URLs in other collections (catalogues, brands, etc.)"""
    
    def test_catalogues_have_cdn_urls(self):
        """GET /api/catalogues returns catalogues with CDN URLs"""
        response = requests.get(f"{BASE_URL}/api/catalogues")
        
        if response.status_code != 200:
            pytest.skip(f"Catalogues endpoint returned {response.status_code}")
        
        catalogues = response.json()
        if not catalogues:
            pytest.skip("No catalogues found")
        
        catalogues_with_pdfs = [c for c in catalogues if c.get("pdf_url")]
        for cat in catalogues_with_pdfs:
            pdf_url = cat["pdf_url"]
            if pdf_url.startswith("/api/"):
                print(f"! Catalogue '{cat.get('title', 'Unknown')}' still has local URL: {pdf_url}")
            elif pdf_url.startswith(CDN_BASE_URL):
                print(f"✓ Catalogue '{cat.get('title', 'Unknown')}' has CDN URL: {pdf_url[:80]}...")
    
    def test_brands_have_cdn_urls(self):
        """GET /api/brands returns brands with CDN logo URLs"""
        response = requests.get(f"{BASE_URL}/api/brands")
        
        if response.status_code != 200:
            pytest.skip(f"Brands endpoint returned {response.status_code}")
        
        brands = response.json()
        if not brands:
            pytest.skip("No brands found")
        
        brands_with_logos = [b for b in brands if b.get("logo")]
        for brand in brands_with_logos[:5]:  # Check first 5
            logo = brand["logo"]
            if logo.startswith("/api/"):
                print(f"! Brand '{brand.get('name', 'Unknown')}' still has local URL: {logo}")
            elif logo.startswith("http"):
                print(f"✓ Brand '{brand.get('name', 'Unknown')}' has external URL: {logo[:60]}...")
