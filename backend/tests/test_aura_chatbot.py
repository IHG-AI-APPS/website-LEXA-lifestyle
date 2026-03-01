"""
Test AURA AI Chatbot API endpoints
Tests for /api/ai-chat/* endpoints including message sending, session management
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAuraChatbot:
    """AURA AI Chatbot endpoint tests"""
    
    def test_send_message_basic(self):
        """Test sending a basic message to AURA"""
        session_id = f"test_aura_{int(time.time())}"
        response = requests.post(
            f"{BASE_URL}/api/ai-chat/message",
            json={
                "session_id": session_id,
                "message": "Hello, what services do you offer?"
            },
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Validate response structure
        assert "session_id" in data
        assert "response" in data
        assert "lead_score" in data
        assert "collected_info" in data
        
        # Response should be a string
        assert isinstance(data["response"], str)
        assert len(data["response"]) > 0
        print(f"AURA Response: {data['response'][:200]}...")
    
    def test_send_message_smart_home_query(self):
        """Test AURA responds to smart home queries with relevant solutions"""
        session_id = f"test_villa_{int(time.time())}"
        response = requests.post(
            f"{BASE_URL}/api/ai-chat/message",
            json={
                "session_id": session_id,
                "message": "What do you recommend for a 5000 sqm villa in Dubai?"
            },
            headers={"Content-Type": "application/json"},
            timeout=45
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Check response mentions relevant LEXA solutions
        response_text = data["response"].lower()
        relevant_terms = ["automation", "smart", "villa", "lexa", "lighting", 
                         "climate", "security", "entertainment", "premium", "luxury"]
        found_terms = [t for t in relevant_terms if t in response_text]
        
        assert len(found_terms) >= 2, f"Response should mention smart home solutions. Found: {found_terms}"
        print(f"Found relevant terms: {found_terms}")
        
        # Check lead info extraction
        collected = data.get("collected_info", {})
        assert collected.get("property_type") == "villa", "Should detect property type: villa"
    
    def test_get_session_new(self):
        """Test getting a new/empty session"""
        session_id = f"test_new_session_{int(time.time())}"
        response = requests.get(
            f"{BASE_URL}/api/ai-chat/session/{session_id}",
            timeout=10
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert data["session_id"] == session_id
        assert isinstance(data["messages"], list)
    
    def test_get_session_with_history(self):
        """Test getting a session with message history after sending messages"""
        session_id = f"test_history_{int(time.time())}"
        
        # First send a message
        requests.post(
            f"{BASE_URL}/api/ai-chat/message",
            json={
                "session_id": session_id,
                "message": "I need home automation for my apartment"
            },
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        # Then get session to verify history
        response = requests.get(
            f"{BASE_URL}/api/ai-chat/session/{session_id}",
            timeout=10
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert len(data["messages"]) >= 2, "Should have user message and assistant response"
        
        # Verify message roles
        roles = [m["role"] for m in data["messages"]]
        assert "user" in roles
        assert "assistant" in roles
    
    def test_delete_session(self):
        """Test clearing a chat session"""
        session_id = f"test_delete_{int(time.time())}"
        
        # First create a session with a message
        requests.post(
            f"{BASE_URL}/api/ai-chat/message",
            json={
                "session_id": session_id,
                "message": "Test message"
            },
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        # Delete the session
        response = requests.delete(
            f"{BASE_URL}/api/ai-chat/session/{session_id}",
            timeout=10
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        
        # Verify session is cleared
        get_response = requests.get(
            f"{BASE_URL}/api/ai-chat/session/{session_id}",
            timeout=10
        )
        session_data = get_response.json()
        assert len(session_data.get("messages", [])) == 0
    
    def test_lead_score_calculation(self):
        """Test lead score increases with qualifying information"""
        session_id = f"test_lead_{int(time.time())}"
        
        # Send message with qualifying info
        response = requests.post(
            f"{BASE_URL}/api/ai-chat/message",
            json={
                "session_id": session_id,
                "message": "I have a luxury villa in Dubai Marina and I'm looking for premium automation within the next 3 months. My email is test@example.com"
            },
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # Lead score should increase with qualifying info
        assert data["lead_score"] > 0, "Lead score should be positive with qualifying info"
        
        # Check collected info
        collected = data.get("collected_info", {})
        assert collected.get("property_type") == "villa"
        # Email extraction
        if collected.get("email"):
            assert "@" in collected["email"]
    
    def test_get_leads_endpoint(self):
        """Test getting leads from admin endpoint"""
        response = requests.get(
            f"{BASE_URL}/api/ai-chat/leads",
            timeout=10
        )
        
        assert response.status_code == 200
        data = response.json()
        
        assert "leads" in data
        assert "total" in data
        assert isinstance(data["leads"], list)
    
    def test_get_leads_with_min_score(self):
        """Test filtering leads by minimum score"""
        response = requests.get(
            f"{BASE_URL}/api/ai-chat/leads?min_score=50",
            timeout=10
        )
        
        assert response.status_code == 200
        data = response.json()
        
        # All leads should have score >= 50
        for lead in data["leads"]:
            assert lead.get("lead_score", 0) >= 50


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
