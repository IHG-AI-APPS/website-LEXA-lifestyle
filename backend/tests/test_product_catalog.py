"""
Product Catalog API Tests - tests for /api/catalog/* endpoints
Tests: listing with pagination, search, filters, sorting, single product by slug, categories, brands, series
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://next-fix-1.preview.emergentagent.com')


class TestProductCatalogListing:
    """Tests for GET /api/catalog/products with various filters"""
    
    def test_list_products_returns_pagination(self):
        """GET /api/catalog/products returns products with pagination"""
        response = requests.get(f"{BASE_URL}/api/catalog/products")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        # Verify pagination fields
        assert "products" in data, "Response should have 'products' field"
        assert "total" in data, "Response should have 'total' field"
        assert "page" in data, "Response should have 'page' field"
        assert "page_size" in data, "Response should have 'page_size' field"
        assert "total_pages" in data, "Response should have 'total_pages' field"
        
        # Verify data values
        assert isinstance(data["products"], list), "Products should be a list"
        assert data["total"] > 200, f"Expected 200+ products, got {data['total']}"
        assert data["page"] == 1, "First page should be 1"
        assert data["page_size"] == 24, "Default page size should be 24"
        print(f"✓ Products listing working: {data['total']} total products")
    
    def test_search_products_by_name(self):
        """GET /api/catalog/products?search=Michi returns filtered results"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?search=Michi")
        assert response.status_code == 200
        
        data = response.json()
        assert data["total"] >= 2, f"Expected at least 2 Michi products, got {data['total']}"
        
        # Verify search relevance - all returned products should have Michi in name or brand
        for product in data["products"]:
            search_fields = f"{product['name']} {product['brand']} {product.get('description', '')}".lower()
            assert "michi" in search_fields, f"Product {product['name']} doesn't match search 'Michi'"
        print(f"✓ Search working: found {data['total']} Michi products")
    
    def test_filter_by_category(self):
        """GET /api/catalog/products?category=Audio returns only Audio products"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?category=Audio")
        assert response.status_code == 200
        
        data = response.json()
        assert data["total"] > 50, f"Expected 50+ Audio products, got {data['total']}"
        
        # Verify all products are in Audio category
        for product in data["products"]:
            assert product["category"].lower() == "audio", f"Product {product['name']} is not Audio category"
        print(f"✓ Category filter working: {data['total']} Audio products")
    
    def test_filter_by_brand(self):
        """GET /api/catalog/products?brand=Rotel returns only Rotel products"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand=Rotel")
        assert response.status_code == 200
        
        data = response.json()
        assert data["total"] >= 10, f"Expected 10+ Rotel products, got {data['total']}"
        
        # Verify all products are Rotel brand
        for product in data["products"]:
            assert product["brand"].lower() == "rotel", f"Product {product['name']} is not Rotel brand"
        print(f"✓ Brand filter working: {data['total']} Rotel products")
    
    def test_sort_by_name_descending(self):
        """GET /api/catalog/products?sort=name_desc returns products sorted Z-A"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?sort=name_desc")
        assert response.status_code == 200
        
        data = response.json()
        products = data["products"]
        assert len(products) > 1, "Expected multiple products for sort test"
        
        # Verify descending order
        names = [p["name"] for p in products]
        sorted_names = sorted(names, reverse=True)
        assert names == sorted_names, f"Products not sorted Z-A: got {names[:3]}"
        print(f"✓ Sort name_desc working: first product is {names[0]}")
    
    def test_pagination_works(self):
        """Test pagination works by checking page 2"""
        response1 = requests.get(f"{BASE_URL}/api/catalog/products?page=1&page_size=10")
        response2 = requests.get(f"{BASE_URL}/api/catalog/products?page=2&page_size=10")
        
        assert response1.status_code == 200
        assert response2.status_code == 200
        
        data1 = response1.json()
        data2 = response2.json()
        
        assert data1["page"] == 1
        assert data2["page"] == 2
        
        # Ensure products are different on different pages
        slugs1 = {p["slug"] for p in data1["products"]}
        slugs2 = {p["slug"] for p in data2["products"]}
        assert slugs1.isdisjoint(slugs2), "Page 1 and Page 2 should have different products"
        print("✓ Pagination working: page 1 and page 2 return different products")


class TestProductDetailBySlug:
    """Tests for GET /api/catalog/products/{slug}"""
    
    def test_get_product_by_slug(self):
        """GET /api/catalog/products/michi-x5-s2 returns single product detail"""
        response = requests.get(f"{BASE_URL}/api/catalog/products/michi-x5-s2")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        product = response.json()
        # Verify product fields
        assert product["slug"] == "michi-x5-s2"
        assert product["name"] == "Michi X5 S2"
        assert product["brand"] == "Rotel"
        assert product["category"] == "Audio"
        assert "image" in product
        assert product["image"].startswith("/api/uploads/files/products/")
        print(f"✓ Product detail working: {product['name']} by {product['brand']}")
    
    def test_get_nonexistent_product_returns_404(self):
        """GET /api/catalog/products/nonexistent-product-xyz returns 404"""
        response = requests.get(f"{BASE_URL}/api/catalog/products/nonexistent-product-xyz-12345")
        assert response.status_code == 404, f"Expected 404 for nonexistent product, got {response.status_code}"
        print("✓ 404 for nonexistent product working")


class TestCategoriesBrandsSeries:
    """Tests for filter endpoints"""
    
    def test_get_categories(self):
        """GET /api/catalog/categories returns category list with counts"""
        response = requests.get(f"{BASE_URL}/api/catalog/categories")
        assert response.status_code == 200
        
        categories = response.json()
        assert isinstance(categories, list)
        assert len(categories) >= 5, f"Expected 5+ categories, got {len(categories)}"
        
        # Verify structure
        for cat in categories:
            assert "name" in cat, "Category should have 'name'"
            assert "count" in cat, "Category should have 'count'"
            assert isinstance(cat["count"], int)
        
        # Check for known categories
        cat_names = [c["name"] for c in categories]
        assert "Audio" in cat_names, "Audio category should exist"
        assert "Automation" in cat_names, "Automation category should exist"
        print(f"✓ Categories endpoint working: {len(categories)} categories")
    
    def test_get_brands(self):
        """GET /api/catalog/brands returns brand list with counts"""
        response = requests.get(f"{BASE_URL}/api/catalog/brands")
        assert response.status_code == 200
        
        brands = response.json()
        assert isinstance(brands, list)
        assert len(brands) >= 10, f"Expected 10+ brands, got {len(brands)}"
        
        # Verify structure
        for brand in brands:
            assert "name" in brand
            assert "count" in brand
            assert isinstance(brand["count"], int)
        
        # Check for known brands
        brand_names = [b["name"] for b in brands]
        assert "Rotel" in brand_names, "Rotel brand should exist"
        print(f"✓ Brands endpoint working: {len(brands)} brands")
    
    def test_get_series(self):
        """GET /api/catalog/series returns series list with counts"""
        response = requests.get(f"{BASE_URL}/api/catalog/series")
        assert response.status_code == 200
        
        series = response.json()
        assert isinstance(series, list)
        assert len(series) >= 5, f"Expected 5+ series, got {len(series)}"
        
        # Verify structure
        for s in series:
            assert "name" in s
            assert "count" in s
        print(f"✓ Series endpoint working: {len(series)} series")


class TestProductImages:
    """Tests for product image URLs"""
    
    def test_product_image_url_format(self):
        """Product images should have /api/uploads/files/products/ path"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=10")
        assert response.status_code == 200
        
        products = response.json()["products"]
        for product in products:
            if product["image"]:
                assert product["image"].startswith("/api/uploads/files/products/"), \
                    f"Product {product['name']} image path invalid: {product['image']}"
        print("✓ Product image URL format correct")
    
    def test_product_image_accessible(self):
        """Product images should be accessible from server"""
        response = requests.get(f"{BASE_URL}/api/catalog/products/michi-x5-s2")
        assert response.status_code == 200
        
        product = response.json()
        image_url = f"{BASE_URL}{product['image']}"
        # Use GET with stream=True to avoid downloading full image
        img_response = requests.get(image_url, stream=True)
        # Image should be accessible (200)
        assert img_response.status_code == 200, \
            f"Product image not accessible: {img_response.status_code}"
        img_response.close()
        print(f"✓ Product image accessible: {product['image']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
