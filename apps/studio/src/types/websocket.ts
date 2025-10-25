export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error'

export interface WSMessage {
  type: WSMessageType
  payload?: unknown
  timestamp?: number
}

export type WSMessageType =
  | 'pattern-update'
  | 'file-list'
  | 'file-created'
  | 'file-deleted'
  | 'file-renamed'
  | 'file-content'
  | 'connection-status'
  | 'error'
  | 'get-files'
  | 'create-file'
  | 'delete-file'
  | 'rename-file'
  | 'save-file'

export interface PatternUpdateMessage extends WSMessage {
  type: 'pattern-update'
  payload: {
    filename: string
    content: string
  }
}

export interface FileListMessage extends WSMessage {
  type: 'file-list'
  payload: {
    files: string[]
  }
}

export interface FileCreatedMessage extends WSMessage {
  type: 'file-created'
  payload: {
    filename: string
    content: string
  }
}

export interface FileDeletedMessage extends WSMessage {
  type: 'file-deleted'
  payload: {
    filename: string
  }
}

export interface FileRenamedMessage extends WSMessage {
  type: 'file-renamed'
  payload: {
    oldName: string
    newName: string
  }
}

export interface ErrorMessage extends WSMessage {
  type: 'error'
  payload: {
    message: string
    code?: string
  }
}
