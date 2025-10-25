import { useUI } from '@/store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Cross2Icon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { formatTimestamp } from '@/lib/validation'

export function LogPanel() {
  const { logs, clearLogs, isLogPanelOpen, toggleLogPanel } = useUI()

  if (logs.length === 0) return null

  return (
    <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-border bg-background/95 shadow-lg backdrop-blur transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLogPanel}
            className="h-6 w-6"
            title={isLogPanelOpen ? 'Minimizar console (Ctrl+L)' : 'Expandir console (Ctrl+L)'}
          >
            {isLogPanelOpen ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronUpIcon className="h-4 w-4" />
            )}
          </Button>
          <span className="text-sm font-medium">Console</span>
          {!isLogPanelOpen && logs.length > 0 && (
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
              {logs.length}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={clearLogs}
          className="h-6 w-6"
          title="Limpar console"
        >
          <Cross2Icon className="h-4 w-4" />
        </Button>
      </div>

      {isLogPanelOpen && (
        <div className="px-4 pb-4">
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
      )}
    </div>
  )
}
