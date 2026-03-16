#!/bin/bash
# LEXA Frontend Start Script — ensures build exists before serving
set -e

cd /app/frontend

# Check for critical build artifacts
if [ ! -f ".next/BUILD_ID" ] || [ ! -f ".next/server/pages/_error.js" ]; then
  echo "[LEXA] Build missing or incomplete. Building..."
  rm -rf .next
  yarn build
  echo "[LEXA] Build complete."
else
  echo "[LEXA] Production build found (BUILD_ID: $(cat .next/BUILD_ID)). Starting server..."
fi

# Ensure font-manifest.json exists (required by Next.js even if empty)
if [ ! -f ".next/server/font-manifest.json" ]; then
  echo "[LEXA] Creating missing font-manifest.json..."
  mkdir -p .next/server
  echo "[]" > .next/server/font-manifest.json
fi

exec yarn start
