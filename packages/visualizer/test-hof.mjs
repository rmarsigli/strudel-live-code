import { parse } from './dist/index.mjs'

const HOF_PATTERNS = [
  'sound("bd sd").sometimes(fast(2))',
  'sound("hh*8").often(slow(0.5))',
  'sound("bd").rarely(gain(0.5))',
  'sound("hh*4").almostNever(crush(4))',
  'sound("bd sd").almostAlways(lpf(1000))',
  'sound("bd").never(fast(2))',
  'sound("hh").always(gain(0.8))',
  'sound("bd sd hh").sometimes(rev())',
  'sound("bd*4").often(degrade())',
  'sound("hh*8").rarely(palindrome())',
  'sound("bd").almostNever(distort(0.5))',
  'sound("hh*4").almostAlways(speed(1.5))',
]

console.log('\n🧪 TESTING HIGHER-ORDER FUNCTIONS\n')
console.log('='.repeat(80))

let passed = 0
let failed = 0

for (const pattern of HOF_PATTERNS) {
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
console.log(`\n📊 RESULTS: ${passed} passed, ${failed} failed out of ${HOF_PATTERNS.length} total`)
console.log(`   Success rate: ${Math.round((passed / HOF_PATTERNS.length) * 100)}%\n`)

process.exit(failed === 0 ? 0 : 1)
