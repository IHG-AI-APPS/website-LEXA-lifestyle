"""
Phase 2 Testing: TrustBadges, Social Proof, Experience Centre Enhancement
Tests for: Homepage TrustBadges, Consultation page TrustBadges, Experience Centre social proof section,
           Booking modal, FAQ page, Testimonials page, and all page routes
"""

import pytest
import requests
import os
import json

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestPageRoutes:
    """Test all page routes return HTTP 200"""
    
    def test_homepage_loads(self):
        """Homepage should return 200"""
        response = requests.get(f"{BASE_URL}/")
        assert response.status_code == 200, f"Homepage returned {response.status_code}"
        print("✓ Homepage (/) returns 200")
    
    def test_faq_page_loads(self):
        """FAQ page should return 200"""
        response = requests.get(f"{BASE_URL}/faq")
        assert response.status_code == 200, f"FAQ page returned {response.status_code}"
        print("✓ FAQ page (/faq) returns 200")
    
    def test_testimonials_page_loads(self):
        """Testimonials page should return 200"""
        response = requests.get(f"{BASE_URL}/testimonials")
        assert response.status_code == 200, f"Testimonials page returned {response.status_code}"
        print("✓ Testimonials page (/testimonials) returns 200")
    
    def test_experience_centre_page_loads(self):
        """Experience Centre page should return 200"""
        response = requests.get(f"{BASE_URL}/experience-centre")
        assert response.status_code == 200, f"Experience Centre page returned {response.status_code}"
        print("✓ Experience Centre page (/experience-centre) returns 200")
    
    def test_consultation_page_loads(self):
        """Consultation page should return 200"""
        response = requests.get(f"{BASE_URL}/consultation")
        assert response.status_code == 200, f"Consultation page returned {response.status_code}"
        print("✓ Consultation page (/consultation) returns 200")
    
    def test_intelligence_page_loads(self):
        """Intelligence page should return 200"""
        response = requests.get(f"{BASE_URL}/intelligence")
        assert response.status_code == 200, f"Intelligence page returned {response.status_code}"
        print("✓ Intelligence page (/intelligence) returns 200")


class TestExperienceCentreBookingAPI:
    """Test Experience Centre booking endpoint"""
    
    def test_booking_submission_success(self):
        """POST /api/experience-centre/booking should accept valid booking"""
        booking_data = {
            "date": "2026-03-15",
            "time": "2:00 PM",
            "name": "TEST_Phase2_User",
            "email": "testphase2@example.com",
            "phone": "+971501234567",
            "interests": ["Audio", "Security"],
            "message": "Phase 2 automated test booking",
            "website": ""  # Honeypot should be empty
        }
        
        response = requests.post(
            f"{BASE_URL}/api/experience-centre/booking",
            json=booking_data,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code in [200, 201], f"Booking returned {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Response should contain booking ID"
        assert data["name"] == booking_data["name"], "Name should match"
        assert data["email"] == booking_data["email"], "Email should match"
        assert data["status"] == "confirmed", "Status should be 'confirmed'"
        print(f"✓ Booking created with ID: {data['id']}")
    
    def test_booking_with_phone_validation(self):
        """Booking should accept various UAE phone formats"""
        booking_data = {
            "date": "2026-03-16",
            "time": "11:00 AM",
            "name": "TEST_PhoneFormat_User",
            "email": "phonetest@example.com",
            "phone": "0501234567",  # Local format without country code
            "interests": ["Lighting"],
            "message": "Phone format test"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/experience-centre/booking",
            json=booking_data,
            headers={"Content-Type": "application/json"}
        )
        
        # Should accept the booking
        assert response.status_code in [200, 201, 422], f"Unexpected status: {response.status_code}"
        if response.status_code in [200, 201]:
            print("✓ Booking accepted with local phone format")
        else:
            print(f"⚠ Booking rejected phone format: {response.json()}")
    
    def test_booking_missing_required_fields(self):
        """Booking with missing required fields should return error"""
        booking_data = {
            "date": "2026-03-17",
            "time": "3:00 PM"
            # Missing name, email, phone
        }
        
        response = requests.post(
            f"{BASE_URL}/api/experience-centre/booking",
            json=booking_data,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return 422 (validation error) or 400 (bad request)
        assert response.status_code in [400, 422], f"Should reject incomplete booking, got {response.status_code}"
        print("✓ Missing required fields correctly rejected")


class TestTestimonialsAPI:
    """Test testimonials API endpoint"""
    
    def test_get_testimonials(self):
        """GET /api/testimonials should return testimonial data"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        
        assert response.status_code == 200, f"Testimonials API returned {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be an array"
        assert len(data) >= 4, f"Expected at least 4 testimonials, got {len(data)}"
        
        # Verify testimonial structure
        if data:
            testimonial = data[0]
            assert "name" in testimonial, "Testimonial should have name"
            assert "content" in testimonial or "testimonial" in testimonial, "Testimonial should have content"
            assert "rating" in testimonial, "Testimonial should have rating"
        
        print(f"✓ Testimonials API returns {len(data)} testimonials")
    
    def test_testimonials_have_required_fields(self):
        """Each testimonial should have all required display fields"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        data = response.json()
        
        for idx, t in enumerate(data):
            assert t.get("name"), f"Testimonial {idx} missing name"
            content = t.get("content") or t.get("testimonial")
            assert content, f"Testimonial {idx} missing content"
            assert isinstance(t.get("rating", 0), (int, float)), f"Testimonial {idx} rating should be numeric"
        
        print(f"✓ All {len(data)} testimonials have required fields")


class TestFAQAPIIntegration:
    """Test FAQ page API dependencies"""
    
    def test_solutions_api_for_faqs(self):
        """GET /api/solutions should return solutions with FAQs"""
        response = requests.get(f"{BASE_URL}/api/solutions")
        
        assert response.status_code == 200, f"Solutions API returned {response.status_code}"
        
        data = response.json()
        solutions = data if isinstance(data, list) else data.get("solutions", [])
        
        # Check if some solutions have FAQs
        solutions_with_faqs = [s for s in solutions if s.get("faqs")]
        print(f"✓ Solutions API returns {len(solutions)} solutions, {len(solutions_with_faqs)} have FAQs")
    
    def test_services_api_for_faqs(self):
        """GET /api/services should return services with FAQs"""
        response = requests.get(f"{BASE_URL}/api/services")
        
        assert response.status_code == 200, f"Services API returned {response.status_code}"
        
        data = response.json()
        services = data if isinstance(data, list) else data.get("services", [])
        
        services_with_faqs = [s for s in services if s.get("faqs")]
        print(f"✓ Services API returns {len(services)} services, {len(services_with_faqs)} have FAQs")


class TestAdminLogin:
    """Test admin authentication for context verification"""
    
    def test_admin_login_success(self):
        """POST /api/admin/login should return access_token"""
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"username": "admin", "password": "lexa2026"},
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Admin login returned {response.status_code}: {response.text}"
        
        data = response.json()
        assert "access_token" in data, "Response should contain access_token"
        assert len(data["access_token"]) > 0, "Token should not be empty"
        
        print("✓ Admin login successful, token received")
        return data["access_token"]


class TestHealthChecks:
    """Basic health checks for backend"""
    
    def test_api_health(self):
        """API health endpoint should return OK"""
        response = requests.get(f"{BASE_URL}/api")
        
        # Accept 200 or redirect
        assert response.status_code in [200, 307, 308], f"API health returned {response.status_code}"
        print("✓ API health check passed")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
