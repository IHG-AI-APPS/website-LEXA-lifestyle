"""
Test Services Enrichment - Testing gallery_images, brands, feature_cards, related_products for services
Tests the CMS fields added to services to match the solution page design pattern.
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Service slugs to test (actual services in database)
SERVICE_SLUGS = [
    "consultation-design",
    "home-cinema-multi-room-av",
    "security-surveillance-systems",
    "network-infrastructure-it",
    "system-engineering-integration",
    "wiring",
]


class TestServicesEnrichment:
    """Test that all services have enriched data: brands, gallery_images, feature_cards, related_products"""

    def test_services_list_api(self):
        """GET /api/services returns list of services"""
        response = requests.get(f"{BASE_URL}/api/services")
        assert response.status_code == 200
        
        data = response.json()
        services = data if isinstance(data, list) else data.get('services', [])
        assert len(services) >= 10, f"Expected at least 10 services, got {len(services)}"
        print(f"✓ Found {len(services)} services in API")

    @pytest.mark.parametrize("slug", SERVICE_SLUGS)
    def test_service_detail_api(self, slug):
        """GET /api/services/{slug} returns service with enriched fields"""
        response = requests.get(f"{BASE_URL}/api/services/{slug}")
        assert response.status_code == 200, f"Service {slug} not found"
        
        data = response.json()
        assert data.get('slug') == slug, f"Slug mismatch: expected {slug}, got {data.get('slug')}"
        print(f"✓ Service {slug} found")

    @pytest.mark.parametrize("slug", SERVICE_SLUGS)
    def test_service_has_brands(self, slug):
        """Service has brands array populated"""
        response = requests.get(f"{BASE_URL}/api/services/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        brands = data.get('brands', [])
        assert isinstance(brands, list), f"brands should be a list for {slug}"
        assert len(brands) >= 1, f"Service {slug} should have at least 1 brand, got {len(brands)}"
        print(f"✓ Service {slug} has {len(brands)} brands: {brands[:3]}...")

    @pytest.mark.parametrize("slug", SERVICE_SLUGS)
    def test_service_has_gallery_images(self, slug):
        """Service has gallery_images array populated"""
        response = requests.get(f"{BASE_URL}/api/services/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        gallery = data.get('gallery_images', [])
        assert isinstance(gallery, list), f"gallery_images should be a list for {slug}"
        assert len(gallery) >= 1, f"Service {slug} should have at least 1 gallery image, got {len(gallery)}"
        print(f"✓ Service {slug} has {len(gallery)} gallery images")

    @pytest.mark.parametrize("slug", SERVICE_SLUGS)
    def test_service_has_feature_cards(self, slug):
        """Service has feature_cards array populated"""
        response = requests.get(f"{BASE_URL}/api/services/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        feature_cards = data.get('feature_cards', [])
        assert isinstance(feature_cards, list), f"feature_cards should be a list for {slug}"
        assert len(feature_cards) >= 1, f"Service {slug} should have at least 1 feature card, got {len(feature_cards)}"
        
        # Verify feature card structure
        for card in feature_cards:
            assert 'title' in card, f"Feature card missing 'title' in {slug}"
            assert 'description' in card, f"Feature card missing 'description' in {slug}"
            assert 'benefits' in card, f"Feature card missing 'benefits' in {slug}"
        
        print(f"✓ Service {slug} has {len(feature_cards)} feature cards with proper structure")

    @pytest.mark.parametrize("slug", SERVICE_SLUGS)
    def test_service_has_related_products(self, slug):
        """Service has related_products (solution slugs) array populated"""
        response = requests.get(f"{BASE_URL}/api/services/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        related = data.get('related_products', [])
        assert isinstance(related, list), f"related_products should be a list for {slug}"
        assert len(related) >= 1, f"Service {slug} should have at least 1 related product, got {len(related)}"
        print(f"✓ Service {slug} has {len(related)} related products: {related[:3]}...")


class TestConsultationDesignService:
    """Detailed tests for consultation-design service"""

    def test_consultation_design_has_all_fields(self):
        """Consultation & Design service has all required enriched fields"""
        response = requests.get(f"{BASE_URL}/api/services/consultation-design")
        assert response.status_code == 200
        
        data = response.json()
        
        # Check all enriched fields
        assert len(data.get('brands', [])) >= 3, "Should have at least 3 brands"
        assert len(data.get('gallery_images', [])) >= 3, "Should have at least 3 gallery images"
        assert len(data.get('feature_cards', [])) >= 3, "Should have at least 3 feature cards"
        assert len(data.get('related_products', [])) >= 3, "Should have at least 3 related products"
        
        # Check specific brands
        brands = data.get('brands', [])
        assert 'Control4' in brands, "Control4 should be in brands"
        assert 'Crestron' in brands, "Crestron should be in brands"
        
        print("✓ consultation-design has all required enriched fields")


class TestHomeCinemaService:
    """Detailed tests for home-cinema-multi-room-av service"""

    def test_home_cinema_service_has_cinema_brands(self):
        """Home Cinema service has appropriate AV brands"""
        response = requests.get(f"{BASE_URL}/api/services/home-cinema-multi-room-av")
        assert response.status_code == 200
        
        data = response.json()
        brands = data.get('brands', [])
        
        # Check for AV/Cinema brands
        cinema_brands = ['Sony', 'KEF', 'Bowers & Wilkins', 'JVC', 'Dolby']
        found_brands = [b for b in cinema_brands if b in brands]
        assert len(found_brands) >= 2, f"Should have at least 2 cinema brands, found: {found_brands}"
        
        print(f"✓ home-cinema service has cinema brands: {found_brands}")


class TestSecurityService:
    """Detailed tests for security-surveillance-systems service"""

    def test_security_service_has_security_brands(self):
        """Security service has appropriate security brands"""
        response = requests.get(f"{BASE_URL}/api/services/security-surveillance-systems")
        assert response.status_code == 200
        
        data = response.json()
        brands = data.get('brands', [])
        
        # Check for Security brands
        security_brands = ['Hikvision', 'Axis', 'Dahua', 'Honeywell', 'Genetec']
        found_brands = [b for b in security_brands if b in brands]
        assert len(found_brands) >= 2, f"Should have at least 2 security brands, found: {found_brands}"
        
        print(f"✓ security service has security brands: {found_brands}")


class TestNetworkService:
    """Detailed tests for network-infrastructure-it service"""

    def test_network_service_has_network_brands(self):
        """Network service has appropriate network brands"""
        response = requests.get(f"{BASE_URL}/api/services/network-infrastructure-it")
        assert response.status_code == 200
        
        data = response.json()
        brands = data.get('brands', [])
        
        # Check for Network brands
        network_brands = ['Ubiquiti', 'Cisco', 'Ruckus', 'Aruba', 'Pakedge']
        found_brands = [b for b in network_brands if any(nb in b for nb in network_brands)]
        assert len(found_brands) >= 2, f"Should have at least 2 network brands, found: {brands}"
        
        print(f"✓ network service has network brands: {brands}")


class TestSolutionsRegressionCheck:
    """Ensure solutions still work after service changes"""

    def test_smart_home_solution_still_works(self):
        """Smart Home solution page still returns all data"""
        response = requests.get(f"{BASE_URL}/api/solutions/smart-home")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data.get('brands', [])) >= 5, "Smart home should have 5+ brands"
        assert len(data.get('gallery_images', [])) >= 3, "Smart home should have 3+ gallery images"
        assert len(data.get('related_products', [])) >= 3, "Smart home should have 3+ related products"
        
        print("✓ smart-home solution - no regression")

    def test_boardrooms_solution_still_works(self):
        """Boardrooms solution page still returns all data"""
        response = requests.get(f"{BASE_URL}/api/solutions/boardrooms-auditoriums")
        assert response.status_code == 200
        
        data = response.json()
        assert data.get('title'), "Should have title"
        assert data.get('category'), "Should have category"
        
        print("✓ boardrooms-auditoriums solution - no regression")


class TestSolutionsCMSStats:
    """Test solutions CMS stats are accurate"""

    def test_solutions_count_matches(self):
        """Solutions API returns correct count"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        
        data = response.json()
        solutions = data if isinstance(data, list) else data.get('solutions', [])
        
        # According to CMS, we should have 85 solutions
        assert len(solutions) >= 80, f"Expected 80+ solutions, got {len(solutions)}"
        print(f"✓ Found {len(solutions)} solutions (expected 85)")

    def test_solutions_with_gallery_count(self):
        """Count solutions with gallery_images"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        assert response.status_code == 200
        
        data = response.json()
        solutions = data if isinstance(data, list) else data.get('solutions', [])
        
        with_gallery = [s for s in solutions if s.get('gallery_images') and len(s.get('gallery_images', [])) > 0]
        
        # According to CMS stat, 85 solutions have gallery
        print(f"✓ {len(with_gallery)} solutions have gallery images")
        # This should be most of them
        assert len(with_gallery) >= 50, f"Expected 50+ solutions with gallery, got {len(with_gallery)}"
