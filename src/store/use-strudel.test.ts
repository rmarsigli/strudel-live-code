import { describe, it, expect, beforeEach } from 'vitest'
import { useStrudel } from './use-strudel'
import type { Pattern } from '@/types'

describe('useStrudel', () => {
  beforeEach(() => {
    useStrudel.setState({
      currentPattern: null,
      patternCode: "s('bd sd bd sd')",
      playbackState: 'stopped',
      volume: 0.8,
      isPlaying: false,
    })
  })

  it('should have initial state', () => {
    const { currentPattern, patternCode, playbackState, volume, isPlaying } = useStrudel.getState()

    expect(currentPattern).toBeNull()
    expect(patternCode).toBe("s('bd sd bd sd')")
    expect(playbackState).toBe('stopped')
    expect(volume).toBe(0.8)
    expect(isPlaying).toBe(false)
  })

  it('should set pattern', () => {
    const { setPattern } = useStrudel.getState()
    const mockPattern = { value: 'test' } as unknown as Pattern

    setPattern(mockPattern)
    expect(useStrudel.getState().currentPattern).toBe(mockPattern)

    setPattern(null)
    expect(useStrudel.getState().currentPattern).toBeNull()
  })

  it('should set pattern code', () => {
    const { setPatternCode } = useStrudel.getState()

    setPatternCode('s("hh*4")')
    expect(useStrudel.getState().patternCode).toBe('s("hh*4")')
  })

  it('should set playback state', () => {
    const { setPlaybackState } = useStrudel.getState()

    setPlaybackState('loading')
    expect(useStrudel.getState().playbackState).toBe('loading')

    setPlaybackState('playing')
    expect(useStrudel.getState().playbackState).toBe('playing')

    setPlaybackState('stopped')
    expect(useStrudel.getState().playbackState).toBe('stopped')
  })

  it('should set volume within 0-1 range', () => {
    const { setVolume } = useStrudel.getState()

    setVolume(0.5)
    expect(useStrudel.getState().volume).toBe(0.5)

    setVolume(0)
    expect(useStrudel.getState().volume).toBe(0)

    setVolume(1)
    expect(useStrudel.getState().volume).toBe(1)
  })

  it('should clamp volume below 0', () => {
    const { setVolume } = useStrudel.getState()

    setVolume(-0.5)
    expect(useStrudel.getState().volume).toBe(0)

    setVolume(-100)
    expect(useStrudel.getState().volume).toBe(0)
  })

  it('should clamp volume above 1', () => {
    const { setVolume } = useStrudel.getState()

    setVolume(1.5)
    expect(useStrudel.getState().volume).toBe(1)

    setVolume(100)
    expect(useStrudel.getState().volume).toBe(1)
  })

  it('should play pattern', () => {
    const { play } = useStrudel.getState()

    play()

    const { isPlaying, playbackState } = useStrudel.getState()
    expect(isPlaying).toBe(true)
    expect(playbackState).toBe('playing')
  })

  it('should stop pattern', () => {
    const { play, stop } = useStrudel.getState()
    const mockPattern = { value: 'test' } as unknown as Pattern

    useStrudel.setState({ currentPattern: mockPattern })
    play()
    expect(useStrudel.getState().isPlaying).toBe(true)

    stop()

    const { isPlaying, playbackState, currentPattern } = useStrudel.getState()
    expect(isPlaying).toBe(false)
    expect(playbackState).toBe('stopped')
    expect(currentPattern).toBeNull()
  })

  it('should toggle play from stopped to playing', () => {
    const { togglePlay } = useStrudel.getState()

    expect(useStrudel.getState().isPlaying).toBe(false)

    togglePlay()

    expect(useStrudel.getState().isPlaying).toBe(true)
    expect(useStrudel.getState().playbackState).toBe('playing')
  })

  it('should toggle play from playing to stopped', () => {
    const { play, togglePlay } = useStrudel.getState()

    play()
    expect(useStrudel.getState().isPlaying).toBe(true)

    togglePlay()

    expect(useStrudel.getState().isPlaying).toBe(false)
    expect(useStrudel.getState().playbackState).toBe('stopped')
  })

  it('should toggle multiple times', () => {
    const { togglePlay } = useStrudel.getState()

    togglePlay()
    expect(useStrudel.getState().isPlaying).toBe(true)

    togglePlay()
    expect(useStrudel.getState().isPlaying).toBe(false)

    togglePlay()
    expect(useStrudel.getState().isPlaying).toBe(true)
  })
})
