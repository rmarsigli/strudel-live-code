import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useConnection } from './use-connection'
import type { WSMessage } from '@/types'

describe('useConnection', () => {
  beforeEach(() => {
    const store = useConnection.getState()
    store.setStatus('disconnected')
    store.setWebSocket(null)
    store.resetReconnectAttempts()
  })

  it('should have initial state', () => {
    const { status, ws, reconnectAttempts, lastMessage } = useConnection.getState()

    expect(status).toBe('disconnected')
    expect(ws).toBeNull()
    expect(reconnectAttempts).toBe(0)
    expect(lastMessage).toBeNull()
  })

  it('should set status', () => {
    const { setStatus } = useConnection.getState()

    setStatus('connecting')
    expect(useConnection.getState().status).toBe('connecting')

    setStatus('connected')
    expect(useConnection.getState().status).toBe('connected')

    setStatus('error')
    expect(useConnection.getState().status).toBe('error')
  })

  it('should set websocket', () => {
    const mockWs = { readyState: WebSocket.OPEN } as WebSocket
    const { setWebSocket } = useConnection.getState()

    setWebSocket(mockWs)
    expect(useConnection.getState().ws).toBe(mockWs)

    setWebSocket(null)
    expect(useConnection.getState().ws).toBeNull()
  })

  it('should set last message', () => {
    const { setLastMessage } = useConnection.getState()
    const message: WSMessage = {
      type: 'file-list',
      payload: { files: ['test.txt'] },
      timestamp: Date.now(),
    }

    setLastMessage(message)
    expect(useConnection.getState().lastMessage).toEqual(message)
  })

  it('should increment reconnect attempts', () => {
    const { incrementReconnectAttempts } = useConnection.getState()

    expect(useConnection.getState().reconnectAttempts).toBe(0)

    incrementReconnectAttempts()
    expect(useConnection.getState().reconnectAttempts).toBe(1)

    incrementReconnectAttempts()
    expect(useConnection.getState().reconnectAttempts).toBe(2)
  })

  it('should reset reconnect attempts', () => {
    const { incrementReconnectAttempts, resetReconnectAttempts } = useConnection.getState()

    incrementReconnectAttempts()
    incrementReconnectAttempts()
    expect(useConnection.getState().reconnectAttempts).toBe(2)

    resetReconnectAttempts()
    expect(useConnection.getState().reconnectAttempts).toBe(0)
  })

  it('should send message when websocket is open', () => {
    const sendMock = vi.fn()
    const mockWs = {
      readyState: WebSocket.OPEN,
      send: sendMock,
    } as unknown as WebSocket

    const { setWebSocket, send } = useConnection.getState()
    setWebSocket(mockWs)

    const message: WSMessage = {
      type: 'get-files',
      timestamp: Date.now(),
    }

    send(message)
    expect(sendMock).toHaveBeenCalledWith(JSON.stringify(message))
  })

  it('should not send message when websocket is not open', () => {
    const sendMock = vi.fn()
    const mockWs = {
      readyState: WebSocket.CONNECTING,
      send: sendMock,
    } as unknown as WebSocket

    useConnection.getState().setWebSocket(null)
    useConnection.getState().setWebSocket(mockWs)

    const message: WSMessage = {
      type: 'get-files',
      timestamp: Date.now(),
    }

    useConnection.getState().send(message)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('should disconnect websocket', () => {
    const closeMock = vi.fn()
    const mockWs = {
      readyState: WebSocket.OPEN,
      close: closeMock,
    } as unknown as WebSocket

    const { setWebSocket, disconnect } = useConnection.getState()
    setWebSocket(mockWs)

    disconnect()
    expect(closeMock).toHaveBeenCalled()
    expect(useConnection.getState().ws).toBeNull()
    expect(useConnection.getState().status).toBe('disconnected')
  })

  it('should handle disconnect when no websocket', () => {
    const { disconnect } = useConnection.getState()

    expect(() => disconnect()).not.toThrow()
    expect(useConnection.getState().ws).toBeNull()
  })
})
