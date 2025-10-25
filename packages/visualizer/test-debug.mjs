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
  'sound("bd sd").sometimes(fast(2))',
  'sound("hh*8").often(slow(0.5))',

  'sound("bd sd hh").note(0).scale("minor")',
  'sound("bd").legato(0.5).ghost()',
  'sound("hh*8").shuffle(4).swing()',

  'stack(sound("bd*4").fast(2), sound("~ sd").gain(0.8), sound("hh*8").lpf(2000))',
  'cat(sound("bd").crush(4), sound("sd").distort(0.5)).slow(2)',
  'sound("bd sd hh cp").fast(2).gain(0.7).lpf(1500).room(0.3)',
]

console.log('\n🔍 DEBUGGING INFINITE LOOP\n')
console.log('='.repeat(80))

let passed = 0
let failed = 0

for (let i = 0; i < TEST_PATTERNS.length; i++) {
  const pattern = TEST_PATTERNS[i]
  console.log(`\n[${i + 1}/${TEST_PATTERNS.length}] Testing: ${pattern.substring(0, 60)}${pattern.length > 60 ? '...' : ''}`)

  try {
    console.log('  → Parsing...')
    const result = parse(pattern)

    if (result.success && result.ast) {
      console.log('  ✅ Parse successful')
      console.log(`  → AST type: ${result.ast.type}`)
      console.log(`  → Modifiers: ${result.ast.modifiers?.length || 0}`)
      passed++
    } else {
      console.log(`  ❌ Parse failed: ${result.errors.map(e => e.message).join(', ')}`)
      failed++
    }
  } catch (error) {
    console.log(`  ❌ Exception: ${error.message}`)
    console.log(`  Stack: ${error.stack}`)
    failed++
  }

  console.log(`  → Progress: ${passed + failed}/${TEST_PATTERNS.length}`)
}

console.log('\n' + '='.repeat(80))
console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed out of ${TEST_PATTERNS.length} total`)
console.log(`   Success rate: ${Math.round((passed / TEST_PATTERNS.length) * 100)}%\n`)

process.exit(failed === 0 ? 0 : 1)
