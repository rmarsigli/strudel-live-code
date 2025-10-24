import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

globalThis.WebSocket = vi.fn() as unknown as typeof WebSocket
Object.defineProperty(globalThis.WebSocket, 'CONNECTING', { value: 0 })
Object.defineProperty(globalThis.WebSocket, 'OPEN', { value: 1 })
Object.defineProperty(globalThis.WebSocket, 'CLOSING', { value: 2 })
Object.defineProperty(globalThis.WebSocket, 'CLOSED', { value: 3 })

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
