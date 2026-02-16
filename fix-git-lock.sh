#!/bin/bash

# Git Lock File Fix Script
# This script checks for and removes stale git lock files
# Run this whenever you encounter the git lock error

LOCK_FILE="/app/.git/index.lock"
MAX_WAIT=30
WAIT_COUNT=0

echo "Checking for git lock file..."

# Check if lock file exists
if [ -f "$LOCK_FILE" ]; then
    echo "Lock file found at $LOCK_FILE"
    
    # Check if any git process is actually running
    GIT_PROCESSES=$(ps aux | grep -i "git" | grep -v grep | grep -v "fix-git-lock")
    
    if [ -z "$GIT_PROCESSES" ]; then
        echo "No active git processes found. Removing stale lock file..."
        rm -f "$LOCK_FILE"
        echo "✓ Lock file removed successfully!"
        exit 0
    else
        echo "Active git processes detected:"
        echo "$GIT_PROCESSES"
        echo ""
        echo "Waiting for git processes to complete (max ${MAX_WAIT}s)..."
        
        # Wait for git processes to finish
        while [ $WAIT_COUNT -lt $MAX_WAIT ]; do
            sleep 1
            WAIT_COUNT=$((WAIT_COUNT + 1))
            
            GIT_PROCESSES=$(ps aux | grep -i "git" | grep -v grep | grep -v "fix-git-lock")
            if [ -z "$GIT_PROCESSES" ]; then
                echo "Git processes completed. Removing lock file..."
                rm -f "$LOCK_FILE"
                echo "✓ Lock file removed successfully!"
                exit 0
            fi
            
            echo -n "."
        done
        
        echo ""
        echo "⚠ Git processes still running after ${MAX_WAIT}s"
        echo "You may need to manually investigate or force remove the lock file:"
        echo "  rm -f $LOCK_FILE"
        exit 1
    fi
else
    echo "✓ No lock file found. Git should work normally."
    exit 0
fi
