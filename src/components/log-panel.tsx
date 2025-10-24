import { useUI } from '@/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import { formatTimestamp } from '@/lib/validation'

export function LogPanel() {
  const { logs, clearLogs } = useUI()

  if (logs.length === 0) return null

  return (
    <div className="absolute bottom-20 left-4 right-4 max-h-48 rounded-lg border border-border bg-background/95 p-4 shadow-lg backdrop-blur">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">Console</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={clearLogs}
          className="h-6 w-6"
        >
          <Cross2Icon className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-32">
        <div className="space-y-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`font-mono text-xs ${
                log.level === 'error'
                  ? 'text-destructive'
                  : log.level === 'warn'
                    ? 'text-yellow-500'
                    : 'text-muted-foreground'
              }`}
            >
              <span className="opacity-50">[{formatTimestamp(log.timestamp)}]</span> {log.message}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
