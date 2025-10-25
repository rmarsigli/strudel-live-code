import { parse, interpret } from './dist/index.mjs'

const VISUALIZATION_PATTERNS = [
  { name: 'Basic beat', pattern: 'sound("bd sd hh cp")' },
  { name: 'Fast hi-hats', pattern: 'sound("hh*8").gain(0.6)' },
  { name: 'Euclidean kick', pattern: 'sound("bd(3,8)").gain(0.9)' },
  { name: 'Layered drums', pattern: 'stack(sound("bd*4"), sound("~ sd"), sound("hh*8"))' },
  { name: 'With effects', pattern: 'sound("bd sd").fast(2).lpf(1000).gain(0.8)' },
]

console.log('\n🎨 VISUALIZATION EVENT GENERATION TEST\n')
console.log('='.repeat(80))

for (const { name, pattern } of VISUALIZATION_PATTERNS) {
  console.log(`\n📊 ${name}`)
  console.log(`   Pattern: ${pattern}`)

  const result = parse(pattern)
  if (!result.success || !result.ast) {
    console.log(`   ❌ Parse failed: ${result.errors.map(e => e.message).join(', ')}`)
    continue
  }

  const events = interpret(result.ast)

  console.log(`   ✅ Generated ${events.length} events`)

  if (events.length > 0) {
    const timeline = new Map()

    for (const event of events) {
      const timeSlot = Math.floor(event.time * 10) / 10
      if (!timeline.has(timeSlot)) {
        timeline.set(timeSlot, [])
      }
      timeline.get(timeSlot).push(event)
    }

    console.log(`\n   Timeline (first 8 beats):`)
    const sortedTimes = Array.from(timeline.keys()).sort((a, b) => a - b).slice(0, 8)

    for (const time of sortedTimes) {
      const eventsAtTime = timeline.get(time)
      const symbols = eventsAtTime.map(e => {
        const symbol = e.type === 'kick' ? 'K' :
                      e.type === 'snare' ? 'S' :
                      e.type === 'hihat' ? 'H' :
                      e.type === 'perc' ? 'P' : 'X'
        const gain = Math.round(e.gain * 10) / 10
        return `${symbol}${gain !== 1.0 ? gain.toFixed(1) : ''}`
      }).join(' ')

      const bar = '█'.repeat(Math.min(eventsAtTime.length * 3, 40))
      console.log(`   ${time.toFixed(2)}s: ${bar} ${symbols}`)
    }

    const typeCount = events.reduce((acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1
      return acc
    }, {})

    console.log(`\n   Event breakdown:`)
    for (const [type, count] of Object.entries(typeCount)) {
      console.log(`     - ${type}: ${count}`)
    }

    const avgGain = events.reduce((sum, e) => sum + e.gain, 0) / events.length
    const avgDuration = events.reduce((sum, e) => sum + e.duration, 0) / events.length
    const totalTime = Math.max(...events.map(e => e.time + e.duration))

    console.log(`\n   Stats:`)
    console.log(`     - Total duration: ${totalTime.toFixed(2)}s`)
    console.log(`     - Average gain: ${avgGain.toFixed(2)}`)
    console.log(`     - Average duration: ${avgDuration.toFixed(3)}s`)
    console.log(`     - Events per second: ${(events.length / totalTime).toFixed(1)}`)

    const hasEffects = events.some(e =>
      e.effects.lpf || e.effects.hpf || e.effects.crush ||
      e.effects.distort || e.effects.room || e.effects.tremolo
    )

    if (hasEffects) {
      console.log(`\n   Effects applied:`)
      const effectTypes = new Set()
      for (const event of events) {
        if (event.effects.lpf) effectTypes.add(`lpf(${event.effects.lpf})`)
        if (event.effects.hpf) effectTypes.add(`hpf(${event.effects.hpf})`)
        if (event.effects.crush) effectTypes.add(`crush(${event.effects.crush})`)
        if (event.effects.distort) effectTypes.add(`distort(${event.effects.distort})`)
        if (event.effects.room) effectTypes.add(`room(${event.effects.room})`)
        if (event.effects.tremolo) effectTypes.add(`tremolo(${event.effects.tremolo})`)
      }
      for (const effect of effectTypes) {
        console.log(`     - ${effect}`)
      }
    }
  }
}

console.log('\n' + '='.repeat(80))
console.log('\n✅ Visualization test complete!\n')
console.log('📝 Events are ready to be used by visualizer component.')
console.log('   Each event contains:')
console.log('   - sound: string (sample name)')
console.log('   - time: number (when to play)')
console.log('   - duration: number (how long)')
console.log('   - type: SoundType (kick/snare/hihat/etc)')
console.log('   - gain: number (volume)')
console.log('   - speed: number (playback speed)')
console.log('   - effects: object (lpf, hpf, crush, etc)')
console.log('   - probability: number (0-1)')
console.log('   - sampleIndex?: number (which sample variation)\n')
