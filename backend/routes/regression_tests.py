"""
Nightly regression test results API
Provides admin endpoints to view test run history and results.
"""
from fastapi import APIRouter, Depends
from pathlib import Path
import json

router = APIRouter(prefix="/api/admin/regression", tags=["regression-tests"])

RESULTS_DIR = Path("/app/test_reports/nightly")


@router.get("/latest")
async def get_latest_result():
    """Get the most recent regression test result"""
    latest = RESULTS_DIR / "latest.json"
    if latest.exists():
        with open(latest.resolve()) as f:
            return json.load(f)
    return {"status": "NO_RUNS", "message": "No regression tests have been run yet"}


@router.get("/history")
async def get_test_history(limit: int = 10):
    """Get history of regression test runs"""
    results = sorted(RESULTS_DIR.glob("results_*.json"), reverse=True)[:limit]
    history = []
    for rpath in results:
        try:
            with open(rpath) as f:
                data = json.load(f)
                data["report_file"] = rpath.name
                history.append(data)
        except Exception:
            pass
    return {"runs": history, "total": len(list(RESULTS_DIR.glob("results_*.json")))}


@router.post("/run")
async def trigger_test_run():
    """Trigger a regression test run (non-blocking)"""
    import subprocess, sys
    env = dict(__import__('os').environ)
    if not env.get("REACT_APP_BACKEND_URL"):
        try:
            with open("/app/frontend/.env") as f:
                for line in f:
                    if line.startswith("REACT_APP_BACKEND_URL=") or line.startswith("NEXT_PUBLIC_BACKEND_URL="):
                        env["REACT_APP_BACKEND_URL"] = line.strip().split("=", 1)[1]
                        break
        except FileNotFoundError:
            pass
    subprocess.Popen(
        [sys.executable, "/app/backend/tests/nightly_runner.py"],
        stdout=open("/app/test_reports/nightly/last_run.log", "w"),
        stderr=subprocess.STDOUT,
        env=env,
    )
    return {"status": "triggered", "message": "Regression test started. Check /api/admin/regression/latest for results."}
