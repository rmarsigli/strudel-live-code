import type { Token, TokenType } from '@/types/strudel-ast'

/**
 * Tokenizes Strudel code into an array of tokens for parsing
 *
 * This lexer converts raw Strudel code text into a structured sequence of tokens
 * that can be consumed by the parser. It handles:
 * - Function names (sound, s, stack, fast, slow, etc.)
 * - String literals (single, double, and backtick quotes)
 * - Numbers (integers, decimals, negatives)
 * - Special characters (brackets, parentheses, operators)
 * - Comments (// style line comments)
 * - Whitespace (spaces, tabs, newlines)
 *
 * @param code - The Strudel code string to tokenize
 * @returns Array of tokens representing the code structure with position information
 *
 * @example
 * ```ts
 * const tokens = tokenize('s("bd sd")')
 * // Returns: [
 * //   { type: 'FUNCTION', value: 's', position: 0, line: 1, column: 1 },
 * //   { type: 'PAREN_START', value: '(', position: 1, line: 1, column: 2 },
 * //   { type: 'STRING', value: 'bd sd', position: 2, line: 1, column: 3 },
 * //   { type: 'PAREN_END', value: ')', position: 8, line: 1, column: 9 },
 * //   { type: 'EOF', value: '', position: 9, line: 1, column: 10 }
 * // ]
 * ```
 *
 * @example
 * ```ts
 * const tokens = tokenize('s("bd").fast(2).gain(0.8)')
 * // Tokenizes chained modifiers: s("bd").fast(2).gain(0.8)
 * ```
 */
export function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let position = 0
  let line = 1
  let column = 1

  const keywords = new Set([
    'sound', 's', 'stack', 'fast', 'slow', 'rev', 'gain', 'speed',
    'delay', 'room', 'cut', 'every', 'jux', 'juxBy', 'bite', 'chop', 'cpm',
    'cat', 'slowcat', 'fastcat', 'vowel', 'stut', 'pitch', 'octave', 'echo',
    'tremolo', 'phaser', 'chorus', 'lpf', 'hpf', 'lcutoff', 'hcutoff',
    'bandf', 'cutoff', 'resonance', 'djf', 'crush', 'distort', 'coarse', 'pan',
    'ply', 'bpm', 'velocity', 'hurry', 'accelerate', 'legato', 'sustain', 'hold'
  ])

  while (position < code.length) {
    const char = code[position]
    if (char === undefined) break

    if (char === '\n') {
      line++
      column = 1
      position++
      continue
    }

    if (char === ' ' || char === '\t') {
      column++
      position++
      continue
    }

    if (char === '/' && code[position + 1] === '/') {
      while (position < code.length && code[position] !== '\n') {
        position++
      }
      continue
    }

    if (char === '(') {
      tokens.push({
        type: 'PAREN_START',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === ')') {
      tokens.push({
        type: 'PAREN_END',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '[') {
      tokens.push({
        type: 'BRACKET_START',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === ']') {
      tokens.push({
        type: 'BRACKET_END',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '<') {
      tokens.push({
        type: 'ANGLE_START',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '>') {
      tokens.push({
        type: 'ANGLE_END',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === ',') {
      tokens.push({
        type: 'COMMA',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '.') {
      tokens.push({
        type: 'DOT',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === ':') {
      tokens.push({
        type: 'COLON',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '*') {
      tokens.push({
        type: 'ASTERISK',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '@') {
      tokens.push({
        type: 'AT',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '!') {
      tokens.push({
        type: 'OPERATOR',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '/') {
      tokens.push({
        type: 'OPERATOR',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '~') {
      tokens.push({
        type: 'TILDE',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '_') {
      tokens.push({
        type: 'UNDERSCORE',
        value: char,
        position,
        line,
        column
      })
      position++
      column++
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      const startQuote = char
      const startPos = position
      const startCol = column
      position++
      column++
      let value = ''

      while (position < code.length && code[position] !== startQuote) {
        if (code[position] === '\\' && position + 1 < code.length) {
          value += code[position + 1]
          position += 2
          column += 2
        } else {
          value += code[position]
          position++
          column++
        }
      }

      if (position < code.length) {
        position++
        column++
      }

      tokens.push({
        type: 'STRING',
        value,
        position: startPos,
        line,
        column: startCol
      })
      continue
    }

    const nextCharForNumber = code[position + 1]
    const isNegativeNumber = char === '-' && nextCharForNumber !== undefined && /\d/.test(nextCharForNumber)
    if (/\d/.test(char) || isNegativeNumber) {
      const startPos = position
      const startCol = column
      let value = ''

      if (char === '-') {
        value += char
        position++
        column++
      }

      while (position < code.length) {
        const currentChar = code[position]
        if (currentChar === undefined || !/[\d.]/.test(currentChar)) break
        value += currentChar
        position++
        column++
      }

      tokens.push({
        type: 'NUMBER',
        value,
        position: startPos,
        line,
        column: startCol
      })
      continue
    }

    if (/[a-zA-Z_]/.test(char)) {
      const startPos = position
      const startCol = column
      let value = ''

      while (position < code.length) {
        const currentChar = code[position]
        if (currentChar === undefined || !/[a-zA-Z0-9_]/.test(currentChar)) break
        value += currentChar
        position++
        column++
      }

      const type: TokenType = keywords.has(value) ? 'FUNCTION' : 'SOUND'

      tokens.push({
        type,
        value,
        position: startPos,
        line,
        column: startCol
      })
      continue
    }

    position++
    column++
  }

  tokens.push({
    type: 'EOF',
    value: '',
    position,
    line,
    column
  })

  return tokens
}
