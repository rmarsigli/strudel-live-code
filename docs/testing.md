# Testing Guide

This guide explains the testing setup and how to run tests for the Strudel Studio application.

## Test Stack

- **Vitest** - Fast unit test framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **@vitest/coverage-v8** - Code coverage reports

## Running Tests

### Run all tests
```bash
pnpm test
```

### Run tests with coverage
```bash
pnpm test:coverage
```

### Run tests in watch mode
```bash
pnpm test
```

### Run tests with UI
```bash
pnpm test:ui
```

## Test Coverage

Current coverage: **100%** on tested files

Coverage thresholds (configured in `vitest.config.ts`):
- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

## Test Structure

### Store Tests
Located in `src/store/*.test.ts`

- `use-connection.test.ts` - WebSocket connection state management
- `use-files.test.ts` - File management state
- `use-ui.test.ts` - UI state (logs, modals, toasts)
- `use-strudel.test.ts` - Strudel audio engine state

**Coverage**: 100%

### Component Tests
Located in `src/components/**/*.test.tsx`

- `ui/button.test.tsx` - Button component variants and interactions
- `ui/input.test.tsx` - Input component behavior

**Coverage**: 100%

### Utility Tests
Located in `src/lib/*.test.ts`

- `utils.test.ts` - Utility functions (cn, etc.)

**Coverage**: 100%

## Writing Tests

### Store Tests Example

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useMyStore } from './use-my-store'

describe('useMyStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useMyStore.setState({ /* initial state */ })
  })

  it('should update state', () => {
    const { setValue } = useMyStore.getState()
    setValue('new value')
    expect(useMyStore.getState().value).toBe('new value')
  })
})
```

### Component Tests Example

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('should render and handle click', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.getByText('Clicked')).toBeInTheDocument()
  })
})
```

## CI/CD Integration

Tests run automatically on every push and pull request via GitHub Actions.

See `.github/workflows/ci.yml` for the complete CI/CD pipeline.

## Test Configuration

### vitest.config.ts

```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
  },
})
```

### Test Setup

The test setup file (`src/test/setup.ts`) configures:
- jest-dom matchers
- WebSocket mocks
- matchMedia polyfill
- Automatic cleanup after each test

## Best Practices

1. **Isolate Tests**: Each test should be independent
2. **Use beforeEach**: Reset state before each test
3. **Test User Behavior**: Focus on what users do, not implementation details
4. **Descriptive Names**: Use clear, descriptive test names
5. **Arrange-Act-Assert**: Follow the AAA pattern
6. **Mock External Dependencies**: Mock WebSocket, fetch, etc.

## Debugging Tests

### Run specific test file
```bash
pnpm test src/store/use-connection.test.ts
```

### Run tests matching pattern
```bash
pnpm test -- -t "should send message"
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["test"],
  "console": "integratedTerminal"
}
```

## Coverage Reports

After running `pnpm test:coverage`, view the HTML coverage report:

```bash
open coverage/index.html
```

Coverage reports show:
- **Statements**: Percentage of executable statements tested
- **Branches**: Percentage of conditional branches tested
- **Functions**: Percentage of functions tested
- **Lines**: Percentage of lines tested

## Common Issues

### WebSocket Mocks

If you see WebSocket-related errors, ensure the mock is properly configured in `src/test/setup.ts`:

```typescript
global.WebSocket = vi.fn() as unknown as typeof WebSocket
Object.defineProperty(global.WebSocket, 'OPEN', { value: 1 })
```

### Async Tests

Always use `async`/`await` with user events:

```typescript
const user = userEvent.setup()
await user.click(button)  // ✅ Correct
user.click(button)        // ❌ Wrong
```

### Store State Isolation

Always reset store state in `beforeEach`:

```typescript
beforeEach(() => {
  useMyStore.setState({ /* reset to initial state */ })
})
```

## Next Steps

- Add integration tests for complex workflows
- Add E2E tests with Playwright
- Increase coverage to 90%+
- Add visual regression tests

---

For more information:
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Zustand Testing](https://docs.pmnd.rs/zustand/guides/testing)
