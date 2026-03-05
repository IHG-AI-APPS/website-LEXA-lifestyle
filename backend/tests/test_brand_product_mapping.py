"""Test Brand-to-Product Mapping for Catalog Products via brand_slug"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestBrandSlugFiltering:
    """Tests for GET /api/catalog/products?brand_slug={slug} filtering"""
    
    def test_borresen_brand_returns_18_products(self):
        """Borresen brand should return exactly 18 products"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=borresen&page_size=100")
        assert response.status_code == 200
        data = response.json()
        assert data['total'] == 18, f"Expected 18 Borresen products, got {data['total']}"
        # Verify all products belong to Borresen brand
        for product in data['products']:
            assert product['brand'] == 'Borresen', f"Product {product['name']} has brand '{product['brand']}' not 'Borresen'"
    
    def test_rotel_brand_returns_10_products(self):
        """Rotel brand should return exactly 10 products"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=rotel&page_size=100")
        assert response.status_code == 200
        data = response.json()
        assert data['total'] == 10, f"Expected 10 Rotel products, got {data['total']}"
        for product in data['products']:
            assert product['brand'] == 'Rotel', f"Product {product['name']} has brand '{product['brand']}' not 'Rotel'"
    
    def test_bowers_wilkins_brand_returns_16_products(self):
        """Bowers&Wilkins brand (slug: bowers-wilkins) should return 16 products"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=bowers-wilkins&page_size=100")
        assert response.status_code == 200
        data = response.json()
        assert data['total'] == 16, f"Expected 16 B&W products, got {data['total']}"
        for product in data['products']:
            assert product['brand'] == 'Bowers&Wilkins', f"Product {product['name']} has brand '{product['brand']}' not 'Bowers&Wilkins'"
    
    def test_aavik_brand_returns_20_products(self):
        """Aavik brand should return 20 products"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=aavik&page_size=100")
        assert response.status_code == 200
        data = response.json()
        assert data['total'] == 20, f"Expected 20 Aavik products, got {data['total']}"
        for product in data['products']:
            assert product['brand'] == 'Aavik', f"Product {product['name']} has brand '{product['brand']}' not 'Aavik'"
    
    def test_sonos_brand_returns_9_products(self):
        """Sonos brand should return 9 products"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=sonos&page_size=100")
        assert response.status_code == 200
        data = response.json()
        assert data['total'] == 9, f"Expected 9 Sonos products, got {data['total']}"
        for product in data['products']:
            assert product['brand'] == 'Sonos', f"Product {product['name']} has brand '{product['brand']}' not 'Sonos'"
    
    def test_ansuz_brand_returns_0_products(self):
        """Ansuz brand should return 0 products (not in catalog)"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=ansuz&page_size=100")
        assert response.status_code == 200
        data = response.json()
        assert data['total'] == 0, f"Expected 0 Ansuz products, got {data['total']}"
    
    def test_bang_olufsen_brand_returns_0_products(self):
        """Bang-Olufsen brand should return 0 products (not in catalog)"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=bang-olufsen&page_size=100")
        assert response.status_code == 200
        data = response.json()
        assert data['total'] == 0, f"Expected 0 Bang-Olufsen products, got {data['total']}"


class TestProductOrganizedBySeries:
    """Tests that products are organized by series/sub_category"""
    
    def test_borresen_products_have_series(self):
        """Borresen products should have sub_category (series) defined"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=borresen&page_size=100")
        assert response.status_code == 200
        data = response.json()
        # Count products with series defined
        products_with_series = [p for p in data['products'] if p.get('sub_category')]
        # At least 50% of products should have series
        assert len(products_with_series) >= len(data['products']) * 0.5, \
            f"Only {len(products_with_series)}/{len(data['products'])} Borresen products have series"
    
    def test_rotel_products_have_series(self):
        """Rotel products should have sub_category (series) defined"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=rotel&page_size=100")
        assert response.status_code == 200
        data = response.json()
        products_with_series = [p for p in data['products'] if p.get('sub_category')]
        assert len(products_with_series) >= len(data['products']) * 0.5, \
            f"Only {len(products_with_series)}/{len(data['products'])} Rotel products have series"


class TestProductImagesExist:
    """Tests that products have images and images are accessible"""
    
    def test_borresen_products_have_images(self):
        """Borresen products should have images defined"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=borresen&page_size=100")
        assert response.status_code == 200
        data = response.json()
        products_with_images = [p for p in data['products'] if p.get('image')]
        assert len(products_with_images) == len(data['products']), \
            f"Only {len(products_with_images)}/{len(data['products'])} Borresen products have images"
    
    def test_rotel_products_have_images(self):
        """Rotel products should have images defined"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=rotel&page_size=100")
        assert response.status_code == 200
        data = response.json()
        products_with_images = [p for p in data['products'] if p.get('image')]
        assert len(products_with_images) == len(data['products']), \
            f"Only {len(products_with_images)}/{len(data['products'])} Rotel products have images"
    
    def test_product_image_accessible(self):
        """Product images should be accessible via HTTP"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=rotel&page_size=1")
        assert response.status_code == 200
        data = response.json()
        if data['products']:
            product = data['products'][0]
            image_path = product.get('image', '')
            if image_path:
                image_url = f"{BASE_URL}{image_path}" if image_path.startswith('/') else image_path
                img_response = requests.head(image_url, timeout=10)
                assert img_response.status_code in [200, 301, 302], \
                    f"Image {image_url} not accessible, got status {img_response.status_code}"


class TestProductDetailPages:
    """Tests for product detail page endpoint"""
    
    def test_product_detail_endpoint(self):
        """GET /api/catalog/products/{slug} should return product detail"""
        # First get a product slug
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand_slug=rotel&page_size=1")
        assert response.status_code == 200
        data = response.json()
        assert len(data['products']) > 0, "No Rotel products found"
        
        product = data['products'][0]
        slug = product['slug']
        
        # Now fetch the detail page
        detail_response = requests.get(f"{BASE_URL}/api/catalog/products/{slug}")
        assert detail_response.status_code == 200
        detail = detail_response.json()
        
        # Verify product detail has expected fields
        assert detail['slug'] == slug
        assert detail['brand'] == 'Rotel'
        assert 'name' in detail
        assert 'image' in detail
    
    def test_nonexistent_product_returns_404(self):
        """GET /api/catalog/products/{nonexistent} should return 404"""
        response = requests.get(f"{BASE_URL}/api/catalog/products/nonexistent-product-slug-12345")
        assert response.status_code == 404


class TestBrandProductLinkIntegration:
    """Tests for brand page to product catalog linking"""
    
    def test_brand_endpoint_exists(self):
        """GET /api/brands/{slug} should return brand data"""
        response = requests.get(f"{BASE_URL}/api/brands/borresen")
        assert response.status_code == 200
        brand = response.json()
        assert brand['name'] == 'Borresen'
        assert brand['slug'] == 'borresen'
    
    def test_brand_products_via_brand_query(self):
        """GET /api/catalog/products?brand=Borresen should also work"""
        response = requests.get(f"{BASE_URL}/api/catalog/products?brand=Borresen&page_size=100")
        assert response.status_code == 200
        data = response.json()
        # The brand query (by catalog brand name) should also return products
        assert data['total'] == 18, f"Expected 18 Borresen products via brand query, got {data['total']}"


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
