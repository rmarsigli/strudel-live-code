#!/bin/bash

SAMPLES_DIR="public/samples"
GITHUB_REPO="https://github.com/tidalcycles/Dirt-Samples"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🎵 Downloading Dirt-Samples..."

mkdir -p "$PROJECT_ROOT/$SAMPLES_DIR"

if [ -d "$PROJECT_ROOT/$SAMPLES_DIR/dirt-samples/.git" ]; then
  echo "⚠️  Samples already exist. Updating..."
  (cd "$PROJECT_ROOT/$SAMPLES_DIR/dirt-samples" && git pull)
else
  echo "📥 Cloning repository..."
  git clone --depth 1 "$GITHUB_REPO" "$PROJECT_ROOT/$SAMPLES_DIR/dirt-samples"
fi

echo ""
echo "📝 Configuring strudel.json for local use..."

# Remove the _base URL from strudel.json (it will be provided by the samples() function call)
STRUDEL_JSON="$PROJECT_ROOT/$SAMPLES_DIR/dirt-samples/strudel.json"
if [ -f "$STRUDEL_JSON" ]; then
  # Use Python to remove _base field if it exists
  python3 -c "
import json

# Read the JSON file
with open('$STRUDEL_JSON', 'r') as f:
    data = json.load(f)

# Remove _base if it exists (the URL is provided by samples() function)
if '_base' in data:
    del data['_base']

# Write back
with open('$STRUDEL_JSON', 'w') as f:
    json.dump(data, f, separators=(',', ':'))
"
  echo "✅ Configured strudel.json for local use"
else
  echo "⚠️  strudel.json not found at: $STRUDEL_JSON"
fi

echo ""
echo "✅ Samples downloaded successfully!"
echo "📁 Location: $PROJECT_ROOT/$SAMPLES_DIR/dirt-samples"
echo ""
echo "Reload your browser to auto-detect and use the samples!"
