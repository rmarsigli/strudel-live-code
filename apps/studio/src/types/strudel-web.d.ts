declare module '@strudel/web' {
  import type { Pattern } from '@/types'

  export interface StrudelScheduler {
    setPattern: (pattern: Pattern) => void
    start: () => void
    stop: () => void
    gainNode?: unknown
  }

  export interface StrudelInstance {
    evaluate: (code: string) => Promise<Pattern>
    scheduler: StrudelScheduler
  }

  export function initStrudel(): Promise<StrudelInstance>

  export function samples(path: string, options?: { baseUrl?: string }): Promise<void>
}
