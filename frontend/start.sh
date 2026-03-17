#!/bin/bash
# LEXA Frontend Start Script
set -e

cd /app/frontend

echo "[LEXA] Starting frontend in development mode..."

# Start Next.js in dev mode for reliable hot reload
export PORT="${PORT:-3000}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
exec yarn dev
