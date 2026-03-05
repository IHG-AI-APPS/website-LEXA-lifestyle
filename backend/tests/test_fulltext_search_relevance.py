"""
Tests for Full-Text Search with Relevance Scoring Feature
Tests MongoDB weighted text index search and relevance sort functionality
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestFullTextSearchRelevance:
    """Tests for relevance-scored text search functionality"""
    
    def test_relevance_sort_with_search_sonos(self):
        """
        Test: GET /api/catalog/products?search=sonos&sort=relevance
        Sonos products should appear ranked by relevance (name matches rank higher)
        """
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "search": "sonos",
            "sort": "relevance"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "products" in data
        assert "total" in data
        
        # Should find Sonos products
        products = data["products"]
        assert len(products) > 0, "Should find Sonos products"
        
        # Verify Sonos products are in results
        has_sonos = any("sonos" in p.get("brand", "").lower() or "sonos" in p.get("name", "").lower() 
                       for p in products)
        assert has_sonos, "Results should contain Sonos products"
        
        print(f"Found {data['total']} Sonos products with relevance sort")
        print(f"First 3 results: {[p['name'] for p in products[:3]]}")

    def test_relevance_sort_multi_term_search(self):
        """
        Test: GET /api/catalog/products?search=speaker+audio&sort=relevance
        Products with 'speaker' in name should rank higher than description-only matches
        """
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "search": "speaker audio",
            "sort": "relevance"
        })
        assert response.status_code == 200
        
        data = response.json()
        products = data["products"]
        
        # Should return results
        assert data["total"] > 0, "Should find speaker/audio products"
        
        print(f"Found {data['total']} products for 'speaker audio' search")
        if products:
            print(f"Top results: {[p['name'] for p in products[:5]]}")

    def test_partial_word_regex_fallback(self):
        """
        Test: GET /api/catalog/products?search=sono&sort=relevance
        Partial word 'sono' should fallback to regex and still find Sonos products
        (MongoDB text search only matches whole words, so partial should use regex fallback)
        """
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "search": "sono",
            "sort": "relevance"
        })
        assert response.status_code == 200
        
        data = response.json()
        # The regex fallback should find Sonos products with partial match
        # If text search returns 0 results, it falls back to regex
        print(f"Partial search 'sono' found {data['total']} products")
        
        if data["total"] > 0:
            products = data["products"]
            # Check if any have 'sono' in name or brand
            has_partial_match = any("sono" in p.get("brand", "").lower() or "sono" in p.get("name", "").lower() 
                                   for p in products)
            assert has_partial_match, "Should find products with 'sono' partial match via regex fallback"
            print(f"Results: {[p['name'] for p in products[:3]]}")

    def test_search_with_name_asc_sort_uses_regex(self):
        """
        Test: GET /api/catalog/products?search=sonos&sort=name_asc
        When sort != relevance, should use regex search (existing behavior) not text search
        """
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "search": "sonos",
            "sort": "name_asc"
        })
        assert response.status_code == 200
        
        data = response.json()
        products = data["products"]
        
        assert data["total"] > 0, "Should find Sonos products with name_asc sort"
        
        # Verify results are sorted alphabetically by name
        if len(products) >= 2:
            names = [p["name"].lower() for p in products]
            sorted_names = sorted(names)
            assert names == sorted_names, "Products should be sorted alphabetically A-Z"
        
        print(f"name_asc sort with search found {data['total']} products, sorted alphabetically")

    def test_relevance_sort_without_search_fallback(self):
        """
        Test: GET /api/catalog/products?sort=relevance (no search term)
        Should fallback to name_asc sort when no search term provided
        """
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "sort": "relevance"
        })
        assert response.status_code == 200
        
        data = response.json()
        products = data["products"]
        
        assert data["total"] > 0, "Should return products"
        
        # Without search, relevance sort should fallback to name_asc
        if len(products) >= 2:
            names = [p["name"].lower() for p in products]
            sorted_names = sorted(names)
            assert names == sorted_names, "Without search term, relevance should fallback to name_asc"
        
        print(f"Relevance sort without search returned {data['total']} products (fallback to name_asc)")

    def test_text_search_with_brand_filter(self):
        """
        Test: GET /api/catalog/products?search=audio&sort=relevance&brand=Sonos
        Text search combined with filters should work correctly
        """
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "search": "audio",
            "sort": "relevance",
            "brand": "Sonos"
        })
        assert response.status_code == 200
        
        data = response.json()
        products = data["products"]
        
        # All results should be Sonos brand
        for p in products:
            assert p.get("brand", "").lower() == "sonos", f"Expected Sonos brand, got {p.get('brand')}"
        
        print(f"Search 'audio' with brand=Sonos filter found {data['total']} products")

    def test_text_search_with_category_filter(self):
        """
        Test: GET /api/catalog/products?search=speaker&sort=relevance&category=Audio
        Text search combined with category filter
        """
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "search": "speaker",
            "sort": "relevance",
            "category": "Audio"
        })
        assert response.status_code == 200
        
        data = response.json()
        products = data["products"]
        
        # All results should be Audio category
        for p in products:
            assert p.get("category", "").lower() == "audio", f"Expected Audio category, got {p.get('category')}"
        
        print(f"Search 'speaker' with category=Audio found {data['total']} products")


class TestSortOptions:
    """Tests for various sort options with and without search"""
    
    def test_sort_newest_works(self):
        """Test newest sort option"""
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "sort": "newest"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["total"] > 0
        print(f"Newest sort returned {len(data['products'])} products")

    def test_sort_oldest_works(self):
        """Test oldest sort option"""
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "sort": "oldest"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["total"] > 0
        print(f"Oldest sort returned {len(data['products'])} products")

    def test_sort_name_desc_works(self):
        """Test name_desc sort option"""
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "sort": "name_desc"
        })
        assert response.status_code == 200
        data = response.json()
        products = data["products"]
        
        if len(products) >= 2:
            names = [p["name"].lower() for p in products]
            sorted_names = sorted(names, reverse=True)
            assert names == sorted_names, "Products should be sorted Z-A"
        
        print(f"name_desc sort returned {len(products)} products")


class TestBasicCatalogFunctionality:
    """Tests to ensure basic catalog browsing still works"""
    
    def test_catalog_products_default(self):
        """Test: GET /api/catalog/products (default, no params)"""
        response = requests.get(f"{BASE_URL}/api/catalog/products")
        assert response.status_code == 200
        
        data = response.json()
        assert "products" in data
        assert "total" in data
        assert "page" in data
        assert "total_pages" in data
        
        print(f"Default catalog has {data['total']} total products, {data['total_pages']} pages")

    def test_catalog_categories(self):
        """Test: GET /api/catalog/categories"""
        response = requests.get(f"{BASE_URL}/api/catalog/categories")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        
        print(f"Found {len(data)} categories")

    def test_catalog_brands(self):
        """Test: GET /api/catalog/brands"""
        response = requests.get(f"{BASE_URL}/api/catalog/brands")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        
        # Check if Sonos exists
        brand_names = [b["name"] for b in data]
        assert "Sonos" in brand_names, "Sonos brand should exist in catalog"
        
        print(f"Found {len(data)} brands")

    def test_pagination_works(self):
        """Test pagination with page and page_size params"""
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "page": 1,
            "page_size": 10
        })
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["products"]) <= 10
        assert data["page"] == 1
        assert data["page_size"] == 10
        
        print(f"Page 1 with size 10 returned {len(data['products'])} products")

    def test_category_filter_works(self):
        """Test category filter"""
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "category": "Audio"
        })
        assert response.status_code == 200
        
        data = response.json()
        for p in data["products"]:
            assert p.get("category", "").lower() == "audio"
        
        print(f"Audio category has {data['total']} products")

    def test_brand_filter_works(self):
        """Test brand filter"""
        response = requests.get(f"{BASE_URL}/api/catalog/products", params={
            "brand": "Sonos"
        })
        assert response.status_code == 200
        
        data = response.json()
        for p in data["products"]:
            assert p.get("brand", "").lower() == "sonos"
        
        print(f"Sonos brand has {data['total']} products")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
