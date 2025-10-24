import type { PatternNode, AudioEvent, SoundType } from '../types/strudel-ast'

function detectSoundType(sound: string): SoundType {
  const s = sound.toLowerCase()

  if (s.includes('bd') || s.includes('kick')) return 'kick'
  if (s.includes('sd') || s.includes('snare') || s.includes('cp')) return 'snare'
  if (s.includes('hh') || s.includes('hat') || s.includes('oh') || s.includes('ch')) return 'hihat'
  if (s.includes('bass')) return 'bass'
  if (s.includes('sawtooth') || s.includes('square') || s.includes('sine') || s.includes('triangle')) return 'synth'
  if (s.includes('perc') || s.includes('tom') || s.includes('rim')) return 'perc'
  if (s.includes('crash') || s.includes('ride') || s.includes('bell')) return 'fx'

  return 'other'
}

function generateEuclideanRhythm(pulses: number, steps: number): boolean[] {
  if (pulses >= steps) {
    return new Array(steps).fill(true)
  }

  const pattern: boolean[] = new Array(steps).fill(false)
  const bucket: number[] = new Array(steps).fill(0)

  for (let i = 0; i < steps; i++) {
    bucket[i] = Math.floor((i * pulses) / steps)
  }

  let prev = -1
  for (let i = 0; i < steps; i++) {
    const currentBucket = bucket[i]
    if (currentBucket !== undefined && currentBucket !== prev) {
      pattern[i] = true
      prev = currentBucket
    }
  }

  return pattern
}

export function interpret(ast: PatternNode | null, _cps: number = 0.5): AudioEvent[] {
  if (!ast) return []

  const events: AudioEvent[] = []
  const _globalCpm: number | null = null

  function traverseNode(node: PatternNode, baseTime: number = 0, baseDuration: number = 1, modifiers: AudioEvent['effects'] = {}): void {
    let gain = 1.0
    let speed = 1.0
    let effects = { ...modifiers }

    if (node.modifiers) {
      for (const modifier of node.modifiers) {
        switch (modifier.name) {
          case 'cpm': {
            break
          }
          case 'gain':
            gain = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1.0
            break
          case 'speed':
            speed = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1.0
            break
          case 'delay':
            effects.delay = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'room':
            effects.reverb = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'cut':
            effects.cut = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'fast': {
            const factor = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            baseDuration = baseDuration / factor
            break
          }
          case 'slow': {
            const factor = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            baseDuration = baseDuration * factor
            break
          }
        }
      }
    }

    switch (node.type) {
      case 'sound':
      case 'sample_select': {
        if (!node.value) break

        events.push({
          sound: node.value,
          time: baseTime + node.position,
          duration: node.duration * baseDuration,
          type: detectSoundType(node.value),
          gain,
          speed,
          effects,
          probability: node.weight ? node.weight / 10 : 1.0,
          sampleIndex: node.sampleIndex
        })
        break
      }

      case 'silence':
        break

      case 'sequence':
      case 'subgroup':
      case 'repetition': {
        if (node.children) {
          for (const child of node.children) {
            traverseNode(child, baseTime, baseDuration, effects)
          }
        }
        break
      }

      case 'alternation': {
        if (node.children && node.children.length > 0) {
          const cycleIndex = Math.floor(baseTime / baseDuration) % node.children.length
          const selectedChild = node.children[cycleIndex]
          if (selectedChild) {
            traverseNode(selectedChild, baseTime, baseDuration, effects)
          }
        }
        break
      }

      case 'euclidean': {
        if (!node.value || !node.euclidean) break

        const { pulses, steps } = node.euclidean
        const rhythm = generateEuclideanRhythm(pulses, steps)
        const stepDuration = node.duration / steps

        for (let i = 0; i < steps; i++) {
          if (rhythm[i]) {
            events.push({
              sound: node.value,
              time: baseTime + node.position + (i * stepDuration),
              duration: stepDuration * baseDuration,
              type: detectSoundType(node.value),
              gain,
              speed,
              effects,
              probability: 1.0
            })
          }
        }
        break
      }

      case 'stack': {
        if (node.children) {
          for (const child of node.children) {
            traverseNode(child, baseTime, baseDuration, effects)
          }
        }
        break
      }
    }
  }

  traverseNode(ast)

  return events.sort((a, b) => a.time - b.time)
}
