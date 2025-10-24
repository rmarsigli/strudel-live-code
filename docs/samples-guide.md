# Strudel Samples Loading Guide

This guide explains how to configure and load audio samples for the Strudel engine.

## Quick Start

### Default: Auto-Detection

The app automatically detects if samples are available:

**Without samples (default):**
```bash
pnpm install
cp .env.example .env
pnpm run server
pnpm run dev
```

Works immediately with synths only:
```javascript
note('c e g b').sound('sawtooth')
```

**With drum samples:**
```bash
pnpm run download-samples  # Download once (~390MB)
# Reload page - samples auto-detected!
```

Now you can use drums:
```javascript
s('bd sd hh cp')
```

---

## How It Works

### Auto-Detection

The app checks for `/samples/dirt-samples/strudel.json` on startup:

- **Found** → Loads local samples automatically
- **Not found** → Runs in synths-only mode

No configuration needed!

### Synths Only Mode

**Advantages:**
- ✅ No download required
- ✅ Works offline
- ✅ Zero setup
- ✅ Instant startup

**Disadvantages:**
- ❌ No drum samples (bd, sd, hh, etc.)
- ❌ Synthesizers only

### Local Samples Mode

**Advantages:**
- ✅ Full drum sample library (2,000+ sounds)
- ✅ Works offline
- ✅ Fast loading (localhost)
- ✅ Auto-detected on startup

**Disadvantages:**
- ❌ Requires ~390MB disk space

**Enable:**
```bash
pnpm run download-samples
```

---

## Download Details

### What Gets Downloaded

The complete Dirt-Samples library includes:
- **Size:** ~390 MB
- **Files:** 2,000+ audio samples
- **Categories:** 100+ sound categories
- **Method:** Git shallow clone (no history)

### Update Samples

To update to the latest version:
```bash
pnpm run download-samples  # Automatically detects and updates
```

### Sample Categories

The library includes diverse sound categories:
- **Drums:** bd, sd, hh, cp, rim, clap, etc.
- **808:** 808bd, 808sd, 808hh, etc.
- **Percussion:** tabla, casio, jazz, etc.
- **Melodic:** bass, arpy, piano, etc.
- **Effects:** fx, noise, wind, etc.
- **And many more...**

---

## Fallback Behavior

The engine automatically falls back to synthesizers if sample loading fails:

1. **Samples load successfully** → Full audio library available
2. **Samples fail to load** → Synth-only mode (no drum samples)
3. **User sees toast notification** → "Strudel ready (without samples)"

You can still create patterns using synths:

```javascript
note('c e g b').sound('sawtooth')
stack(
  note('c2').sound('square'),
  note('e3 g3').sound('triangle')
)
```

---

## Troubleshooting

### Samples not loading

1. Verify samples downloaded:
   ```bash
   ls -la public/samples/dirt-samples/strudel.json
   ```
2. Check browser console logs:
   - Should see "Local samples detected, loading..."
   - Or "No local samples found (synths only mode)"
3. Check browser Network tab for 404 errors on `/samples/`
4. Re-download if corrupted:
   ```bash
   rm -rf public/samples/dirt-samples
   pnpm run download-samples
   ```

### Samples directory is huge

The `.gitignore` is configured to exclude local samples from commits automatically.

To free up disk space:
```bash
rm -rf public/samples/dirt-samples  # App will use synths-only mode
```

---

## Technical Details

### Auto-Detection Logic

1. On app initialization, check if `/samples/dirt-samples/strudel.json` exists
2. If exists → Load from `/samples/dirt-samples`
3. If not → Log info message and continue with synths only

Implementation in `src/hooks/use-strudel-engine.ts:42-60`

### Sample Location

- **URL:** `/samples/dirt-samples`
- **Physical path:** `public/samples/dirt-samples`
- **Served by:** Vite dev server (automatic)
- **Detection file:** `strudel.json` (metadata)

### File Structure

```
public/
  samples/
    .gitkeep              # Keeps directory in git
    dirt-samples/         # Downloaded samples (gitignored)
      bd/                 # Bass drum samples
      sd/                 # Snare drum samples
      hh/                 # Hi-hat samples
      ...
```

---

## Scripts Reference

### `pnpm run download-samples`

Downloads complete Dirt-Samples library to `public/samples/dirt-samples`.

- Size: ~200MB
- Method: Git shallow clone
- Idempotent: Safe to run multiple times
- Updates: Pulls latest if already exists

### `./scripts/download-essential-samples.sh`

Downloads only essential samples (bd, sd, hh, cp, 808, etc).

- Size: ~50MB
- Method: Direct download via curl
- Minimal: Only most-used live coding samples

---

## Sample Libraries

### Dirt-Samples (Default)

Classic TidalCycles sample library with hundreds of sounds:

- Drums: bd, sd, hh, cp, clap, rim, etc.
- Percussion: casio, tabla, jazz, etc.
- Melodic: bass, arpy, etc.
- Effects: fx, noise, etc.

### Custom Samples

Add your own samples to `public/samples/custom/`:

```typescript
await samples('/samples/custom', {
  baseUrl: window.location.origin,
  tag: 'custom'
})
```

Use in patterns:

```javascript
s('custom:mysample')
```
