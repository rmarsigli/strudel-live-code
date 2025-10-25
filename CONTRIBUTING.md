# Contributing to Strudel Studio

Thank you for your interest in contributing to Strudel Studio! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Code Style Guide](#code-style-guide)
- [Running Tests](#running-tests)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rmarsigli/strudel-studio.git
   cd strudel-studio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure the variables as needed.

4. **Start the development server**
   ```bash
   # Terminal 1: Start the WebSocket server
   pnpm run server

   # Terminal 2: Start the Vite dev server
   pnpm run dev
   ```

5. **Open the application**
   Navigate to `http://localhost:5173` in your browser.

### Available Scripts

- `pnpm run dev` - Start Vite development server
- `pnpm run server` - Start WebSocket file watcher server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm test` - Run tests in watch mode
- `pnpm run test:coverage` - Run tests with coverage report
- `pnpm run lint` - Run ESLint
- `pnpm run type-check` - Run TypeScript type checking

## Project Structure

```
strudel-studio/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── header.tsx
│   │   ├── pattern-editor.tsx
│   │   ├── control-panel.tsx
│   │   └── visualizer.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── use-strudel-engine.ts
│   │   ├── use-websocket.ts
│   │   └── use-keyboard-shortcuts.ts
│   ├── store/            # Zustand stores
│   │   ├── use-strudel.ts
│   │   ├── use-connection.ts
│   │   ├── use-files.ts
│   │   └── use-ui.ts
│   ├── lib/              # Utilities and parsers
│   │   ├── strudel-lexer.ts
│   │   ├── strudel-parser.ts
│   │   ├── strudel-interpreter.ts
│   │   └── utils.ts
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global CSS
├── server/               # WebSocket server
│   └── index.js
├── packages/             # NPM packages
│   └── visualizer/       # @strudel-studio/visualizer
├── patterns/             # Example Strudel patterns
├── docs/                 # Documentation
└── tests/                # Test files

```

## Code Style Guide

This project follows strict code style conventions. Please refer to [CLAUDE.md](./CLAUDE.md) for complete details.

### Quick Reference

#### File Naming
- **All files**: Use `kebab-case`
  - ✅ `pattern-editor.tsx`
  - ✅ `use-strudel-engine.ts`
  - ❌ `PatternEditor.tsx`
  - ❌ `useStrudelEngine.ts`

#### Code Conventions
- **Components**: `PascalCase` (e.g., `PatternEditor`)
- **Functions/Variables**: `camelCase` (e.g., `playPattern`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `DEFAULT_PATTERN`)

#### TypeScript/TSX Rules
- ✅ **ALWAYS use single quotes**: `import { useState } from 'react'`
- ✅ **NEVER use semicolons**: `const x = 5` (not `const x = 5;`)
- ✅ **NEVER add code comments**: Use JSDoc for documentation instead
- ✅ **Strict TypeScript**: All strict mode options enabled

#### Example
```typescript
import { useState } from 'react'

export function PatternEditor() {
  const [code, setCode] = useState('')

  const handleChange = (value: string) => {
    setCode(value)
  }

  return <div>{code}</div>
}
```

## Running Tests

### Unit Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test -- --run

# Run tests with coverage
pnpm run test:coverage
```

### Coverage Requirements

- Minimum coverage: **90%**
- All new features must include tests
- Critical components require **95%+** coverage

### Test Structure

Tests are located in `__tests__` directories or as `.test.ts(x)` files next to the source files:

```
src/
├── components/
│   └── ui/
│       ├── button.tsx
│       └── button.test.tsx    # Component tests
├── lib/
│   ├── strudel-lexer.ts
│   └── strudel-lexer.test.ts  # Unit tests
└── store/
    ├── use-strudel.ts
    └── use-strudel.test.ts    # Store tests
```

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass**
   ```bash
   pnpm test -- --run
   ```

2. **Run linting**
   ```bash
   pnpm run lint
   ```

3. **Run type checking**
   ```bash
   pnpm run type-check
   ```

4. **Test the build**
   ```bash
   pnpm run build
   ```

### PR Guidelines

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make atomic commits**
   - Use [Conventional Commits](https://www.conventionalcommits.org/)
   - Examples:
     - `feat: add euclidean rhythm support`
     - `fix: resolve audio sync issue`
     - `docs: update README with new examples`
     - `refactor: simplify parser logic`
     - `test: add tests for interpreter`

3. **Write clear PR descriptions**
   - Explain what changes were made and why
   - Reference any related issues
   - Include screenshots for UI changes
   - List any breaking changes

4. **Ensure CI passes**
   - All tests must pass
   - No linting errors
   - No TypeScript errors
   - Coverage must not decrease

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] My code follows the code style (CLAUDE.md)
- [ ] I have added tests
- [ ] All tests are passing
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
```

## Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported in [Issues](https://github.com/rmarsigli/strudel-studio/issues)
2. Try to reproduce the bug with the latest version
3. Gather relevant information (browser, OS, steps to reproduce)

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., v20.10.0]
- Version: [e.g., 1.0.0]

## Additional Context
Screenshots, error logs, etc.
```

## Feature Requests

We welcome feature requests! Please provide:

1. **Clear description** of the feature
2. **Use case** - Why is this feature needed?
3. **Proposed solution** - How might it work?
4. **Alternatives** - What other solutions have you considered?

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Problem/Use Case
What problem does this solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Other solutions you've thought about

## Additional Context
Mockups, examples, etc.
```

## Development Workflow

### Typical Workflow

1. Pick an issue or create one
2. Create a feature branch
3. Write code following the style guide
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request
7. Address review feedback
8. Merge (requires approval from maintainers)

### Code Review Process

- At least one approval required
- All CI checks must pass
- Code must follow style guide
- Tests must be included for new features
- Documentation must be updated if needed

## Getting Help

- **Documentation**: Check the [docs/](./docs/) directory
- **Issues**: Search existing issues or create a new one
- **Discussions**: Use GitHub Discussions for questions

## License

By contributing to Strudel Studio, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Strudel Studio! 🎵
