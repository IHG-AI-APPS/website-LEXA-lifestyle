#!/bin/bash
# LEXA Frontend Start Script — ensures build exists before serving
set -e

cd /app/frontend

if [ ! -f ".next/BUILD_ID" ]; then
  echo "[LEXA] No production build found. Building..."
  yarn build
  echo "[LEXA] Build complete."
else
  echo "[LEXA] Production build found (BUILD_ID: $(cat .next/BUILD_ID)). Starting server..."
fi

exec yarn start
