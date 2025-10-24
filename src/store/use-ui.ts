import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { LogEntry, ModalState, ToastMessage, ToastType } from '@/types'

interface UIState {
  logs: LogEntry[]
  modals: ModalState
  toasts: ToastMessage[]

  addLog: (message: string, level?: LogEntry['level']) => void
  clearLogs: () => void
  openModal: (type: ModalState['type'], data?: unknown) => void
  closeModal: () => void
  showToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

export const useUI = create<UIState>()(
  devtools((set) => ({
    logs: [],
    modals: {
      type: null,
      isOpen: false,
    },
    toasts: [],

    addLog: (message, level = 'info') => set((state) => ({
      logs: [
        ...state.logs,
        {
          id: `${Date.now()}-${Math.random()}`,
          timestamp: Date.now(),
          message,
          level,
        },
      ].slice(-100)
    })),

    clearLogs: () => set({ logs: [] }),

    openModal: (type, data) => set({
      modals: {
        type,
        isOpen: true,
        data,
      },
    }),

    closeModal: () => set({
      modals: {
        type: null,
        isOpen: false,
        data: undefined,
      },
    }),

    showToast: (message, type = 'info', duration = 3000) => set((state) => {
      const id = `${Date.now()}-${Math.random()}`
      const toast: ToastMessage = { id, message, type, duration }

      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter(t => t.id !== id)
        }))
      }, duration)

      return {
        toasts: [...state.toasts, toast]
      }
    }),

    removeToast: (id) => set((state) => ({
      toasts: state.toasts.filter(t => t.id !== id)
    })),
  }))
)
