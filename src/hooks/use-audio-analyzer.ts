import { useEffect, useState, useRef } from 'react'
import { useStrudel } from '@/store'
import { useStrudelAnalyzer } from './use-strudel-analyzer'
import type { AudioEvent } from '@/types/strudel-ast'

interface EventImpact {
  time: number
  type: AudioEvent['type']
  decay: number
  gain: number
  effects: AudioEvent['effects']
}

export function useAudioAnalyzer() {
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const eventsRef = useRef<EventImpact[]>([])
  const { isPlaying } = useStrudel()
  const { events: parsedEvents } = useStrudelAnalyzer()

  useEffect(() => {
    const dataArray = new Uint8Array(128)
    let time = 0

    const updateFrequencyData = () => {
      if (isPlaying) {
        const scheduler = window.strudel?.scheduler as unknown as {
          cps?: number
          getTime?: () => number
        }

        const cps = scheduler?.cps || 0.5
        const currentTime = scheduler?.getTime?.() || time
        const cycle = currentTime * cps
        const cycleFrac = cycle % 1

        for (const parsedEvent of parsedEvents) {
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

        time += 0.016

        const now = currentTime
        eventsRef.current = eventsRef.current.filter(e => now - e.time < 0.4)

        for (let i = 0; i < dataArray.length; i++) {
          const freq = i / dataArray.length

          let eventEnergy = 0
          for (const event of eventsRef.current) {
            const age = now - event.time
            const decayFactor = Math.max(0, 1 - age * 2.5)
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
  }, [isPlaying, parsedEvents])

  return isPlaying ? frequencyData : null
}
