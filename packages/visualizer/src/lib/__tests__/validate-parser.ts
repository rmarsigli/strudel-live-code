import { parse } from '../strudel-parser'
import { interpret } from '../strudel-interpreter'
import { getAllPatterns, EXPECTED_RESULTS } from './test-patterns'

interface TestResult {
  pattern: string
  success: boolean
  error?: string
  ast?: unknown
  eventCount?: number
  warnings?: string[]
}

export function validateAllPatterns(): TestResult[] {
  const patterns = getAllPatterns()
  const results: TestResult[] = []

  for (const pattern of patterns) {
    try {
      const parseResult = parse(pattern)

      if (!parseResult.success) {
        results.push({
          pattern,
          success: false,
          error: `Parse failed: ${parseResult.errors.map(e => e.message).join(', ')}`,
        })
        continue
      }

      const events = interpret(parseResult.ast, 0.5)
      const warnings: string[] = []

      if (pattern in EXPECTED_RESULTS) {
        const expected = EXPECTED_RESULTS[pattern as keyof typeof EXPECTED_RESULTS]

        if ('eventCount' in expected && events.length !== expected.eventCount) {
          warnings.push(`Expected ${expected.eventCount} events, got ${events.length}`)
        }

        if ('sounds' in expected) {
          const actualSounds = events.map(e => e.sound)
          const expectedSounds = expected.sounds
          if (JSON.stringify(actualSounds) !== JSON.stringify(expectedSounds)) {
            warnings.push(`Expected sounds ${expectedSounds.join(',')}, got ${actualSounds.join(',')}`)
          }
        }

        if ('gainValue' in expected) {
          const firstGain = events[0]?.gain
          if (firstGain !== expected.gainValue) {
            warnings.push(`Expected gain ${expected.gainValue}, got ${firstGain}`)
          }
        }

        if ('hasEffect' in expected && 'effectValue' in expected) {
          const effect = expected.hasEffect as keyof typeof events[0]['effects']
          const firstEffect = events[0]?.effects[effect]
          if (firstEffect !== expected.effectValue) {
            warnings.push(`Expected ${effect}=${expected.effectValue}, got ${firstEffect}`)
          }
        }
      }

      results.push({
        pattern,
        success: true,
        ast: parseResult.ast,
        eventCount: events.length,
        warnings: warnings.length > 0 ? warnings : undefined,
      })
    } catch (error) {
      results.push({
        pattern,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  return results
}

export function printResults(results: TestResult[]): void {
  console.log('\n🧪 PARSER VALIDATION RESULTS\n')
  console.log('=' .repeat(80))

  const passed = results.filter(r => r.success && !r.warnings)
  const warnings = results.filter(r => r.success && r.warnings)
  const failed = results.filter(r => !r.success)

  console.log(`\n✅ PASSED: ${passed.length}/${results.length}`)
  console.log(`⚠️  WARNINGS: ${warnings.length}/${results.length}`)
  console.log(`❌ FAILED: ${failed.length}/${results.length}`)

  if (warnings.length > 0) {
    console.log('\n⚠️  PATTERNS WITH WARNINGS:\n')
    for (const result of warnings) {
      console.log(`  Pattern: ${result.pattern}`)
      console.log(`  Events: ${result.eventCount}`)
      if (result.warnings) {
        for (const warning of result.warnings) {
          console.log(`    ⚠️  ${warning}`)
        }
      }
      console.log()
    }
  }

  if (failed.length > 0) {
    console.log('\n❌ FAILED PATTERNS:\n')
    for (const result of failed) {
      console.log(`  Pattern: ${result.pattern}`)
      console.log(`  Error: ${result.error}`)
      console.log()
    }
  }

  console.log('=' .repeat(80))
  console.log()
}

if (require.main === module) {
  const results = validateAllPatterns()
  printResults(results)

  process.exit(results.every(r => r.success) ? 0 : 1)
}
