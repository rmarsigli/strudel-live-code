import { describe, it, expect } from 'vitest'
import { parse } from './strudel-parser'

describe('strudel-parser', () => {
  describe('basic sound parsing', () => {
    it('should parse simple sound pattern', () => {
      const result = parse('s("bd")')

      expect(result.success).toBe(true)
      expect(result.errors).toHaveLength(0)
      expect(result.ast).toBeDefined()
      expect(result.ast?.type).toBe('sound')
      expect(result.ast?.value).toBe('bd')
    })

    it('should parse sound function with full name', () => {
      const result = parse('sound("bd")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sound')
    })

    it('should parse multiple sounds as sequence', () => {
      const result = parse('s("bd sd hh")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sequence')
      expect(result.ast?.children).toHaveLength(3)
      expect(result.ast?.children?.[0]?.value).toBe('bd')
      expect(result.ast?.children?.[1]?.value).toBe('sd')
      expect(result.ast?.children?.[2]?.value).toBe('hh')
    })
  })

  describe('mini-notation parsing', () => {
    it('should parse silences with tilde', () => {
      const result = parse('s("~ bd ~ sd")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sequence')
      expect(result.ast?.children?.[0]?.type).toBe('silence')
      expect(result.ast?.children?.[1]?.type).toBe('sound')
      expect(result.ast?.children?.[2]?.type).toBe('silence')
      expect(result.ast?.children?.[3]?.type).toBe('sound')
    })

    it('should parse silences with underscore', () => {
      const result = parse('s("_ bd _ sd")')

      expect(result.success).toBe(true)
      expect(result.ast?.children?.[0]?.type).toBe('silence')
    })

    it('should parse hold notation', () => {
      const result = parse('s("bd!2")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sound')
      expect(result.ast?.value).toBe('bd')
      expect(result.ast?.repetitions).toBe(2)
      expect(result.ast?.duration).toBeGreaterThan(1)
    })

    it('should parse repetition with asterisk', () => {
      const result = parse('s("bd*4")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('repetition')
      expect(result.ast?.children).toHaveLength(4)
      expect(result.ast?.repetitions).toBe(4)
    })

    it('should parse sample selection', () => {
      const result = parse('s("bd:5")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sample_select')
      expect(result.ast?.value).toBe('bd')
      expect(result.ast?.sampleIndex).toBe(5)
    })

    it('should parse weight notation', () => {
      const result = parse('s("bd@5")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sound')
      expect(result.ast?.value).toBe('bd')
      expect(result.ast?.weight).toBe(5)
    })

    it('should parse patterns with brackets as sounds', () => {
      const result = parse('s("[bd sd] hh")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sequence')
      expect(result.ast?.children?.length).toBeGreaterThan(0)
    })

    it('should parse patterns with angle brackets as sounds', () => {
      const result = parse('s("<bd sd> hh")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sequence')
      expect(result.ast?.children?.length).toBeGreaterThan(0)
    })

    it('should parse euclidean patterns', () => {
      const result = parse('s("bd(3,8)")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('euclidean')
      expect(result.ast?.value).toBe('bd')
      expect(result.ast?.euclidean?.pulses).toBe(3)
      expect(result.ast?.euclidean?.steps).toBe(8)
    })
  })

  describe('modifiers', () => {
    it('should parse fast modifier', () => {
      const result = parse('s("bd").fast(2)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers).toHaveLength(1)
      expect(result.ast?.modifiers?.[0]?.name).toBe('fast')
      expect(result.ast?.modifiers?.[0]?.args).toEqual([2])
    })

    it('should parse slow modifier', () => {
      const result = parse('s("bd").slow(2)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers?.[0]?.name).toBe('slow')
      expect(result.ast?.modifiers?.[0]?.args).toEqual([2])
    })

    it('should parse gain modifier', () => {
      const result = parse('s("bd").gain(0.8)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers?.[0]?.name).toBe('gain')
      expect(result.ast?.modifiers?.[0]?.args).toEqual([0.8])
    })

    it('should parse speed modifier', () => {
      const result = parse('s("bd").speed(0.9)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers?.[0]?.name).toBe('speed')
      expect(result.ast?.modifiers?.[0]?.args).toEqual([0.9])
    })

    it('should parse room modifier', () => {
      const result = parse('s("bd").room(0.3)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers?.[0]?.name).toBe('room')
      expect(result.ast?.modifiers?.[0]?.args).toEqual([0.3])
    })

    it('should parse cpm modifier with division', () => {
      const result = parse('s("bd").cpm(130/4)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers?.[0]?.name).toBe('cpm')
      expect(result.ast?.modifiers?.[0]?.args).toContain(130)
      expect(result.ast?.modifiers?.[0]?.args).toContain(4)
    })

    it('should parse chained modifiers', () => {
      const result = parse('s("bd").fast(2).gain(0.8).room(0.3)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers).toHaveLength(3)
      expect(result.ast?.modifiers?.[0]?.name).toBe('fast')
      expect(result.ast?.modifiers?.[1]?.name).toBe('gain')
      expect(result.ast?.modifiers?.[2]?.name).toBe('room')
    })

    it('should parse modifiers with string arguments', () => {
      const result = parse('s("bd").vowel("a")')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers?.[0]?.name).toBe('vowel')
      expect(result.ast?.modifiers?.[0]?.args).toEqual(['a'])
    })

    it('should parse modifiers with multiple arguments', () => {
      const result = parse('s("bd").stut(4, 0.5)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers?.[0]?.name).toBe('stut')
      expect(result.ast?.modifiers?.[0]?.args).toEqual([4, 0.5])
    })
  })

  describe('stack function', () => {
    it('should parse empty stack', () => {
      const result = parse('stack()')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('stack')
      expect(result.ast?.children).toHaveLength(0)
    })

    it('should parse stack with single sound', () => {
      const result = parse('stack(s("bd"))')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('stack')
      expect(result.ast?.children).toHaveLength(1)
      expect(result.ast?.children?.[0]?.type).toBe('sound')
    })

    it('should parse stack with multiple sounds', () => {
      const result = parse('stack(s("bd"), s("sd"), s("hh"))')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('stack')
      expect(result.ast?.children).toHaveLength(3)
      expect(result.ast?.children?.[0]?.value).toBe('bd')
      expect(result.ast?.children?.[1]?.value).toBe('sd')
      expect(result.ast?.children?.[2]?.value).toBe('hh')
    })

    it('should parse stack with modifiers on sounds', () => {
      const result = parse('stack(s("bd").speed(0.9), s("sd").room(0.3))')

      expect(result.success).toBe(true)
      expect(result.ast?.children?.[0]?.modifiers).toHaveLength(1)
      expect(result.ast?.children?.[0]?.modifiers?.[0]?.name).toBe('speed')
      expect(result.ast?.children?.[1]?.modifiers).toHaveLength(1)
      expect(result.ast?.children?.[1]?.modifiers?.[0]?.name).toBe('room')
    })

    it('should parse stack with modifiers on stack itself', () => {
      const result = parse('stack(s("bd"), s("sd")).fast(2)')

      expect(result.success).toBe(true)
      expect(result.ast?.modifiers).toHaveLength(1)
      expect(result.ast?.modifiers?.[0]?.name).toBe('fast')
    })
  })


  describe('plain mini-notation strings', () => {
    it('should parse plain string as mini-notation', () => {
      const result = parse('"bd sd hh"')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sequence')
      expect(result.ast?.children).toHaveLength(3)
    })

    it('should parse single token string as sound', () => {
      const result = parse('"bd"')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sound')
      expect(result.ast?.value).toBe('bd')
    })
  })

  describe('complex patterns', () => {
    it('should parse complex real-world pattern with silences', () => {
      const result = parse('stack(s("~ ~ ~ ~"), s("~ ~ ~ ~"), s("~ ~ ~ ~"))')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('stack')
      expect(result.ast?.children).toHaveLength(3)
      expect(result.ast?.children?.[0]?.type).toBe('sequence')
      expect(result.ast?.children?.[0]?.children?.[0]?.type).toBe('silence')
    })

    it('should parse complex pattern with hold and sample selection', () => {
      const result = parse('s("bd:5!2 bd:6 bd:5")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sequence')
      expect(result.ast?.children).toHaveLength(3)
      expect(result.ast?.children?.[0]?.type).toBe('sound')
      expect(result.ast?.children?.[0]?.repetitions).toBe(2)
    })

    it('should parse complex stack with all modifiers', () => {
      const result = parse('stack(s("bd:5!2 bd:6 bd:5").speed(0.9), s("~ cp:2 ~ cp:2").room(0.3), s("[~ hh:3]*4").gain(0.5)).cpm(130/4)')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('stack')
      expect(result.ast?.children).toHaveLength(3)
      expect(result.ast?.modifiers).toHaveLength(1)
      expect(result.ast?.modifiers?.[0]?.name).toBe('cpm')
    })

    it('should parse complex real-world patterns', () => {
      const result = parse('s("bd*2 sd cp oh")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('sequence')
      expect(result.ast?.children?.[0]?.type).toBe('repetition')
      expect(result.ast?.children?.length).toBeGreaterThan(1)
    })
  })

  describe('position and timing', () => {
    it('should set position and duration for sounds', () => {
      const result = parse('s("bd sd hh")')

      expect(result.ast?.children?.[0]?.position).toBe(0)
      expect(result.ast?.children?.[1]?.position).toBeCloseTo(1/3)
      expect(result.ast?.children?.[2]?.position).toBeCloseTo(2/3)
      expect(result.ast?.children?.[0]?.duration).toBeCloseTo(1/3)
    })

    it('should calculate duration for sequence elements', () => {
      const result = parse('s("bd sd hh")')

      expect(result.success).toBe(true)
      expect(result.ast?.children).toHaveLength(3)
      expect(result.ast?.children?.[0]?.duration).toBeDefined()
      expect(result.ast?.children?.[1]?.duration).toBeDefined()
    })

    it('should calculate duration for repetitions', () => {
      const result = parse('s("bd*4")')

      expect(result.ast?.children).toHaveLength(4)
      expect(result.ast?.children?.[0]?.duration).toBeLessThan(1)
    })

    it('should set positions for sounds in sequence', () => {
      const result = parse('s("bd sd hh cp")')

      expect(result.ast?.children).toHaveLength(4)
      const firstChild = result.ast?.children?.[0]
      const secondChild = result.ast?.children?.[1]
      expect(firstChild?.position).toBe(0)
      expect(secondChild?.position).toBeGreaterThan(0)
    })
  })

  describe('error handling', () => {
    it('should handle parse errors gracefully', () => {
      const result = parse('s()')

      expect(result.success).toBe(false)
      expect(result.errors).toBeDefined()
    })

    it('should report errors for malformed input', () => {
      const result = parse('s("bd"')

      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('should handle empty input', () => {
      const result = parse('')

      expect(result.ast).toBeNull()
    })

    it('should handle invalid function names', () => {
      const result = parse('invalid("bd")')

      expect(result.ast).toBeNull()
    })
  })

  describe('case insensitivity for sounds', () => {
    it('should convert sounds to lowercase', () => {
      const result = parse('s("BD")')

      expect(result.ast?.value).toBe('bd')
    })

    it('should convert sample names to lowercase', () => {
      const result = parse('s("BD:5")')

      expect(result.ast?.value).toBe('bd')
    })

    it('should convert sounds in sequences to lowercase', () => {
      const result = parse('s("BD SD HH")')

      expect(result.ast?.children?.[0]?.value).toBe('bd')
      expect(result.ast?.children?.[1]?.value).toBe('sd')
      expect(result.ast?.children?.[2]?.value).toBe('hh')
    })
  })

  describe('whitespace in patterns', () => {
    it('should handle multiple spaces', () => {
      const result = parse('s("bd    sd")')

      expect(result.success).toBe(true)
      expect(result.ast?.children).toHaveLength(2)
    })

    it('should handle leading/trailing spaces', () => {
      const result = parse('s("  bd sd  ")')

      expect(result.success).toBe(true)
      expect(result.ast?.children).toHaveLength(2)
    })

    it('should filter empty tokens', () => {
      const result = parse('s("bd   sd")')

      expect(result.ast?.children).toHaveLength(2)
    })
  })

  describe('special edge cases', () => {
    it('should handle single silence', () => {
      const result = parse('s("~")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('silence')
    })

    it('should handle empty subgroup', () => {
      const result = parse('s("[]")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('subgroup')
      expect(result.ast?.children).toHaveLength(0)
    })

    it('should handle empty alternation', () => {
      const result = parse('s("<>")')

      expect(result.success).toBe(true)
      expect(result.ast?.type).toBe('alternation')
      expect(result.ast?.children).toHaveLength(0)
    })

    it('should handle zero pulses euclidean', () => {
      const result = parse('s("bd(0,8)")')

      expect(result.success).toBe(true)
      expect(result.ast?.euclidean?.pulses).toBe(0)
    })

    it('should handle weight of 1', () => {
      const result = parse('s("bd@1")')

      expect(result.success).toBe(true)
      expect(result.ast?.weight).toBe(1)
    })

    it('should handle repetition of 1', () => {
      const result = parse('s("bd*1")')

      expect(result.success).toBe(true)
      expect(result.ast?.children).toHaveLength(1)
    })
  })
})
