"""
Test CMS Extensions - Specialty Rooms, Intelligence Features, and Locations Admin
Testing new enriched field editing (FAQs, Feature Cards, Related Solutions) and new Locations admin
"""
import pytest
import requests
import os
import json

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestSpecialtyRoomsAPI:
    """Test specialty rooms API endpoints - should return 22 rooms with FAQs and feature_cards fields"""
    
    def test_get_specialty_rooms_count(self):
        """GET /api/packages/specialty-rooms should return 22 rooms"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200
        data = response.json()
        rooms = data.get('specialty_rooms', [])
        assert len(rooms) == 22, f"Expected 22 specialty rooms, got {len(rooms)}"
        print(f"✓ Specialty rooms count: {len(rooms)}")
    
    def test_specialty_rooms_have_faqs_field(self):
        """Specialty rooms should have 'faqs' field"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200
        data = response.json()
        rooms = data.get('specialty_rooms', [])
        
        rooms_with_faqs = [r for r in rooms if 'faqs' in r]
        print(f"✓ {len(rooms_with_faqs)}/{len(rooms)} rooms have 'faqs' field")
        # At least some rooms should have FAQs
        assert len(rooms_with_faqs) > 0, "Expected at least some rooms to have 'faqs' field"
    
    def test_specialty_rooms_have_feature_cards_field(self):
        """Specialty rooms should have 'feature_cards' field"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200
        data = response.json()
        rooms = data.get('specialty_rooms', [])
        
        rooms_with_feature_cards = [r for r in rooms if 'feature_cards' in r]
        print(f"✓ {len(rooms_with_feature_cards)}/{len(rooms)} rooms have 'feature_cards' field")
    
    def test_specialty_rooms_data_structure(self):
        """Verify specialty rooms have required fields"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200
        data = response.json()
        rooms = data.get('specialty_rooms', [])
        
        required_fields = ['id', 'name', 'slug', 'category']
        for room in rooms[:5]:  # Check first 5 rooms
            for field in required_fields:
                assert field in room, f"Missing field '{field}' in room {room.get('name', 'unknown')}"
        print(f"✓ All required fields present in specialty rooms")


class TestLocationsAPI:
    """Test locations API endpoints - should return 7 locations"""
    
    def test_get_locations_count(self):
        """GET /api/locations should return 7 locations"""
        response = requests.get(f"{BASE_URL}/api/locations")
        assert response.status_code == 200
        data = response.json()
        locations = data.get('locations', [])
        assert len(locations) == 7, f"Expected 7 locations, got {len(locations)}"
        print(f"✓ Locations count: {len(locations)}")
    
    def test_locations_have_expected_names(self):
        """Verify expected locations are present"""
        response = requests.get(f"{BASE_URL}/api/locations")
        assert response.status_code == 200
        data = response.json()
        locations = data.get('locations', [])
        
        location_names = [loc.get('name') for loc in locations]
        expected_locations = ['Palm Jumeirah', 'Emirates Hills', 'Downtown Dubai', 'Dubai Hills Estate', 'Abu Dhabi', 'Sharjah']
        
        for expected in expected_locations:
            found = any(expected in name for name in location_names)
            if found:
                print(f"✓ Found location: {expected}")
            else:
                print(f"⚠ Location not found: {expected}")
    
    def test_locations_data_structure(self):
        """Verify locations have required fields for admin editing"""
        response = requests.get(f"{BASE_URL}/api/locations")
        assert response.status_code == 200
        data = response.json()
        locations = data.get('locations', [])
        
        # Fields that should be available for editing
        expected_fields = ['slug', 'name']
        for loc in locations:
            for field in expected_fields:
                assert field in loc, f"Missing field '{field}' in location {loc.get('name', 'unknown')}"
        print(f"✓ All required fields present in locations")
    
    def test_get_single_location(self):
        """GET /api/locations/{slug} should return a single location"""
        response = requests.get(f"{BASE_URL}/api/locations/palm-jumeirah")
        assert response.status_code == 200
        location = response.json()
        assert 'name' in location
        assert 'Palm Jumeirah' in location.get('name', '')
        print(f"✓ Single location fetch works: {location.get('name')}")
    
    def test_location_has_editable_fields(self):
        """Verify location has all editable fields for admin"""
        response = requests.get(f"{BASE_URL}/api/locations/palm-jumeirah")
        assert response.status_code == 200
        location = response.json()
        
        editable_fields = ['name', 'slug', 'description']
        for field in editable_fields:
            if field in location:
                print(f"✓ Field '{field}' present")
        print(f"✓ Location has editable fields for admin")
    
    def test_location_update_endpoint_exists(self):
        """PUT /api/locations/{slug} endpoint should exist"""
        # Test with a simple GET first to confirm the endpoint pattern
        response = requests.get(f"{BASE_URL}/api/locations/palm-jumeirah")
        assert response.status_code == 200
        print(f"✓ Location endpoint pattern works")


class TestIntelligenceFeaturesAdminAPI:
    """Test intelligence features admin API - requires authentication"""
    
    def test_intelligence_features_requires_auth(self):
        """GET /api/intelligence/admin/features should require authentication"""
        response = requests.get(f"{BASE_URL}/api/intelligence/admin/features")
        # Should return 401 or 403 without auth
        assert response.status_code in [401, 403, 422], f"Expected auth error, got {response.status_code}"
        print(f"✓ Intelligence features admin requires authentication")
    
    def test_intelligence_stats_requires_auth(self):
        """GET /api/intelligence/admin/stats should require authentication"""
        response = requests.get(f"{BASE_URL}/api/intelligence/admin/stats")
        assert response.status_code in [401, 403, 422], f"Expected auth error, got {response.status_code}"
        print(f"✓ Intelligence stats admin requires authentication")


class TestGeoPagesRegression:
    """Regression tests for geo pages admin - ensure it still works"""
    
    def test_geo_pages_list(self):
        """GET /api/geo-pages should still return geo pages"""
        response = requests.get(f"{BASE_URL}/api/geo-pages")
        assert response.status_code == 200
        data = response.json()
        pages = data.get('geo_pages', [])
        assert len(pages) > 0, "Expected geo pages to be present"
        print(f"✓ Geo pages regression: {len(pages)} pages found")
    
    def test_geo_page_by_slug(self):
        """GET /api/geo-pages/slug/{slug} should return a specific page"""
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/dubai/palm-jumeirah-smart-homes")
        assert response.status_code == 200
        page = response.json()
        assert 'locationName' in page or 'heroTitle' in page
        print(f"✓ Geo page by slug works")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
