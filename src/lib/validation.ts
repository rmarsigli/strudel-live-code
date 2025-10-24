export function isValidFilename(filename: string): boolean {
  const validPattern = /^[a-zA-Z0-9_-]+\.strudel$/
  return validPattern.test(filename)
}

export function sanitizeFilename(filename: string): string {
  let sanitized = filename.replace(/[^a-zA-Z0-9_-]/g, '-')

  if (!sanitized.endsWith('.strudel')) {
    sanitized += '.strudel'
  }

  return sanitized
}

export function validatePatternCode(code: string): { valid: boolean; error?: string } {
  if (!code || code.trim().length === 0) {
    return { valid: false, error: 'Pattern code cannot be empty' }
  }

  return { valid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i] ?? 'B'}`
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
