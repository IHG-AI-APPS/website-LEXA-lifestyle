"""
Geo Pages API Tests
Tests for database-driven geo pages: CRUD operations and content management
"""
import pytest
import requests
import os
import random
import string

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestGeoPagesList:
    """Tests for GET /api/geo-pages - list all geo pages"""

    def test_get_all_geo_pages(self):
        """Should return list of 34 geo pages"""
        response = requests.get(f"{BASE_URL}/api/geo-pages")
        assert response.status_code == 200, f"Failed with status {response.status_code}: {response.text}"
        
        data = response.json()
        assert "geo_pages" in data, "Response should contain 'geo_pages' key"
        
        pages = data["geo_pages"]
        assert isinstance(pages, list), "geo_pages should be a list"
        assert len(pages) >= 30, f"Expected at least 30 geo pages, got {len(pages)}"
        print(f"SUCCESS: GET /api/geo-pages returned {len(pages)} pages")

    def test_geo_pages_have_required_fields(self):
        """Each page should have slug, locationName, region"""
        response = requests.get(f"{BASE_URL}/api/geo-pages")
        assert response.status_code == 200
        
        data = response.json()
        pages = data["geo_pages"]
        
        for page in pages[:10]:  # Check first 10
            assert "slug" in page, f"Page missing slug: {page}"
            assert "locationName" in page, f"Page missing locationName: {page}"
            assert "region" in page, f"Page missing region: {page}"
        print(f"SUCCESS: All checked pages have required fields (slug, locationName, region)")


class TestGeoPageBySlug:
    """Tests for GET /api/geo-pages/slug/{slug} - get single page"""

    def test_get_dubai_palm_jumeirah(self):
        """Should return full page data for dubai/palm-jumeirah-smart-homes"""
        slug = "dubai/palm-jumeirah-smart-homes"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 200, f"Failed with status {response.status_code}: {response.text}"
        
        data = response.json()
        assert data.get("locationName") == "Palm Jumeirah", f"Expected 'Palm Jumeirah', got {data.get('locationName')}"
        assert data.get("region") == "Dubai, UAE", f"Expected 'Dubai, UAE', got {data.get('region')}"
        assert "heroTitle" in data, "Missing heroTitle"
        assert "heroHighlight" in data, "Missing heroHighlight"
        assert "heroDescription" in data, "Missing heroDescription"
        assert "communities" in data, "Missing communities"
        assert "stats" in data, "Missing stats"
        assert "ctaTitle" in data, "Missing ctaTitle"
        print(f"SUCCESS: GET /api/geo-pages/slug/{slug} returned full page data")

    def test_get_uae_dubai(self):
        """Should return full page data for uae/dubai"""
        slug = "uae/dubai"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 200, f"Failed with status {response.status_code}: {response.text}"
        
        data = response.json()
        assert "locationName" in data
        assert "region" in data
        assert "communities" in data
        print(f"SUCCESS: GET /api/geo-pages/slug/{slug} returned full page data")

    def test_get_saudi_arabia_riyadh(self):
        """Should return full page data for saudi-arabia/riyadh-smart-homes"""
        slug = "saudi-arabia/riyadh-smart-homes"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 200, f"Failed with status {response.status_code}: {response.text}"
        
        data = response.json()
        assert "locationName" in data
        assert "region" in data
        print(f"SUCCESS: GET /api/geo-pages/slug/{slug} returned full page data")

    def test_get_uae_ajman(self):
        """Should return full page data for uae/ajman"""
        slug = "uae/ajman"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 200, f"Failed with status {response.status_code}: {response.text}"
        
        data = response.json()
        assert "locationName" in data
        assert "region" in data
        print(f"SUCCESS: GET /api/geo-pages/slug/{slug} returned full page data")

    def test_get_nonexistent_page(self):
        """Should return 404 for non-existent slug"""
        slug = "nonexistent/page-that-does-not-exist"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print(f"SUCCESS: GET /api/geo-pages/slug/{slug} correctly returned 404")


class TestGeoPageUpdate:
    """Tests for PUT /api/geo-pages/slug/{slug} - update page"""

    def test_update_geo_page_hero_title(self):
        """Should update heroTitle and verify persistence"""
        slug = "dubai/palm-jumeirah-smart-homes"
        
        # Get original data
        original_response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert original_response.status_code == 200
        original_data = original_response.json()
        original_hero_title = original_data.get("heroTitle")
        
        # Update with test value
        test_suffix = ''.join(random.choices(string.ascii_lowercase, k=5))
        updated_hero_title = f"Test Smart Home Automation {test_suffix}"
        
        update_payload = {
            "heroTitle": updated_hero_title
        }
        
        update_response = requests.put(
            f"{BASE_URL}/api/geo-pages/slug/{slug}",
            json=update_payload,
            headers={"Content-Type": "application/json"}
        )
        assert update_response.status_code == 200, f"Update failed with {update_response.status_code}: {update_response.text}"
        
        updated_data = update_response.json()
        assert updated_data.get("heroTitle") == updated_hero_title, "Update response should have new heroTitle"
        
        # Verify persistence with GET
        verify_response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert verify_response.status_code == 200
        verify_data = verify_response.json()
        assert verify_data.get("heroTitle") == updated_hero_title, "GET should return updated heroTitle"
        
        # Restore original value
        restore_response = requests.put(
            f"{BASE_URL}/api/geo-pages/slug/{slug}",
            json={"heroTitle": original_hero_title},
            headers={"Content-Type": "application/json"}
        )
        assert restore_response.status_code == 200
        print(f"SUCCESS: PUT /api/geo-pages/slug/{slug} updated heroTitle and persisted correctly")

    def test_update_geo_page_communities(self):
        """Should update communities array and verify persistence"""
        slug = "dubai/palm-jumeirah-smart-homes"
        
        # Get original data
        original_response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert original_response.status_code == 200
        original_data = original_response.json()
        original_communities = original_data.get("communities", [])
        
        # Add a test community
        test_community = {
            "name": "Test Community Added",
            "type": "Test Type",
            "price": "TEST"
        }
        new_communities = original_communities + [test_community]
        
        update_response = requests.put(
            f"{BASE_URL}/api/geo-pages/slug/{slug}",
            json={"communities": new_communities},
            headers={"Content-Type": "application/json"}
        )
        assert update_response.status_code == 200, f"Update failed with {update_response.status_code}"
        
        # Verify persistence
        verify_response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        verify_data = verify_response.json()
        assert len(verify_data.get("communities", [])) == len(new_communities), "Community count should match"
        assert any(c.get("name") == "Test Community Added" for c in verify_data.get("communities", [])), "Test community should exist"
        
        # Restore original communities
        restore_response = requests.put(
            f"{BASE_URL}/api/geo-pages/slug/{slug}",
            json={"communities": original_communities},
            headers={"Content-Type": "application/json"}
        )
        assert restore_response.status_code == 200
        print(f"SUCCESS: PUT /api/geo-pages/slug/{slug} updated communities and persisted correctly")

    def test_update_nonexistent_page(self):
        """Should return 404 when updating non-existent page"""
        slug = "nonexistent/page-xyz"
        response = requests.put(
            f"{BASE_URL}/api/geo-pages/slug/{slug}",
            json={"heroTitle": "Test"},
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print(f"SUCCESS: PUT /api/geo-pages/slug/{slug} correctly returned 404")


class TestGeoPageContent:
    """Tests for verifying geo page content structure"""

    def test_page_has_stats(self):
        """Page should have stats array with value and label"""
        slug = "dubai/palm-jumeirah-smart-homes"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        stats = data.get("stats", [])
        assert len(stats) > 0, "Page should have at least one stat"
        
        for stat in stats:
            assert "value" in stat, f"Stat missing 'value': {stat}"
            assert "label" in stat, f"Stat missing 'label': {stat}"
        print(f"SUCCESS: Page has {len(stats)} valid stats")

    def test_page_has_communities(self):
        """Page should have communities with name and type"""
        slug = "dubai/palm-jumeirah-smart-homes"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        communities = data.get("communities", [])
        assert len(communities) > 0, "Page should have at least one community"
        
        for comm in communities:
            assert "name" in comm, f"Community missing 'name': {comm}"
            assert "type" in comm, f"Community missing 'type': {comm}"
        print(f"SUCCESS: Page has {len(communities)} valid communities")

    def test_page_has_services(self):
        """Page should have services array (optional)"""
        slug = "dubai/palm-jumeirah-smart-homes"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        services = data.get("services", [])
        
        if services:
            for svc in services:
                assert "title" in svc, f"Service missing 'title': {svc}"
                assert "description" in svc, f"Service missing 'description': {svc}"
            print(f"SUCCESS: Page has {len(services)} valid services")
        else:
            print("INFO: Page has no services (optional)")

    def test_page_has_faqs(self):
        """Page should have FAQs array (optional)"""
        slug = "dubai/palm-jumeirah-smart-homes"
        response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
        assert response.status_code == 200
        
        data = response.json()
        faqs = data.get("faqs", [])
        
        if faqs:
            for faq in faqs:
                assert "question" in faq, f"FAQ missing 'question': {faq}"
                assert "answer" in faq, f"FAQ missing 'answer': {faq}"
            print(f"SUCCESS: Page has {len(faqs)} valid FAQs")
        else:
            print("INFO: Page has no FAQs (optional)")


class TestMultipleGeoPages:
    """Tests for verifying multiple geo pages exist in database"""

    def test_dubai_pages_exist(self):
        """Dubai area pages should exist"""
        dubai_slugs = [
            "dubai/palm-jumeirah-smart-homes",
            "dubai/emirates-hills-villa-automation",
            "dubai/dubai-hills-smart-villas",
            "dubai/downtown-dubai-penthouse-automation",
            "dubai/dubai-marina-smart-homes"
        ]
        
        for slug in dubai_slugs:
            response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
            assert response.status_code == 200, f"Page {slug} not found"
        print(f"SUCCESS: All {len(dubai_slugs)} Dubai pages exist")

    def test_uae_emirate_pages_exist(self):
        """UAE emirate pages should exist"""
        uae_slugs = [
            "uae/dubai",
            "uae/abu-dhabi",
            "uae/sharjah",
            "uae/ajman"
        ]
        
        for slug in uae_slugs:
            response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
            assert response.status_code == 200, f"Page {slug} not found"
        print(f"SUCCESS: All {len(uae_slugs)} UAE emirate pages exist")

    def test_international_pages_exist(self):
        """International pages should exist"""
        international_slugs = [
            "saudi-arabia/riyadh-smart-homes",
            "qatar/doha-smart-homes",
            "egypt/cairo-smart-homes"
        ]
        
        for slug in international_slugs:
            response = requests.get(f"{BASE_URL}/api/geo-pages/slug/{slug}")
            assert response.status_code == 200, f"Page {slug} not found"
        print(f"SUCCESS: All {len(international_slugs)} international pages exist")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
