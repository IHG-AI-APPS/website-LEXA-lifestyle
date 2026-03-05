"""
Test suite for Product Recommendations Engine
Tests: /api/catalog/recommendations/{slug} and /api/catalog/featured endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestRecommendationsEndpoint:
    """Tests for GET /api/catalog/recommendations/{slug}"""
    
    def test_recommendations_returns_8_items_with_rec_reason(self):
        """Verify michi-x5-s2 returns 8 recommendations with _rec_reason field"""
        response = requests.get(f"{BASE_URL}/api/catalog/recommendations/michi-x5-s2?limit=8")
        assert response.status_code == 200
        
        data = response.json()
        assert "recommendations" in data
        assert "product" in data
        assert data["product"] == "michi-x5-s2"
        
        recs = data["recommendations"]
        assert len(recs) == 8, f"Expected 8 recommendations, got {len(recs)}"
        
        # All recommendations must have _rec_reason
        for rec in recs:
            assert "_rec_reason" in rec, f"Missing _rec_reason in recommendation: {rec.get('name')}"
            assert rec["_rec_reason"], f"Empty _rec_reason in {rec.get('name')}"
    
    def test_recommendations_prioritize_same_series_first(self):
        """Verify recommendations prioritize same series (sub_category) first"""
        response = requests.get(f"{BASE_URL}/api/catalog/recommendations/michi-x5-s2?limit=8")
        assert response.status_code == 200
        
        recs = response.json()["recommendations"]
        
        # First recommendation should be same series if available
        first_rec = recs[0]
        assert "_rec_reason" in first_rec
        # Should start with "Same series" as highest priority tier
        assert "Same series" in first_rec["_rec_reason"], f"Expected first rec to be same series, got: {first_rec['_rec_reason']}"
    
    def test_recommendations_ku44_i_has_cross_brand_recs(self):
        """K-Array (ku44-i) should return cross-brand recommendations since K-Array has limited products"""
        response = requests.get(f"{BASE_URL}/api/catalog/recommendations/ku44-i?limit=8")
        assert response.status_code == 200
        
        recs = response.json()["recommendations"]
        assert len(recs) == 8, f"Expected 8 recommendations, got {len(recs)}"
        
        # Collect unique brands
        brands = set(r.get("brand") for r in recs)
        # Should have multiple brands since K-Array only has 2 products
        assert len(brands) > 1, f"Expected cross-brand recommendations, only found brands: {brands}"
        
        # Should include non-K-Array brands
        has_other_brand = any(r.get("brand") != "K-Array" for r in recs)
        assert has_other_brand, "Expected recommendations from other brands"
    
    def test_recommendations_tiered_priority(self):
        """Verify recommendation reasons follow tiered priority"""
        response = requests.get(f"{BASE_URL}/api/catalog/recommendations/michi-x5-s2?limit=8")
        assert response.status_code == 200
        
        recs = response.json()["recommendations"]
        reasons = [r.get("_rec_reason", "") for r in recs]
        
        # Valid tier reasons
        valid_reasons = ["Same series", "Same brand & category", "Similar category", "Featured product"]
        
        for reason in reasons:
            matches_valid = any(valid in reason for valid in valid_reasons)
            assert matches_valid, f"Invalid recommendation reason: {reason}"
    
    def test_recommendations_404_for_unknown_product(self):
        """Verify 404 response for non-existent product"""
        response = requests.get(f"{BASE_URL}/api/catalog/recommendations/non-existent-product-slug?limit=8")
        assert response.status_code == 404
    
    def test_recommendations_excludes_self(self):
        """Verify the product itself is not in recommendations"""
        response = requests.get(f"{BASE_URL}/api/catalog/recommendations/michi-x5-s2?limit=8")
        assert response.status_code == 200
        
        recs = response.json()["recommendations"]
        slugs = [r.get("slug") for r in recs]
        
        assert "michi-x5-s2" not in slugs, "Product should not recommend itself"


class TestFeaturedProductsEndpoint:
    """Tests for GET /api/catalog/featured"""
    
    def test_featured_returns_exactly_8_products(self):
        """Verify featured endpoint returns exactly 8 products"""
        response = requests.get(f"{BASE_URL}/api/catalog/featured?limit=8")
        assert response.status_code == 200
        
        data = response.json()
        assert "products" in data
        
        products = data["products"]
        assert len(products) == 8, f"Expected 8 featured products, got {len(products)}"
    
    def test_featured_all_products_have_images(self):
        """Verify all featured products have images"""
        response = requests.get(f"{BASE_URL}/api/catalog/featured?limit=8")
        assert response.status_code == 200
        
        products = response.json()["products"]
        
        for product in products:
            assert product.get("image"), f"Featured product {product.get('name')} missing image"
            # Image should be non-empty string
            assert len(product["image"]) > 0, f"Empty image for {product.get('name')}"
    
    def test_featured_products_have_required_fields(self):
        """Verify featured products have all required fields for display"""
        response = requests.get(f"{BASE_URL}/api/catalog/featured?limit=8")
        assert response.status_code == 200
        
        products = response.json()["products"]
        required_fields = ["id", "slug", "name", "brand", "category", "image"]
        
        for product in products:
            for field in required_fields:
                assert field in product, f"Missing field '{field}' in product {product.get('name')}"
    
    def test_featured_products_are_diverse(self):
        """Verify featured products come from multiple brands"""
        response = requests.get(f"{BASE_URL}/api/catalog/featured?limit=8")
        assert response.status_code == 200
        
        products = response.json()["products"]
        brands = set(p.get("brand") for p in products)
        
        # Should have diverse selection (at least 3 different brands)
        assert len(brands) >= 3, f"Expected diverse brands, only found {len(brands)}: {brands}"
    
    def test_featured_limit_parameter(self):
        """Verify limit parameter works correctly"""
        response = requests.get(f"{BASE_URL}/api/catalog/featured?limit=4")
        assert response.status_code == 200
        
        products = response.json()["products"]
        assert len(products) == 4, f"Expected 4 products with limit=4, got {len(products)}"


class TestRecommendationDataIntegrity:
    """Tests for recommendation data integrity"""
    
    def test_recommendation_products_have_valid_slugs(self):
        """Verify recommendation products have valid slugs for linking"""
        response = requests.get(f"{BASE_URL}/api/catalog/recommendations/michi-x5-s2?limit=8")
        assert response.status_code == 200
        
        recs = response.json()["recommendations"]
        
        for rec in recs:
            slug = rec.get("slug")
            assert slug, f"Missing slug in recommendation: {rec.get('name')}"
            assert len(slug) > 0, f"Empty slug for {rec.get('name')}"
            # Slugs should be URL-safe
            assert " " not in slug, f"Slug contains spaces: {slug}"
    
    def test_featured_products_linkable_to_detail_pages(self):
        """Verify featured product slugs can be used to fetch product details"""
        response = requests.get(f"{BASE_URL}/api/catalog/featured?limit=2")
        assert response.status_code == 200
        
        products = response.json()["products"]
        
        # Verify first product can be fetched by slug
        first_slug = products[0].get("slug")
        detail_response = requests.get(f"{BASE_URL}/api/catalog/products/{first_slug}")
        assert detail_response.status_code == 200, f"Could not fetch product detail for slug: {first_slug}"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
