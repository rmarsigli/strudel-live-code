export interface PatternFile {
  name: string
  path: string
  content: string
  lastModified: number
}

export interface PatternMetadata {
  title?: string
  author?: string
  bpm?: number
  description?: string
}

export type Pattern = unknown

export interface PatternError {
  message: string
  line?: number
  column?: number
  stack?: string
}
