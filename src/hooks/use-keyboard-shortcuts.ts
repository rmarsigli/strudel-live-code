import { useEffect } from 'react'
import { useStrudel } from '@/store'

export function useKeyboardShortcuts() {
  const { isPlaying, play, stop } = useStrudel()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'Enter':
            event.preventDefault()
            if (!isPlaying) {
              play()
            }
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
    }
  }, [isPlaying, play, stop])
}
