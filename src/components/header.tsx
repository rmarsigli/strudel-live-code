import { useConnection } from '@/store'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

export function Header() {
  const status = useConnection((state) => state.status)

  const statusColors = {
    connected: 'bg-primary',
    connecting: 'bg-yellow-500',
    disconnected: 'bg-red-500',
    error: 'bg-red-600',
  }

  const statusLabels = {
    connected: 'Connected',
    connecting: 'Connecting...',
    disconnected: 'Disconnected',
    error: 'Error',
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent">
            Strudel Live Code
          </h1>

          <div className="flex items-center gap-2 text-sm">
            <div
              className={`h-3 w-3 rounded-full ${statusColors[status]} ${
                status === 'connected' ? 'animate-pulse' : ''
              }`}
            />
            <span className="text-muted-foreground">{statusLabels[status]}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a
              href="https://github.com/rmarsigli/strudel-live-code"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <GitHubLogoIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
