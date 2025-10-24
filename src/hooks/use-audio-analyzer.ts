import { useEffect, useState, useRef } from 'react'
import { useStrudel } from '@/store'

export function useAudioAnalyzer() {
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null)
  const analyzerRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const isConnectedRef = useRef(false)
  const { isPlaying } = useStrudel()

  useEffect(() => {
    if (!window.strudel?.getAudioContext) return

    try {
      const audioContext = window.strudel.getAudioContext()

      if (!analyzerRef.current) {
        const analyzer = audioContext.createAnalyser()
        analyzer.fftSize = 128
        analyzer.smoothingTimeConstant = 0.75
        analyzer.connect(audioContext.destination)

        const scheduler = window.strudel.scheduler as unknown as { gainNode?: GainNode }

        if (scheduler.gainNode && !isConnectedRef.current) {
          scheduler.gainNode.disconnect()
          scheduler.gainNode.connect(analyzer)
          isConnectedRef.current = true
        }

        analyzerRef.current = analyzer
      }

      const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount)

      const updateFrequencyData = () => {
        if (analyzerRef.current) {
          analyzerRef.current.getByteFrequencyData(dataArray)
          if (isPlaying) {
            setFrequencyData(new Uint8Array(dataArray))
          }
        }

        animationFrameRef.current = requestAnimationFrame(updateFrequencyData)
      }

      updateFrequencyData()

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    } catch (error) {
      console.error('Failed to initialize audio analyzer:', error)
      return undefined
    }
  }, [isPlaying])

  return frequencyData
}
