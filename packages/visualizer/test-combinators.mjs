import { parse } from './dist/index.mjs'

const COMBINATOR_PATTERNS = [
  'sound("bd").append(sound("sd"))',
  'sound("bd").overlay(sound("hh*4"))',
  'sound("bd sd").layer(sound("hh*8"))',
  'sound("bd").fastAppend(sound("sd hh"))',
  'sound("bd*4").slowAppend(sound("cp"))',
  'sound("bd").superimpose(sound("sd"))',
  'stack(sound("bd*4"), sound("~ sd")).overlay(sound("hh*8"))',
  'cat(sound("bd"), sound("sd")).append(sound("hh cp"))',
  'sound("bd").append(sound("sd")).overlay(sound("hh*4"))',
  'sound("bd").overlay(sound("sd")).append(sound("hh"))',
]

console.log('\n🧪 TESTING PATTERN COMBINATORS\n')
console.log('='.repeat(80))

let passed = 0
let failed = 0

for (const pattern of COMBINATOR_PATTERNS) {
  try {
    const result = parse(pattern)

    if (result.success && result.ast) {
      console.log(`✅ ${pattern}`)
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
console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed out of ${COMBINATOR_PATTERNS.length} total`)
console.log(`   Success rate: ${Math.round((passed / COMBINATOR_PATTERNS.length) * 100)}%\n`)

process.exit(failed === 0 ? 0 : 1)
