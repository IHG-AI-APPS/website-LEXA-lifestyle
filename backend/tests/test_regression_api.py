"""
Test suite for API Regression Test Reporting endpoints
Tests the /api/admin/regression/* endpoints for the LEXA admin panel
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestRegressionAPI:
    """Tests for the regression test reporting API endpoints"""

    def test_get_latest_returns_valid_json(self):
        """GET /api/admin/regression/latest returns valid test result JSON"""
        response = requests.get(f"{BASE_URL}/api/admin/regression/latest")
        assert response.status_code == 200
        
        data = response.json()
        # Verify required fields present
        assert "status" in data
        assert data["status"] in ["PASS", "FAIL", "NO_RUNS"]
        
        if data["status"] != "NO_RUNS":
            assert "passed" in data
            assert "failed" in data
            assert "errors" in data
            assert "total" in data
            assert "timestamp" in data
            assert isinstance(data["passed"], int)
            assert isinstance(data["failed"], int)
            assert isinstance(data["errors"], int)
            assert isinstance(data["total"], int)
            # duration_seconds can be null
            assert "duration_seconds" in data

    def test_get_latest_passed_count(self):
        """GET /api/admin/regression/latest returns 96 passed tests"""
        response = requests.get(f"{BASE_URL}/api/admin/regression/latest")
        assert response.status_code == 200
        
        data = response.json()
        if data.get("status") != "NO_RUNS":
            # Verify 96 passed tests as expected
            assert data.get("passed") == 96, f"Expected 96 passed, got {data.get('passed')}"

    def test_get_history_returns_runs_array(self):
        """GET /api/admin/regression/history returns runs array and total count"""
        response = requests.get(f"{BASE_URL}/api/admin/regression/history?limit=5")
        assert response.status_code == 200
        
        data = response.json()
        assert "runs" in data
        assert "total" in data
        assert isinstance(data["runs"], list)
        assert isinstance(data["total"], int)
        assert data["total"] >= 0

    def test_get_history_with_limit(self):
        """GET /api/admin/regression/history respects limit parameter"""
        response = requests.get(f"{BASE_URL}/api/admin/regression/history?limit=3")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["runs"]) <= 3

    def test_get_history_run_structure(self):
        """Each run in history has required fields"""
        response = requests.get(f"{BASE_URL}/api/admin/regression/history?limit=1")
        assert response.status_code == 200
        
        data = response.json()
        if len(data["runs"]) > 0:
            run = data["runs"][0]
            assert "timestamp" in run
            assert "status" in run
            assert "passed" in run
            assert "failed" in run
            assert "total" in run

    def test_post_run_triggers_test(self):
        """POST /api/admin/regression/run triggers a test run"""
        response = requests.post(f"{BASE_URL}/api/admin/regression/run")
        assert response.status_code == 200
        
        data = response.json()
        assert "status" in data
        assert data["status"] == "triggered"
        assert "message" in data
        assert "Regression test started" in data["message"]

    def test_post_run_idempotent(self):
        """POST /api/admin/regression/run can be called multiple times"""
        # First call
        response1 = requests.post(f"{BASE_URL}/api/admin/regression/run")
        assert response1.status_code == 200
        
        # Second call (should also succeed)
        response2 = requests.post(f"{BASE_URL}/api/admin/regression/run")
        assert response2.status_code == 200


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
