import { useEffect, useRef } from 'react'
import { useStrudel } from '@/store'
import { useAudioAnalyzer } from '@/hooks/use-audio-analyzer'

export function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const barsRef = useRef<number[]>(new Array(64).fill(0))
  const { isPlaying } = useStrudel()
  const frequencyData = useAudioAnalyzer()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      console.log('Canvas resized:', { width, height, dpr: window.devicePixelRatio })
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.fillStyle = 'rgba(10, 14, 26, 0.2)'
      ctx.fillRect(0, 0, width, height)

      const bars = barsRef.current

      if (isPlaying && frequencyData) {
        for (let i = 0; i < bars.length; i++) {
          const dataIndex = Math.floor((i / bars.length) * frequencyData.length)
          const value = (frequencyData[dataIndex] || 0) / 255

          bars[i] = Math.max(value, (bars[i] || 0) * 0.85)
        }
      } else {
        for (let i = 0; i < bars.length; i++) {
          bars[i] = (bars[i] || 0) * 0.92
        }
      }

      const barCount = bars.length
      const barWidth = width / barCount
      const gradient = ctx.createLinearGradient(0, 0, 0, height)

      if (isPlaying) {
        gradient.addColorStop(0, '#00ff88')
        gradient.addColorStop(1, '#00ffff')
      } else {
        gradient.addColorStop(0, '#334155')
        gradient.addColorStop(1, '#1e293b')
      }

      for (let i = 0; i < barCount; i++) {
        const value = bars[i] || 0
        const minBarHeight = isPlaying ? 2 : 1
        const barHeight = Math.max(minBarHeight, value * height * 0.8)
        const x = i * barWidth
        const y = height - barHeight

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth - 2, barHeight)
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, frequencyData])

  return (
    <div className="h-full w-full bg-[#0a0e1a]">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
