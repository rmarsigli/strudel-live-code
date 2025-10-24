#!/bin/bash

SAMPLES_DIR="public/samples"
GITHUB_REPO="https://github.com/tidalcycles/Dirt-Samples"

echo "🎵 Downloading Dirt-Samples..."

mkdir -p "$SAMPLES_DIR"

if [ -d "$SAMPLES_DIR/dirt-samples/.git" ]; then
  echo "⚠️  Samples already exist. Updating..."
  cd "$SAMPLES_DIR/dirt-samples" && git pull
else
  echo "📥 Cloning repository..."
  git clone --depth 1 "$GITHUB_REPO" "$SAMPLES_DIR/dirt-samples"
fi

echo ""
echo "✅ Samples downloaded successfully!"
echo "📁 Location: $SAMPLES_DIR/dirt-samples"
echo ""
echo "Reload your browser to auto-detect and use the samples!"
