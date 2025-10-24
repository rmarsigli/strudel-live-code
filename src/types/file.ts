export interface FileInfo {
  name: string
  path: string
  size?: number
  lastModified: number
}

export type FileOperation = 'create' | 'read' | 'update' | 'delete' | 'rename'

export interface FileOperationResult {
  success: boolean
  operation: FileOperation
  filename: string
  error?: string
}
