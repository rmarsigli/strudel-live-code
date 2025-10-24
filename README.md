# Strudel Live Code

Live code music with Strudel in your browser. Edit patterns in real-time and hear changes instantly.

## What is this?

A web-based music live coding tool powered by [Strudel](https://strudel.cc). Write musical patterns using JavaScript-like syntax and create beats, melodies, and experimental sounds in real-time.

## Quick Start

```bash
npm install
npm run dev
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

## Learn More

- [Strudel Documentation](https://strudel.cc/learn)
- [Technical Details](./docs/architecture.md)
- [GitHub](https://github.com/rmarsigli/strudel-live-code)
