import { useEffect, useCallback, useRef } from 'react'
import { useConnection, useUI } from '@/store'
import { WS_URL, RECONNECT_DELAY, MAX_RECONNECT_ATTEMPTS } from '@/lib/constants'
import type { WSMessage } from '@/types'

export function useWebSocket() {
  const { status, ws, setStatus, setWebSocket, incrementReconnectAttempts, resetReconnectAttempts, reconnectAttempts } = useConnection()
  const { showToast } = useUI()
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>()

  const connect = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      return
    }

    try {
      setStatus('connecting')
      const websocket = new WebSocket(WS_URL)

      websocket.onopen = () => {
        console.log('WebSocket connected')
        setStatus('connected')
        setWebSocket(websocket)
        resetReconnectAttempts()
        showToast('Connected to server', 'success')
      }

      websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as WSMessage
          console.log('WebSocket message:', message)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error)
        setStatus('error')
      }

      websocket.onclose = () => {
        console.log('WebSocket disconnected')
        setStatus('disconnected')
        setWebSocket(null)

        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          const delay = RECONNECT_DELAY * Math.pow(2, reconnectAttempts)
          console.log(`Reconnecting in ${delay}ms...`)

          reconnectTimeoutRef.current = setTimeout(() => {
            incrementReconnectAttempts()
            connect()
          }, delay)
        } else {
          showToast('Failed to connect to server', 'error')
        }
      }
    } catch (error) {
      console.error('Error creating WebSocket:', error)
      setStatus('error')
    }
  }, [ws, setStatus, setWebSocket, reconnectAttempts, incrementReconnectAttempts, resetReconnectAttempts, showToast])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }

    if (ws) {
      ws.close()
      setWebSocket(null)
    }

    setStatus('disconnected')
  }, [ws, setWebSocket, setStatus])

  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [])

  return {
    status,
    connect,
    disconnect,
  }
}
