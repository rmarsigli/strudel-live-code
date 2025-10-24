export const TEST_PATTERNS = {
  basic: [
    'sound("bd sd hh cp")',
    'sound("bd*4 ~ sd hh*2")',
    'stack(sound("bd*4"), sound("~ sd"))',
    'cat(sound("bd"), sound("sd"), sound("hh"))',
    's("bd [sd cp] hh")',
  ],

  timingCore: [
    'sound("bd sd").fast(2)',
    'sound("hh*8").slow(0.5)',
    'sound("bd").ply(3).cpm(140)',
  ],

  audioCore: [
    'sound("bd sd").gain(0.8).lpf(1000)',
    'sound("hh*8").hpf(500).crush(4)',
    'sound("bd").distort(0.5).coarse(2)',
  ],

  timingAdvanced: [
    'sound("bd sd").sometimes(fast(2))',
    'sound("hh*8").degrade().rev()',
    'sound("bd sd hh cp").palindrome().iter(2)',
  ],

  audioAdvanced: [
    'sound("bd").tremolo(4).room(0.5)',
    'sound("hh*8").phaser(0.8).pan(sine)',
    'sound("bd sd").djf(0.5).pitch(7)',
  ],

  patternAdvanced: [
    'sound("bd(3,8)").gain(0.8)',
    'sound("bd").append(sound("sd"))',
    'sound("bd").overlay(sound("hh*4"))',
  ],

  complex: [
    'stack(sound("bd*4").fast(2), sound("~ sd").gain(0.8), sound("hh*8").lpf(2000))',
    'cat(sound("bd").crush(4), sound("sd").distort(0.5)).slow(2)',
    'sound("bd sd hh cp").fast(2).gain(0.7).lpf(1500).room(0.3)',
  ],

  edgeCases: [
    'sound("")',
    'sound("~ ~ ~ ~")',
    'stack()',
    'sound("bd").fast(0.1).gain(0)',
  ],

  notImplemented: [
    'sound("bd sd").sometimes(fast(2))',
    'sound("hh*8").phaser(0.8).pan(sine)',
    'sound("bd").append(sound("sd"))',
    'sound("bd").overlay(sound("hh*4"))',
  ],
}

export const EXPECTED_RESULTS = {
  'sound("bd sd hh cp")': {
    eventCount: 4,
    sounds: ['bd', 'sd', 'hh', 'cp'],
  },

  'sound("bd*4 ~ sd hh*2")': {
    eventCount: 7,
    sounds: ['bd', 'bd', 'bd', 'bd', 'sd', 'hh', 'hh'],
  },

  'sound("bd sd").fast(2)': {
    eventCount: 4,
    durationMultiplier: 0.5,
  },

  'sound("bd sd").gain(0.8)': {
    eventCount: 2,
    gainValue: 0.8,
  },

  'sound("bd").lpf(1000)': {
    eventCount: 1,
    hasEffect: 'lpf',
    effectValue: 1000,
  },
}

export function getAllPatterns(): string[] {
  return [
    ...TEST_PATTERNS.basic,
    ...TEST_PATTERNS.timingCore,
    ...TEST_PATTERNS.audioCore,
    ...TEST_PATTERNS.timingAdvanced,
    ...TEST_PATTERNS.audioAdvanced,
    ...TEST_PATTERNS.patternAdvanced,
    ...TEST_PATTERNS.complex,
    ...TEST_PATTERNS.edgeCases,
  ]
}

export function getPatternsByCategory(category: keyof typeof TEST_PATTERNS): string[] {
  return TEST_PATTERNS[category] || []
}
