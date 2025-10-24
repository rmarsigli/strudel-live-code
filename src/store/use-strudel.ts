import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Pattern, PlaybackState } from '@/types'

interface StrudelState {
  currentPattern: Pattern | null
  patternCode: string
  playbackState: PlaybackState
  volume: number
  isPlaying: boolean

  setPattern: (pattern: Pattern | null) => void
  setPatternCode: (code: string) => void
  setPlaybackState: (state: PlaybackState) => void
  setVolume: (volume: number) => void
  play: () => void
  stop: () => void
  togglePlay: () => void
}

export const useStrudel = create<StrudelState>()(
  devtools(
    persist(
      (set) => ({
        currentPattern: null,
        patternCode: "s('bd sd bd sd')",
        playbackState: 'stopped',
        volume: 0.8,
        isPlaying: false,

        setPattern: (pattern) => set({ currentPattern: pattern }),

        setPatternCode: (code) => set({ patternCode: code }),

        setPlaybackState: (state) => set({ playbackState: state }),

        setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

        play: () => set({
          isPlaying: true,
          playbackState: 'playing'
        }),

        stop: () => set({
          isPlaying: false,
          playbackState: 'stopped',
          currentPattern: null
        }),

        togglePlay: () => set((state) => ({
          isPlaying: !state.isPlaying,
          playbackState: !state.isPlaying ? 'playing' : 'stopped'
        })),
      }),
      {
        name: 'strudel-storage',
        partialize: (state) => ({
          volume: state.volume,
          patternCode: state.patternCode,
        }),
      }
    )
  )
)
