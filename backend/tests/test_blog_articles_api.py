"""
Blog Articles API Tests - Iteration 68
Tests for blog page fixes: article images, uniqueness, and API response
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://modal-refactor-prod.preview.emergentagent.com')


class TestArticlesAPI:
    """Test /api/articles endpoint"""
    
    def test_articles_endpoint_returns_200(self):
        """Test that articles API returns 200 OK"""
        response = requests.get(f"{BASE_URL}/api/articles")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print(f"PASS: /api/articles returns 200 OK")
    
    def test_articles_count_is_53(self):
        """Test that we have 53 articles as expected"""
        response = requests.get(f"{BASE_URL}/api/articles")
        data = response.json()
        assert len(data) == 53, f"Expected 53 articles, got {len(data)}"
        print(f"PASS: 53 articles returned")
    
    def test_all_articles_have_images(self):
        """Test that all 53 articles have non-empty image URLs"""
        response = requests.get(f"{BASE_URL}/api/articles")
        data = response.json()
        
        articles_without_images = []
        for article in data:
            image = article.get('image', '')
            if not image or not image.strip():
                articles_without_images.append(article.get('title', 'Unknown'))
        
        assert len(articles_without_images) == 0, f"Articles without images: {articles_without_images}"
        print(f"PASS: All 53 articles have non-empty image URLs")
    
    def test_first_12_articles_have_unique_images(self):
        """Test that the first 12 articles (sorted by date) have unique images"""
        response = requests.get(f"{BASE_URL}/api/articles")
        data = response.json()
        
        # Sort by published_date descending (as frontend does)
        sorted_articles = sorted(data, key=lambda x: x.get('published_date', ''), reverse=True)
        
        first_12_images = [a.get('image', '') for a in sorted_articles[:12]]
        unique_images = set(first_12_images)
        
        assert len(unique_images) == 12, f"Expected 12 unique images, got {len(unique_images)}"
        print(f"PASS: First 12 articles have 12 unique images")
    
    def test_articles_have_required_fields(self):
        """Test that articles have required fields for blog display"""
        response = requests.get(f"{BASE_URL}/api/articles")
        data = response.json()
        
        required_fields = ['id', 'slug', 'title', 'category', 'image', 'published_date']
        
        for i, article in enumerate(data[:5]):  # Check first 5
            for field in required_fields:
                assert field in article, f"Article {i+1} missing field: {field}"
        
        print(f"PASS: Articles have all required fields")
    
    def test_article_images_are_valid_urls(self):
        """Test that article images are valid URLs (not broken)"""
        response = requests.get(f"{BASE_URL}/api/articles")
        data = response.json()
        
        for article in data[:5]:  # Check first 5 images
            image_url = article.get('image', '')
            assert image_url.startswith('http'), f"Invalid image URL: {image_url}"
            
            # Check image is accessible (HEAD request)
            try:
                img_response = requests.head(image_url, timeout=5)
                assert img_response.status_code in [200, 301, 302], \
                    f"Image not accessible: {image_url} - Status: {img_response.status_code}"
            except Exception as e:
                pytest.fail(f"Image request failed for {image_url}: {e}")
        
        print(f"PASS: Article images are valid and accessible URLs")


class TestArticleCategories:
    """Test article categories for filtering"""
    
    def test_categories_exist(self):
        """Test that articles have categories"""
        response = requests.get(f"{BASE_URL}/api/articles")
        data = response.json()
        
        categories = set(a.get('category', '') for a in data)
        assert len(categories) > 1, "Expected multiple categories"
        print(f"PASS: Found {len(categories)} categories: {categories}")
    
    def test_smart_home_category_exists(self):
        """Test that Smart Home category exists with articles"""
        response = requests.get(f"{BASE_URL}/api/articles")
        data = response.json()
        
        smart_home_articles = [a for a in data if a.get('category') == 'Smart Home']
        assert len(smart_home_articles) > 0, "No Smart Home articles found"
        print(f"PASS: Found {len(smart_home_articles)} Smart Home articles")


class TestHealthEndpoint:
    """Test basic API health"""
    
    def test_health_endpoint(self):
        """Test API health check"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get('status') == 'healthy'
        print(f"PASS: API health check passed")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
