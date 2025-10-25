import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ConnectionStatus, WSMessage } from '@/types'

interface ConnectionState {
  status: ConnectionStatus
  ws: WebSocket | null
  reconnectAttempts: number
  lastMessage: WSMessage | null

  setStatus: (status: ConnectionStatus) => void
  setWebSocket: (ws: WebSocket | null) => void
  setLastMessage: (message: WSMessage) => void
  incrementReconnectAttempts: () => void
  resetReconnectAttempts: () => void
  send: (message: WSMessage) => void
  disconnect: () => void
}

export const useConnection = create<ConnectionState>()(
  devtools((set, get) => ({
    status: 'disconnected',
    ws: null,
    reconnectAttempts: 0,
    lastMessage: null,

    setStatus: (status) => set({ status }),

    setWebSocket: (ws) => set({ ws }),

    setLastMessage: (message) => set({ lastMessage: message }),

    incrementReconnectAttempts: () => set((state) => ({
      reconnectAttempts: state.reconnectAttempts + 1
    })),

    resetReconnectAttempts: () => set({ reconnectAttempts: 0 }),

    send: (message) => {
      const { ws } = get()
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message))
      }
    },

    disconnect: () => {
      const { ws } = get()
      if (ws) {
        ws.close()
        set({ ws: null, status: 'disconnected' })
      }
    },
  }))
)
