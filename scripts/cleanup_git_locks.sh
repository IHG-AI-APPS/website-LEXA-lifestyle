#!/bin/bash
# Git Lock Cleanup Script
# Removes stale git lock files that can block push operations

LOCK_FILE="/app/.git/index.lock"

if [ -f "$LOCK_FILE" ]; then
    # Check if the lock file is older than 5 minutes (stale)
    if [ $(find "$LOCK_FILE" -mmin +5 2>/dev/null | wc -l) -gt 0 ]; then
        rm -f "$LOCK_FILE"
        echo "$(date): Removed stale git lock file"
    fi
fi

# Also clean up any other git locks
find /app -name "*.lock" -path "*/.git/*" -mmin +5 -delete 2>/dev/null

exit 0
