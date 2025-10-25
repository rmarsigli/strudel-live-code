import { describe, it, expect } from 'vitest'
import { tokenize } from './strudel-lexer'

describe('strudel-lexer', () => {
  describe('basic tokenization', () => {
    it('should tokenize simple sound function', () => {
      const tokens = tokenize('s("bd")')

      expect(tokens).toHaveLength(5)
      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 's' })
      expect(tokens[1]).toMatchObject({ type: 'PAREN_START', value: '(' })
      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd' })
      expect(tokens[3]).toMatchObject({ type: 'PAREN_END', value: ')' })
      expect(tokens[4]).toMatchObject({ type: 'EOF' })
    })

    it('should tokenize sound function with full name', () => {
      const tokens = tokenize('sound("bd sd hh")')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'sound' })
      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd sd hh' })
    })

    it('should tokenize stack function', () => {
      const tokens = tokenize('stack()')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'stack' })
      expect(tokens[1]).toMatchObject({ type: 'PAREN_START' })
      expect(tokens[2]).toMatchObject({ type: 'PAREN_END' })
    })
  })

  describe('string handling', () => {
    it('should handle single quotes', () => {
      const tokens = tokenize("s('bd')")

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd' })
    })

    it('should handle double quotes', () => {
      const tokens = tokenize('s("bd")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd' })
    })

    it('should handle backticks', () => {
      const tokens = tokenize('s(`bd`)')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd' })
    })

    it('should handle escaped characters in strings', () => {
      const tokens = tokenize('s("bd\\"test")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd"test' })
    })

    it('should handle multi-token strings', () => {
      const tokens = tokenize('s("bd sd hh cp")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd sd hh cp' })
    })

    it('should handle silences in strings', () => {
      const tokens = tokenize('s("bd ~ sd ~")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd ~ sd ~' })
    })
  })

  describe('modifier tokenization', () => {
    it('should tokenize fast modifier', () => {
      const tokens = tokenize('s("bd").fast(2)')

      const dotToken = tokens.find(t => t.type === 'DOT')
      const fastToken = tokens.find(t => t.type === 'FUNCTION' && t.value === 'fast')
      const numberToken = tokens.find(t => t.type === 'NUMBER' && t.value === '2')

      expect(dotToken).toBeDefined()
      expect(fastToken).toBeDefined()
      expect(numberToken).toBeDefined()
    })

    it('should tokenize slow modifier', () => {
      const tokens = tokenize('s("bd").slow(2)')

      const slowToken = tokens.find(t => t.type === 'FUNCTION' && t.value === 'slow')
      expect(slowToken).toBeDefined()
    })

    it('should tokenize gain modifier with decimal', () => {
      const tokens = tokenize('s("bd").gain(0.8)')

      const gainToken = tokens.find(t => t.type === 'FUNCTION' && t.value === 'gain')
      const numberToken = tokens.find(t => t.type === 'NUMBER' && t.value === '0.8')

      expect(gainToken).toBeDefined()
      expect(numberToken).toBeDefined()
    })

    it('should tokenize speed modifier', () => {
      const tokens = tokenize('s("bd").speed(0.9)')

      const speedToken = tokens.find(t => t.type === 'FUNCTION' && t.value === 'speed')
      const numberToken = tokens.find(t => t.type === 'NUMBER' && t.value === '0.9')

      expect(speedToken).toBeDefined()
      expect(numberToken).toBeDefined()
    })

    it('should tokenize room modifier', () => {
      const tokens = tokenize('s("bd").room(0.3)')

      const roomToken = tokens.find(t => t.type === 'FUNCTION' && t.value === 'room')
      expect(roomToken).toBeDefined()
    })

    it('should tokenize cpm modifier with division', () => {
      const tokens = tokenize('s("bd").cpm(130/4)')

      const cpmToken = tokens.find(t => t.type === 'FUNCTION' && t.value === 'cpm')
      const number1 = tokens.find(t => t.type === 'NUMBER' && t.value === '130')
      const operator = tokens.find(t => t.type === 'OPERATOR' && t.value === '/')
      const number2 = tokens.find(t => t.type === 'NUMBER' && t.value === '4')

      expect(cpmToken).toBeDefined()
      expect(number1).toBeDefined()
      expect(operator).toBeDefined()
      expect(number2).toBeDefined()
    })

    it('should tokenize chained modifiers', () => {
      const tokens = tokenize('s("bd").fast(2).gain(0.8).room(0.3)')

      const modifiers = tokens.filter(t => t.type === 'FUNCTION' && t.value !== 's')
      expect(modifiers).toHaveLength(3)
      expect(modifiers[0]?.value).toBe('fast')
      expect(modifiers[1]?.value).toBe('gain')
      expect(modifiers[2]?.value).toBe('room')
    })
  })

  describe('number handling', () => {
    it('should tokenize positive integers', () => {
      const tokens = tokenize('fast(2)')

      expect(tokens[2]).toMatchObject({ type: 'NUMBER', value: '2' })
    })

    it('should tokenize decimals', () => {
      const tokens = tokenize('gain(0.8)')

      expect(tokens[2]).toMatchObject({ type: 'NUMBER', value: '0.8' })
    })

    it('should tokenize negative numbers', () => {
      const tokens = tokenize('gain(-0.5)')

      expect(tokens[2]).toMatchObject({ type: 'NUMBER', value: '-0.5' })
    })

    it('should tokenize large numbers', () => {
      const tokens = tokenize('cpm(130)')

      expect(tokens[2]).toMatchObject({ type: 'NUMBER', value: '130' })
    })
  })

  describe('special characters', () => {
    it('should tokenize parentheses', () => {
      const tokens = tokenize('()')

      expect(tokens[0]).toMatchObject({ type: 'PAREN_START', value: '(' })
      expect(tokens[1]).toMatchObject({ type: 'PAREN_END', value: ')' })
    })

    it('should tokenize brackets', () => {
      const tokens = tokenize('[]')

      expect(tokens[0]).toMatchObject({ type: 'BRACKET_START', value: '[' })
      expect(tokens[1]).toMatchObject({ type: 'BRACKET_END', value: ']' })
    })

    it('should tokenize angle brackets', () => {
      const tokens = tokenize('<>')

      expect(tokens[0]).toMatchObject({ type: 'ANGLE_START', value: '<' })
      expect(tokens[1]).toMatchObject({ type: 'ANGLE_END', value: '>' })
    })

    it('should tokenize comma', () => {
      const tokens = tokenize('stack(a, b)')

      expect(tokens[2]).toMatchObject({ type: 'SOUND', value: 'a' })
      expect(tokens[3]).toMatchObject({ type: 'COMMA', value: ',' })
      expect(tokens[4]).toMatchObject({ type: 'SOUND', value: 'b' })
    })

    it('should tokenize dot', () => {
      const tokens = tokenize('s("bd").fast(2)')

      const dotToken = tokens.find(t => t.type === 'DOT')
      expect(dotToken).toBeDefined()
      expect(dotToken?.value).toBe('.')
    })

    it('should tokenize colon', () => {
      const tokens = tokenize('s("bd:5")')

      const colonInString = tokens[2]?.value
      expect(colonInString).toContain(':')
    })

    it('should tokenize asterisk', () => {
      const tokens = tokenize('*')

      expect(tokens[0]).toMatchObject({ type: 'ASTERISK', value: '*' })
    })

    it('should tokenize at sign', () => {
      const tokens = tokenize('@')

      expect(tokens[0]).toMatchObject({ type: 'AT', value: '@' })
    })

    it('should tokenize exclamation mark', () => {
      const tokens = tokenize('!')

      expect(tokens[0]).toMatchObject({ type: 'OPERATOR', value: '!' })
    })

    it('should tokenize forward slash', () => {
      const tokens = tokenize('/')

      expect(tokens[0]).toMatchObject({ type: 'OPERATOR', value: '/' })
    })

    it('should tokenize tilde', () => {
      const tokens = tokenize('~')

      expect(tokens[0]).toMatchObject({ type: 'TILDE', value: '~' })
    })

    it('should tokenize underscore', () => {
      const tokens = tokenize('_')

      expect(tokens[0]).toMatchObject({ type: 'UNDERSCORE', value: '_' })
    })
  })

  describe('complex patterns', () => {
    it('should tokenize sample selection', () => {
      const tokens = tokenize('s("bd:5")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd:5' })
    })

    it('should tokenize hold notation', () => {
      const tokens = tokenize('s("bd:5!2")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd:5!2' })
    })

    it('should tokenize repetition', () => {
      const tokens = tokenize('s("bd*4")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd*4' })
    })

    it('should tokenize weight', () => {
      const tokens = tokenize('s("bd@5")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd@5' })
    })

    it('should tokenize subgroups in strings', () => {
      const tokens = tokenize('s("[bd sd] hh")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: '[bd sd] hh' })
    })

    it('should tokenize alternation in strings', () => {
      const tokens = tokenize('s("<bd sd> hh")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: '<bd sd> hh' })
    })

    it('should tokenize euclidean patterns in strings', () => {
      const tokens = tokenize('s("bd(3,8)")')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd(3,8)' })
    })
  })

  describe('whitespace handling', () => {
    it('should skip spaces', () => {
      const tokens = tokenize('s ( "bd" )')

      expect(tokens).toHaveLength(5)
      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 's' })
      expect(tokens[1]).toMatchObject({ type: 'PAREN_START' })
      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd' })
    })

    it('should skip tabs', () => {
      const tokens = tokenize('s\t("bd")')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 's' })
    })

    it('should skip newlines and track line numbers', () => {
      const tokens = tokenize('s("bd")\ns("sd")')

      expect(tokens[0]?.line).toBe(1)
      expect(tokens[5]?.line).toBe(2)
    })
  })

  describe('comments', () => {
    it('should skip line comments', () => {
      const tokens = tokenize('s("bd") // this is a comment')

      expect(tokens).toHaveLength(5)
      expect(tokens[tokens.length - 1]).toMatchObject({ type: 'EOF' })
    })

    it('should handle comments at start of line', () => {
      const tokens = tokenize('// comment\ns("bd")')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 's' })
    })

    it('should handle multiple line comments', () => {
      const tokens = tokenize('// line 1\n// line 2\ns("bd")')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 's' })
    })
  })

  describe('keywords', () => {
    it('should identify sound as function', () => {
      const tokens = tokenize('sound')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'sound' })
    })

    it('should identify s as function', () => {
      const tokens = tokenize('s')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 's' })
    })

    it('should identify stack as function', () => {
      const tokens = tokenize('stack')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'stack' })
    })

    it('should identify fast as function', () => {
      const tokens = tokenize('fast')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'fast' })
    })

    it('should identify slow as function', () => {
      const tokens = tokenize('slow')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'slow' })
    })

    it('should identify gain as function', () => {
      const tokens = tokenize('gain')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'gain' })
    })

    it('should identify speed as function', () => {
      const tokens = tokenize('speed')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'speed' })
    })

    it('should identify room as function', () => {
      const tokens = tokenize('room')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'room' })
    })

    it('should identify cpm as function', () => {
      const tokens = tokenize('cpm')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'cpm' })
    })

    it('should identify unknown identifiers as SOUND', () => {
      const tokens = tokenize('unknown')

      expect(tokens[0]).toMatchObject({ type: 'SOUND', value: 'unknown' })
    })
  })

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const tokens = tokenize('')

      expect(tokens).toHaveLength(1)
      expect(tokens[0]).toMatchObject({ type: 'EOF' })
    })

    it('should handle only whitespace', () => {
      const tokens = tokenize('   \n\t  ')

      expect(tokens).toHaveLength(1)
      expect(tokens[0]).toMatchObject({ type: 'EOF' })
    })

    it('should handle unclosed string (returns what it parsed)', () => {
      const tokens = tokenize('s("bd')

      expect(tokens[2]).toMatchObject({ type: 'STRING', value: 'bd' })
    })

    it('should handle nested parentheses', () => {
      const tokens = tokenize('stack(s("bd"))')

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'stack' })
      expect(tokens[1]).toMatchObject({ type: 'PAREN_START' })
      expect(tokens[2]).toMatchObject({ type: 'FUNCTION', value: 's' })
      expect(tokens[3]).toMatchObject({ type: 'PAREN_START' })
      expect(tokens[4]).toMatchObject({ type: 'STRING', value: 'bd' })
      expect(tokens[5]).toMatchObject({ type: 'PAREN_END' })
      expect(tokens[6]).toMatchObject({ type: 'PAREN_END' })
    })

    it('should handle complex real-world pattern', () => {
      const code = 'stack(s("bd:5!2 bd:6 bd:5").speed(0.9), s("~ cp:2 ~ cp:2").room(0.3), s("[~ hh:3]*4").gain(0.5)).cpm(130/4)'
      const tokens = tokenize(code)

      expect(tokens[0]).toMatchObject({ type: 'FUNCTION', value: 'stack' })
      expect(tokens.filter(t => t.type === 'FUNCTION')).toHaveLength(8)
      expect(tokens.filter(t => t.type === 'STRING')).toHaveLength(3)
      expect(tokens[tokens.length - 1]).toMatchObject({ type: 'EOF' })
    })
  })

  describe('position tracking', () => {
    it('should track line and column numbers', () => {
      const tokens = tokenize('s("bd")')

      expect(tokens[0]).toHaveProperty('line')
      expect(tokens[0]).toHaveProperty('column')
      expect(tokens[0]).toHaveProperty('position')
    })

    it('should increment column for each character', () => {
      const tokens = tokenize('abc')

      expect(tokens[0]?.column).toBe(1)
    })

    it('should increment line on newline', () => {
      const tokens = tokenize('a\nb')

      expect(tokens[0]?.line).toBe(1)
      expect(tokens[1]?.line).toBe(2)
    })

    it('should reset column on newline', () => {
      const tokens = tokenize('abc\ndef')

      expect(tokens[1]?.line).toBe(2)
      expect(tokens[1]?.column).toBe(1)
    })
  })
})
