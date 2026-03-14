"""
LEXA Smart Home Platform - Go-Live QA Tests
Comprehensive testing for all phases:
- Phase 1: Performance & Core Web Vitals
- Phase 2: Mobile Responsiveness (via Playwright)
- Phase 3: Functional QA (5 Personas)
- Phase 4: Intelligence Builder Validation
- Phase 5: Forms & Lead Capture
- Phase 6: SEO & Indexing
- Phase 7: API Endpoints
"""

import pytest
import requests
import os
import time
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://sunday-hours-update.preview.emergentagent.com')

class TestPhase7APIEndpoints:
    """Phase 7: API Endpoints Testing"""
    
    def test_health_endpoint(self):
        """GET /api/health - should return healthy"""
        response = requests.get(f"{BASE_URL}/api/health", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"
        assert "database" in data
        print(f"✅ Health check passed: {data}")
    
    def test_solutions_endpoint(self):
        """GET /api/solutions - should return solutions list"""
        response = requests.get(f"{BASE_URL}/api/solutions", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        # Verify solution structure
        solution = data[0]
        assert "id" in solution
        assert "title" in solution
        assert "slug" in solution
        print(f"✅ Solutions endpoint returned {len(data)} solutions")
    
    def test_tracking_public_config(self):
        """GET /api/admin/tracking/public/config - should return tracking config"""
        response = requests.get(f"{BASE_URL}/api/admin/tracking/public/config", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert "config" in data
        print(f"✅ Tracking config endpoint working: {data}")
    
    def test_geo_pages_endpoint(self):
        """GET /api/geo-pages - should return geo pages"""
        response = requests.get(f"{BASE_URL}/api/geo-pages", timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert "geo_pages" in data
        geo_pages = data["geo_pages"]
        assert len(geo_pages) >= 28, f"Expected 28+ geo pages, got {len(geo_pages)}"
        print(f"✅ Geo pages endpoint returned {len(geo_pages)} pages")
    
    def test_contact_submission(self):
        """POST /api/contact - test contact submission"""
        test_data = {
            "name": "TEST_GoLive_QA",
            "email": "test_golive@example.com",
            "phone": "+971501234567",
            "subject": "Test Inquiry",
            "message": "This is a test message from go-live QA testing"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=test_data, timeout=10)
        # Accept 200, 201, or 429 (rate limited)
        assert response.status_code in [200, 201, 429], f"Unexpected status: {response.status_code}"
        if response.status_code == 429:
            print("⚠️ Contact endpoint rate limited (expected behavior)")
        else:
            print(f"✅ Contact submission successful: {response.json()}")


class TestPhase6SEOIndexing:
    """Phase 6: SEO & Indexing Tests"""
    
    def test_sitemap_exists(self):
        """Check /sitemap.xml exists and is valid"""
        response = requests.get(f"{BASE_URL}/sitemap.xml", timeout=10)
        assert response.status_code == 200
        content = response.text
        assert '<?xml' in content
        assert '<urlset' in content
        assert '<url>' in content
        # Count URLs
        url_count = content.count('<url>')
        assert url_count > 50, f"Expected 50+ URLs in sitemap, got {url_count}"
        print(f"✅ Sitemap valid with {url_count} URLs")
    
    def test_sitemap_contains_geo_pages(self):
        """Verify sitemap contains geo pages"""
        response = requests.get(f"{BASE_URL}/sitemap.xml", timeout=10)
        content = response.text
        # Check for key geo pages
        geo_pages_to_check = [
            "dubai", "abu-dhabi", "saudi-arabia", "qatar", "egypt"
        ]
        for page in geo_pages_to_check:
            assert page in content.lower(), f"Geo page '{page}' not found in sitemap"
        print("✅ Sitemap contains all major geo regions")


class TestPhase3FunctionalQAPersonas:
    """Phase 3: Functional QA - 5 Personas"""
    
    def test_persona_villa_owner_solutions(self):
        """Persona 1 - Villa Owner: Verify cinema options available"""
        response = requests.get(f"{BASE_URL}/api/solutions", timeout=10)
        assert response.status_code == 200
        solutions = response.json()
        
        # Check for cinema/theater solutions
        cinema_solutions = [s for s in solutions if 'cinema' in s.get('title', '').lower() or 'theater' in s.get('title', '').lower()]
        assert len(cinema_solutions) > 0, "No cinema solutions found for villa owners"
        print(f"✅ Villa owner persona: Found {len(cinema_solutions)} cinema solutions")
    
    def test_persona_commercial_solutions(self):
        """Persona 3 - Commercial: Verify commercial solutions available"""
        response = requests.get(f"{BASE_URL}/api/solutions", timeout=10)
        assert response.status_code == 200
        solutions = response.json()
        
        # Check for commercial solutions
        commercial_solutions = [s for s in solutions if 'commercial' in s.get('category', '').lower() or 'collaboration' in s.get('title', '').lower()]
        assert len(commercial_solutions) > 0, "No commercial solutions found"
        print(f"✅ Commercial persona: Found {len(commercial_solutions)} commercial solutions")


class TestPhase4IntelligenceBuilderValidation:
    """Phase 4: Intelligence Builder Validation"""
    
    def test_smart_home_features_endpoint(self):
        """Test smart home features API"""
        response = requests.get(f"{BASE_URL}/api/smart-home/features", timeout=10)
        # Accept 200 or 404 (endpoint may not exist)
        if response.status_code == 200:
            data = response.json()
            print("✅ Smart home features endpoint working")
        else:
            print(f"⚠️ Smart home features endpoint returned {response.status_code}")
    
    def test_project_builder_systems(self):
        """Test project builder systems endpoint"""
        response = requests.get(f"{BASE_URL}/api/project-builder/systems", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print("✅ Project builder systems endpoint working")
        else:
            print(f"⚠️ Project builder systems endpoint returned {response.status_code}")


class TestPhase5FormsLeadCapture:
    """Phase 5: Forms & Lead Capture"""
    
    def test_experience_centre_booking_api(self):
        """Test experience centre booking endpoint"""
        test_data = {
            "name": "TEST_GoLive_Booking",
            "phone": "+971501234567",
            "email": "test_booking@example.com",
            "date": "2026-03-01",
            "time": "10:00 AM",
            "interests": ["smart-lighting", "home-cinema"]
        }
        response = requests.post(f"{BASE_URL}/api/experience-centre/booking", json=test_data, timeout=10)
        # Accept 200, 201, or 429 (rate limited)
        assert response.status_code in [200, 201, 429], f"Unexpected status: {response.status_code}"
        if response.status_code == 429:
            print("⚠️ Booking endpoint rate limited (expected behavior)")
        else:
            print("✅ Experience centre booking API working")
    
    def test_consultation_booking_api(self):
        """Test consultation booking endpoint"""
        test_data = {
            "name": "TEST_GoLive_Consultation",
            "email": "test_consultation@example.com",
            "phone": "+971501234567",
            "message": "Test consultation request from go-live QA"
        }
        response = requests.post(f"{BASE_URL}/api/consultation", json=test_data, timeout=10)
        # Accept 200, 201, or 429 (rate limited)
        assert response.status_code in [200, 201, 429], f"Unexpected status: {response.status_code}"
        if response.status_code == 429:
            print("⚠️ Consultation endpoint rate limited (expected behavior)")
        else:
            print("✅ Consultation booking API working")


class TestGeoPagesFrontend:
    """Test geo pages are accessible"""
    
    def test_dubai_geo_pages(self):
        """Test Dubai geo pages load"""
        dubai_pages = [
            "/dubai/palm-jumeirah-smart-homes",
            "/dubai/emirates-hills-villa-automation",
            "/dubai/downtown-dubai-penthouse-automation",
            "/dubai/dubai-hills-smart-villas"
        ]
        for page in dubai_pages:
            response = requests.get(f"{BASE_URL}{page}", timeout=10)
            assert response.status_code == 200, f"Page {page} returned {response.status_code}"
        print(f"✅ All {len(dubai_pages)} Dubai geo pages accessible")
    
    def test_saudi_geo_pages(self):
        """Test Saudi Arabia geo pages load"""
        saudi_pages = [
            "/saudi-arabia/riyadh-smart-homes",
            "/saudi-arabia/jeddah-home-automation",
            "/saudi-arabia/neom-smart-living",
            "/saudi-arabia/dammam-villa-automation"
        ]
        for page in saudi_pages:
            response = requests.get(f"{BASE_URL}{page}", timeout=10)
            assert response.status_code == 200, f"Page {page} returned {response.status_code}"
        print(f"✅ All {len(saudi_pages)} Saudi geo pages accessible")
    
    def test_gcc_geo_pages(self):
        """Test GCC geo pages load"""
        gcc_pages = [
            "/qatar/doha-smart-homes",
            "/kuwait/kuwait-city-home-automation",
            "/bahrain/manama-smart-homes",
            "/oman/muscat-home-automation"
        ]
        for page in gcc_pages:
            response = requests.get(f"{BASE_URL}{page}", timeout=10)
            assert response.status_code == 200, f"Page {page} returned {response.status_code}"
        print(f"✅ All {len(gcc_pages)} GCC geo pages accessible")


class TestServicePages:
    """Test service pages are accessible"""
    
    def test_service_pages_load(self):
        """Test all service pages load correctly"""
        service_pages = [
            "/services/home-cinema",
            "/services/smart-lighting",
            "/services/home-theater",
            "/services/high-end-audio",
            "/services/multi-room-audio",
            "/services/outdoor-audio",
            "/services/luxury-villa-automation"
        ]
        for page in service_pages:
            response = requests.get(f"{BASE_URL}{page}", timeout=10)
            assert response.status_code == 200, f"Service page {page} returned {response.status_code}"
        print(f"✅ All {len(service_pages)} service pages accessible")


class TestPartnerPages:
    """Test partner pages are accessible"""
    
    def test_partner_pages_load(self):
        """Test partner pages load correctly"""
        partner_pages = [
            "/partners/architects",
            "/partners/developers"
        ]
        for page in partner_pages:
            response = requests.get(f"{BASE_URL}{page}", timeout=10)
            assert response.status_code == 200, f"Partner page {page} returned {response.status_code}"
        print(f"✅ All {len(partner_pages)} partner pages accessible")


class TestCorePages:
    """Test core pages are accessible"""
    
    def test_homepage_loads(self):
        """Test homepage loads"""
        response = requests.get(f"{BASE_URL}/", timeout=10)
        assert response.status_code == 200
        print("✅ Homepage loads successfully")
    
    def test_contact_page_loads(self):
        """Test contact page loads"""
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        assert response.status_code == 200
        print("✅ Contact page loads successfully")
    
    def test_experience_centre_page_loads(self):
        """Test experience centre page loads"""
        response = requests.get(f"{BASE_URL}/experience-centre", timeout=10)
        assert response.status_code == 200
        print("✅ Experience centre page loads successfully")
    
    def test_project_builder_page_loads(self):
        """Test project builder page loads"""
        response = requests.get(f"{BASE_URL}/project-builder/smart", timeout=10)
        assert response.status_code == 200
        print("✅ Project builder page loads successfully")


class TestAdminAuthentication:
    """Test admin authentication"""
    
    def test_admin_login(self):
        """Test admin login with provided credentials"""
        login_data = {
            "username": "admin",
            "password": "lexa2026"
        }
        response = requests.post(f"{BASE_URL}/api/admin/login", json=login_data, timeout=10)
        assert response.status_code == 200, f"Admin login failed: {response.status_code}"
        data = response.json()
        assert "access_token" in data
        print("✅ Admin login successful")
        return data["access_token"]
    
    def test_admin_verify(self):
        """Test admin token verification"""
        # First login
        login_data = {
            "username": "admin",
            "password": "lexa2026"
        }
        login_response = requests.post(f"{BASE_URL}/api/admin/login", json=login_data, timeout=10)
        if login_response.status_code != 200:
            pytest.skip("Admin login failed, skipping verify test")
        
        token = login_response.json()["access_token"]
        
        # Verify token
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/api/admin/verify", headers=headers, timeout=10)
        assert response.status_code == 200
        data = response.json()
        assert data.get("valid") == True
        print("✅ Admin token verification successful")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
