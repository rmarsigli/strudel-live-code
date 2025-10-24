import { useEffect, useState, useRef } from 'react'
import { parse } from '../lib/strudel-parser'
import { interpret } from '../lib/strudel-interpreter'
import type { AudioEvent, ParseResult } from '../types/strudel-ast'

export interface StrudelVisualizerOptions {
  code: string
  isPlaying: boolean
  cps?: number
  fftSize?: number
  smoothingFactor?: number
  decayRate?: number
}

export interface EventImpact {
  time: number
  type: AudioEvent['type']
  decay: number
  gain: number
  effects: AudioEvent['effects']
}

export function useStrudelVisualizer(options: StrudelVisualizerOptions) {
  const {
    code,
    isPlaying,
    cps = 0.5,
    fftSize = 128,
    smoothingFactor = 0.85,
    decayRate = 2.5
  } = options

  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null)
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [events, setEvents] = useState<AudioEvent[]>([])

  const animationFrameRef = useRef<number | undefined>(undefined)
  const eventsRef = useRef<EventImpact[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    try {
      const result = parse(code)
      setParseResult(result)

      if (result.success && result.ast) {
        const parsedEvents = interpret(result.ast, cps)
        setEvents(parsedEvents)
      } else {
        setEvents([])
      }
    } catch (error) {
      console.error('[StrudelVisualizer] Parse error:', error)
      setEvents([])
      setParseResult({
        ast: null,
        errors: [{
          message: error instanceof Error ? error.message : 'Unknown error',
          token: { type: 'EOF', value: '', position: 0, line: 0, column: 0 },
          position: 0
        }],
        success: false
      })
    }
  }, [code, cps])

  useEffect(() => {
    if (!isPlaying) {
      setFrequencyData(null)
      return
    }

    const dataArray = new Uint8Array(fftSize)

    const updateFrequencyData = () => {
      if (isPlaying) {
        const currentTime = timeRef.current
        const cycle = currentTime * cps
        const cycleFrac = cycle % 1

        for (const parsedEvent of events) {
          const eventStart = parsedEvent.time
          const eventEnd = parsedEvent.time + parsedEvent.duration

          if (cycleFrac >= eventStart && cycleFrac < eventEnd) {
            const isNewTrigger = !eventsRef.current.some(
              e => Math.abs(e.time - currentTime) < 0.05
            )

            if (isNewTrigger) {
              const impactStrength = parsedEvent.type === 'kick' ? 1.0 :
                                   parsedEvent.type === 'snare' ? 0.8 :
                                   parsedEvent.type === 'hihat' ? 0.6 : 0.7

              eventsRef.current.push({
                time: currentTime,
                type: parsedEvent.type,
                decay: impactStrength,
                gain: parsedEvent.gain,
                effects: parsedEvent.effects
              })

              if (eventsRef.current.length > 20) {
                eventsRef.current.shift()
              }
            }
          }
        }

        timeRef.current += 0.016

        const now = currentTime
        eventsRef.current = eventsRef.current.filter(e => now - e.time < 0.4)

        for (let i = 0; i < dataArray.length; i++) {
          const freq = i / dataArray.length

          let eventEnergy = 0
          for (const event of eventsRef.current) {
            const age = now - event.time
            const decayFactor = Math.max(0, 1 - age * decayRate)
            const gainMultiplier = event.gain
            const effectsMultiplier = 1 + (event.effects.delay || 0) * 0.3 + (event.effects.reverb || 0) * 0.2

            if (event.type === 'kick') {
              eventEnergy += freq < 0.25 ? decayFactor * event.decay * gainMultiplier * 200 :
                           freq < 0.5 ? decayFactor * event.decay * gainMultiplier * 80 : 0
            } else if (event.type === 'snare') {
              eventEnergy += freq > 0.2 && freq < 0.7 ? decayFactor * event.decay * gainMultiplier * 160 : 0
            } else if (event.type === 'hihat') {
              eventEnergy += freq > 0.55 ? decayFactor * event.decay * gainMultiplier * 140 : 0
            } else if (event.type === 'bass') {
              eventEnergy += freq < 0.35 ? decayFactor * event.decay * gainMultiplier * 150 : 0
            } else if (event.type === 'synth') {
              eventEnergy += freq > 0.35 && freq < 0.8 ? decayFactor * event.decay * gainMultiplier * 140 : 0
            } else if (event.type === 'perc') {
              eventEnergy += freq > 0.3 && freq < 0.7 ? decayFactor * event.decay * gainMultiplier * 130 : 0
            } else if (event.type === 'fx') {
              eventEnergy += freq > 0.4 ? decayFactor * event.decay * gainMultiplier * 120 : 0
            } else {
              eventEnergy += decayFactor * event.decay * gainMultiplier * 110
            }

            eventEnergy *= effectsMultiplier
          }

          const time = timeRef.current
          const bass = Math.sin(time * 1.2 + freq * Math.PI) * 0.25 + 0.35
          const mid = Math.sin(time * 2.5 + freq * Math.PI * 2) * 0.2 + 0.25
          const high = Math.sin(time * 4 + freq * Math.PI * 3) * 0.15 + 0.2

          const freqRolloff = Math.pow(1 - freq, 0.6)

          const baseEnergy = (bass * 0.35 + mid * 0.3 + high * 0.2) * freqRolloff * 100
          const combined = baseEnergy + eventEnergy
          const variation = Math.random() * 12

          dataArray[i] = Math.min(255, Math.max(0, combined + variation))
        }

        setFrequencyData(new Uint8Array(dataArray))
      }

      animationFrameRef.current = requestAnimationFrame(updateFrequencyData)
    }

    updateFrequencyData()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, events, cps, fftSize, decayRate, smoothingFactor])

  return {
    frequencyData,
    parseResult,
    events,
    hasErrors: parseResult ? !parseResult.success : false,
    errorCount: parseResult?.errors.length || 0
  }
}
