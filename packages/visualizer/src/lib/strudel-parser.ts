import type { Token, PatternNode, ParserContext, ParseResult, Modifier } from '../types/strudel-ast'
import { tokenize } from './strudel-lexer'

class Parser {
  private context: ParserContext

  constructor(tokens: Token[]) {
    this.context = {
      tokens,
      position: 0,
      errors: []
    }
  }

  private currentToken(): Token {
    const token = this.context.tokens[this.context.position] || this.context.tokens[this.context.tokens.length - 1]
    if (!token) {
      return { type: 'EOF', value: '', position: 0, line: 0, column: 0 }
    }
    return token
  }

  private advance(): void {
    if (this.context.position < this.context.tokens.length - 1) {
      this.context.position++
    }
  }

  private expect(type: Token['type']): Token | null {
    const token = this.currentToken()
    if (token.type === type) {
      this.advance()
      return token
    }
    this.addError(`Expected ${type}, got ${token.type}`, token)
    return null
  }

  private addError(message: string, token: Token): void {
    this.context.errors.push({
      message,
      token,
      position: token.position
    })
  }

  public parse(): ParseResult {
    try {
      const ast = this.parseExpression()
      return {
        ast,
        errors: this.context.errors,
        success: this.context.errors.length === 0
      }
    } catch (error) {
      return {
        ast: null,
        errors: this.context.errors,
        success: false
      }
    }
  }

  private parseExpression(): PatternNode | null {
    const token = this.currentToken()

    if (token.type === 'FUNCTION' && token.value === 'stack') {
      return this.parseStack()
    }

    if (token.type === 'FUNCTION' && (token.value === 'sound' || token.value === 's')) {
      return this.parseSound()
    }

    if (token.type === 'STRING') {
      return this.parseMiniNotation()
    }

    return null
  }

  private parseStack(): PatternNode | null {
    this.expect('FUNCTION')
    this.expect('PAREN_START')

    const children: PatternNode[] = []

    while (this.currentToken().type !== 'PAREN_END' && this.currentToken().type !== 'EOF') {
      const child = this.parseExpression()
      if (child) {
        children.push(child)
      }

      if (this.currentToken().type === 'COMMA') {
        this.advance()
      }
    }

    this.expect('PAREN_END')

    return {
      type: 'stack',
      children,
      position: 0,
      duration: 1,
      modifiers: this.parseModifiers()
    }
  }

  private parseSound(): PatternNode | null {
    this.expect('FUNCTION')
    this.expect('PAREN_START')

    const stringToken = this.expect('STRING')
    if (!stringToken) return null

    this.expect('PAREN_END')

    const pattern = stringToken.value
    const tokens = pattern.split(/\s+/).filter(t => t.length > 0)

    const children: PatternNode[] = []
    let position = 0
    const step = 1 / tokens.length

    for (const token of tokens) {
      const child = this.parseMiniToken(token, position, step)
      if (child) {
        children.push(child)
      }
      position += step
    }

    const modifiers = this.parseModifiers()

    if (children.length === 0) {
      return null
    }

    if (children.length === 1) {
      const singleChild = children[0]
      if (singleChild) {
        singleChild.modifiers = [...(singleChild.modifiers || []), ...modifiers]
        return singleChild
      }
      return null
    }

    return {
      type: 'sequence',
      children,
      position: 0,
      duration: 1,
      modifiers
    }
  }

  private parseModifiers(): Modifier[] {
    const modifiers: Modifier[] = []

    while (this.currentToken().type === 'DOT') {
      this.advance()

      const funcToken = this.currentToken()
      if (funcToken.type !== 'FUNCTION') break

      const modifierName = funcToken.value as Modifier['name']
      this.advance()

      this.expect('PAREN_START')

      const args: (number | string)[] = []
      while (this.currentToken().type !== 'PAREN_END' && this.currentToken().type !== 'EOF') {
        const token = this.currentToken()
        if (token.type === 'NUMBER') {
          args.push(parseFloat(token.value))
          this.advance()
        } else if (token.type === 'STRING') {
          args.push(token.value)
          this.advance()
        } else if (token.type === 'OPERATOR' && token.value === '/') {
          this.advance()
        }

        if (this.currentToken().type === 'COMMA') {
          this.advance()
        }
      }

      this.expect('PAREN_END')

      modifiers.push({
        name: modifierName,
        args
      })
    }

    return modifiers
  }

  private parseMiniNotation(): PatternNode | null {
    const stringToken = this.expect('STRING')
    if (!stringToken) return null

    const pattern = stringToken.value
    const tokens = pattern.split(/\s+/).filter(t => t.length > 0)

    const children: PatternNode[] = []
    let position = 0
    const step = 1 / tokens.length

    for (const token of tokens) {
      const child = this.parseMiniToken(token, position, step)
      if (child) {
        children.push(child)
      }
      position += step
    }

    if (children.length === 1) {
      return children[0] || null
    }

    return {
      type: 'sequence',
      children,
      position: 0,
      duration: 1
    }
  }

  private parseMiniToken(token: string, position: number, duration: number): PatternNode | null {
    if (token === '~' || token === '_') {
      return {
        type: 'silence',
        position,
        duration
      }
    }

    const repeatHoldMatch = token.match(/^(.+?)!(\d+)$/)
    if (repeatHoldMatch) {
      const sound = repeatHoldMatch[1] || ''
      const repeats = parseInt(repeatHoldMatch[2] || '1')
      const totalDuration = duration * repeats

      return {
        type: 'sound',
        value: sound.toLowerCase(),
        position,
        duration: totalDuration,
        repetitions: repeats
      }
    }

    const repeatMatch = token.match(/^(.+?)\*(\d+)$/)
    if (repeatMatch) {
      const sound = repeatMatch[1] || ''
      const repeats = parseInt(repeatMatch[2] || '1')
      const substep = duration / repeats

      const children: PatternNode[] = []
      for (let i = 0; i < repeats; i++) {
        children.push({
          type: 'sound',
          value: sound.toLowerCase(),
          position: position + (substep * i),
          duration: substep
        })
      }

      return {
        type: 'repetition',
        children,
        position,
        duration,
        repetitions: repeats
      }
    }

    const sampleMatch = token.match(/^([^:]+):(\d+)(?::(\d+))?$/)
    if (sampleMatch) {
      return {
        type: 'sample_select',
        value: sampleMatch[1]?.toLowerCase() || '',
        sampleIndex: parseInt(sampleMatch[2] || '0'),
        position,
        duration
      }
    }

    const euclideanMatch = token.match(/^([^(]+)\((\d+),(\d+)\)$/)
    if (euclideanMatch) {
      return {
        type: 'euclidean',
        value: euclideanMatch[1]?.toLowerCase() || '',
        euclidean: {
          pulses: parseInt(euclideanMatch[2] || '0'),
          steps: parseInt(euclideanMatch[3] || '0')
        },
        position,
        duration
      }
    }

    const weightMatch = token.match(/^(.+?)@(\d+)$/)
    if (weightMatch) {
      return {
        type: 'sound',
        value: weightMatch[1]?.toLowerCase() || '',
        weight: parseInt(weightMatch[2] || '1'),
        position,
        duration
      }
    }

    if (token.startsWith('[') && token.endsWith(']')) {
      const inner = token.slice(1, -1)
      const subtokens = inner.split(/\s+/).filter(t => t.length > 0)
      const children: PatternNode[] = []
      const substep = duration / subtokens.length
      let subpos = 0

      for (const subtoken of subtokens) {
        const child = this.parseMiniToken(subtoken, position + subpos, substep)
        if (child) {
          children.push(child)
        }
        subpos += substep
      }

      return {
        type: 'subgroup',
        children,
        position,
        duration
      }
    }

    if (token.startsWith('<') && token.endsWith('>')) {
      const inner = token.slice(1, -1)
      const options = inner.split(/\s+/).filter(t => t.length > 0)
      const children: PatternNode[] = []

      for (const option of options) {
        const child = this.parseMiniToken(option, position, duration)
        if (child) {
          children.push(child)
        }
      }

      return {
        type: 'alternation',
        children,
        position,
        duration
      }
    }

    return {
      type: 'sound',
      value: token.toLowerCase(),
      position,
      duration
    }
  }
}

export function parse(code: string): ParseResult {
  const tokens = tokenize(code)
  const parser = new Parser(tokens)
  return parser.parse()
}
