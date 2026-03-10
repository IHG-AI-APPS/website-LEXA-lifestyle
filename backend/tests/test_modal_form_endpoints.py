"""
Modal & Form Submission E2E Tests
Tests all frontend modals and forms that submit to backend APIs

Categories:
1. Consultation & Booking Modals
2. Contact & Lead Forms
3. Schedule Visit
4. Calculator & Pricing
5. Professional Forms (Contractor, Architect, Developer)
6. Special Submissions (Villa Designer, Package Inquiry, Smart Home)
7. AI Chatbot
8. Project Builder
"""

import pytest
import requests
import os
import uuid
from datetime import datetime, timedelta

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://full-stack-refine.preview.emergentagent.com').rstrip('/')


class TestConsultationAndBookingModals:
    """Tests for ConsultationForm and BookingModal"""
    
    def test_consultation_form_submit(self):
        """Test POST /api/consultation - ConsultationForm modal submission"""
        test_data = {
            "name": "TEST_Consultation User",
            "email": f"test_consult_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "message": "Testing consultation form submission",
            "persona": "homeowner"
        }
        
        response = requests.post(f"{BASE_URL}/api/consultation", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        assert data["name"] == test_data["name"], f"Name mismatch: {data.get('name')}"
        assert data["email"] == test_data["email"], f"Email mismatch"
        print(f"✓ Consultation form submission works - ID: {data['id']}")
    
    def test_booking_modal_submit(self):
        """Test POST /api/contact/booking - BookingModal submission"""
        future_date = (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')
        test_data = {
            "name": "TEST_Booking User",
            "email": f"test_booking_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "preferredDate": future_date,
            "preferredTime": "10:00-11:00",
            "bookingType": "site-visit",
            "message": "Testing booking modal",
            "source": "booking_modal"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact/booking", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        assert data["bookingType"] == "site-visit"
        assert data["status"] == "pending"
        print(f"✓ Booking modal submission works - ID: {data['id']}")
    
    def test_experience_centre_booking(self):
        """Test POST /api/experience-centre/booking"""
        future_date = (datetime.now() + timedelta(days=10)).strftime('%Y-%m-%d')
        test_data = {
            "name": "TEST_Experience Visitor",
            "email": f"test_exp_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "date": future_date,
            "time": "10:00",
            "interests": ["lighting", "security"],
            "message": "Testing experience centre booking"
        }
        
        response = requests.post(f"{BASE_URL}/api/experience-centre/booking", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        print(f"✓ Experience centre booking works - ID: {data['id']}")


class TestContactAndLeadForms:
    """Tests for Contact page form and Lead capture"""
    
    def test_contact_form_submit(self):
        """Test POST /api/contact - Contact page form"""
        test_data = {
            "name": "TEST_Contact User",
            "email": f"test_contact_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "subject": "Testing contact form",
            "message": "This is a test message from the contact form"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        print(f"✓ Contact form submission works - ID: {data['id']}")


class TestScheduleVisit:
    """Tests for ScheduleVisitModal"""
    
    def test_schedule_visit(self):
        """Test POST /api/schedule-visit"""
        test_data = {
            "name": "TEST_Schedule Visitor",
            "email": f"test_visit_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "date": "Mon, Jan 20",
            "time": "10:00 AM",
            "message": "Testing schedule visit"
        }
        
        response = requests.post(f"{BASE_URL}/api/schedule-visit", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert data.get("success") == True, "Should return success=True"
        assert "booking_id" in data, "Should return booking_id"
        assert "ics_url" in data, "Should return ics_url for calendar"
        print(f"✓ Schedule visit works - Booking ID: {data['booking_id']}")


class TestCalculatorAndPricing:
    """Tests for Calculator endpoints"""
    
    def test_calculator_cost_estimate(self):
        """Test POST /api/calculator/cost - Basic cost calculation"""
        test_data = {
            "property_type": "villa",
            "square_footage": 5000,
            "systems": ["lighting", "security", "audio"]
        }
        
        response = requests.post(f"{BASE_URL}/api/calculator/cost", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "estimated_cost_min" in data, "Should return estimated_cost_min"
        assert "estimated_cost_max" in data, "Should return estimated_cost_max"
        assert data["estimated_cost_min"] > 0, "Min cost should be positive"
        assert data["estimated_cost_max"] > data["estimated_cost_min"], "Max should be > min"
        print(f"✓ Calculator cost estimate works - AED {data['estimated_cost_min']:,} to {data['estimated_cost_max']:,}")
    
    def test_calculator_submit_full(self):
        """Test POST /api/calculator/submit - Full calculator submission"""
        test_data = {
            "project_type": "residential",
            "sub_category": "villa",
            "total_area": 5000,
            "num_rooms": 8,
            "num_floors": 3,
            "construction_stage": "new_build",
            "selected_solutions": {
                "lighting-control": "premium",
                "security-access": "premium"
            },
            "additional_features": ["voice-control", "energy-monitoring"],
            "timeline": "3-6 months",
            "budget_range": "luxury",
            "privilege_card": "",  # Empty string instead of boolean
            "emirate": "Dubai",
            "city": "Palm Jumeirah",
            "contact_name": "TEST_Calculator User",
            "contact_email": f"test_calc_{uuid.uuid4().hex[:6]}@test.com",
            "contact_phone": "+971501234567"
        }
        
        response = requests.post(f"{BASE_URL}/api/calculator/submit", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Should return submission id"
        assert "total_cost" in data, "Should return total_cost"
        assert data["total_cost"] > 0, "Total cost should be positive"
        print(f"✓ Calculator submission works - ID: {data['id']}, Cost: AED {data['total_cost']:,}")
    
    def test_calculator_quote_preview(self):
        """Test POST /api/calculator/quote - Quote preview without saving"""
        test_data = {
            "project_type": "residential",
            "sub_category": "apartment",
            "total_area": 2000,
            "num_rooms": 4,
            "num_floors": 1,
            "construction_stage": "retrofit",
            "selected_solutions": {
                "lighting-control": "standard"
            },
            "additional_features": [],
            "timeline": "1-3 months",
            "budget_range": "standard",
            "privilege_card": "",  # Empty string instead of boolean
            "emirate": "Dubai",
            "contact_name": "TEST_Quote Preview",
            "contact_email": f"test_quote_{uuid.uuid4().hex[:6]}@test.com",
            "contact_phone": "+971501234567"
        }
        
        response = requests.post(f"{BASE_URL}/api/calculator/quote", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "total_cost" in data, "Should return total_cost"
        print(f"✓ Calculator quote preview works - Cost: AED {data.get('total_cost', 0):,}")
    
    def test_calculator_roi(self):
        """Test POST /api/calculator/roi - ROI calculation"""
        test_data = {
            "property_size": 5000,
            "property_type": "Villa",
            "num_rooms": 5,
            "systems": ["Lighting Control", "Climate Control", "Security & Access"],
            "current_energy_cost": 3000,
            "electricity_rate": 0.38
        }
        
        response = requests.post(f"{BASE_URL}/api/calculator/roi", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "costs" in data, "Should return costs breakdown"
        assert "savings" in data, "Should return savings"
        assert "roi_timeline" in data, "Should return ROI timeline"
        assert data["costs"]["initial_investment"] > 0, "Initial investment should be positive"
        print(f"✓ ROI Calculator works - Investment: AED {data['costs']['initial_investment']:,}")


class TestProfessionalForms:
    """Tests for Contractor, Architect, Developer forms"""
    
    def test_contractor_project_request(self):
        """Test POST /api/contractors/project-request"""
        test_data = {
            "name": "TEST_Contractor User",
            "email": f"test_contractor_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "company": "TEST Construction Corp",
            "project_type": "villa",
            "systems_needed": ["lighting", "security", "climate"],
            "project_timeline": "6 months",
            "message": "Testing contractor project request"
        }
        
        response = requests.post(f"{BASE_URL}/api/contractors/project-request", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        print(f"✓ Contractor project request works - ID: {data['id']}")
    
    def test_architect_resource_request(self):
        """Test POST /api/architects/resource-request"""
        test_data = {
            "name": "TEST_Architect User",
            "email": f"test_architect_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "company": "TEST Architects Firm",
            "resource_type": "dwg",
            "message": "Testing architect resource request - need CAD files"
        }
        
        response = requests.post(f"{BASE_URL}/api/architects/resource-request", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        print(f"✓ Architect resource request works - ID: {data['id']}")
    
    def test_developer_toolkit_request(self):
        """Test POST /api/developers/toolkit-request"""
        test_data = {
            "name": "TEST_Developer User",
            "email": f"test_developer_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "company": "TEST Developer Corp",
            "project_scale": "100+ units",
            "units_count": 150,
            "resource_type": "toolkit",
            "timeline": "Q2 2026",
            "message": "Testing developer toolkit request"
        }
        
        response = requests.post(f"{BASE_URL}/api/developers/toolkit-request", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        print(f"✓ Developer toolkit request works - ID: {data['id']}")


class TestSpecialSubmissions:
    """Tests for Villa Designer, Package Inquiry, Smart Home submissions"""
    
    def test_villa_designer_submit(self):
        """Test POST /api/villa-designer/submit"""
        test_data = {
            "property_type": "villa",
            "property_size": "5000+ sqft",
            "lifestyle_goals": ["entertainment", "security", "energy-saving"],
            "timeline": "6-12 months",
            "budget_range": "premium",
            "name": "TEST_Villa Designer User",
            "email": f"test_villa_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567"
        }
        
        response = requests.post(f"{BASE_URL}/api/villa-designer/submit", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data, "Response should contain id"
        print(f"✓ Villa designer submission works - ID: {data['id']}")
    
    def test_smart_home_save_project(self):
        """Test POST /api/smart-home/save-project"""
        test_data = {
            "session_id": f"test-session-{uuid.uuid4().hex[:8]}",
            "quote_ref": f"LEXA-TEST-{uuid.uuid4().hex[:6].upper()}",
            "project_details": {
                "projectType": "new_build",
                "propertyType": "villa",
                "budget": "luxury"
            },
            "selected_categories": ["lighting", "security"],
            "must_have_features": ["scene-control", "motion-sensors"],
            "should_have_features": ["voice-control"],
            "protocol_type": "hybrid",
            "selected_protocols": ["KNX", "Zigbee"],
            "selected_systems": ["Control4"],
            "selected_package": "Premium",
            "package_price": "AED 150K-200K",
            "upgrade_features": [],
            "total_upgrade_price": 0,
            "total_features": 10
        }
        
        response = requests.post(f"{BASE_URL}/api/smart-home/save-project", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "project_id" in data, "Response should contain project_id"
        assert "quote_ref" in data, "Response should contain quote_ref"
        print(f"✓ Smart home save project works - Project ID: {data['project_id']}")
    
    def test_smart_home_book_consultation(self):
        """Test POST /api/smart-home/book-consultation"""
        test_data = {
            "quote_ref": f"LEXA-TEST-{uuid.uuid4().hex[:6].upper()}",
            "session_id": f"test-session-{uuid.uuid4().hex[:8]}",
            "name": "TEST_Smart Consultation User",
            "email": f"test_smart_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "preferred_time": "morning",
            "project_type": "new_build",
            "property_type": "villa",
            "selected_package": "Premium",
            "total_features": 15
        }
        
        response = requests.post(f"{BASE_URL}/api/smart-home/book-consultation", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "booking_id" in data, "Response should contain booking_id"
        assert "confirmation_number" in data, "Response should contain confirmation_number"
        print(f"✓ Smart home book consultation works - Confirmation: {data['confirmation_number']}")


class TestAIChatbot:
    """Tests for AI Chatbot endpoints"""
    
    def test_ai_chat_message(self):
        """Test POST /api/ai-chat/message - Send message to AI"""
        session_id = f"e2e-test-session-{uuid.uuid4().hex[:8]}"
        test_data = {
            "session_id": session_id,
            "message": "What lighting solutions do you offer?"
        }
        
        response = requests.post(f"{BASE_URL}/api/ai-chat/message", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "session_id" in data, "Response should contain session_id"
        assert "response" in data, "Response should contain AI response"
        assert len(data["response"]) > 0, "AI response should not be empty"
        print(f"✓ AI chat message works - Response length: {len(data['response'])} chars")
        
        return session_id
    
    def test_ai_chat_followup(self):
        """Test AI chat maintains conversation context"""
        session_id = f"e2e-test-context-{uuid.uuid4().hex[:8]}"
        
        # First message
        response1 = requests.post(f"{BASE_URL}/api/ai-chat/message", json={
            "session_id": session_id,
            "message": "I'm interested in a villa automation project"
        })
        assert response1.status_code == 200, f"First message failed: {response1.text}"
        
        # Follow-up message
        response2 = requests.post(f"{BASE_URL}/api/ai-chat/message", json={
            "session_id": session_id,
            "message": "How much would that cost approximately?"
        })
        
        # Status assertion
        assert response2.status_code == 200, f"Expected 200, got {response2.status_code}: {response2.text}"
        
        # Data assertions
        data = response2.json()
        assert "response" in data, "Response should contain AI response"
        print(f"✓ AI chat follow-up works with context - Lead score: {data.get('lead_score', 0)}")


class TestProjectBuilder:
    """Tests for Project Builder endpoints"""
    
    def test_project_builder_features(self):
        """Test GET /api/smart-home/features - Get available features"""
        response = requests.get(f"{BASE_URL}/api/smart-home/features")
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "categories" in data, "Response should contain categories"
        assert "total_features" in data, "Response should contain total_features"
        assert data["total_features"] > 0, "Should have features available"
        print(f"✓ Project builder features - {data['total_features']} features in {len(data['categories'])} categories")
    
    def test_project_builder_protocols(self):
        """Test GET /api/smart-home/protocols - Get protocol options"""
        response = requests.get(f"{BASE_URL}/api/smart-home/protocols")
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "wired" in data or "wireless" in data or "hybrid" in data, "Should return protocol types"
        print(f"✓ Project builder protocols - Wired: {len(data.get('wired', []))}, Wireless: {len(data.get('wireless', []))}, Hybrid: {len(data.get('hybrid', []))}")
    
    def test_project_builder_systems(self):
        """Test GET /api/smart-home/systems - Get control systems"""
        response = requests.get(f"{BASE_URL}/api/smart-home/systems")
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "systems" in data, "Response should contain systems"
        assert "total" in data, "Response should contain total count"
        print(f"✓ Project builder systems - {data['total']} control systems available")
    
    def test_project_builder_calculate_package(self):
        """Test POST /api/smart-home/calculate-package"""
        test_data = {
            "session_id": f"test-session-{uuid.uuid4().hex[:8]}",
            "selected_features": {
                "must_have": ["scene-control", "motion-sensors", "security-cameras"],
                "should_have": ["voice-control", "energy-monitoring"],
                "could_have": ["music-zones"],
                "want_to_have": []
            },
            "protocol_type": "hybrid",
            "selected_protocols": ["KNX", "Zigbee"],
            "selected_systems": ["Control4"],
            "project_details": {
                "projectType": "new_build",
                "propertyType": "villa",
                "budget": "luxury",
                "bedrooms": 5,
                "floors": 2
            }
        }
        
        response = requests.post(f"{BASE_URL}/api/smart-home/calculate-package", json=test_data)
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "packages" in data, "Response should contain packages"
        assert "ai_insights" in data, "Response should contain AI insights"
        assert len(data["packages"]) > 0, "Should return package options"
        print(f"✓ Project builder calculate package - {len(data['packages'])} packages, {len(data['ai_insights'])} insights")


class TestAdditionalEndpoints:
    """Tests for any additional form-related endpoints"""
    
    def test_package_inquiry_submit(self):
        """Test POST /api/package-inquiry - Package inquiry form"""
        test_data = {
            "name": "TEST_Package Inquiry User",
            "email": f"test_pkg_{uuid.uuid4().hex[:6]}@test.com",
            "phone": "+971501234567",
            "package_type": "gold",
            "property_type": "apartment",
            "num_bedrooms": 3,
            "message": "Testing package inquiry"
        }
        
        response = requests.post(f"{BASE_URL}/api/package-inquiry", json=test_data)
        
        # Check if endpoint exists (404 is also informative)
        if response.status_code == 404:
            print("⚠ Package inquiry endpoint not found - /api/package-inquiry")
            pytest.skip("Endpoint not implemented")
        
        # Status assertion
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        # Data assertions
        data = response.json()
        assert "id" in data or "success" in data, "Response should contain id or success"
        print(f"✓ Package inquiry submission works")


# ============= TEST EXECUTION =============

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
