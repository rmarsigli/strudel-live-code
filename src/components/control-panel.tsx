import { useStrudel } from '@/store'
import { Button } from '@/components/ui/button'
import { PlayIcon, StopIcon } from '@radix-ui/react-icons'

export function ControlPanel() {
  const { isPlaying, volume, play, stop, setVolume } = useStrudel()

  return (
    <div className="flex items-center gap-4 border-t border-border bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        {!isPlaying ? (
          <Button onClick={play} size="lg" className="gap-2">
            <PlayIcon className="h-5 w-5" />
            <span>Play</span>
          </Button>
        ) : (
          <Button onClick={stop} size="lg" variant="destructive" className="gap-2">
            <StopIcon className="h-5 w-5" />
            <span>Stop</span>
          </Button>
        )}
      </div>

      <div className="flex flex-1 items-center gap-3">
        <span className="text-sm text-muted-foreground">Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="h-2 w-32 cursor-pointer appearance-none rounded-lg bg-secondary accent-primary"
        />
        <span className="w-12 text-sm text-muted-foreground">{Math.round(volume * 100)}%</span>
      </div>

      <div className="text-sm text-muted-foreground">
        Press <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">Ctrl+Enter</kbd> to play
        • <kbd className="rounded bg-muted px-2 py-1 font-mono text-xs">Ctrl+.</kbd> to stop
      </div>
    </div>
  )
}
