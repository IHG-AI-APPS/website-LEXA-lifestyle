"""
Test suite for Boardrooms & Auditoriums page redesign
- Tests API data structure, content counts, and navigation links
- Verifies all required sections have correct data
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestBoardroomsAuditoriumsAPI:
    """Tests for /api/solutions/boardrooms-auditoriums endpoint"""
    
    def test_boardrooms_api_returns_200(self):
        """Verify API endpoint is accessible"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("✓ API returns 200")
    
    def test_boardrooms_has_correct_title_and_category(self):
        """Verify title and category match requirements"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        assert data.get('title') == 'Boardrooms & Auditoriums', f"Title mismatch: {data.get('title')}"
        assert data.get('category').upper() == 'COMMERCIAL', f"Category mismatch: {data.get('category')}"
        print(f"✓ Title: {data.get('title')}, Category: {data.get('category')}")
    
    def test_boardrooms_has_12_features(self):
        """Verify 12 capability features for the systems grid"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        features = data.get('features', [])
        assert len(features) == 12, f"Expected 12 features, got {len(features)}"
        
        # Verify key capabilities are present
        required_capabilities = [
            '4K/8K', 'Microphone', 'Video Conferencing', 'Motorized Blinds',
            'Acoustic', 'IoT', 'Crestron', 'Audio', 'PTZ Camera', 'Climate',
            'Wireless Presentation', 'Live Streaming'
        ]
        feature_text = ' '.join(features).lower()
        
        for capability in required_capabilities:
            assert capability.lower() in feature_text, f"Missing capability: {capability}"
        
        print(f"✓ 12 features with all required capabilities")
    
    def test_boardrooms_has_10_brands(self):
        """Verify 10 brand partners are listed"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        brands = data.get('brands', [])
        assert len(brands) == 10, f"Expected 10 brands, got {len(brands)}"
        
        expected_brands = ['Crestron', 'Extron', 'Barco', 'Biamp', 'Shure', 
                          'QSC', 'Sony', 'Poly', 'Sennheiser', 'Harman AMX']
        
        for brand in expected_brands:
            assert brand in brands, f"Missing brand: {brand}"
        
        print(f"✓ 10 brands: {', '.join(brands)}")
    
    def test_boardrooms_has_8_related_products(self):
        """Verify 8 related product slugs for clickable cards"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        related_products = data.get('related_products', [])
        assert len(related_products) == 8, f"Expected 8 related products, got {len(related_products)}"
        
        expected_slugs = [
            'conference-room-av-systems', 'video-walls', 'lighting-automation',
            'audio-systems', 'climate-control', 'access-control', 
            'networking', 'security-surveillance'
        ]
        
        for slug in expected_slugs:
            assert slug in related_products, f"Missing product slug: {slug}"
        
        print(f"✓ 8 related products: {', '.join(related_products)}")
    
    def test_boardrooms_has_6_gallery_images(self):
        """Verify 6 gallery images for Inspirations section"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        gallery_images = data.get('gallery_images', [])
        assert len(gallery_images) == 6, f"Expected 6 gallery images, got {len(gallery_images)}"
        
        # Verify images are URLs
        for img in gallery_images:
            assert img.startswith('http'), f"Invalid image URL: {img}"
        
        print(f"✓ 6 gallery images (Inspirations)")
    
    def test_boardrooms_has_3_feature_cards(self):
        """Verify 3 feature cards for What You Get section"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        feature_cards = data.get('feature_cards', [])
        assert len(feature_cards) == 3, f"Expected 3 feature cards, got {len(feature_cards)}"
        
        expected_titles = ['AV & Display Systems', 'Audio & Communication', 'Smart Control & IoT']
        actual_titles = [card.get('title') for card in feature_cards]
        
        for title in expected_titles:
            assert title in actual_titles, f"Missing feature card: {title}"
        
        print(f"✓ 3 feature cards: {', '.join(actual_titles)}")
    
    def test_boardrooms_has_4_faqs(self):
        """Verify 4 FAQ items"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        faqs = data.get('faqs', [])
        assert len(faqs) == 4, f"Expected 4 FAQs, got {len(faqs)}"
        
        # Verify each FAQ has question and answer
        for faq in faqs:
            assert 'question' in faq, "FAQ missing question"
            assert 'answer' in faq, "FAQ missing answer"
            assert len(faq['question']) > 10, "FAQ question too short"
            assert len(faq['answer']) > 20, "FAQ answer too short"
        
        print(f"✓ 4 FAQs with questions and answers")
    
    def test_boardrooms_has_long_description(self):
        """Verify long_description for expanded content section"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        data = response.json()
        
        long_desc = data.get('long_description', '')
        assert len(long_desc) > 100, f"long_description too short: {len(long_desc)} chars"
        
        # Check for smart systems keywords
        desc_lower = long_desc.lower()
        assert any(kw in desc_lower for kw in ['smart', 'intelligent', 'automation', 'av', 'technology'])
        
        print(f"✓ Long description: {len(long_desc)} chars")


class TestRelatedProductsExist:
    """Verify that all related product slugs have valid solution pages"""
    
    def test_conference_room_av_systems_exists(self):
        """Verify conference-room-av-systems solution exists"""
        response = requests.get(f"{BASE_URL}/api/solutions/conference-room-av-systems")
        assert response.status_code == 200, f"conference-room-av-systems returned {response.status_code}"
        print("✓ conference-room-av-systems exists")
    
    def test_video_walls_exists(self):
        """Verify video-walls solution exists"""
        response = requests.get(f"{BASE_URL}/api/solutions/video-walls")
        assert response.status_code == 200, f"video-walls returned {response.status_code}"
        print("✓ video-walls exists")
    
    def test_lighting_automation_exists(self):
        """Verify lighting-automation solution exists"""
        response = requests.get(f"{BASE_URL}/api/solutions/lighting-automation")
        assert response.status_code == 200, f"lighting-automation returned {response.status_code}"
        print("✓ lighting-automation exists")
    
    def test_audio_systems_exists(self):
        """Verify audio-systems solution exists"""
        response = requests.get(f"{BASE_URL}/api/solutions/audio-systems")
        assert response.status_code == 200, f"audio-systems returned {response.status_code}"
        print("✓ audio-systems exists")
    
    def test_climate_control_exists(self):
        """Verify climate-control solution exists"""
        response = requests.get(f"{BASE_URL}/api/solutions/climate-control")
        assert response.status_code == 200, f"climate-control returned {response.status_code}"
        print("✓ climate-control exists")
    
    def test_access_control_exists(self):
        """Verify access-control solution exists"""
        response = requests.get(f"{BASE_URL}/api/solutions/access-control")
        assert response.status_code == 200, f"access-control returned {response.status_code}"
        print("✓ access-control exists")
    
    def test_networking_exists(self):
        """Verify networking solution exists"""
        response = requests.get(f"{BASE_URL}/api/solutions/networking")
        assert response.status_code == 200, f"networking returned {response.status_code}"
        print("✓ networking exists")
    
    def test_security_surveillance_exists(self):
        """Verify security-surveillance solution exists"""
        response = requests.get(f"{BASE_URL}/api/solutions/security-surveillance")
        assert response.status_code == 200, f"security-surveillance returned {response.status_code}"
        print("✓ security-surveillance exists")


class TestBrandsAPIEndpoints:
    """Verify brand links will work"""
    
    def test_brands_api_returns_brands(self):
        """Verify brands API works"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        brands = response.json()
        assert isinstance(brands, list)
        print(f"✓ Brands API returns {len(brands)} brands")
    
    def test_crestron_brand_exists(self):
        """Verify Crestron brand page exists"""
        response = requests.get(f"{BASE_URL}/api/brands/crestron")
        assert response.status_code == 200, f"Crestron brand returned {response.status_code}"
        print("✓ Crestron brand exists")


class TestRegressionPages:
    """Verify no regression on other pages"""
    
    def test_lighting_automation_page(self):
        """Verify lighting-automation solution still works"""
        response = requests.get(f"{BASE_URL}/api/solutions/lighting-automation")
        assert response.status_code == 200
        data = response.json()
        assert data.get('title') == 'Lighting Automation'
        print(f"✓ Lighting Automation page OK")
    
    def test_homepage_accessible(self):
        """Verify homepage loads"""
        response = requests.get(f"{BASE_URL}/api/health")
        # Some servers return 200 on / or /api/health
        # Just verify the server is responding
        assert response.status_code in [200, 404], f"Server not responding properly"
        print("✓ Server is accessible")
    
    def test_solutions_list_api(self):
        """Verify solutions list API works"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        solutions = response.json()
        assert isinstance(solutions, list)
        assert len(solutions) > 50, f"Expected 50+ solutions, got {len(solutions)}"
        print(f"✓ Solutions API returns {len(solutions)} solutions")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
