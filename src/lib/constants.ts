export const DEFAULT_PATTERN = "s('bd sd bd sd')"

const PORT = import.meta.env.VITE_PORT || '3001'
export const WS_URL = import.meta.env.VITE_WS_URL || `ws://localhost:${PORT}`

export const PATTERNS_DIR = 'patterns'

export const DEBOUNCE_DELAY = 1000

export const RECONNECT_DELAY = 3000

export const MAX_RECONNECT_ATTEMPTS = 10

export const DEFAULT_VOLUME = 0.8

export const KEYBOARD_SHORTCUTS = {
  PLAY: 'ctrl+enter',
  STOP: 'ctrl+.',
  SAVE: 'ctrl+s',
  NEW_FILE: 'ctrl+n',
} as const

export const PATTERN_TEMPLATES = {
  blank: '',
  techno: `stack(
  s('bd:5!2 bd:6 bd:5').speed(0.9),
  s('~ cp:2 ~ cp:2').room(0.3),
  s('[~ hh:3]*4').gain(0.5)
).cpm(130/4)`,
  ambient: `note('<Am7 Fmaj7 Cmaj7 G7>')
  .voicing()
  .s('pad')
  .room(0.8)
  .delay(0.5)
  .slow(4)`,
  'drum-bass': `stack(
  s('bd*2 ~ bd ~'),
  s('~ cp ~ cp'),
  s('[hh hh oh]*2')
).fast(2)`,
  melodic: `note('c4 e4 g4 e4 f4 d4 g4 f4')
  .s('piano')
  .cutoff(sine.range(300, 3000).slow(4))`,
} as const

export type TemplateType = keyof typeof PATTERN_TEMPLATES
