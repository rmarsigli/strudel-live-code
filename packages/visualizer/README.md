# @strudel-studio/visualizer

Real-time Strudel code visualizer component with intelligent parsing.

## Features

- 🎵 **Intelligent Code Parsing** - Understands Strudel syntax completely
- 🎨 **Real-time Visualization** - Generates accurate frequency bars based on parsed events
- ⚡ **High Performance** - Optimized rendering with requestAnimationFrame
- 🎯 **Type-Safe** - Full TypeScript support
- 🎭 **Customizable** - Flexible styling and configuration options
- 📦 **Zero Dependencies** - Only peer dependencies on React

## Installation

```bash
npm install @strudel-studio/visualizer
# or
yarn add @strudel-studio/visualizer
# or
pnpm add @strudel-studio/visualizer
```

## Usage

### Basic Usage

```tsx
import { StrudelVisualizer } from '@strudel-studio/visualizer'

function App() {
  const [code, setCode] = useState("s('bd sd hh cp')")
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <StrudelVisualizer
      code={code}
      isPlaying={isPlaying}
      width="100%"
      height="200px"
    />
  )
}
```

### Advanced Usage with Custom Styling

```tsx
<StrudelVisualizer
  code={code}
  isPlaying={isPlaying}
  width="800px"
  height="300px"
  barCount={128}
  barColor="#334155"
  barColorPlaying="#00ff88,#00ffff"
  backgroundColor="#0a0e1a"
  fftSize={256}
  smoothingFactor={0.85}
  decayRate={2.5}
/>
```

### Using the Hook Directly

```tsx
import { useStrudelVisualizer } from '@strudel-studio/visualizer'

function CustomVisualizer() {
  const { frequencyData, hasErrors, errorCount } = useStrudelVisualizer({
    code: "s('bd sd hh cp')",
    isPlaying: true,
    cps: 0.5,
    fftSize: 128
  })

  // Use frequencyData to render your custom visualization
  return <YourCustomCanvas data={frequencyData} />
}
```

## API

### `<StrudelVisualizer />` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | **required** | Strudel pattern code to visualize |
| `isPlaying` | `boolean` | **required** | Whether the pattern is currently playing |
| `width` | `number \| string` | `'100%'` | Canvas width |
| `height` | `number \| string` | `'100%'` | Canvas height |
| `barCount` | `number` | `64` | Number of frequency bars |
| `barColor` | `string` | `'#334155'` | Bar color when stopped |
| `barColorPlaying` | `string` | `'#00ff88'` | Bar color when playing (supports gradients with comma) |
| `backgroundColor` | `string` | `'#0a0e1a'` | Canvas background color |
| `cps` | `number` | `0.5` | Cycles per second (from Strudel scheduler) |
| `fftSize` | `number` | `128` | FFT size for frequency analysis |
| `smoothingFactor` | `number` | `0.85` | Smoothing factor for bar decay |
| `decayRate` | `number` | `2.5` | Decay rate for event energy |
| `className` | `string` | - | CSS class name |
| `style` | `CSSProperties` | - | Inline styles |

### `useStrudelVisualizer()` Hook

```typescript
function useStrudelVisualizer(options: StrudelVisualizerOptions): {
  frequencyData: Uint8Array | null
  parseResult: ParseResult | null
  events: AudioEvent[]
  hasErrors: boolean
  errorCount: number
}
```

## Supported Strudel Structures

### ✅ Fully Supported

- Mini-notation: `"bd sd hh cp"`
- Repetitions: `"bd*4"`, `"hh*8"`
- Hold/Repeat: `"bd:5!2"` (hold for 2 steps)
- Silences: `"~ ~ bd ~"`
- Subgroups: `"[bd sd] hh"`
- Sample selection: `"bd:2"`, `"hh:0:3"`
- Alternation: `"<bd sd cp>"`
- Euclidean rhythms: `"bd(3,8)"`
- Stack: `stack(s('bd'), s('hh'))`
- Modifiers: `fast()`, `slow()`, `gain()`, `speed()`, `delay()`, `room()`, `cpm()`
- Weights: `"bd@3"`

### ⏳ Planned (v2.0)

- Conditionals: `every(4, fast(2))`
- Stereo effects: `jux()`, `juxBy()`
- Complex transformations: `bite()`, `chop()`

## Examples

### Basic Drum Pattern

```tsx
<StrudelVisualizer
  code="s('bd sd bd sd')"
  isPlaying={true}
/>
```

### Complex Stack with Modifiers

```tsx
<StrudelVisualizer
  code={`
    stack(
      s('bd:5!2 bd:6 bd:5').speed(0.9),
      s('~ cp:2 ~ cp:2').room(0.3),
      s('[~ hh:3]*4').gain(0.5)
    ).cpm(130/4)
  `}
  isPlaying={true}
/>
```

### Euclidean Rhythms

```tsx
<StrudelVisualizer
  code="s('bd(5,8) sd(3,8) hh(7,8)')"
  isPlaying={true}
/>
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Watch mode
pnpm dev
```

## License

MIT License - This package is a complementary tool for Strudel.

**Important Legal Notice**: This visualizer package does not incorporate any Strudel code. However, if you use this package in your project, you will need to install `@strudel/core` or other Strudel packages (AGPL-3.0 licensed) as peer dependencies to actually play the patterns. When distributing applications that include Strudel packages, you must comply with [Strudel's AGPL-3.0 license](https://codeberg.org/uzu/strudel/src/branch/main/LICENSE).

**In summary**:
- ✅ This visualizer package itself is MIT (you can use it freely)
- ⚠️ If your app uses `@strudel/core` to play audio, your app must be AGPL-3.0 or compatible
- ✅ If you only use this visualizer for static analysis (no audio playback), MIT applies

See [Strudel's license guide](https://strudel.cc/learn/using-strudel-in-your-project#respect-the-license) for full details.

## Contributing

Contributions are welcome! Please open an issue or PR on [GitHub](https://github.com/rmarsigli/strudel-studio).

## Credits

Built for [Strudel](https://strudel.cc) - the live coding music environment.
