#!/bin/bash
# Sync paper trading state to GitHub Pages

SOURCE=~/Desktop/polymarket-bot-v2/data/paper-state.json
DEST=~/Desktop/polymarket-dashboard/state.json

# Copy state if exists
if [ -f "$SOURCE" ]; then
  cp "$SOURCE" "$DEST"
else
  # Create empty state if no trades yet
  echo '{"balance":200,"positions":[],"trades":[],"pnl":0,"wins":0,"losses":0,"startTime":'$(date +%s000)'}' > "$DEST"
fi

# Git push
cd ~/Desktop/polymarket-dashboard
git add -A
git commit -m "Update state $(date '+%H:%M')" 2>/dev/null || true
git push origin main 2>/dev/null || git push origin master 2>/dev/null || true
