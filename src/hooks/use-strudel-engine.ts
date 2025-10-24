import { useEffect, useCallback, useRef } from 'react'
import { useStrudel, useUI } from '@/store'
import type { Pattern } from '@/types'

declare global {
  interface Window {
    strudel: {
      evalScope: (code: string, scope?: Record<string, unknown>) => Promise<Pattern>
      controls: Record<string, unknown>
      samples: (url: string) => Promise<void>
      repl: {
        scheduler: {
          setPattern: (pattern: Pattern, autostart?: boolean) => void
          start: () => void
          stop: () => void
        }
      }
    }
  }
}

export function useStrudelEngine() {
  const { patternCode, isPlaying, volume, setPattern, setPlaybackState } = useStrudel()
  const { addLog, showToast } = useUI()
  const isInitializedRef = useRef(false)
  const currentPatternRef = useRef<Pattern | null>(null)

  const initializeStrudel = useCallback(async () => {
    if (isInitializedRef.current) return

    try {
      addLog('Initializing Strudel engine...')

      if (!window.strudel) {
        const strudel = await import('@strudel/core')

        window.strudel = {
          evalScope: strudel.evalScope || strudel.default?.evalScope,
          controls: strudel.controls || strudel.default?.controls || {},
          samples: strudel.samples || strudel.default?.samples,
          repl: strudel.repl || strudel.default?.repl,
        }
      }

      if (typeof window.strudel.samples === 'function') {
        await window.strudel.samples('github:tidalcycles/Dirt-Samples')
      } else {
        addLog('Samples loading skipped (not available)', 'warn')
      }

      isInitializedRef.current = true
      addLog('Strudel engine initialized successfully')
      showToast('Strudel engine ready', 'success')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      addLog(`Failed to initialize Strudel: ${message}`, 'error')
      showToast('Failed to initialize Strudel engine', 'error')
      console.error('Strudel initialization error:', error)
    }
  }, [addLog, showToast])

  const evaluatePattern = useCallback(async (code: string) => {
    if (!isInitializedRef.current) {
      await initializeStrudel()
    }

    try {
      setPlaybackState('loading')
      addLog(`Evaluating pattern...`)

      const cleanCode = code
        .split('\n')
        .filter(line => !line.trim().startsWith('//'))
        .join('\n')
        .trim()

      if (!cleanCode) {
        throw new Error('Empty pattern')
      }

      const pattern = await window.strudel.evalScope(cleanCode, window.strudel.controls)

      currentPatternRef.current = pattern
      setPattern(pattern)

      addLog('Pattern evaluated successfully')
      return pattern
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      addLog(`Pattern evaluation error: ${message}`, 'error')
      showToast(`Pattern error: ${message}`, 'error')
      setPlaybackState('stopped')
      throw error
    }
  }, [initializeStrudel, setPattern, setPlaybackState, addLog, showToast])

  const playPattern = useCallback(async () => {
    try {
      if (!isInitializedRef.current) {
        await initializeStrudel()
      }

      let pattern = currentPatternRef.current

      if (!pattern && patternCode) {
        pattern = await evaluatePattern(patternCode)
      }

      if (pattern && window.strudel?.repl?.scheduler) {
        window.strudel.repl.scheduler.setPattern(pattern, true)
        window.strudel.repl.scheduler.start()
        setPlaybackState('playing')
        addLog('Playback started')
        showToast('Playing', 'success')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      addLog(`Playback error: ${message}`, 'error')
      showToast('Failed to start playback', 'error')
      setPlaybackState('stopped')
    }
  }, [patternCode, evaluatePattern, initializeStrudel, setPlaybackState, addLog, showToast])

  const stopPattern = useCallback(() => {
    try {
      if (window.strudel?.repl?.scheduler) {
        window.strudel.repl.scheduler.stop()
        setPlaybackState('stopped')
        addLog('Playback stopped')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      addLog(`Stop error: ${message}`, 'error')
      console.error('Stop error:', error)
    }
  }, [setPlaybackState, addLog])

  useEffect(() => {
    initializeStrudel()
  }, [initializeStrudel])

  useEffect(() => {
    if (isPlaying) {
      playPattern()
    } else {
      stopPattern()
    }
  }, [isPlaying])

  useEffect(() => {
    if (window.strudel?.repl?.scheduler) {
      const gainNode = (window.strudel.repl.scheduler as any).gainNode
      if (gainNode) {
        gainNode.gain.value = volume
      }
    }
  }, [volume])

  return {
    evaluatePattern,
    playPattern,
    stopPattern,
    isInitialized: isInitializedRef.current,
  }
}
