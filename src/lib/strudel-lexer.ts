import type { Token, TokenType } from '@/types/strudel-ast'

export function tokenize(code: string): Token[] {
  const tokens: Token[] = []
  let position = 0
  let line = 1
  let column = 1

  const keywords = new Set([
    'sound', 's', 'stack', 'fast', 'slow', 'rev', 'gain', 'speed',
    'delay', 'room', 'cut', 'every', 'jux', 'juxBy', 'bite', 'chop', 'cpm'
  ])

  while (position < code.length) {
    const char = code[position]

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

    if (/\d/.test(char) || (char === '-' && /\d/.test(code[position + 1] || ''))) {
      const startPos = position
      const startCol = column
      let value = ''

      if (char === '-') {
        value += char
        position++
        column++
      }

      while (position < code.length && /[\d.]/.test(code[position] || '')) {
        value += code[position]
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

      while (position < code.length && /[a-zA-Z0-9_]/.test(code[position] || '')) {
        value += code[position]
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
