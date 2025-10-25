import { useEffect, useRef } from 'react'
import { useStrudel, useUI } from '@/store'

/**
 * Custom hook for handling keyboard shortcuts in the Strudel editor
 *
 * Provides keyboard shortcuts for common actions:
 * - `Ctrl+Enter` / `Cmd+Enter`: Play/evaluate the current pattern
 * - `Ctrl+.` / `Cmd+.`: Stop playback
 * - `Ctrl+S` / `Cmd+S`: Save (currently disabled to prevent browser save dialog)
 * - `Ctrl+L` / `Cmd+L`: Toggle log panel visibility
 *
 * The hook automatically adds and removes event listeners, and includes debouncing
 * for the play command to prevent accidental double-triggers.
 *
 * @example
 * ```tsx
 * function Editor() {
 *   useKeyboardShortcuts() // Just call it, no return value
 *
 *   return <CodeMirror />
 * }
 * ```
 */
export function useKeyboardShortcuts() {
  const { isPlaying, play, stop } = useStrudel()
  const toggleLogPanel = useUI(state => state.toggleLogPanel)
  const playTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'Enter':
            event.preventDefault()
            if (playTimeoutRef.current) {
              clearTimeout(playTimeoutRef.current)
            }
            playTimeoutRef.current = setTimeout(() => {
              play()
            }, 200)
            break

          case '.':
            event.preventDefault()
            if (isPlaying) {
              stop()
            }
            break

          case 's':
            event.preventDefault()
            break

          case 'l':
            event.preventDefault()
            toggleLogPanel()
            break

          default:
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
      }
    }
  }, [isPlaying, play, stop, toggleLogPanel])
}
