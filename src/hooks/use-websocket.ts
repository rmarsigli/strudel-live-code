import { useEffect, useCallback, useRef } from 'react'
import { useConnection, useUI, useFiles } from '@/store'
import { WS_URL, RECONNECT_DELAY, MAX_RECONNECT_ATTEMPTS } from '@/lib/constants'
import type { WSMessage } from '@/types'

export function useWebSocket() {
  const { status, ws, setStatus, setWebSocket, incrementReconnectAttempts, resetReconnectAttempts, reconnectAttempts } = useConnection()
  const { showToast, addLog } = useUI()
  const { setFiles, addFile, removeFile, updateFile, setCurrentFile } = useFiles()
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

        websocket.send(JSON.stringify({
          type: 'get-files',
          timestamp: Date.now(),
        }))
      }

      websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as WSMessage
          console.log('WebSocket message:', message)

          switch (message.type) {
            case 'file-list': {
              const { files } = message.payload as { files: string[] }
              const fileObjects = files.map((name) => ({
                name,
                path: `patterns/${name}`,
                content: '',
                lastModified: Date.now(),
              }))
              setFiles(fileObjects)
              addLog(`Loaded ${files.length} pattern(s)`, 'info')
              break
            }

            case 'file-created': {
              const { filename, content } = message.payload as { filename: string; content: string }
              addFile({
                name: filename,
                path: `patterns/${filename}`,
                content,
                lastModified: Date.now(),
              })
              addLog(`File ${filename} created`, 'info')
              break
            }

            case 'file-deleted': {
              const { filename } = message.payload as { filename: string }
              removeFile(filename)
              addLog(`File ${filename} deleted`, 'info')
              break
            }

            case 'pattern-update': {
              const { filename, content } = message.payload as { filename: string; content: string }
              updateFile(filename, content)
              addLog(`Pattern ${filename} updated`, 'info')
              break
            }

            case 'file-content': {
              const { filename, content } = message.payload as { filename: string; content: string }
              updateFile(filename, content)
              break
            }

            case 'connection-status': {
              const { status: connectionStatus } = message.payload as { status: string }
              addLog(`Server status: ${connectionStatus}`, 'info')
              break
            }

            case 'error': {
              const { message: errorMessage } = message.payload as { message: string }
              showToast(errorMessage, 'error')
              addLog(`Error: ${errorMessage}`, 'error')
              break
            }

            default:
              console.warn('Unknown message type:', message.type)
          }
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
