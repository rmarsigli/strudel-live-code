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
  | 'cat'
  | 'slowcat'
  | 'fastcat'
  | 'append'
  | 'fastAppend'
  | 'slowAppend'
  | 'overlay'
  | 'layer'
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
  | 'cpm'
  | 'bpm'
  | 'every'
  | 'whenmod'
  | 'stut'
  | 'echo'
  | 'ply'
  | 'hurry'
  | 'sometimes'
  | 'often'
  | 'rarely'
  | 'almostNever'
  | 'almostAlways'
  | 'never'
  | 'always'
  | 'someCycles'
  | 'someCyclesBy'
  | 'off'
  | 'jux'
  | 'juxBy'
  | 'rev'
  | 'palindrome'
  | 'iter'
  | 'degrade'
  | 'degradeBy'
  | 'chunk'
  | 'segment'
  | 'bite'
  | 'chop'
  | 'gain'
  | 'velocity'
  | 'lpf'
  | 'hpf'
  | 'bandf'
  | 'crush'
  | 'distort'
  | 'coarse'
  | 'room'
  | 'delay'
  | 'tremolo'
  | 'phaser'
  | 'chorus'
  | 'djf'
  | 'vowel'
  | 'cutoff'
  | 'resonance'
  | 'hcutoff'
  | 'lcutoff'
  | 'speed'
  | 'accelerate'
  | 'pitch'
  | 'octave'
  | 'pan'
  | 'add'
  | 'sub'
  | 'mul'
  | 'div'
  | 'scale'
  | 'chord'
  | 'arp'
  | 'arpeggiate'
  | 'note'
  | 'n'
  | 'freq'
  | 'legato'
  | 'sustain'
  | 'hold'
  | 'cut'
  | 'orbit'
  | 'struct'
  | 'mask'
  | 'euclid'
  | 'euclidLegato'
  | 'euclidRot'
  | 'inside'
  | 'outside'
  | 'compress'
  | 'focus'
  | 'zoom'
  | 'fastGap'
  | 'range'
  | 'rangex'
  | 'saw'
  | 'sine'
  | 'square'
  | 'tri'
  | 'rand'
  | 'irand'
  | 'perlin'
  | 'choose'
  | 'wchoose'
  | 'shuffle'
  | 'scramble'
  | 'rot'
  | 'swingBy'
  | 'swing'
  | 'ghost'
  | 'press'
  | 'fit'
  | 'quantize'
  | 'inhabit'
  | 'splice'
  | 'weave'

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
    lpf?: number
    hpf?: number
    bandf?: number
    crush?: number
    distort?: number
    coarse?: number
    tremolo?: number
    phaser?: number
    chorus?: number
    djf?: number
    vowel?: string
    cutoff?: number
    resonance?: number
    hcutoff?: number
    lcutoff?: number
    accelerate?: number
    pitch?: number
    octave?: number
    pan?: number
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
