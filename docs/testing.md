# Testing Guide

This guide explains how to test the Strudel Live Code application.

## Quick Test

### 1. Start the Application

```bash
# Terminal 1: Start server
pnpm run server

# Terminal 2: Start dev
pnpm run dev
```

### 2. Test CDN Samples (Default)

Open the browser console and look for:

```
Initializing Strudel engine...
Strudel engine initialized successfully
Loading samples from CDN...
CDN samples loaded successfully
```

Toast notification should show: **"Strudel ready with samples"**

### 3. Test Pattern with Samples

Copy and paste the test pattern from `test-pattern.ts`:

```javascript
s('bd sd hh cp').fast(2)
```

Click **Play ▶️**. You should hear:
- Bass drum (bd)
- Snare drum (sd)
- Hi-hat (hh)
- Clap (cp)

### 4. Test Synth-Only Pattern

```javascript
note('c e g b').sound('sawtooth').lpf(2000)
```

Click **Play ▶️**. You should hear a filtered sawtooth wave melody.

---

## Testing Local Samples

### 1. Download Samples

```bash
pnpm run download-samples
```

Expected output:
```
🎵 Downloading Dirt-Samples...
📥 Cloning repository...
✅ Samples downloaded successfully!
📁 Location: public/samples/dirt-samples
```

### 2. Reload Page

No configuration needed! Just reload the browser.

### 3. Verify Auto-Detection

Browser console should show:
```
Initializing Strudel engine...
Strudel engine initialized successfully
Local samples detected, loading...
Local samples loaded successfully
```

Toast notification: **"Strudel ready with local samples"**

### 4. Test Pattern

Use drum samples from `test-pattern.ts`:
```javascript
s('bd sd hh cp').fast(2)
```

---

## Testing Sample Fallback

### 1. Simulate Sample Load Failure

Remove samples directory:
```bash
rm -rf public/samples/dirt-samples
```

### 2. Reload Page

### 3. Expected Behavior

Console shows:
```
Initializing Strudel engine...
Strudel engine initialized successfully
No local samples found (synths only mode)
Run "pnpm run download-samples" to enable drum samples
```

Toast notification: **"Strudel ready (synths only)"**

### 3. Test Synth Pattern

Sample-based patterns won't work:
```javascript
s('bd sd')  // ❌ Will fail silently
```

But synth patterns will work:
```javascript
note('c e').sound('sawtooth')  // ✅ Works
```

---

## Test Patterns Reference

All test patterns are in `test-pattern.ts`:

### Pattern 1: Basic Samples
```javascript
s('bd sd hh cp').fast(2)
```
Tests: Sample loading, basic playback

### Pattern 2: Stack
```javascript
stack(
  s('bd*2'),
  s('~ sd'),
  s('hh*4')
).slow(2)
```
Tests: Polyphony, rhythm patterns, rests

### Pattern 3: Synth
```javascript
note('c e g b').sound('sawtooth').lpf(2000)
```
Tests: Synthesizers, effects, note patterns

---

## WebSocket Testing

### 1. Connection Test

Check browser console on page load:
```
WebSocket connected
```

Status indicator should show: **Connected**

### 2. File Operations Test

**Create File:**
1. Click **+** button in sidebar
2. Enter filename: `test.txt`
3. Select template
4. Click Create

Console should show:
```
File test.txt created
```

**Save File:**
1. Edit pattern code
2. Wait 1 second (auto-save)

Server console shows:
```
File updated: test.txt
```

**Delete File:**
1. Hover over file in sidebar
2. Click trash icon
3. Confirm deletion

Console shows:
```
File test.txt deleted
```

---

## Audio Engine Testing

### 1. Volume Control

1. Play a pattern
2. Adjust volume slider
3. Volume should change in real-time

### 2. Stop/Start

1. Click Play ▶️
2. Pattern plays
3. Click Stop ⏹
4. Pattern stops immediately

### 3. Pattern Evaluation

**Valid Pattern:**
```javascript
s('bd')
```
Console shows: `Pattern evaluated successfully`

**Invalid Pattern:**
```javascript
s('bd'
```
Console shows: `Pattern evaluation error: ...`
Toast shows error message

---

## Performance Testing

### 1. Pattern Complexity

Test with increasingly complex patterns:

```javascript
// Simple
s('bd sd')

// Medium
stack(s('bd sd'), s('hh*4'), note('c e g').sound('square'))

// Complex
stack(
  s('bd*4').fast(2),
  s('sd*2').slow(1.5),
  s('hh*8').sometimes(rev),
  note('<c e g b>*4').sound('sawtooth').lpf(sine.range(200,2000))
)
```

Monitor browser console for performance warnings.

### 2. Sample Loading Speed

**CDN:** Should load in 1-3 seconds
**Local:** Should load in <1 second

---

## Error Scenarios

### 1. WebSocket Disconnection

1. Stop server (`Ctrl+C`)
2. Keep client running

Expected:
- Status shows "Disconnected"
- Reconnection attempts (with exponential backoff)
- Eventually: "Failed to connect to server"

### 2. File System Errors

**Non-existent File:**
Server should respond with error message

**Invalid Filename:**
Client should validate before sending

**Disk Full:**
Server logs error, client shows toast

---

## Automated Testing

### Run Tests

```bash
pnpm test
```

Tests cover:
- Component rendering
- State management (Zustand stores)
- WebSocket message handling
- Pattern evaluation

### Test Coverage

```bash
pnpm test -- --coverage
```

---

## Debugging Tips

### Enable Verbose Logging

Add to `.env`:
```env
VITE_DEBUG=true
```

### Browser DevTools

1. **Console:** View logs, errors, warnings
2. **Network:** Monitor WebSocket messages
3. **Application > Storage:** Check persisted state
4. **Performance:** Profile audio playback

### Server Logs

Server automatically logs:
- WebSocket connections
- File operations
- Errors

---

## Common Issues

### No Sound

**Check:**
1. Browser console for errors
2. Volume slider is not at 0
3. Computer audio is not muted
4. Sample source is configured correctly
5. Pattern syntax is valid

### Samples Not Loading

**Check:**
1. `.env` has `VITE_SAMPLES_SOURCE` set
2. If `local`, samples are downloaded
3. Network tab shows requests
4. Console for error messages

### WebSocket Not Connecting

**Check:**
1. Server is running on correct port
2. `.env` has correct `VITE_WS_URL`
3. Firewall not blocking WebSocket
4. Browser supports WebSocket

---

## Success Criteria

All systems working when:

✅ Engine initializes without errors
✅ Samples load (CDN or local)
✅ WebSocket connects
✅ Patterns evaluate successfully
✅ Audio plays when clicking Play
✅ Files can be created/saved/deleted
✅ No console errors
✅ UI is responsive

If any criteria fails, check relevant section above.
