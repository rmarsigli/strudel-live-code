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
        started?: boolean
      }
      getAudioContext?: () => AudioContext
    }
  }
}

export function useStrudelEngine() {
  const { patternCode, isPlaying, volume, setPattern, setPlaybackState } = useStrudel()
  const { addLog, showToast } = useUI()
  const isInitializedRef = useRef(false)
  const currentPatternRef = useRef<Pattern | null>(null)
  const patternCodeRef = useRef(patternCode)
  const isPlayingRef = useRef(isPlaying)
  const updateTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    patternCodeRef.current = patternCode

    if (isPlayingRef.current && isInitializedRef.current) {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }

      updateTimeoutRef.current = setTimeout(async () => {
        try {
          if (!window.strudel) return

          const cleanCode = patternCode
            .split('\n')
            .filter(line => !line.trim().startsWith('//'))
            .join('\n')
            .trim()

          if (!cleanCode) return

          const pattern = await window.strudel.evaluate(cleanCode)

          if (pattern) {
            window.strudel.scheduler.setPattern(pattern, true)
            currentPatternRef.current = pattern
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown error'
          console.error('Pattern update error:', message)
        }
      }, 100)
    }
  }, [patternCode])

  const playPatternRef = useRef<(() => Promise<void>) | null>(null)
  const stopPatternRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const wasPlaying = isPlayingRef.current
    isPlayingRef.current = isPlaying

    if (isPlaying && !wasPlaying && playPatternRef.current) {
      playPatternRef.current()
    } else if (!isPlaying && wasPlaying && stopPatternRef.current) {
      stopPatternRef.current()
    }
  }, [isPlaying])

  const initializeStrudel = useCallback(async () => {
    if (isInitializedRef.current) return

    try {
      addLog('Initializing Strudel engine...')

      const { initStrudel, samples, getAudioContext } = await import('@strudel/web')

      const { evaluate, scheduler } = await initStrudel()

      window.strudel = {
        evaluate,
        scheduler,
        getAudioContext,
      }

      isInitializedRef.current = true
      addLog('Strudel engine initialized successfully')

      try {
        const samplesUrl = `${window.location.origin}/samples/dirt-samples/strudel.json`
        const response = await fetch(samplesUrl, { method: 'HEAD' })

        if (response.ok) {
          addLog('Local samples detected, loading...')
          // Load strudel.json and manually register samples
          const samplesData = await fetch(samplesUrl).then((r) => r.json())
          await samples(samplesData, `${window.location.origin}/samples/dirt-samples/`)
          addLog('Local samples loaded successfully')
          showToast('Strudel ready with local samples', 'success')
        } else {
          throw new Error('Samples not found')
        }
      } catch (error) {
        console.error('Sample loading error:', error)
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


  const evaluatePattern = useCallback(async (code: string, silent = false) => {
    if (!isInitializedRef.current) {
      await initializeStrudel()
    }

    if (!window.strudel) {
      throw new Error('Strudel not initialized')
    }

    try {
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

      return pattern
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      if (!silent) {
        addLog(`Pattern evaluation error: ${message}`, 'error')
        showToast(`Pattern error: ${message}`, 'error')
      }
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

      const code = patternCodeRef.current

      if (code) {
        const wasPlaying = window.strudel.scheduler.started
        const pattern = await evaluatePattern(code, wasPlaying)

        if (pattern) {
          window.strudel.scheduler.setPattern(pattern, wasPlaying)

          if (!wasPlaying) {
            window.strudel.scheduler.start()
            showToast('Playing', 'success')
          }

          setPlaybackState('playing')
        }
      } else {
        throw new Error('No pattern code to evaluate')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      addLog(`Playback error: ${message}`, 'error')
      showToast('Failed to start playback', 'error')
      setPlaybackState('stopped')
    }
  }, [evaluatePattern, initializeStrudel, setPlaybackState, addLog, showToast])

  useEffect(() => {
    playPatternRef.current = playPattern
  }, [playPattern])

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
    stopPatternRef.current = stopPattern
  }, [stopPattern])

  useEffect(() => {
    initializeStrudel()
  }, [initializeStrudel])

  useEffect(() => {
    if (!isInitializedRef.current) return

    if (window.strudel?.getAudioContext) {
      try {
        const audioContext = window.strudel.getAudioContext()
        const scheduler = window.strudel.scheduler as unknown as { gainNode?: GainNode }

        if (scheduler.gainNode) {
          scheduler.gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
          addLog(`Volume set to ${Math.round(volume * 100)}%`)
        }
      } catch (error) {
        console.error('Failed to set volume:', error)
      }
    }
  }, [volume, addLog])

  return {
    evaluatePattern,
    playPattern,
    stopPattern,
    isInitialized: isInitializedRef.current,
  }
}
