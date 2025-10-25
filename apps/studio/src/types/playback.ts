import type { Pattern } from './pattern'

export type PlaybackState = 'playing' | 'stopped' | 'paused' | 'loading'

export interface AudioConfig {
  volume: number
  bpm?: number
  latency?: number
}

export interface PlaybackContext {
  currentPattern: Pattern | null
  state: PlaybackState
  config: AudioConfig
  startTime?: number
}
