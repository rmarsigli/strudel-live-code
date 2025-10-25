import { parse } from './dist/index.mjs'

const tests = [
  'sound("bd").append(sound("sd"))',
  'sound("bd").overlay(sound("hh*4"))',
  'sound("bd sd").layer(sound("hh*8"))'
]

console.log('\n🧪 TESTING PATTERN COMBINATORS\n')

for (const pattern of tests) {
  console.log(`Pattern: ${pattern}`)
  const result = parse(pattern)
  console.log(`Success: ${result.success}`)

  if (result.success && result.ast) {
    console.log(`AST type: ${result.ast.type}`)
    if (result.ast.modifiers) {
      console.log(`Modifiers: ${result.ast.modifiers.length}`)
      for (const mod of result.ast.modifiers) {
        console.log(`  - ${mod.name}(${mod.args.length} args)`)
        for (const arg of mod.args) {
          if (typeof arg === 'object' && arg !== null && 'type' in arg) {
            console.log(`    → Pattern: ${arg.type}`)
          } else {
            console.log(`    → ${typeof arg}: ${arg}`)
          }
        }
      }
    }
  } else {
    console.log(`Errors: ${result.errors.map(e => e.message).join(', ')}`)
  }
  console.log()
}
