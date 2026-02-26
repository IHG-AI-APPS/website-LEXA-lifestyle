#!/usr/bin/env python3
"""
Nightly Regression Test Runner for LEXA Smart Home Platform
Runs the full 96-endpoint test suite and logs results.
"""
import subprocess
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

RESULTS_DIR = Path("/app/test_reports/nightly")
RESULTS_DIR.mkdir(parents=True, exist_ok=True)

BACKEND_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
TEST_FILE = "/app/backend/tests/test_full_regression_final.py"
MAX_REPORTS = 30  # Keep last 30 runs


def run_tests():
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    xml_path = RESULTS_DIR / f"results_{timestamp}.xml"
    json_path = RESULTS_DIR / f"results_{timestamp}.json"

    env = os.environ.copy()
    if not env.get("REACT_APP_BACKEND_URL"):
        # Read from frontend .env
        try:
            with open("/app/frontend/.env") as f:
                for line in f:
                    if line.startswith("REACT_APP_BACKEND_URL=") or line.startswith("NEXT_PUBLIC_BACKEND_URL="):
                        env["REACT_APP_BACKEND_URL"] = line.strip().split("=", 1)[1]
                        break
        except FileNotFoundError:
            pass

    cmd = [
        sys.executable, "-m", "pytest",
        TEST_FILE,
        f"--junitxml={xml_path}",
        "-v", "--tb=short",
        "--timeout=30",
        "-x",  # stop on first failure for nightly
    ]

    result = subprocess.run(cmd, capture_output=True, text=True, env=env, timeout=300)

    # Parse output
    lines = result.stdout.split("\n")
    passed = failed = errors = 0
    failures = []
    for line in lines:
        if " passed" in line and ("warning" in line or "passed" in line):
            parts = line.split()
            for i, p in enumerate(parts):
                if p == "passed" and i > 0:
                    try: passed = int(parts[i-1])
                    except ValueError: pass
                if p == "failed" and i > 0:
                    try: failed = int(parts[i-1])
                    except ValueError: pass
                if p == "error" in p and i > 0:
                    try: errors = int(parts[i-1])
                    except ValueError: pass
        if "FAILED" in line:
            failures.append(line.strip())

    report = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "status": "PASS" if failed == 0 and errors == 0 else "FAIL",
        "passed": passed,
        "failed": failed,
        "errors": errors,
        "total": passed + failed + errors,
        "failures": failures,
        "duration_seconds": None,
        "xml_report": str(xml_path),
        "exit_code": result.returncode,
    }

    # Extract duration from pytest output
    for line in reversed(lines):
        if "seconds" in line and ("passed" in line or "failed" in line):
            try:
                import re
                m = re.search(r"in ([\d.]+)s", line)
                if m:
                    report["duration_seconds"] = float(m.group(1))
            except Exception:
                pass
            break

    with open(json_path, "w") as f:
        json.dump(report, f, indent=2)

    # Write latest symlink
    latest = RESULTS_DIR / "latest.json"
    if latest.exists():
        latest.unlink()
    latest.symlink_to(json_path)

    # Cleanup old reports
    reports = sorted(RESULTS_DIR.glob("results_*.json"))
    if len(reports) > MAX_REPORTS:
        for old in reports[:-MAX_REPORTS]:
            old.unlink()
            xml = old.with_suffix(".xml")
            if xml.exists():
                xml.unlink()

    # Print summary
    status = "PASS" if report["status"] == "PASS" else "FAIL"
    print(f"\n{'='*50}")
    print(f"Nightly Regression: {status}")
    print(f"Passed: {passed} | Failed: {failed} | Errors: {errors}")
    if failures:
        print(f"\nFailures:")
        for f_line in failures[:10]:
            print(f"  - {f_line}")
    print(f"Report: {json_path}")
    print(f"{'='*50}\n")

    return report


if __name__ == "__main__":
    run_tests()
