import type { PatternNode, AudioEvent, SoundType } from '../types/strudel-ast'

/**
 * Detects the type of sound based on its name
 *
 * Categorizes drum samples and synth sounds into types for visual rendering.
 * This helps the visualizer display different colors/heights for different instruments.
 *
 * @param sound - The sound name (e.g., 'bd', 'sd', 'hh', 'bass', 'sawtooth')
 * @returns The sound type category
 *
 * @internal
 *
 * @example
 * ```ts
 * detectSoundType('bd') // returns 'kick'
 * detectSoundType('sd') // returns 'snare'
 * detectSoundType('hh') // returns 'hihat'
 * detectSoundType('bass') // returns 'bass'
 * detectSoundType('unknown') // returns 'other'
 * ```
 */
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

/**
 * Generates a Euclidean rhythm pattern
 *
 * Euclidean rhythms distribute pulses as evenly as possible across a number of steps.
 * This creates musically interesting polyrhythmic patterns.
 *
 * @param pulses - Number of hits/pulses in the rhythm
 * @param steps - Total number of steps in the pattern
 * @returns Boolean array where true = hit, false = rest
 *
 * @internal
 *
 * @example
 * ```ts
 * generateEuclideanRhythm(3, 8)
 * // Returns: [true, false, false, true, false, false, true, false]
 * // Represents the pattern: x..x..x.
 * ```
 *
 * @example
 * ```ts
 * generateEuclideanRhythm(5, 8)
 * // Returns: [true, false, true, true, false, true, true, false]
 * // Represents the pattern: x.xx.xx.
 * ```
 */
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

/**
 * Interprets an AST into audio events for visualization
 *
 * This is the main interpreter function that traverses the AST and generates
 * timed audio events that can be visualized. Each event contains:
 * - Sound name and type
 * - Timing information (when it plays and for how long)
 * - Audio parameters (gain, speed, effects)
 * - Sample index (for sample banks)
 *
 * @param ast - The pattern AST to interpret (from parser)
 * @param _cps - Cycles per second / tempo (currently unused, reserved for future)
 * @returns Array of AudioEvent objects sorted by time, ready for visualization
 *
 * @example
 * ```ts
 * const ast = parse('s("bd sd hh")')
 * const events = interpret(ast.ast)
 * // Returns: [
 * //   { sound: 'bd', time: 0, duration: 0.33, type: 'kick', ... },
 * //   { sound: 'sd', time: 0.33, duration: 0.33, type: 'snare', ... },
 * //   { sound: 'hh', time: 0.66, duration: 0.33, type: 'hihat', ... }
 * // ]
 * ```
 *
 * @example
 * ```ts
 * const ast = parse('s("bd").gain(0.5).fast(2)')
 * const events = interpret(ast.ast)
 * // Events will have gain=0.5 and adjusted duration from fast(2)
 * ```
 */
export function interpret(ast: PatternNode | null, _cps: number = 0.5): AudioEvent[] {
  if (!ast) return []

  const events: AudioEvent[] = []

  function traverseNode(node: PatternNode, baseTime: number = 0, baseDuration: number = 1, modifiers: AudioEvent['effects'] = {}): void {
    let gain = 1.0
    let speed = 1.0
    const effects = { ...modifiers }

    if (node.modifiers) {
      for (const modifier of node.modifiers) {
        switch (modifier.name) {
          case 'cpm':
          case 'bpm':
            break
          case 'gain':
          case 'velocity':
            gain *= typeof modifier.args[0] === 'number' ? modifier.args[0] : 1.0
            break
          case 'speed':
          case 'hurry':
          case 'accelerate':
            speed *= typeof modifier.args[0] === 'number' ? modifier.args[0] : 1.0
            break
          case 'pitch':
            effects.pitch = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'octave':
            effects.octave = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'delay':
          case 'echo':
            effects.delay = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'room':
            effects.reverb = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'tremolo':
            effects.tremolo = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'phaser':
            effects.phaser = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'chorus':
            effects.chorus = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'cut':
            effects.cut = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'lpf':
          case 'lcutoff':
            effects.lpf = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'hpf':
          case 'hcutoff':
            effects.hpf = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'bandf':
          case 'cutoff':
            effects.bandf = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'resonance':
            effects.resonance = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'djf':
            effects.djf = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'vowel':
            effects.vowel = typeof modifier.args[0] === 'string' ? modifier.args[0] : 'a'
            break
          case 'crush':
            effects.crush = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'distort':
            effects.distort = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'coarse':
            effects.coarse = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            break
          case 'pan':
            effects.pan = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
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
          case 'ply': {
            const repeats = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            baseDuration = baseDuration / repeats
            break
          }
          case 'stut':
          case 'every':
          case 'whenmod':
          case 'sometimes':
          case 'often':
          case 'rarely':
          case 'almostNever':
          case 'almostAlways':
          case 'never':
          case 'always':
          case 'someCycles':
          case 'someCyclesBy':
          case 'off':
          case 'jux':
          case 'juxBy':
          case 'rev':
          case 'palindrome':
          case 'iter':
          case 'degrade':
          case 'degradeBy':
          case 'chunk':
          case 'segment':
          case 'bite':
          case 'chop':
          case 'add':
          case 'sub':
          case 'mul':
          case 'div':
          case 'scale':
          case 'chord':
          case 'arp':
          case 'arpeggiate':
          case 'note':
          case 'n':
          case 'freq':
          case 'legato':
          case 'sustain':
          case 'hold':
          case 'orbit':
          case 'struct':
          case 'mask':
          case 'euclid':
          case 'euclidLegato':
          case 'euclidRot':
          case 'inside':
          case 'outside':
          case 'compress':
          case 'focus':
          case 'zoom':
          case 'fastGap':
          case 'range':
          case 'rangex':
          case 'saw':
          case 'sine':
          case 'square':
          case 'tri':
          case 'rand':
          case 'irand':
          case 'perlin':
          case 'choose':
          case 'wchoose':
          case 'shuffle':
          case 'scramble':
          case 'rot':
          case 'swingBy':
          case 'swing':
          case 'ghost':
          case 'press':
          case 'fit':
          case 'quantize':
          case 'inhabit':
          case 'splice':
          case 'weave':
            break
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

      case 'cat': {
        if (node.children) {
          const stepDuration = baseDuration / node.children.length
          let currentTime = baseTime

          for (const child of node.children) {
            traverseNode(child, currentTime, stepDuration, effects)
            currentTime += stepDuration
          }
        }
        break
      }

      case 'slowcat': {
        if (node.children) {
          const cycleIndex = Math.floor(baseTime / baseDuration) % node.children.length
          const selectedChild = node.children[cycleIndex]
          if (selectedChild) {
            traverseNode(selectedChild, baseTime, baseDuration, effects)
          }
        }
        break
      }

      case 'fastcat': {
        if (node.children) {
          const stepDuration = baseDuration / node.children.length
          let currentTime = baseTime

          for (const child of node.children) {
            traverseNode(child, currentTime, stepDuration, effects)
            currentTime += stepDuration
          }
        }
        break
      }
    }
  }

  traverseNode(ast)

  return events.sort((a, b) => a.time - b.time)
}
