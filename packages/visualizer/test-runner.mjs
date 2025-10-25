import { parse } from './dist/index.mjs'

const TEST_PATTERNS = [
  'sound("bd sd hh cp")',
  'sound("bd*4 ~ sd hh*2")',
  'stack(sound("bd*4"), sound("~ sd"))',
  'cat(sound("bd"), sound("sd"), sound("hh"))',
  's("bd [sd cp] hh")',

  'sound("bd sd").fast(2)',
  'sound("hh*8").slow(0.5)',
  'sound("bd").ply(3).cpm(140)',

  'sound("bd sd").gain(0.8).lpf(1000)',
  'sound("hh*8").hpf(500).crush(4)',
  'sound("bd").distort(0.5).coarse(2)',

  'sound("hh*8").degrade().rev()',
  'sound("bd sd hh cp").palindrome().iter(2)',

  'sound("bd").tremolo(4).room(0.5)',
  'sound("bd sd").djf(0.5).pitch(7)',

  'sound("bd(3,8)").gain(0.8)',

  'sound("bd").append(sound("sd"))',
  'sound("bd").overlay(sound("hh*4"))',

  'stack(sound("bd*4").fast(2), sound("~ sd").gain(0.8), sound("hh*8").lpf(2000))',
  'cat(sound("bd").crush(4), sound("sd").distort(0.5)).slow(2)',
  'sound("bd sd hh cp").fast(2).gain(0.7).lpf(1500).room(0.3)',
]

console.log('\n🧪 TESTING PARSER WITH 21 PATTERNS\n')
console.log('='.repeat(80))

let passed = 0
let failed = 0

for (const pattern of TEST_PATTERNS) {
  try {
    const result = parse(pattern)

    if (result.success && result.ast) {
      console.log(`✅ ${pattern.substring(0, 60)}${pattern.length > 60 ? '...' : ''}`)
      passed++
    } else {
      console.log(`❌ ${pattern}`)
      console.log(`   Errors: ${result.errors.map(e => e.message).join(', ')}`)
      failed++
    }
  } catch (error) {
    console.log(`❌ ${pattern}`)
    console.log(`   Exception: ${error.message}`)
    failed++
  }
}

console.log('\n' + '='.repeat(80))
console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed out of ${TEST_PATTERNS.length} total`)
console.log(`   Success rate: ${Math.round((passed / TEST_PATTERNS.length) * 100)}%\n`)

process.exit(failed === 0 ? 0 : 1)
