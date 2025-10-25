import { describe, it, expect } from 'vitest'
import { interpret } from './strudel-interpreter'
import { parse } from './strudel-parser'
import type { PatternNode } from '@/types/strudel-ast'

describe('strudel-interpreter', () => {
  describe('basic event generation', () => {
    it('should return empty array for null AST', () => {
      const events = interpret(null)

      expect(events).toEqual([])
    })

    it('should generate event for single sound', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(1)
      expect(events[0]?.sound).toBe('bd')
      expect(events[0]?.type).toBe('kick')
      expect(events[0]?.time).toBe(0)
      expect(events[0]?.duration).toBe(1)
    })

    it('should not generate events for silence', () => {
      const ast: PatternNode = {
        type: 'silence',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(0)
    })

    it('should generate events for sequence', () => {
      const ast: PatternNode = {
        type: 'sequence',
        children: [
          { type: 'sound', value: 'bd', position: 0, duration: 0.5 },
          { type: 'sound', value: 'sd', position: 0.5, duration: 0.5 }
        ],
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(2)
      expect(events[0]?.sound).toBe('bd')
      expect(events[1]?.sound).toBe('sd')
    })
  })

  describe('sound type detection', () => {
    it('should detect kick sounds', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('kick')
    })

    it('should detect kick with keyword', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'kick',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('kick')
    })

    it('should detect snare sounds', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'sd',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('snare')
    })

    it('should detect snare with keyword', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'snare',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('snare')
    })

    it('should detect hihat sounds', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'hh',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('hihat')
    })

    it('should detect hihat with oh', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'oh',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('hihat')
    })

    it('should detect bass sounds', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bass',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('bass')
    })

    it('should detect synth sounds', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'sawtooth',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('synth')
    })

    it('should detect percussion', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'perc',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('perc')
    })

    it('should detect effects', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'crash',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('fx')
    })

    it('should default to other for unknown sounds', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'unknown',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.type).toBe('other')
    })
  })

  describe('timing calculations', () => {
    it('should respect position from AST', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0.5,
        duration: 0.5
      }

      const events = interpret(ast)

      expect(events[0]?.time).toBe(0.5)
    })

    it('should respect duration from AST', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 0.25
      }

      const events = interpret(ast)

      expect(events[0]?.duration).toBe(0.25)
    })

    it('should sort events by time', () => {
      const ast: PatternNode = {
        type: 'sequence',
        children: [
          { type: 'sound', value: 'hh', position: 0.5, duration: 0.5 },
          { type: 'sound', value: 'bd', position: 0, duration: 0.5 }
        ],
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.sound).toBe('bd')
      expect(events[1]?.sound).toBe('hh')
    })
  })

  describe('modifiers', () => {
    it('should apply gain modifier', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1,
        modifiers: [{ name: 'gain', args: [0.5] }]
      }

      const events = interpret(ast)

      expect(events[0]?.gain).toBe(0.5)
    })

    it('should apply speed modifier', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1,
        modifiers: [{ name: 'speed', args: [2] }]
      }

      const events = interpret(ast)

      expect(events[0]?.speed).toBe(2)
    })

    it('should apply delay effect', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1,
        modifiers: [{ name: 'delay', args: [0.5] }]
      }

      const events = interpret(ast)

      expect(events[0]?.effects?.delay).toBe(0.5)
    })

    it('should apply reverb via room', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1,
        modifiers: [{ name: 'room', args: [0.3] }]
      }

      const events = interpret(ast)

      expect(events[0]?.effects?.reverb).toBe(0.3)
    })

    it('should create effects object for sounds', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.effects).toBeDefined()
      expect(typeof events[0]?.effects).toBe('object')
    })

    it('should apply gain modifier only once per modifier', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1,
        modifiers: [{ name: 'gain', args: [0.8] }]
      }

      const events = interpret(ast)

      expect(events[0]?.gain).toBe(0.8)
    })

    it('should apply speed modifier correctly', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1,
        modifiers: [{ name: 'speed', args: [1.5] }]
      }

      const events = interpret(ast)

      expect(events[0]?.speed).toBe(1.5)
    })
  })

  describe('fast/slow modifiers', () => {
    it('should modify duration with fast', () => {
      const result = parse('s("bd sd").fast(2)')
      const events = interpret(result.ast)

      expect(events).toHaveLength(2)
      expect(events[0]?.duration).toBeLessThan(0.5)
    })

    it('should modify duration with slow', () => {
      const result = parse('s("bd sd").slow(2)')
      const events = interpret(result.ast)

      expect(events).toHaveLength(2)
      expect(events[0]?.duration).toBeGreaterThan(0.5)
    })
  })

  describe('stack interpretation', () => {
    it('should generate events for all stack children', () => {
      const ast: PatternNode = {
        type: 'stack',
        children: [
          { type: 'sound', value: 'bd', position: 0, duration: 1 },
          { type: 'sound', value: 'sd', position: 0, duration: 1 },
          { type: 'sound', value: 'hh', position: 0, duration: 1 }
        ],
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(3)
      const sounds = events.map(e => e.sound).sort()
      expect(sounds).toEqual(['bd', 'hh', 'sd'])
    })

    it('should preserve timing for stacked sounds', () => {
      const ast: PatternNode = {
        type: 'stack',
        children: [
          { type: 'sound', value: 'bd', position: 0, duration: 1 },
          { type: 'sound', value: 'sd', position: 0, duration: 1 }
        ],
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.time).toBe(0)
      expect(events[1]?.time).toBe(0)
    })
  })


  describe('alternation interpretation', () => {
    it('should select alternation child by cycle', () => {
      const ast: PatternNode = {
        type: 'alternation',
        children: [
          { type: 'sound', value: 'bd', position: 0, duration: 1 },
          { type: 'sound', value: 'sd', position: 0, duration: 1 }
        ],
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(1)
      expect(['bd', 'sd']).toContain(events[0]?.sound)
    })
  })

  describe('euclidean rhythm', () => {
    it('should generate euclidean pattern (3,8)', () => {
      const ast: PatternNode = {
        type: 'euclidean',
        value: 'bd',
        euclidean: { pulses: 3, steps: 8 },
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(3)
      expect(events.every(e => e.sound === 'bd')).toBe(true)
    })

    it('should generate euclidean pattern (5,8)', () => {
      const ast: PatternNode = {
        type: 'euclidean',
        value: 'hh',
        euclidean: { pulses: 5, steps: 8 },
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(5)
    })

    it('should handle euclidean pattern with zero pulses', () => {
      const ast: PatternNode = {
        type: 'euclidean',
        value: 'bd',
        euclidean: { pulses: 0, steps: 8 },
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events.length).toBeLessThanOrEqual(1)
    })

    it('should handle pulses >= steps', () => {
      const ast: PatternNode = {
        type: 'euclidean',
        value: 'bd',
        euclidean: { pulses: 8, steps: 8 },
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(8)
    })

    it('should space euclidean events correctly', () => {
      const ast: PatternNode = {
        type: 'euclidean',
        value: 'bd',
        euclidean: { pulses: 4, steps: 4 },
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.time).toBe(0)
      expect(events[1]?.time).toBe(0.25)
      expect(events[2]?.time).toBe(0.5)
      expect(events[3]?.time).toBe(0.75)
    })
  })

  describe('sample selection', () => {
    it('should preserve sample index', () => {
      const ast: PatternNode = {
        type: 'sample_select',
        value: 'bd',
        sampleIndex: 5,
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.sampleIndex).toBe(5)
    })

    it('should handle sound without sample index', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]).toBeDefined()
      expect(events[0]?.sound).toBe('bd')
    })
  })

  describe('weight/probability', () => {
    it('should convert weight to probability', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        weight: 5,
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.probability).toBe(0.5)
    })

    it('should default probability to 1.0', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events[0]?.probability).toBe(1.0)
    })
  })

  describe('complex real-world patterns', () => {
    it('should handle all silences pattern', () => {
      const result = parse('s("~ ~ ~ ~")')
      const events = interpret(result.ast)

      expect(events).toHaveLength(0)
    })

    it('should handle complex stack with silences', () => {
      const result = parse('stack(s("~ ~ ~ ~"), s("~ ~ ~ ~"), s("~ ~ ~ ~"))')
      const events = interpret(result.ast)

      expect(events).toHaveLength(0)
    })

    it('should handle pattern with sample selection', () => {
      const result = parse('s("bd:5 bd:6 bd:7")')
      const events = interpret(result.ast)

      expect(events.length).toBeGreaterThan(0)
      expect(events.every(e => e.sound === 'bd')).toBe(true)
    })

    it('should handle full complex pattern', () => {
      const result = parse('stack(s("bd:5!2 bd:6 bd:5").speed(0.9), s("~ cp:2 ~ cp:2").room(0.3), s("[~ hh:3]*4").gain(0.5)).cpm(130/4)')
      const events = interpret(result.ast)

      expect(events.length).toBeGreaterThan(0)
      const kickEvents = events.filter(e => e.type === 'kick')
      const snareEvents = events.filter(e => e.type === 'snare')
      const hihatEvents = events.filter(e => e.type === 'hihat')

      expect(kickEvents.length).toBeGreaterThan(0)
      expect(snareEvents.length).toBeGreaterThan(0)
      expect(hihatEvents.length).toBeGreaterThan(0)
    })

    it('should apply modifiers from stack to children', () => {
      const result = parse('stack(s("bd"), s("sd")).gain(0.5)')
      const events = interpret(result.ast)

      expect(events).toHaveLength(2)
    })
  })

  describe('edge cases', () => {
    it('should handle empty sequence', () => {
      const ast: PatternNode = {
        type: 'sequence',
        children: [],
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(0)
    })

    it('should handle empty stack', () => {
      const ast: PatternNode = {
        type: 'stack',
        children: [],
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(0)
    })

    it('should handle missing children gracefully', () => {
      const ast: PatternNode = {
        type: 'sequence',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(0)
    })

    it('should handle missing euclidean data', () => {
      const ast: PatternNode = {
        type: 'euclidean',
        value: 'bd',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(0)
    })

    it('should handle missing sound value', () => {
      const ast: PatternNode = {
        type: 'sound',
        position: 0,
        duration: 1
      }

      const events = interpret(ast)

      expect(events).toHaveLength(0)
    })
  })

  describe('modifier handling', () => {
    it('should apply modifiers to sounds', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1,
        modifiers: [{ name: 'gain', args: [0.5] }]
      }

      const events = interpret(ast)

      expect(events[0]?.gain).toBe(0.5)
    })

    it('should handle multiple modifiers on same sound', () => {
      const ast: PatternNode = {
        type: 'sound',
        value: 'bd',
        position: 0,
        duration: 1,
        modifiers: [
          { name: 'gain', args: [0.8] },
          { name: 'speed', args: [1.5] }
        ]
      }

      const events = interpret(ast)

      expect(events[0]?.gain).toBe(0.8)
      expect(events[0]?.speed).toBe(1.5)
    })
  })
})
