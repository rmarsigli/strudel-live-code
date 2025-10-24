import { useEffect, useRef } from 'react'
import { useStrudel } from '@/store'

export function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const barsRef = useRef<number[]>(new Array(64).fill(0))
  const { isPlaying } = useStrudel()

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
      const time = Date.now() / 1000

      if (isPlaying && window.strudel?.scheduler?.started) {
        const bpm = 120
        const beatTime = (60 / bpm) * 4
        const phase = (time % beatTime) / beatTime

        for (let i = 0; i < bars.length; i++) {
          const freq = (i / bars.length) * 8
          const wave = Math.sin(time * freq + phase * Math.PI * 2) * 0.5 + 0.5
          const kick = i < 8 ? Math.max(0, 1 - phase * 4) : 0
          const hihat = i > bars.length - 16 ? (Math.sin(time * 16) * 0.5 + 0.5) : 0

          const newValue = Math.min(1, (wave * 0.3 + kick * 0.5 + hihat * 0.4) * (Math.random() * 0.2 + 0.9))
          bars[i] = Math.max(newValue, (bars[i] || 0) * 0.85)
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
  }, [isPlaying])

  return (
    <div className="h-full w-full bg-[#0a0e1a]">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
