import { Header } from '@/components/header'
import { PatternEditor } from '@/components/pattern-editor'
import { ControlPanel } from '@/components/control-panel'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <PatternEditor />
        </div>
      </main>

      <ControlPanel />
      <Toaster />
    </div>
  )
}

export default App
