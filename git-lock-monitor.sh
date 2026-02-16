#!/bin/bash

# Git Lock Monitor - Prevents stale lock files
# This script monitors and automatically cleans up stale git lock files

LOCK_FILE="/app/.git/index.lock"
CHECK_INTERVAL=10  # seconds
MAX_LOCK_AGE=60    # seconds

echo "[Git Lock Monitor] Starting monitor (PID: $$)"
echo "[Git Lock Monitor] Will check every ${CHECK_INTERVAL}s for locks older than ${MAX_LOCK_AGE}s"

while true; do
    if [ -f "$LOCK_FILE" ]; then
        # Get lock file age in seconds
        if [ "$(uname)" = "Darwin" ]; then
            # macOS
            LOCK_AGE=$(($(date +%s) - $(stat -f %m "$LOCK_FILE")))
        else
            # Linux
            LOCK_AGE=$(($(date +%s) - $(stat -c %Y "$LOCK_FILE")))
        fi
        
        if [ $LOCK_AGE -gt $MAX_LOCK_AGE ]; then
            # Check if git processes are running
            GIT_PROCESSES=$(ps aux | grep -i "git" | grep -v grep | grep -v "git-lock-monitor" | grep -v "fix-git-lock")
            
            if [ -z "$GIT_PROCESSES" ]; then
                echo "[Git Lock Monitor] Stale lock detected (${LOCK_AGE}s old), no git processes running. Removing..."
                rm -f "$LOCK_FILE"
                echo "[Git Lock Monitor] ✓ Stale lock removed at $(date)"
            else
                echo "[Git Lock Monitor] Lock file is ${LOCK_AGE}s old but git processes are active. Waiting..."
            fi
        fi
    fi
    
    sleep $CHECK_INTERVAL
done
