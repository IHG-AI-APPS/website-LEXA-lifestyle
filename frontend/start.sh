#!/bin/bash
# LEXA Frontend Start Script — ensures build exists before serving
set -e

cd /app/frontend

# Check for critical build artifacts
# The _error.js is a required file that Next.js needs for proper error handling
if [ ! -f ".next/BUILD_ID" ] || [ ! -f ".next/server/pages/_error.js" ]; then
  echo "[LEXA] Build missing or incomplete. Building..."
  # Clean any partial build
  rm -rf .next
  yarn build
  echo "[LEXA] Build complete."
else
  echo "[LEXA] Production build found (BUILD_ID: $(cat .next/BUILD_ID)). Starting server..."
fi

exec yarn start
