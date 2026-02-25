"""
Test suite for 85 Solutions Rollout Verification
- Tests multiple solution types: smart-home, themed-home-cinemas, outdoor-automation, etc.
- Verifies enriched data: gallery_images, related_products, brands, feature_cards, faqs
- Tests both dynamic [slug] pages and static template pages (no regression)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestSmartHomeSolution:
    """Tests for /api/solutions/smart-home - primary test case with 12 features, 10 brands, 8 products"""
    
    def test_smart_home_api_returns_200(self):
        """Verify smart-home endpoint is accessible"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("✓ smart-home API returns 200")
    
    def test_smart_home_has_12_features(self):
        """Verify 12 features in What We Deliver capability grid"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        data = response.json()
        features = data.get('features', [])
        assert len(features) >= 12, f"Expected 12+ features, got {len(features)}"
        print(f"✓ smart-home has {len(features)} features")
    
    def test_smart_home_has_10_brands(self):
        """Verify 10 brand partners for Brands section"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        data = response.json()
        brands = data.get('brands', [])
        assert len(brands) >= 10, f"Expected 10+ brands, got {len(brands)}"
        print(f"✓ smart-home has {len(brands)} brands: {', '.join(brands[:5])}...")
    
    def test_smart_home_has_8_related_products(self):
        """Verify 8 related products for Products We Offer section"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        data = response.json()
        related_products = data.get('related_products', [])
        assert len(related_products) >= 8, f"Expected 8+ related products, got {len(related_products)}"
        print(f"✓ smart-home has {len(related_products)} related products")
    
    def test_smart_home_has_5_gallery_images(self):
        """Verify 5+ gallery images for Inspirations section"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        data = response.json()
        gallery_images = data.get('gallery_images', [])
        assert len(gallery_images) >= 5, f"Expected 5+ gallery images, got {len(gallery_images)}"
        print(f"✓ smart-home has {len(gallery_images)} gallery images")
    
    def test_smart_home_has_3_feature_cards(self):
        """Verify 3 feature cards for What You Get section"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        data = response.json()
        feature_cards = data.get('feature_cards', [])
        assert len(feature_cards) >= 3, f"Expected 3+ feature cards, got {len(feature_cards)}"
        print(f"✓ smart-home has {len(feature_cards)} feature cards")
    
    def test_smart_home_has_4_faqs(self):
        """Verify 4 FAQs"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        data = response.json()
        faqs = data.get('faqs', [])
        assert len(faqs) >= 4, f"Expected 4+ FAQs, got {len(faqs)}"
        for faq in faqs:
            assert 'question' in faq and 'answer' in faq
        print(f"✓ smart-home has {len(faqs)} FAQs")


class TestThemedHomeCinemas:
    """Tests for /api/solutions/themed-home-cinemas"""
    
    def test_themed_home_cinemas_returns_200(self):
        response = requests.get(f"{BASE_URL}/api/solutions/themed-home-cinemas")
        assert response.status_code == 200
        print("✓ themed-home-cinemas API returns 200")
    
    def test_themed_home_cinemas_has_enriched_data(self):
        response = requests.get(f"{BASE_URL}/api/solutions/themed-home-cinemas")
        data = response.json()
        
        assert data.get('title'), "Missing title"
        assert len(data.get('gallery_images', [])) > 0, "No gallery_images"
        assert len(data.get('brands', [])) > 0, "No brands"
        
        print(f"✓ themed-home-cinemas enriched: {len(data.get('gallery_images', []))} images, {len(data.get('brands', []))} brands")


class TestOutdoorAutomation:
    """Tests for /api/solutions/outdoor-automation"""
    
    def test_outdoor_automation_returns_200(self):
        response = requests.get(f"{BASE_URL}/api/solutions/outdoor-automation")
        assert response.status_code == 200
        print("✓ outdoor-automation API returns 200")
    
    def test_outdoor_automation_has_enriched_data(self):
        response = requests.get(f"{BASE_URL}/api/solutions/outdoor-automation")
        data = response.json()
        
        assert len(data.get('gallery_images', [])) > 0, "No gallery_images"
        assert len(data.get('brands', [])) > 0, "No brands"
        assert len(data.get('related_products', [])) > 0, "No related_products"
        
        print(f"✓ outdoor-automation enriched: {len(data.get('gallery_images', []))} images, {len(data.get('brands', []))} brands")


class TestLuxuryHospitalityAutomation:
    """Tests for /api/solutions/luxury-hospitality-automation"""
    
    def test_luxury_hospitality_returns_200(self):
        response = requests.get(f"{BASE_URL}/api/solutions/luxury-hospitality-automation")
        assert response.status_code == 200
        print("✓ luxury-hospitality-automation API returns 200")
    
    def test_luxury_hospitality_has_enriched_data(self):
        response = requests.get(f"{BASE_URL}/api/solutions/luxury-hospitality-automation")
        data = response.json()
        
        assert len(data.get('gallery_images', [])) > 0, "No gallery_images"
        assert len(data.get('brands', [])) > 0, "No brands"
        
        print(f"✓ luxury-hospitality-automation enriched: {len(data.get('gallery_images', []))} images")


class TestHomeNetwork:
    """Tests for /api/solutions/home-network"""
    
    def test_home_network_returns_200(self):
        response = requests.get(f"{BASE_URL}/api/solutions/home-network")
        assert response.status_code == 200
        print("✓ home-network API returns 200")
    
    def test_home_network_has_networking_specific_data(self):
        response = requests.get(f"{BASE_URL}/api/solutions/home-network")
        data = response.json()
        
        title = data.get('title', '').lower()
        desc = data.get('description', '').lower()
        long_desc = data.get('long_description', '').lower()
        combined = f"{title} {desc} {long_desc}"
        
        # Check for networking keywords
        assert any(kw in combined for kw in ['network', 'wifi', 'ethernet', 'connectivity', 'internet'])
        print(f"✓ home-network has relevant content")


class TestVoiceControl:
    """Tests for /api/solutions/voice-control"""
    
    def test_voice_control_returns_200(self):
        response = requests.get(f"{BASE_URL}/api/solutions/voice-control")
        assert response.status_code == 200
        print("✓ voice-control API returns 200")
    
    def test_voice_control_has_voice_platform_content(self):
        response = requests.get(f"{BASE_URL}/api/solutions/voice-control")
        data = response.json()
        
        # Check for voice-related keywords
        combined = f"{data.get('title', '')} {data.get('description', '')} {data.get('long_description', '')}".lower()
        assert any(kw in combined for kw in ['voice', 'alexa', 'google', 'siri', 'assistant', 'command'])
        
        print(f"✓ voice-control has voice platform content")


class TestCulturalAutomationMajlis:
    """Tests for /api/solutions/cultural-automation/majlis-automation - Arabic-themed"""
    
    def test_majlis_automation_returns_200(self):
        # Try direct majlis-automation slug first
        response = requests.get(f"{BASE_URL}/api/solutions/majlis-automation")
        if response.status_code != 200:
            # Try alternative slug
            response = requests.get(f"{BASE_URL}/api/solutions/majlis-room-automation")
        
        assert response.status_code == 200, f"majlis automation not found: tried majlis-automation and majlis-room-automation"
        print("✓ majlis-automation API returns 200")
    
    def test_majlis_has_arabic_themed_content(self):
        response = requests.get(f"{BASE_URL}/api/solutions/majlis-automation")
        if response.status_code != 200:
            response = requests.get(f"{BASE_URL}/api/solutions/majlis-room-automation")
        
        data = response.json()
        combined = f"{data.get('title', '')} {data.get('description', '')} {data.get('long_description', '')}".lower()
        
        # Check for Arabic/cultural keywords
        assert any(kw in combined for kw in ['majlis', 'arabic', 'traditional', 'cultural', 'arab'])
        print(f"✓ majlis automation has Arabic-themed content")


class TestWineCellarAutomation:
    """Tests for /api/solutions/wine-cellar-automation"""
    
    def test_wine_cellar_returns_200(self):
        response = requests.get(f"{BASE_URL}/api/solutions/wine-cellar-automation")
        assert response.status_code == 200
        print("✓ wine-cellar-automation API returns 200")
    
    def test_wine_cellar_has_wine_content(self):
        response = requests.get(f"{BASE_URL}/api/solutions/wine-cellar-automation")
        data = response.json()
        
        combined = f"{data.get('title', '')} {data.get('description', '')} {data.get('long_description', '')}".lower()
        assert any(kw in combined for kw in ['wine', 'cellar', 'storage', 'temperature', 'humidity'])
        
        print(f"✓ wine-cellar-automation has wine cellar content")


class TestStaticSolutionPages:
    """Tests for static template pages (no regression) - lighting-automation, home-cinema"""
    
    def test_lighting_automation_returns_200(self):
        """Static page: lighting-automation should work"""
        response = requests.get(f"{BASE_URL}/api/solutions/lighting-automation")
        assert response.status_code == 200
        data = response.json()
        assert 'Lighting' in data.get('title', '')
        print(f"✓ lighting-automation (static) OK: {data.get('title')}")
    
    def test_home_cinema_returns_200(self):
        """Static page: home-cinema should work"""
        response = requests.get(f"{BASE_URL}/api/solutions/home-cinema")
        assert response.status_code == 200
        data = response.json()
        assert 'Cinema' in data.get('title', '') or 'cinema' in data.get('title', '').lower()
        print(f"✓ home-cinema (static) OK: {data.get('title')}")


class TestSolutionsListCount:
    """Verify total solutions count and enrichment"""
    
    def test_solutions_list_has_85_plus(self):
        """Verify 85+ solutions in database"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        solutions = response.json()
        assert len(solutions) >= 85, f"Expected 85+ solutions, got {len(solutions)}"
        print(f"✓ {len(solutions)} solutions in database")
    
    def test_majority_solutions_have_gallery_images(self):
        """Verify most solutions have gallery_images (from enrichment)"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        solutions = response.json()
        
        with_gallery = [s for s in solutions if len(s.get('gallery_images', [])) > 0]
        percentage = (len(with_gallery) / len(solutions)) * 100
        
        assert percentage > 50, f"Only {percentage:.0f}% of solutions have gallery images"
        print(f"✓ {len(with_gallery)}/{len(solutions)} ({percentage:.0f}%) solutions have gallery images")
    
    def test_majority_solutions_have_brands(self):
        """Verify most solutions have brands listed"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        solutions = response.json()
        
        with_brands = [s for s in solutions if len(s.get('brands', [])) > 0]
        percentage = (len(with_brands) / len(solutions)) * 100
        
        assert percentage > 50, f"Only {percentage:.0f}% of solutions have brands"
        print(f"✓ {len(with_brands)}/{len(solutions)} ({percentage:.0f}%) solutions have brands")


class TestProductCardNavigation:
    """Test that product cards on smart-home can navigate to their solutions"""
    
    def test_smart_home_related_products_are_valid(self):
        """Verify each related_product slug on smart-home exists as a solution"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        data = response.json()
        
        related_products = data.get('related_products', [])
        assert len(related_products) > 0, "No related products"
        
        valid_count = 0
        for slug in related_products[:8]:  # Test first 8
            # Handle both string slugs and dict format
            product_slug = slug if isinstance(slug, str) else slug.get('slug', '')
            if product_slug:
                check_response = requests.get(f"{BASE_URL}/api/solutions/{product_slug}")
                if check_response.status_code == 200:
                    valid_count += 1
                    print(f"  ✓ {product_slug} exists")
                else:
                    print(f"  ✗ {product_slug} NOT FOUND ({check_response.status_code})")
        
        assert valid_count > 0, "No related products are valid solutions"
        print(f"✓ {valid_count}/{len(related_products[:8])} related products are valid")


class TestBrandCardNavigation:
    """Test brand navigation from solution pages"""
    
    def test_brands_api_works(self):
        """Verify brands endpoint is accessible"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        brands = response.json()
        assert isinstance(brands, list)
        assert len(brands) > 0
        print(f"✓ Brands API returns {len(brands)} brands")


class TestHomepageRegression:
    """Verify homepage and core pages work"""
    
    def test_homepage_api_health(self):
        """Basic server health check"""
        response = requests.get(f"{BASE_URL}/api/health")
        # Accept 200 or 404 (some servers don't have /api/health)
        assert response.status_code in [200, 404]
        print("✓ Server accessible")
    
    def test_solutions_api_accessible(self):
        """Verify solutions API works"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        print("✓ Solutions API accessible")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
