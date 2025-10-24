export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  duration?: number
}

export interface LogEntry {
  id: string
  timestamp: number
  message: string
  level: 'info' | 'warn' | 'error'
}

export type ModalType = 'create-file' | 'delete-file' | 'rename-file' | 'error' | null

export interface ModalState {
  type: ModalType
  isOpen: boolean
  data?: unknown
}

export interface CreateFileModalData {
  templateType?: 'blank' | 'techno' | 'ambient' | 'drum-bass' | 'melodic'
}

export interface DeleteFileModalData {
  filename: string
}

export interface RenameFileModalData {
  oldName: string
}

export interface ErrorModalData {
  title: string
  message: string
  stack?: string
}
