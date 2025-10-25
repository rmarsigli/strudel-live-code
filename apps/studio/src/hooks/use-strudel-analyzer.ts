import { useEffect, useState, useMemo } from 'react'
import { useStrudel } from '@/store'
import { parse } from '@/lib/strudel-parser'
import { interpret } from '@/lib/strudel-interpreter'
import type { AudioEvent, ParseResult } from '@/types/strudel-ast'

export function useStrudelAnalyzer() {
  const { patternCode, isPlaying } = useStrudel()
  const [events, setEvents] = useState<AudioEvent[]>([])
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)

  const cps = useMemo(() => {
    if (!isPlaying) return 0.5

    const scheduler = window.strudel?.scheduler as unknown as {
      cps?: number
    }

    return scheduler?.cps || 0.5
  }, [isPlaying])

  useEffect(() => {
    try {
      const result = parse(patternCode)
      setParseResult(result)

      if (result.success && result.ast) {
        const parsedEvents = interpret(result.ast, cps)
        setEvents(parsedEvents)
      } else {
        setEvents([])
      }
    } catch (error) {
      console.error('[StrudelAnalyzer] Parse error:', error)
      setEvents([])
      setParseResult({
        ast: null,
        errors: [{
          message: error instanceof Error ? error.message : 'Unknown error',
          token: { type: 'EOF', value: '', position: 0, line: 0, column: 0 },
          position: 0
        }],
        success: false
      })
    }
  }, [patternCode, cps])

  return {
    events,
    parseResult,
    hasErrors: parseResult ? !parseResult.success : false,
    errorCount: parseResult?.errors.length || 0
  }
}
