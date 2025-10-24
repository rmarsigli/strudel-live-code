import { useEffect, useCallback } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { useStrudel, useFiles } from '@/store'
import { DEBOUNCE_DELAY } from '@/lib/constants'

export function PatternEditor() {
  const { patternCode, setPatternCode } = useStrudel()
  const { currentFile, updateFile } = useFiles()

  const handleChange = useCallback(
    (value: string) => {
      setPatternCode(value)
      if (currentFile) {
        updateFile(currentFile.name, value)
      }
    },
    [setPatternCode, currentFile, updateFile]
  )

  useEffect(() => {
    if (currentFile) {
      setPatternCode(currentFile.content)
    }
  }, [currentFile, setPatternCode])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {currentFile?.name || 'untitled.strudel'}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Auto-save enabled • {DEBOUNCE_DELAY}ms delay
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={patternCode}
          height="100%"
          theme={oneDark}
          extensions={[javascript()]}
          onChange={handleChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            searchKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          className="h-full"
        />
      </div>
    </div>
  )
}
