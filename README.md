# Strudel Studio Monorepo

Live coding music environment built with [Strudel](https://strudel.cc).

## Structure

```
strudel-studio/
├── apps/
│   └── studio/          # Main application (React + Vite)
└── packages/
    └── visualizer/      # @strudel-studio/visualizer npm package
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Run studio in development mode
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Packages

### Studio (`apps/studio`)
Main live coding application with real-time pattern editing and audio visualization.

[→ See apps/studio/README.md for details](apps/studio/README.md)

### Visualizer (`packages/visualizer`)
Standalone React component for visualizing Strudel patterns.

[→ See packages/visualizer/README.md for details](packages/visualizer/README.md)

**npm package**: `@strudel-studio/visualizer`

## Development

### Requirements
- Node.js >= 18
- pnpm >= 8

### Workspace Commands

```bash
# Run command in specific package
pnpm --filter studio dev
pnpm --filter @strudel-studio/visualizer build

# Run command in all packages
pnpm -r test
pnpm -r lint
```

## Code Standards

- **Files**: kebab-case
- **Components**: PascalCase
- **TypeScript**: Single quotes, no semicolons, 4-space indentation
- **No comments in code** - Documentation goes in `.md` files
- **Testing**: 90%+ coverage required

## Repository

**GitHub**: [rmarsigli/strudel-studio](https://github.com/rmarsigli/strudel-studio)

**npm packages**:
- `@strudel-studio/visualizer` (publishable)

## License

MIT
