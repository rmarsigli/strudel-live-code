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

type ModifierEffects = {
  fastFactor: number
  slowFactor: number
  gain: number
  speed: number
  [key: string]: number | boolean | string | undefined
}

function applyFunctionReference(
  funcRef: { name: string; args: (number | string)[] },
  effects: ModifierEffects
): void {
  switch (funcRef.name) {
    case 'fast': {
      const factor = typeof funcRef.args[0] === 'number' ? funcRef.args[0] : 1
      effects.fastFactor *= factor
      break
    }
    case 'slow': {
      const factor = typeof funcRef.args[0] === 'number' ? funcRef.args[0] : 1
      effects.slowFactor *= factor
      break
    }
    case 'gain':
    case 'velocity': {
      const value = typeof funcRef.args[0] === 'number' ? funcRef.args[0] : 1
      effects.gain *= value
      break
    }
    case 'speed': {
      const value = typeof funcRef.args[0] === 'number' ? funcRef.args[0] : 1
      effects.speed *= value
      break
    }
    case 'lpf':
    case 'hpf':
    case 'bandf':
    case 'crush':
    case 'distort':
    case 'coarse': {
      const value = typeof funcRef.args[0] === 'number' ? funcRef.args[0] : 0
      effects[funcRef.name] = value
      break
    }
    case 'rev':
      effects.rev = true
      break
    case 'palindrome':
      effects.palindrome = true
      break
    case 'degrade':
      effects.degrade = 0.5
      break
    case 'degradeBy': {
      const prob = typeof funcRef.args[0] === 'number' ? funcRef.args[0] : 0.5
      effects.degrade = prob
      break
    }
  }
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

  function traverseNode(node: PatternNode, baseTime: number = 0, baseDuration: number = 1, modifiers: AudioEvent['effects'] = {}, transformations: { rev?: boolean; palindrome?: boolean; iter?: number; degrade?: number } = {}): void {
    let gain = 1.0
    let speed = 1.0
    let fastFactor = 1
    let slowFactor = 1
    let plyFactor = 1
    const effects = { ...modifiers }
    const transforms = { ...transformations }

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
            fastFactor *= factor
            break
          }
          case 'slow': {
            const factor = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            slowFactor *= factor
            break
          }
          case 'ply': {
            const repeats = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            plyFactor *= repeats
            break
          }
          case 'rev':
            transforms.rev = true
            break
          case 'palindrome':
            transforms.palindrome = true
            break
          case 'iter': {
            const n = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            transforms.iter = n
            break
          }
          case 'degrade':
            transforms.degrade = 0.5
            break
          case 'degradeBy': {
            const prob = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0.5
            transforms.degrade = prob
            break
          }
          case 'append':
          case 'fastAppend':
          case 'slowAppend':
          case 'overlay':
          case 'layer':
          case 'superimpose': {
            const patternArg = modifier.args[0]
            if (patternArg && typeof patternArg === 'object' && 'type' in patternArg) {
              const additionalEvents: AudioEvent[] = []
              const tempEvents = events
              traverseNode(patternArg as PatternNode, baseTime, baseDuration, effects, {})
              const newEvents = events.slice(tempEvents.length)

              if (modifier.name === 'append' || modifier.name === 'fastAppend' || modifier.name === 'slowAppend') {
                const maxTime = Math.max(...events.map(e => e.time + e.duration), 0)
                for (const evt of newEvents) {
                  additionalEvents.push({
                    ...evt,
                    time: evt.time + maxTime
                  })
                }
              } else {
                additionalEvents.push(...newEvents)
              }

              events.push(...additionalEvents)
            }
            break
          }
          case 'sometimes': {
            const funcRef = modifier.args[0]
            if (funcRef && typeof funcRef === 'object' && 'name' in funcRef && Math.random() < 0.5) {
              const tempEffects: ModifierEffects = { fastFactor, slowFactor, gain, speed }
              applyFunctionReference(funcRef as { name: string; args: (number | string)[] }, tempEffects)
              fastFactor = tempEffects.fastFactor
              slowFactor = tempEffects.slowFactor
              gain = tempEffects.gain
              speed = tempEffects.speed
              Object.assign(effects, tempEffects)
            }
            break
          }
          case 'often': {
            const funcRef = modifier.args[0]
            if (funcRef && typeof funcRef === 'object' && 'name' in funcRef && Math.random() < 0.75) {
              const tempEffects: ModifierEffects = { fastFactor, slowFactor, gain, speed }
              applyFunctionReference(funcRef as { name: string; args: (number | string)[] }, tempEffects)
              fastFactor = tempEffects.fastFactor
              slowFactor = tempEffects.slowFactor
              gain = tempEffects.gain
              speed = tempEffects.speed
              Object.assign(effects, tempEffects)
            }
            break
          }
          case 'rarely': {
            const funcRef = modifier.args[0]
            if (funcRef && typeof funcRef === 'object' && 'name' in funcRef && Math.random() < 0.25) {
              const tempEffects: ModifierEffects = { fastFactor, slowFactor, gain, speed }
              applyFunctionReference(funcRef as { name: string; args: (number | string)[] }, tempEffects)
              fastFactor = tempEffects.fastFactor
              slowFactor = tempEffects.slowFactor
              gain = tempEffects.gain
              speed = tempEffects.speed
              Object.assign(effects, tempEffects)
            }
            break
          }
          case 'almostNever': {
            const funcRef = modifier.args[0]
            if (funcRef && typeof funcRef === 'object' && 'name' in funcRef && Math.random() < 0.1) {
              const tempEffects: ModifierEffects = { fastFactor, slowFactor, gain, speed }
              applyFunctionReference(funcRef as { name: string; args: (number | string)[] }, tempEffects)
              fastFactor = tempEffects.fastFactor
              slowFactor = tempEffects.slowFactor
              gain = tempEffects.gain
              speed = tempEffects.speed
              Object.assign(effects, tempEffects)
            }
            break
          }
          case 'almostAlways': {
            const funcRef = modifier.args[0]
            if (funcRef && typeof funcRef === 'object' && 'name' in funcRef && Math.random() < 0.9) {
              const tempEffects: ModifierEffects = { fastFactor, slowFactor, gain, speed }
              applyFunctionReference(funcRef as { name: string; args: (number | string)[] }, tempEffects)
              fastFactor = tempEffects.fastFactor
              slowFactor = tempEffects.slowFactor
              gain = tempEffects.gain
              speed = tempEffects.speed
              Object.assign(effects, tempEffects)
            }
            break
          }
          case 'never':
            break
          case 'always': {
            const funcRef = modifier.args[0]
            if (funcRef && typeof funcRef === 'object' && 'name' in funcRef) {
              const tempEffects: ModifierEffects = { fastFactor, slowFactor, gain, speed }
              applyFunctionReference(funcRef as { name: string; args: (number | string)[] }, tempEffects)
              fastFactor = tempEffects.fastFactor
              slowFactor = tempEffects.slowFactor
              gain = tempEffects.gain
              speed = tempEffects.speed
              Object.assign(effects, tempEffects)
            }
            break
          }
          case 'stut':
          case 'every':
          case 'whenmod':
          case 'someCycles':
          case 'someCyclesBy':
          case 'off':
          case 'jux':
          case 'juxBy':
          case 'note':
          case 'n': {
            const noteValue = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            effects.note = noteValue
            break
          }
          case 'freq': {
            const freqValue = typeof modifier.args[0] === 'number' ? modifier.args[0] : 440
            effects.freq = freqValue
            break
          }
          case 'scale': {
            const scaleName = typeof modifier.args[0] === 'string' ? modifier.args[0] : 'major'
            effects.scale = scaleName
            break
          }
          case 'chord': {
            const chordName = typeof modifier.args[0] === 'string' ? modifier.args[0] : 'major'
            effects.chord = chordName
            break
          }
          case 'arp':
          case 'arpeggiate': {
            effects.arp = true
            break
          }
          case 'add': {
            const value = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            effects.add = value
            break
          }
          case 'sub': {
            const value = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            effects.sub = value
            break
          }
          case 'mul': {
            const value = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            effects.mul = value
            break
          }
          case 'div': {
            const value = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            effects.div = value
            break
          }
          case 'legato':
          case 'sustain':
          case 'hold': {
            const value = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            effects.legato = value
            break
          }
          case 'orbit': {
            const value = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            effects.orbit = value
            break
          }
          case 'struct':
          case 'mask': {
            const pattern = typeof modifier.args[0] === 'string' ? modifier.args[0] : ''
            effects.struct = pattern
            break
          }
          case 'shuffle': {
            const n = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            effects.shuffle = n
            break
          }
          case 'scramble': {
            const n = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            effects.scramble = n
            break
          }
          case 'rot': {
            const n = typeof modifier.args[0] === 'number' ? modifier.args[0] : 0
            effects.rot = n
            break
          }
          case 'swingBy':
          case 'swing': {
            const amount = modifier.name === 'swingBy' && typeof modifier.args[0] === 'number' ? modifier.args[0] : 0.5
            effects.swing = amount
            break
          }
          case 'ghost': {
            effects.ghost = true
            break
          }
          case 'quantize': {
            const n = typeof modifier.args[0] === 'number' ? modifier.args[0] : 1
            effects.quantize = n
            break
          }
          case 'chunk':
          case 'segment':
          case 'bite':
          case 'chop':
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
          case 'press':
          case 'fit':
          case 'inhabit':
          case 'splice':
          case 'weave':
            break
        }
      }
    }

    const timingMultiplier = (fastFactor / slowFactor) * plyFactor
    const adjustedDuration = baseDuration / (fastFactor / slowFactor)

    switch (node.type) {
      case 'sound':
      case 'sample_select': {
        if (!node.value) break

        if (timingMultiplier > 1) {
          for (let i = 0; i < timingMultiplier; i++) {
            events.push({
              sound: node.value,
              time: baseTime + node.position + (i * adjustedDuration * node.duration),
              duration: node.duration * adjustedDuration,
              type: detectSoundType(node.value),
              gain,
              speed,
              effects,
              probability: node.weight ? node.weight / 10 : 1.0,
              sampleIndex: node.sampleIndex
            })
          }
        } else {
          events.push({
            sound: node.value,
            time: baseTime + node.position,
            duration: node.duration * adjustedDuration,
            type: detectSoundType(node.value),
            gain,
            speed,
            effects,
            probability: node.weight ? node.weight / 10 : 1.0,
            sampleIndex: node.sampleIndex
          })
        }
        break
      }

      case 'silence':
        break

      case 'sequence':
      case 'subgroup':
      case 'repetition': {
        if (node.children) {
          let children = [...node.children]

          if (transforms.rev) {
            children = children.reverse()
          }

          if (transforms.palindrome) {
            children = [...children, ...children.slice().reverse()]
          }

          if (transforms.iter && transforms.iter > 1) {
            const original = [...node.children]
            children = []
            for (let i = 0; i < transforms.iter; i++) {
              const rotated = [...original.slice(i), ...original.slice(0, i)]
              children.push(...rotated)
            }
          }

          if (timingMultiplier > 1) {
            const originalChildren = [...children]
            children = []
            for (let i = 0; i < timingMultiplier; i++) {
              children.push(...originalChildren)
            }
          }

          let timeOffset = 0
          const childDuration = adjustedDuration / (timingMultiplier > 1 ? timingMultiplier : 1)

          for (const child of children) {
            if (transforms.degrade && Math.random() < (transforms.degrade || 0)) {
              timeOffset += childDuration
              continue
            }
            traverseNode(child, baseTime + timeOffset, childDuration, effects, {})
            timeOffset += childDuration
          }
        }
        break
      }

      case 'alternation': {
        if (node.children && node.children.length > 0) {
          const cycleIndex = Math.floor(baseTime / adjustedDuration) % node.children.length
          const selectedChild = node.children[cycleIndex]
          if (selectedChild) {
            traverseNode(selectedChild, baseTime, adjustedDuration, effects, {})
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
              duration: stepDuration * adjustedDuration,
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
            traverseNode(child, baseTime, adjustedDuration, effects, {})
          }
        }
        break
      }

      case 'cat': {
        if (node.children) {
          const stepDuration = adjustedDuration / node.children.length
          let currentTime = baseTime

          for (const child of node.children) {
            traverseNode(child, currentTime, stepDuration, effects, {})
            currentTime += stepDuration
          }
        }
        break
      }

      case 'slowcat': {
        if (node.children) {
          const cycleIndex = Math.floor(baseTime / adjustedDuration) % node.children.length
          const selectedChild = node.children[cycleIndex]
          if (selectedChild) {
            traverseNode(selectedChild, baseTime, adjustedDuration, effects, {})
          }
        }
        break
      }

      case 'fastcat': {
        if (node.children) {
          const stepDuration = adjustedDuration / node.children.length
          let currentTime = baseTime

          for (const child of node.children) {
            traverseNode(child, currentTime, stepDuration, effects, {})
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

