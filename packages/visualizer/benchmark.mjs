import { parse, interpret } from './dist/index.mjs'

const BENCHMARK_PATTERNS = [
  { name: 'Simple sound', pattern: 'sound("bd sd hh cp")' },
  { name: 'Mini-notation', pattern: 'sound("bd*4 ~ sd hh*2")' },
  { name: 'Stack', pattern: 'stack(sound("bd*4"), sound("~ sd"))' },
  { name: 'Fast modifier', pattern: 'sound("bd sd").fast(2)' },
  { name: 'Multiple modifiers', pattern: 'sound("bd sd").fast(2).gain(0.8).lpf(1000)' },
  { name: 'Euclidean', pattern: 'sound("bd(3,8)").gain(0.8)' },
  { name: 'Higher-order', pattern: 'sound("hh*8").sometimes(fast(2))' },
  { name: 'Combinators', pattern: 'sound("bd").append(sound("sd")).overlay(sound("hh*4"))' },
  { name: 'Complex nested', pattern: 'stack(sound("bd*4").fast(2), sound("~ sd").gain(0.8), sound("hh*8").lpf(2000))' },
  { name: 'Very complex', pattern: 'sound("bd sd hh cp").fast(2).gain(0.7).lpf(1500).room(0.3).sometimes(crush(4))' },
]

console.log('\n⚡ PERFORMANCE BENCHMARK\n')
console.log('='.repeat(80))

const iterations = 1000
const results = []

for (const { name, pattern } of BENCHMARK_PATTERNS) {
  const parseStart = performance.now()
  for (let i = 0; i < iterations; i++) {
    parse(pattern)
  }
  const parseEnd = performance.now()
  const parseTime = parseEnd - parseStart

  const result = parse(pattern)
  if (!result.success || !result.ast) {
    console.log(`❌ ${name}: Parse failed`)
    continue
  }

  const interpretStart = performance.now()
  for (let i = 0; i < iterations; i++) {
    interpret(result.ast)
  }
  const interpretEnd = performance.now()
  const interpretTime = interpretEnd - interpretStart

  const totalTime = parseTime + interpretTime
  const avgParse = parseTime / iterations
  const avgInterpret = interpretTime / iterations
  const avgTotal = totalTime / iterations

  results.push({
    name,
    avgParse,
    avgInterpret,
    avgTotal,
    pattern
  })

  console.log(`\n📊 ${name}`)
  console.log(`   Pattern: ${pattern.substring(0, 60)}${pattern.length > 60 ? '...' : ''}`)
  console.log(`   Parse:     ${avgParse.toFixed(3)}ms (${parseTime.toFixed(0)}ms total)`)
  console.log(`   Interpret: ${avgInterpret.toFixed(3)}ms (${interpretTime.toFixed(0)}ms total)`)
  console.log(`   Total:     ${avgTotal.toFixed(3)}ms per iteration`)
  console.log(`   Rate:      ${(1000 / avgTotal).toFixed(0)} ops/sec`)
}

console.log('\n' + '='.repeat(80))
console.log('\n📈 SUMMARY\n')

const avgParseAll = results.reduce((sum, r) => sum + r.avgParse, 0) / results.length
const avgInterpretAll = results.reduce((sum, r) => sum + r.avgInterpret, 0) / results.length
const avgTotalAll = results.reduce((sum, r) => sum + r.avgTotal, 0) / results.length

console.log(`Average Parse:     ${avgParseAll.toFixed(3)}ms`)
console.log(`Average Interpret: ${avgInterpretAll.toFixed(3)}ms`)
console.log(`Average Total:     ${avgTotalAll.toFixed(3)}ms`)
console.log(`Average Rate:      ${(1000 / avgTotalAll).toFixed(0)} ops/sec`)

const slowest = results.reduce((max, r) => r.avgTotal > max.avgTotal ? r : max)
const fastest = results.reduce((min, r) => r.avgTotal < min.avgTotal ? r : min)

console.log(`\nFastest: ${fastest.name} (${fastest.avgTotal.toFixed(3)}ms)`)
console.log(`Slowest: ${slowest.name} (${slowest.avgTotal.toFixed(3)}ms)`)

console.log(`\n✅ Benchmark complete! Tested ${iterations} iterations per pattern.\n`)
