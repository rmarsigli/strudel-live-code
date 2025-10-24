import { useEffect, useCallback, useRef } from 'react'
import { useStrudel, useUI } from '@/store'
import type { Pattern } from '@/types'

declare global {
  interface Window {
    strudel?: {
      evaluate: (code: string) => Promise<Pattern>
      scheduler: {
        setPattern: (pattern: Pattern) => void
        start: () => void
        stop: () => void
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

      const { initStrudel, samples } = await import('@strudel/web')

      const { evaluate, scheduler } = await initStrudel()

      window.strudel = {
        evaluate,
        scheduler,
      }

      isInitializedRef.current = true
      addLog('Strudel engine initialized successfully')

      try {
        const checkUrl = `${window.location.origin}/samples/dirt-samples/strudel.json`
        const response = await fetch(checkUrl, { method: 'HEAD' })

        if (response.ok) {
          addLog('Local samples detected, loading...')
          await samples('/samples/dirt-samples', {
            baseUrl: window.location.origin,
          })
          addLog('Local samples loaded successfully')
          showToast('Strudel ready with local samples', 'success')
        } else {
          throw new Error('Samples not found')
        }
      } catch {
        addLog('No local samples found (synths only mode)', 'info')
        addLog('Run "pnpm run download-samples" to enable drum samples', 'info')
        showToast('Strudel ready (synths only)', 'success')
      }
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

    if (!window.strudel) {
      throw new Error('Strudel not initialized')
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

      const pattern = await window.strudel.evaluate(cleanCode)

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

      if (!window.strudel) {
        throw new Error('Strudel not initialized')
      }

      let pattern = currentPatternRef.current

      if (!pattern && patternCode) {
        pattern = await evaluatePattern(patternCode)
      }

      if (pattern) {
        window.strudel.scheduler.setPattern(pattern)
        window.strudel.scheduler.start()
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
      if (window.strudel?.scheduler) {
        window.strudel.scheduler.stop()
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
  }, [isPlaying, playPattern, stopPattern])

  useEffect(() => {
    if (window.strudel?.scheduler) {
      const scheduler = window.strudel.scheduler as unknown as { gainNode?: GainNode }
      if (scheduler.gainNode) {
        scheduler.gainNode.gain.value = volume
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
