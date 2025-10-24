export type TokenType =
  | 'SOUND'
  | 'FUNCTION'
  | 'NUMBER'
  | 'STRING'
  | 'OPERATOR'
  | 'GROUP_START'
  | 'GROUP_END'
  | 'PAREN_START'
  | 'PAREN_END'
  | 'COMMA'
  | 'DOT'
  | 'COLON'
  | 'ASTERISK'
  | 'TILDE'
  | 'UNDERSCORE'
  | 'AT'
  | 'ANGLE_START'
  | 'ANGLE_END'
  | 'BRACKET_START'
  | 'BRACKET_END'
  | 'WHITESPACE'
  | 'EOF'

export interface Token {
  type: TokenType
  value: string
  position: number
  line: number
  column: number
}

export type PatternNodeType =
  | 'sound'
  | 'stack'
  | 'sequence'
  | 'subgroup'
  | 'alternation'
  | 'euclidean'
  | 'repetition'
  | 'silence'
  | 'sample_select'

export type ModifierName =
  | 'fast'
  | 'slow'
  | 'rev'
  | 'gain'
  | 'speed'
  | 'delay'
  | 'room'
  | 'cut'
  | 'every'
  | 'jux'
  | 'juxBy'
  | 'bite'
  | 'chop'
  | 'cpm'

export interface Modifier {
  name: ModifierName
  args: (number | string | PatternNode)[]
}

export interface PatternNode {
  type: PatternNodeType
  value?: string
  children?: PatternNode[]
  modifiers?: Modifier[]
  position: number
  duration: number
  repetitions?: number
  euclidean?: {
    pulses: number
    steps: number
  }
  sampleIndex?: number
  weight?: number
}

export type SoundType = 'kick' | 'snare' | 'hihat' | 'synth' | 'bass' | 'perc' | 'fx' | 'other'

export interface AudioEvent {
  sound: string
  time: number
  duration: number
  type: SoundType
  gain: number
  speed: number
  effects: {
    delay?: number
    reverb?: number
    cut?: number
  }
  probability: number
  stereo?: 'left' | 'right' | 'center'
  sampleIndex?: number
}

export interface ParserContext {
  tokens: Token[]
  position: number
  errors: ParserError[]
}

export interface ParserError {
  message: string
  token: Token
  position: number
}

export interface ParseResult {
  ast: PatternNode | null
  errors: ParserError[]
  success: boolean
}
