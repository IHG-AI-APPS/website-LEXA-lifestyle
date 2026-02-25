"""
Tests for Benchmark Redesign - Packages, Intelligence, Specialty Rooms, Locations, Case Studies
Verifies enriched data (feature_cards, faqs, brands) is present
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestLocationsAPI:
    """Location API Tests - Converted from static to dynamic"""
    
    def test_get_all_locations(self):
        """GET /api/locations returns list of locations"""
        response = requests.get(f"{BASE_URL}/api/locations")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "locations" in data
        locations = data["locations"]
        assert len(locations) >= 7, f"Expected at least 7 locations, got {len(locations)}"
        
        # Check first location has required fields
        loc = locations[0]
        assert "slug" in loc
        assert "name" in loc
        assert "title" in loc
        print(f"✓ Found {len(locations)} locations")
    
    def test_get_palm_jumeirah_enriched(self):
        """GET /api/locations/palm-jumeirah returns enriched data"""
        response = requests.get(f"{BASE_URL}/api/locations/palm-jumeirah")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data["slug"] == "palm-jumeirah"
        assert data["name"] == "Palm Jumeirah"
        
        # Check enriched data
        assert "feature_cards" in data, "Missing feature_cards"
        assert len(data["feature_cards"]) >= 3, "Should have at least 3 feature cards"
        
        assert "faqs" in data, "Missing faqs"
        assert len(data["faqs"]) >= 2, "Should have at least 2 FAQs"
        
        assert "brands" in data, "Missing brands"
        assert len(data["brands"]) >= 3, "Should have at least 3 brands"
        
        assert "hero_image" in data, "Missing hero_image"
        assert "features" in data, "Missing features list"
        
        print(f"✓ Palm Jumeirah has {len(data['feature_cards'])} feature cards, {len(data['faqs'])} FAQs, {len(data['brands'])} brands")
    
    def test_get_emirates_hills(self):
        """GET /api/locations/emirates-hills"""
        response = requests.get(f"{BASE_URL}/api/locations/emirates-hills")
        assert response.status_code == 200
        data = response.json()
        assert "feature_cards" in data
        assert "faqs" in data
        print("✓ Emirates Hills location OK")
    
    def test_location_not_found(self):
        """GET /api/locations/nonexistent returns 404"""
        response = requests.get(f"{BASE_URL}/api/locations/nonexistent-location")
        assert response.status_code == 404


class TestPackagesAPI:
    """Package Detail API Tests - Enriched data"""
    
    def test_get_luxury_villas_package(self):
        """GET /api/packages/property-types/luxury-villas-mansions returns enriched data"""
        response = requests.get(f"{BASE_URL}/api/packages/property-types/luxury-villas-mansions")
        assert response.status_code == 200
        
        data = response.json()
        assert data["slug"] == "luxury-villas-mansions"
        
        # Check enriched data
        assert "feature_cards" in data, "Missing feature_cards"
        assert len(data["feature_cards"]) >= 3, f"Should have at least 3 feature cards, got {len(data.get('feature_cards', []))}"
        
        assert "faqs" in data, "Missing faqs"
        assert len(data["faqs"]) >= 2, "Should have at least 2 FAQs"
        
        assert "brands" in data, "Missing brands"
        assert len(data["brands"]) >= 5, "Should have at least 5 brands"
        
        # Check tiers
        assert "tiers" in data, "Missing tiers"
        assert len(data["tiers"]) >= 3, "Should have Essential, Enhanced, High-End tiers"
        
        for tier in data["tiers"]:
            assert "tier_level" in tier
            assert "tier_name" in tier
            assert "base_price_aed" in tier
        
        print(f"✓ Luxury Villas package has {len(data['feature_cards'])} feature cards, {len(data['faqs'])} FAQs, {len(data['brands'])} brands, {len(data['tiers'])} tiers")
    
    def test_get_penthouses_package(self):
        """GET /api/packages/property-types/penthouses-sky-homes"""
        response = requests.get(f"{BASE_URL}/api/packages/property-types/penthouses-sky-homes")
        assert response.status_code == 200
        data = response.json()
        assert "tiers" in data
        print("✓ Penthouses package OK")


class TestSpecialtyRoomsAPI:
    """Specialty Rooms API Tests - Enriched data"""
    
    def test_get_all_specialty_rooms(self):
        """GET /api/packages/specialty-rooms"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200
        
        data = response.json()
        assert "specialty_rooms" in data
        rooms = data["specialty_rooms"]
        assert len(rooms) >= 22, f"Expected 22+ rooms, got {len(rooms)}"
        print(f"✓ Found {len(rooms)} specialty rooms")
    
    def test_game_room_enriched(self):
        """Verify game-room has enriched data via list endpoint"""
        response = requests.get(f"{BASE_URL}/api/packages/specialty-rooms")
        assert response.status_code == 200
        
        data = response.json()
        rooms = data["specialty_rooms"]
        
        game_room = next((r for r in rooms if r.get("slug") == "game-room"), None)
        assert game_room is not None, "game-room not found"
        
        # Check enriched data
        assert "feature_cards" in game_room, "Missing feature_cards"
        assert "faqs" in game_room, "Missing faqs"
        assert "brands" in game_room, "Missing brands"
        
        print(f"✓ Game Room has feature_cards: {len(game_room.get('feature_cards', []))}, faqs: {len(game_room.get('faqs', []))}, brands: {len(game_room.get('brands', []))}")


class TestIntelligenceAPI:
    """Intelligence Features API Tests"""
    
    def test_get_intelligence_features(self):
        """GET /api/intelligence/features returns enriched features"""
        response = requests.get(f"{BASE_URL}/api/intelligence/features?limit=10")
        assert response.status_code == 200
        
        data = response.json()
        assert "features" in data
        features = data["features"]
        assert len(features) >= 1, "Should have at least 1 feature"
        
        # Check first feature has enriched data
        feature = features[0]
        assert "id" in feature, "Missing id"
        assert "title" in feature, "Missing title"
        
        # Check for enriched fields (if present)
        if "feature_cards" in feature:
            assert len(feature["feature_cards"]) >= 1
        if "faqs" in feature:
            assert len(feature["faqs"]) >= 1
        
        print(f"✓ Intelligence features: {len(features)} returned, first has id={feature.get('id')[:8]}...")
        return feature["id"]  # Return for further testing


class TestProjectsAPI:
    """Projects/Case Studies API Tests"""
    
    def test_get_all_projects(self):
        """GET /api/projects"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data) >= 10, f"Expected 10+ projects, got {len(data)}"
        
        # Check project has required fields
        proj = data[0]
        assert "title" in proj
        assert "location" in proj
        assert "image" in proj
        print(f"✓ Found {len(data)} projects")
    
    def test_get_project_by_slug(self):
        """GET /api/projects/palm-jumeirah-penthouse"""
        response = requests.get(f"{BASE_URL}/api/projects/palm-jumeirah-penthouse")
        assert response.status_code == 200
        
        data = response.json()
        assert data["slug"] == "palm-jumeirah-penthouse"
        assert "title" in data
        assert "description" in data
        assert "image" in data
        print("✓ Project detail palm-jumeirah-penthouse OK")


class TestHealthAndBasics:
    """Basic health check tests"""
    
    def test_api_health(self):
        """GET /api/health"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"
        print("✓ API health OK")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
