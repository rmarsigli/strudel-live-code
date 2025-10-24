# Strudel Live Code

Strudel Live Code is a modern approach to live coding music with Strudel in your browser.

Edit patterns in real-time and hear changes instantly.

## What is this?

> This is a plug and play package, you don't need to know a lot of code, just git clone and run terminal commands. See the **Configuration** section for more info.

A web-based music live coding tool powered by **[Strudel](https://strudel.cc)**. Write musical patterns using JavaScript-like syntax and create beats, melodies, and experimental sounds in real-time.

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm run server   # Terminal 1
pnpm run dev      # Terminal 2
```

Open `http://localhost:5173` in your browser and start coding music!

## How to Use

1. Write your pattern in the editor (try: `s('bd sd bd sd')`)
2. Press `Ctrl+Enter` to play
3. Edit the code and save to hear changes
4. Press `Ctrl+.` to stop

## Example Patterns

```javascript
s('bd sd bd sd')

stack(
  s('bd*4'),
  s('~ cp ~ cp'),
  s('[~ hh]*4').gain(0.5)
)

note('c4 e4 g4 e4').s('piano')
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

Available variables:

- `VITE_PORT` - WebSocket server port used by both server and client (default: 3001)
- `VITE_WS_URL` - (Optional) Full WebSocket URL override for custom hosts/protocols

See [Configuration Guide](./docs/configuration.md) for advanced configuration.

### Sample Loading

By default, the app runs in **synths-only mode**. To add drum samples, download them:

```bash
pnpm run download-samples
```

The app will automatically detect and use local samples on next reload. No configuration needed!

See [docs/samples-guide.md](./docs/samples-guide.md) for details.

## Features

- ✅ Live coding with Strudel patterns
- ✅ Real-time code editing with CodeMirror 6
- ✅ Auto-save (1000ms debounce)
- ✅ Hot reload from any editor (VSCode, Vim, etc)
- ✅ WebSocket sync between editor and browser
- ✅ Keyboard shortcuts (Ctrl+Enter play, Ctrl+. stop)
- ✅ Audio visualizer (procedural bars synced to BPM)
- ✅ Log console for debugging
- ✅ Local drum samples support

## Learn More

- [Strudel Documentation](https://strudel.cc/learn)
- [Configuration Guide](./docs/configuration.md)
- [Samples Configuration](./docs/samples-guide.md)
- [Testing Guide](./docs/testing.md)
- [GitHub](https://github.com/rmarsigli/strudel-live-code)
