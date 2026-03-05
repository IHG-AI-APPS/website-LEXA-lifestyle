"""
Admin Catalog Product CRUD API Tests
Tests: GET list, POST create, PUT update, DELETE for /api/catalog/products
"""
import pytest
import requests
import os
from uuid import uuid4

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestCatalogAdminCRUD:
    """Admin CRUD tests for catalog products"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup auth token and test data tracking"""
        # Get admin token
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": "admin", "password": "lexa2026"}
        )
        assert response.status_code == 200, f"Admin login failed: {response.text}"
        self.token = response.json()["access_token"]
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}"
        }
        self.created_product_ids = []
        yield
        # Cleanup: Delete created test products
        for product_id in self.created_product_ids:
            try:
                requests.delete(
                    f"{BASE_URL}/api/catalog/products/{product_id}",
                    headers=self.headers
                )
            except:
                pass

    def test_01_list_products(self):
        """GET /api/catalog/products - List products with pagination"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=20")
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "products" in data
        assert "total" in data
        assert "page" in data
        assert "total_pages" in data
        
        # Should have products (~217)
        assert data["total"] >= 200, f"Expected ~217 products, got {data['total']}"
        assert len(data["products"]) <= 20, "Page size should limit to 20"
        print(f"✓ List products: {data['total']} total, page 1 has {len(data['products'])} items")

    def test_02_search_products(self):
        """GET /api/catalog/products with search parameter"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?search=rotel")
        assert response.status_code == 200
        data = response.json()
        
        # Should find Rotel products
        assert data["total"] > 0, "Search for 'rotel' should return results"
        for product in data["products"]:
            # Name, brand, or description should contain rotel
            match_found = (
                "rotel" in product.get("name", "").lower() or
                "rotel" in product.get("brand", "").lower() or
                "rotel" in product.get("description", "").lower()
            )
            assert match_found, f"Product {product['name']} doesn't match search 'rotel'"
        print(f"✓ Search 'rotel': {data['total']} results")

    def test_03_filter_by_category(self):
        """GET /api/catalog/products with category filter"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?category=Audio")
        assert response.status_code == 200
        data = response.json()
        
        assert data["total"] > 0, "Filter by category 'Audio' should return results"
        for product in data["products"]:
            assert product["category"].lower() == "audio", f"Product {product['name']} has category {product['category']}, expected Audio"
        print(f"✓ Filter category Audio: {data['total']} products")

    def test_04_filter_by_brand(self):
        """GET /api/catalog/products with brand filter"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand=Rotel")
        assert response.status_code == 200
        data = response.json()
        
        assert data["total"] > 0, "Filter by brand 'Rotel' should return results"
        for product in data["products"]:
            assert product["brand"].lower() == "rotel", f"Product {product['name']} has brand {product['brand']}, expected Rotel"
        print(f"✓ Filter brand Rotel: {data['total']} products")

    def test_05_pagination(self):
        """GET /api/catalog/products pagination works"""
        # Get page 1
        resp1 = requests.get(f"{BASE_URL}/api/catalog/products?page=1&page_size=20")
        assert resp1.status_code == 200
        page1 = resp1.json()
        
        # Get page 2
        resp2 = requests.get(f"{BASE_URL}/api/catalog/products?page=2&page_size=20")
        assert resp2.status_code == 200
        page2 = resp2.json()
        
        # Pages should have different products
        page1_ids = {p["id"] for p in page1["products"]}
        page2_ids = {p["id"] for p in page2["products"]}
        
        assert page1_ids != page2_ids, "Page 1 and Page 2 should have different products"
        assert page2["page"] == 2, "Page 2 should return page=2"
        print(f"✓ Pagination works: Page 1 has {len(page1['products'])}, Page 2 has {len(page2['products'])} different products")

    def test_06_create_product(self):
        """POST /api/catalog/products - Create a new product"""
        test_product = {
            "name": f"TEST_Widget_{uuid4().hex[:6]}",
            "brand": "TestBrand",
            "category": "Audio",
            "description": "Test description for automated testing",
            "specifications": ["Power: 100W", "Impedance: 8 ohms"],
            "features": ["Feature 1", "Feature 2"],
            "featured": False,
            "published": True
        }
        
        response = requests.post(
            f"{BASE_URL}/api/catalog/products",
            json=test_product,
            headers=self.headers
        )
        assert response.status_code == 200, f"Create failed: {response.text}"
        created = response.json()
        
        # Track for cleanup
        self.created_product_ids.append(created["id"])
        
        # Verify response
        assert "id" in created
        assert "slug" in created
        assert created["name"] == test_product["name"]
        assert created["brand"] == test_product["brand"]
        assert created["category"] == test_product["category"]
        assert created["description"] == test_product["description"]
        assert len(created["specifications"]) == 2
        assert len(created["features"]) == 2
        
        print(f"✓ Created product: {created['name']} (id: {created['id']}, slug: {created['slug']})")
        
        # Verify it exists via GET
        get_response = requests.get(f"{BASE_URL}/api/catalog/products?search={test_product['name']}")
        assert get_response.status_code == 200
        search_data = get_response.json()
        assert search_data["total"] >= 1, "Created product should be searchable"

    def test_07_update_product(self):
        """PUT /api/catalog/products/{id} - Update a product"""
        # First create a product
        create_data = {
            "name": f"TEST_Update_{uuid4().hex[:6]}",
            "brand": "TestBrand",
            "category": "Audio",
            "description": "Original description",
            "specifications": [],
            "features": [],
            "published": True
        }
        
        create_resp = requests.post(
            f"{BASE_URL}/api/catalog/products",
            json=create_data,
            headers=self.headers
        )
        assert create_resp.status_code == 200, f"Create failed: {create_resp.text}"
        created = create_resp.json()
        product_id = created["id"]
        self.created_product_ids.append(product_id)
        
        # Now update it
        update_data = {
            "description": "Updated description via API test",
            "specifications": ["New Spec: Updated"],
            "featured": True
        }
        
        update_resp = requests.put(
            f"{BASE_URL}/api/catalog/products/{product_id}",
            json=update_data,
            headers=self.headers
        )
        assert update_resp.status_code == 200, f"Update failed: {update_resp.text}"
        updated = update_resp.json()
        
        # Verify update applied
        assert updated["description"] == "Updated description via API test"
        assert updated["featured"] == True
        assert "New Spec: Updated" in updated["specifications"]
        
        print(f"✓ Updated product: {updated['name']} - description changed, featured=True")

    def test_08_delete_product(self):
        """DELETE /api/catalog/products/{id} - Delete a product"""
        # First create a product
        create_data = {
            "name": f"TEST_Delete_{uuid4().hex[:6]}",
            "brand": "TestBrand",
            "category": "Audio",
            "description": "To be deleted",
            "published": True
        }
        
        create_resp = requests.post(
            f"{BASE_URL}/api/catalog/products",
            json=create_data,
            headers=self.headers
        )
        assert create_resp.status_code == 200, f"Create failed: {create_resp.text}"
        created = create_resp.json()
        product_id = created["id"]
        product_name = created["name"]
        
        # Delete it
        delete_resp = requests.delete(
            f"{BASE_URL}/api/catalog/products/{product_id}",
            headers=self.headers
        )
        assert delete_resp.status_code == 200, f"Delete failed: {delete_resp.text}"
        
        # Verify it's gone
        search_resp = requests.get(f"{BASE_URL}/api/catalog/products?search={product_name}")
        assert search_resp.status_code == 200
        search_data = search_resp.json()
        
        # Should not find the deleted product
        found_ids = [p["id"] for p in search_data["products"]]
        assert product_id not in found_ids, "Deleted product should not appear in search"
        
        print(f"✓ Deleted product: {product_name} (id: {product_id})")

    def test_09_get_categories(self):
        """GET /api/catalog/categories - Get unique categories"""
        response = requests.get(f"{BASE_URL}/api/catalog/categories")
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        assert len(data) > 0
        
        # Each category should have name and count
        for cat in data:
            assert "name" in cat
            assert "count" in cat
            
        print(f"✓ Categories: {[c['name'] for c in data]}")

    def test_10_get_brands(self):
        """GET /api/catalog/brands - Get unique brands"""
        response = requests.get(f"{BASE_URL}/api/catalog/brands")
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data, list)
        assert len(data) > 0
        
        # Each brand should have name and count
        for brand in data:
            assert "name" in brand
            assert "count" in brand
            
        print(f"✓ Brands: Found {len(data)} unique brands")

    def test_11_product_count_217(self):
        """Verify total product count is around 217"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?page_size=1")
        assert response.status_code == 200
        data = response.json()
        
        # Should have ~217 products
        assert data["total"] >= 200, f"Expected ~217 products, got {data['total']}"
        print(f"✓ Total products: {data['total']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
