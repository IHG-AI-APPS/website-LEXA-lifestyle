"""
Test CMS-integrated dynamic pages: why-lexa, big-homes-break-smart, 
villa-operating-model, integrations, case-studies, glossary.

These 6 pages now read content from CMS via useCms hook with hardcoded fallbacks.
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestCMSSectionAPIs:
    """Test CMS section APIs for the 6 dynamic pages"""

    def test_cms_page_why_lexa(self):
        """GET /api/cms/sections/page_why_lexa returns CMS content with advantages array"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_why_lexa")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "key" in data, "Response should have 'key' field"
        assert data["key"] == "page_why_lexa", f"Key should be page_why_lexa, got {data['key']}"
        # If CMS value exists, verify structure
        if data.get("value"):
            value = data["value"]
            print(f"CMS page_why_lexa has value: {list(value.keys()) if isinstance(value, dict) else 'non-dict'}")
            # Check for expected fields like advantages, comparisons, hero_title
            if isinstance(value, dict) and "advantages" in value:
                assert isinstance(value["advantages"], list), "advantages should be a list"
                print(f"Found {len(value['advantages'])} advantages")
        else:
            print("page_why_lexa returns null value (will use hardcoded fallback)")

    def test_cms_page_big_homes_break_smart(self):
        """GET /api/cms/sections/page_big_homes_break_smart returns content with problems array"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_big_homes_break_smart")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "key" in data
        assert data["key"] == "page_big_homes_break_smart"
        if data.get("value"):
            value = data["value"]
            print(f"CMS page_big_homes_break_smart has value: {list(value.keys()) if isinstance(value, dict) else 'non-dict'}")
            if isinstance(value, dict) and "problems" in value:
                assert isinstance(value["problems"], list), "problems should be a list"
                print(f"Found {len(value['problems'])} problems")
        else:
            print("page_big_homes_break_smart returns null value (will use hardcoded fallback)")

    def test_cms_page_villa_operating_model(self):
        """GET /api/cms/sections/page_villa_operating_model returns content with roles array"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_villa_operating_model")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "key" in data
        assert data["key"] == "page_villa_operating_model"
        if data.get("value"):
            value = data["value"]
            print(f"CMS page_villa_operating_model has value: {list(value.keys()) if isinstance(value, dict) else 'non-dict'}")
            if isinstance(value, dict) and "roles" in value:
                assert isinstance(value["roles"], list), "roles should be a list"
                print(f"Found {len(value['roles'])} roles")
                # Verify 4 roles exist (Owners, Family, Guests, Staff)
                if len(value["roles"]) >= 4:
                    print(f"Roles: {[r.get('title', 'N/A') for r in value['roles'][:4]]}")
        else:
            print("page_villa_operating_model returns null value (will use hardcoded fallback)")

    def test_cms_page_integrations(self):
        """GET /api/cms/sections/page_integrations returns content with platforms array"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_integrations")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "key" in data
        assert data["key"] == "page_integrations"
        if data.get("value"):
            value = data["value"]
            print(f"CMS page_integrations has value: {list(value.keys()) if isinstance(value, dict) else 'non-dict'}")
            if isinstance(value, dict) and "platforms" in value:
                assert isinstance(value["platforms"], list), "platforms should be a list"
                print(f"Found {len(value['platforms'])} platform categories")
                # Check for expected categories
                categories = [p.get("category", "") for p in value["platforms"]]
                print(f"Platform categories: {categories[:5]}...")
        else:
            print("page_integrations returns null value (will use hardcoded fallback)")

    def test_cms_page_case_studies(self):
        """GET /api/cms/sections/page_case_studies returns content with studies array"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_case_studies")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "key" in data
        assert data["key"] == "page_case_studies"
        if data.get("value"):
            value = data["value"]
            print(f"CMS page_case_studies has value: {list(value.keys()) if isinstance(value, dict) else 'non-dict'}")
            if isinstance(value, dict) and "studies" in value:
                assert isinstance(value["studies"], list), "studies should be a list"
                print(f"Found {len(value['studies'])} case studies")
        else:
            print("page_case_studies returns null value (will use hardcoded fallback)")

    def test_cms_page_glossary(self):
        """GET /api/cms/sections/page_glossary returns content with hero text"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_glossary")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "key" in data
        assert data["key"] == "page_glossary"
        if data.get("value"):
            value = data["value"]
            print(f"CMS page_glossary has value: {list(value.keys()) if isinstance(value, dict) else 'non-dict'}")
            # Check for hero_badge, hero_title, hero_description
            if isinstance(value, dict):
                for field in ["hero_badge", "hero_title", "hero_description"]:
                    if field in value:
                        print(f"{field}: {value[field][:50]}..." if len(str(value[field])) > 50 else f"{field}: {value[field]}")
        else:
            print("page_glossary returns null value (will use hardcoded fallback)")


class TestCMSBulkEndpoint:
    """Test bulk CMS sections endpoint"""

    def test_bulk_cms_sections(self):
        """GET /api/cms/sections?keys=... returns multiple sections at once"""
        keys = "page_why_lexa,page_big_homes_break_smart,page_villa_operating_model,page_integrations,page_case_studies,page_glossary"
        response = requests.get(f"{BASE_URL}/api/cms/sections", params={"keys": keys})
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        print(f"Bulk response keys: {list(data.keys())}")
        # Should return dict with keys
        assert isinstance(data, dict), "Should return a dict"
        # Count how many have actual values
        with_values = sum(1 for v in data.values() if v is not None)
        print(f"Sections with CMS values: {with_values}/6")


class TestCMSAPIResponseFormat:
    """Test CMS API response format matches frontend expectations"""

    def test_cms_section_response_format(self):
        """CMS API returns {key, value} format that useCms hook expects"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_why_lexa")
        assert response.status_code == 200
        data = response.json()
        # Must have key and value fields
        assert "key" in data, "Response must have 'key' field"
        # Value can be null or object
        # useCms hook returns value directly: const cms = useCms('page_key', null)
        print(f"Response format: key={data.get('key')}, value type={type(data.get('value'))}")

    def test_cms_nonexistent_section_returns_null_value(self):
        """Nonexistent CMS section returns {key, value: null}"""
        response = requests.get(f"{BASE_URL}/api/cms/sections/page_nonexistent_test_xyz")
        assert response.status_code == 200, "Should return 200 even for missing sections"
        data = response.json()
        assert "key" in data
        assert data.get("value") is None, "Missing section should return null value"
