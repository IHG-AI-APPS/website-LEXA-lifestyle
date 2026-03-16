#!/bin/bash
# LEXA Frontend Start Script — handles both standalone and regular builds
set -e

cd /app/frontend

# Check if standalone build exists
if [ -f ".next/standalone/server.js" ]; then
  echo "[LEXA] Standalone build detected. Using node server.js..."
  
  # Ensure font-manifest.json exists in standalone build
  if [ ! -f ".next/standalone/.next/server/font-manifest.json" ]; then
    echo "[LEXA] Creating missing font-manifest.json for standalone..."
    mkdir -p .next/standalone/.next/server
    echo "[]" > .next/standalone/.next/server/font-manifest.json
  fi
  
  # Copy static files if they exist and haven't been copied
  if [ -d ".next/static" ] && [ ! -d ".next/standalone/.next/static" ]; then
    echo "[LEXA] Copying static files to standalone..."
    cp -r .next/static .next/standalone/.next/
  fi
  
  # Copy public files if they exist and haven't been copied
  if [ -d "public" ] && [ ! -d ".next/standalone/public" ]; then
    echo "[LEXA] Copying public files to standalone..."
    cp -r public .next/standalone/
  fi
  
  export PORT=3000
  export HOSTNAME=0.0.0.0
  exec node .next/standalone/server.js
else
  # Regular build mode
  if [ ! -f ".next/BUILD_ID" ] || [ ! -f ".next/server/pages/_error.js" ]; then
    echo "[LEXA] Build missing or incomplete. Building..."
    rm -rf .next
    yarn build
    echo "[LEXA] Build complete."
  else
    echo "[LEXA] Production build found (BUILD_ID: $(cat .next/BUILD_ID)). Starting server..."
  fi

  # Ensure font-manifest.json exists
  if [ ! -f ".next/server/font-manifest.json" ]; then
    echo "[LEXA] Creating missing font-manifest.json..."
    mkdir -p .next/server
    echo "[]" > .next/server/font-manifest.json
  fi

  exec yarn start
fi
