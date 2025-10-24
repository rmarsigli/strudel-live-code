import { Header } from '@/components/header'
import { FileBrowser } from '@/components/file-browser'
import { PatternEditor } from '@/components/pattern-editor'
import { ControlPanel } from '@/components/control-panel'
import { LogPanel } from '@/components/log-panel'
import { Visualizer } from '@/components/visualizer'
import { Toaster } from '@/components/ui/sonner'
import { useWebSocket } from '@/hooks/use-websocket'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'
import { useStrudelEngine } from '@/hooks/use-strudel-engine'

function App() {
  useWebSocket()
  useKeyboardShortcuts()
  useStrudelEngine()

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex flex-1 overflow-hidden relative">
        <FileBrowser />

        <div className="flex flex-1 flex-col">
          <div className="h-48 border-b border-border">
            <Visualizer />
          </div>
          <div className="flex-1">
            <PatternEditor />
          </div>
        </div>

        <LogPanel />
      </main>

      <ControlPanel />
      <Toaster />
    </div>
  )
}

export default App
