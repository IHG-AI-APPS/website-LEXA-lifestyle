#!/bin/bash
# LEXA Frontend Start Script — handles standalone deployment
set -e

cd /app/frontend

echo "[LEXA] Starting frontend..."

# Check if we're in deployment mode (next-server-files exists)
if [ -d "next-server-files" ]; then
  echo "[LEXA] Deployment mode detected - copying server files..."
  
  # Copy all files from next-server-files to .next
  mkdir -p .next
  cp -r next-server-files/* .next/
  
  # Make sure static exists
  if [ ! -d ".next/static" ]; then
    echo "[LEXA] Warning: .next/static not found"
  fi
  
  echo "[LEXA] Server files copied successfully"
fi

# Ensure font-manifest.json exists
if [ ! -f ".next/server/font-manifest.json" ]; then
  echo "[LEXA] Creating font-manifest.json..."
  mkdir -p .next/server
  echo "[]" > .next/server/font-manifest.json
fi

# Check BUILD_ID exists
if [ ! -f ".next/BUILD_ID" ]; then
  echo "[LEXA] ERROR: BUILD_ID not found!"
  echo "[LEXA] .next contents:"
  ls -la .next/ 2>/dev/null || echo "  .next directory not found"
  exit 1
fi

echo "[LEXA] BUILD_ID: $(cat .next/BUILD_ID)"

# Start the server
if [ -f "server.js" ]; then
  echo "[LEXA] Starting standalone server..."
  export PORT="${PORT:-3000}"
  export HOSTNAME="${HOSTNAME:-0.0.0.0}"
  exec node server.js
else
  echo "[LEXA] Starting Next.js server..."
  exec yarn start
fi
