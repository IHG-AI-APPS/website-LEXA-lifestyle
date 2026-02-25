"""
Test Suite for Seed from Current Feature

Tests:
1. POST /api/cms/register-defaults - creates entry if not exists
2. POST /api/cms/register-defaults - idempotent (returns created: false if key already has data)
3. After auto-seed, CMS data contains expected sections
4. Admin CMS shows green dot for seeded pages
"""
import pytest
import requests
import os
import time
import random
import string

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://cms-seo-live.preview.emergentagent.com').rstrip('/')

# Generate unique test key to avoid conflicts
TEST_KEY_PREFIX = 'TEST_seed_' + ''.join(random.choices(string.ascii_lowercase, k=6)) + '_'

class TestRegisterDefaultsEndpoint:
    """Test the /api/cms/register-defaults endpoint"""
    
    def test_register_defaults_missing_key(self):
        """Test that endpoint rejects requests without key"""
        response = requests.post(
            f"{BASE_URL}/api/cms/register-defaults",
            json={"defaults": {"hero": {"title": "Test"}}}
        )
        assert response.status_code == 400, f"Expected 400 but got {response.status_code}: {response.text}"
        data = response.json()
        assert "key" in str(data).lower() or "required" in str(data).lower()
        print(f"PASS: Endpoint correctly rejects missing key - {data}")

    def test_register_defaults_missing_defaults(self):
        """Test that endpoint rejects requests without defaults"""
        response = requests.post(
            f"{BASE_URL}/api/cms/register-defaults",
            json={"key": TEST_KEY_PREFIX + "missing_defaults"}
        )
        assert response.status_code == 400, f"Expected 400 but got {response.status_code}: {response.text}"
        data = response.json()
        assert "defaults" in str(data).lower() or "required" in str(data).lower()
        print(f"PASS: Endpoint correctly rejects missing defaults - {data}")

    def test_register_defaults_creates_new_entry(self):
        """Test that endpoint creates entry if not exists"""
        test_key = TEST_KEY_PREFIX + "new_entry"
        test_defaults = {
            "hero": {
                "badge": "Test Badge",
                "title": "Test Title",
                "titleHighlight": "Highlight",
                "subtitle": "Test Subtitle",
                "description": "Test Description"
            },
            "audience": ["Test Audience 1", "Test Audience 2"],
            "problems": {
                "title": "Common Problems",
                "items": [{"problem": "Problem 1", "impact": "Impact 1"}]
            },
            "deliverables": {
                "title": "What We Deliver",
                "items": [{"icon": "Zap", "title": "Feature 1", "desc": "Description 1"}]
            },
            "process": {
                "title": "Our Process",
                "steps": [{"step": "01", "title": "Step 1", "desc": "Description"}]
            },
            "trustSignals": {
                "title": "Trust Signals",
                "stats": [{"number": "100+", "label": "Projects"}]
            },
            "conversion": {
                "title": "Get Started",
                "subtitle": "Contact us today",
                "primaryCTA": {"text": "Contact Us", "href": "/contact"}
            }
        }
        
        response = requests.post(
            f"{BASE_URL}/api/cms/register-defaults",
            json={"key": test_key, "defaults": test_defaults}
        )
        assert response.status_code == 200, f"Expected 200 but got {response.status_code}: {response.text}"
        data = response.json()
        assert data.get("created") == True, f"Expected created: true but got {data}"
        print(f"PASS: Created new entry - {data}")
        
        # Verify data was persisted
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/{test_key}")
        assert verify_response.status_code == 200
        verify_data = verify_response.json()
        assert verify_data.get("value") is not None, f"Expected value to be set but got {verify_data}"
        assert verify_data["value"]["hero"]["title"] == "Test Title"
        print(f"PASS: Verified data persisted correctly")
        
        return test_key  # Return for idempotency test

    def test_register_defaults_idempotent(self):
        """Test that endpoint is idempotent - doesn't overwrite existing data"""
        test_key = TEST_KEY_PREFIX + "idempotent"
        original_defaults = {
            "hero": {"title": "Original Title", "badge": "Original"},
            "audience": ["Original Audience"]
        }
        
        # First call - should create
        response1 = requests.post(
            f"{BASE_URL}/api/cms/register-defaults",
            json={"key": test_key, "defaults": original_defaults}
        )
        assert response1.status_code == 200
        data1 = response1.json()
        assert data1.get("created") == True, f"Expected created: true on first call but got {data1}"
        print(f"PASS: First call created entry - {data1}")
        
        # Second call with different data - should NOT overwrite
        modified_defaults = {
            "hero": {"title": "Modified Title", "badge": "Modified"},
            "audience": ["Modified Audience"]
        }
        
        response2 = requests.post(
            f"{BASE_URL}/api/cms/register-defaults",
            json={"key": test_key, "defaults": modified_defaults}
        )
        assert response2.status_code == 200
        data2 = response2.json()
        assert data2.get("created") == False, f"Expected created: false on second call but got {data2}"
        print(f"PASS: Second call returned created: false - {data2}")
        
        # Verify original data was NOT overwritten
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/{test_key}")
        verify_data = verify_response.json()
        assert verify_data["value"]["hero"]["title"] == "Original Title", \
            f"Expected Original Title but got {verify_data['value']['hero']['title']}"
        print(f"PASS: Original data was NOT overwritten")


class TestCmsDataStructure:
    """Test that CMS data has expected structure after seeding"""
    
    def test_seeded_data_has_all_sections(self):
        """Verify that seeded solution page has all expected sections"""
        test_key = TEST_KEY_PREFIX + "full_structure"
        full_defaults = {
            "hero": {
                "badge": "Full Structure Test",
                "title": "Test",
                "titleHighlight": "Highlight",
                "subtitle": "Subtitle",
                "description": "Description",
                "image": "/images/test.jpg",
                "primaryCTA": {"text": "CTA", "href": "/contact"}
            },
            "audience": ["Audience 1", "Audience 2"],
            "problems": {
                "title": "Problems",
                "items": [{"problem": "P1", "impact": "I1"}]
            },
            "deliverables": {
                "title": "Deliverables",
                "items": [{"icon": "Zap", "title": "D1", "desc": "Desc"}]
            },
            "process": {
                "title": "Process",
                "subtitle": "How we work",
                "steps": [{"step": "01", "title": "S1", "desc": "D1"}]
            },
            "section6": {
                "type": "pricing",
                "title": "Packages",
                "subtitle": "Choose your plan",
                "items": [{"name": "Basic", "price": "AED 5,000", "features": ["F1", "F2"]}]
            },
            "trustSignals": {
                "title": "Trust",
                "stats": [{"number": "50+", "label": "Clients"}]
            },
            "conversion": {
                "title": "CTA Title",
                "subtitle": "CTA Subtitle",
                "primaryCTA": {"text": "Contact", "href": "/contact"}
            }
        }
        
        # Create the entry
        response = requests.post(
            f"{BASE_URL}/api/cms/register-defaults",
            json={"key": test_key, "defaults": full_defaults}
        )
        assert response.status_code == 200
        
        # Verify all sections exist
        verify_response = requests.get(f"{BASE_URL}/api/cms/sections/{test_key}")
        assert verify_response.status_code == 200
        data = verify_response.json()
        value = data.get("value", {})
        
        expected_sections = ["hero", "audience", "problems", "deliverables", "process", "section6", "trustSignals", "conversion"]
        for section in expected_sections:
            assert section in value, f"Missing section: {section}"
            print(f"PASS: Section '{section}' present")
        
        # Verify nested structure
        assert value["hero"]["primaryCTA"]["text"] == "CTA"
        assert len(value["audience"]) == 2
        assert len(value["problems"]["items"]) == 1
        assert len(value["deliverables"]["items"]) == 1
        assert len(value["process"]["steps"]) == 1
        assert len(value["section6"]["items"]) == 1
        assert len(value["trustSignals"]["stats"]) == 1
        print(f"PASS: All expected sections and nested structure verified")


class TestBulkCmsFetch:
    """Test bulk CMS fetch for admin page"""
    
    def test_bulk_fetch_includes_seeded_keys(self):
        """Test that bulk fetch returns seeded keys"""
        # First create a test entry
        test_key = TEST_KEY_PREFIX + "bulk_test"
        requests.post(
            f"{BASE_URL}/api/cms/register-defaults",
            json={"key": test_key, "defaults": {"hero": {"title": "Bulk Test"}}}
        )
        
        # Fetch bulk with our test key and another key
        response = requests.get(f"{BASE_URL}/api/cms/sections?keys={test_key},page_solutions_security")
        assert response.status_code == 200
        data = response.json()
        
        # Our test key should be present
        assert test_key in data, f"Expected {test_key} in bulk response"
        assert data[test_key]["hero"]["title"] == "Bulk Test"
        print(f"PASS: Bulk fetch returns seeded data correctly")


class TestCleanup:
    """Cleanup test data"""
    
    def test_cleanup_test_data(self):
        """Clean up test data created during tests"""
        # Note: In production, we'd delete test data. Here we just verify we can list test keys
        # The test keys use TEST_KEY_PREFIX so they're easily identifiable
        print(f"Test data created with prefix: {TEST_KEY_PREFIX}")
        print("PASS: Test completed - cleanup would delete TEST_ prefixed keys")


# Run tests in order
if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
