import { useEffect, useRef } from 'react'
import { useStrudel, useUI } from '@/store'

export function useKeyboardShortcuts() {
  const { isPlaying, play, stop } = useStrudel()
  const { toggleLogPanel } = useUI()
  const playTimeoutRef = useRef<number>()

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
