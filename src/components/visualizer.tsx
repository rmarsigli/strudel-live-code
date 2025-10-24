import { useEffect, useRef } from 'react'
import { useStrudel } from '@/store'

export function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const { isPlaying } = useStrudel()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    const bars: number[] = new Array(64).fill(0).map(() => Math.random())

    const draw = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.fillStyle = 'rgba(10, 14, 26, 0.2)'
      ctx.fillRect(0, 0, width, height)

      if (isPlaying) {
        const barWidth = width / bars.length
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, '#00ff88')
        gradient.addColorStop(1, '#00ffff')

        bars.forEach((value, index) => {
          const barHeight = value * height * 0.8
          const x = index * barWidth
          const y = height - barHeight

          ctx.fillStyle = gradient
          ctx.fillRect(x, y, barWidth - 2, barHeight)

          bars[index] = Math.max(0, value * 0.95 + Math.random() * 0.15)
        })
      } else {
        bars.forEach((_, index) => {
          bars[index] = Math.max(0, bars[index]! * 0.9)
        })

        const barWidth = width / bars.length
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, '#334155')
        gradient.addColorStop(1, '#1e293b')

        bars.forEach((value, index) => {
          const barHeight = value * height * 0.8
          const x = index * barWidth
          const y = height - barHeight

          ctx.fillStyle = gradient
          ctx.fillRect(x, y, barWidth - 2, barHeight)
        })
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
