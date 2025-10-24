import { useEffect, useRef } from 'react'
import { useStrudel } from '@/store'

export function useKeyboardShortcuts() {
  const { isPlaying, play, stop } = useStrudel()
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
  }, [isPlaying, play, stop])
}
