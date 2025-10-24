import { useEffect, useRef } from 'react'
import { useStrudelVisualizer, type StrudelVisualizerOptions } from '../hooks/use-strudel-visualizer'

export interface StrudelVisualizerProps extends StrudelVisualizerOptions {
  width?: number | string
  height?: number | string
  barCount?: number
  barColor?: string
  barColorPlaying?: string
  backgroundColor?: string
  className?: string
  style?: React.CSSProperties
}

export function StrudelVisualizer(props: StrudelVisualizerProps) {
  const {
    width = '100%',
    height = '100%',
    barCount = 64,
    barColor = '#334155',
    barColorPlaying = '#00ff88',
    backgroundColor = '#0a0e1a',
    className,
    style,
    ...visualizerOptions
  } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const barsRef = useRef<number[]>(new Array(barCount).fill(0))

  const { frequencyData, hasErrors, errorCount } = useStrudelVisualizer(visualizerOptions)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.fillStyle = `${backgroundColor}33`
      ctx.fillRect(0, 0, w, h)

      const bars = barsRef.current

      if (visualizerOptions.isPlaying && frequencyData) {
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

      const barWidth = w / bars.length
      const gradient = ctx.createLinearGradient(0, 0, 0, h)

      if (visualizerOptions.isPlaying) {
        const colors = barColorPlaying.split(',')
        if (colors.length > 1) {
          gradient.addColorStop(0, colors[0]?.trim() || barColorPlaying)
          gradient.addColorStop(1, colors[1]?.trim() || barColorPlaying)
        } else {
          gradient.addColorStop(0, barColorPlaying)
          gradient.addColorStop(1, barColorPlaying)
        }
      } else {
        const colors = barColor.split(',')
        if (colors.length > 1) {
          gradient.addColorStop(0, colors[0]?.trim() || barColor)
          gradient.addColorStop(1, colors[1]?.trim() || barColor)
        } else {
          gradient.addColorStop(0, barColor)
          gradient.addColorStop(1, barColor)
        }
      }

      for (let i = 0; i < bars.length; i++) {
        const value = bars[i] || 0
        const minBarHeight = visualizerOptions.isPlaying ? 2 : 1
        const barHeight = Math.max(minBarHeight, value * h * 0.8)
        const x = i * barWidth
        const y = h - barHeight

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
  }, [
    visualizerOptions.isPlaying,
    frequencyData,
    barCount,
    barColor,
    barColorPlaying,
    backgroundColor
  ])

  return (
    <div
      className={className}
      style={{
        width,
        height,
        backgroundColor,
        position: 'relative',
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      {hasErrors && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '4px 8px',
            backgroundColor: 'rgba(239, 68, 68, 0.9)',
            color: 'white',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 500
          }}
        >
          {errorCount} parse error{errorCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
