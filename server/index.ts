import express from 'express'
import { WebSocketServer, WebSocket } from 'ws'
import { createServer } from 'http'
import { FileManager } from './file-manager.js'

const app = express()
const server = createServer(app)
const wss = new WebSocketServer({ server })
const fileManager = new FileManager()

const PORT = process.env.PORT || 3001

app.use(express.json())

interface WSMessage {
  type: string
  payload?: unknown
}

const clients = new Set<WebSocket>()

function broadcast(message: WSMessage): void {
  const data = JSON.stringify(message)
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected')
  clients.add(ws)

  ws.on('message', async (data: Buffer) => {
    try {
      const message = JSON.parse(data.toString()) as WSMessage

      switch (message.type) {
        case 'get-files': {
          const files = await fileManager.listFiles()
          ws.send(JSON.stringify({
            type: 'file-list',
            payload: { files },
          }))
          break
        }

        case 'get-file': {
          const { filename } = message.payload as { filename: string }
          const content = await fileManager.readFile(filename)
          ws.send(JSON.stringify({
            type: 'file-content',
            payload: { filename, content },
          }))
          break
        }

        case 'create-file': {
          const { filename, content } = message.payload as { filename: string; content: string }
          await fileManager.writeFile(filename, content)
          broadcast({
            type: 'file-created',
            payload: { filename, content },
          })
          break
        }

        case 'delete-file': {
          const { filename } = message.payload as { filename: string }
          await fileManager.deleteFile(filename)
          broadcast({
            type: 'file-deleted',
            payload: { filename },
          })
          break
        }

        case 'rename-file': {
          const { oldName, newName } = message.payload as { oldName: string; newName: string }
          await fileManager.renameFile(oldName, newName)
          broadcast({
            type: 'file-renamed',
            payload: { oldName, newName },
          })
          break
        }

        default:
          console.log('Unknown message type:', message.type)
      }
    } catch (error) {
      console.error('Error processing message:', error)
      ws.send(JSON.stringify({
        type: 'error',
        payload: {
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      }))
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected')
    clients.delete(ws)
  })

  ws.send(JSON.stringify({
    type: 'connection-status',
    payload: { status: 'connected' },
  }))
})

fileManager.watchFiles((filename, content) => {
  console.log(`File changed: ${filename}`)
  broadcast({
    type: 'pattern-update',
    payload: { filename, content },
  })
})

server.listen(PORT, () => {
  console.log(`🎵 Strudel Live Code Server`)
  console.log(`═══════════════════════════════════`)
  console.log(`📡 Server running on: http://localhost:${PORT}`)
  console.log(`🔌 WebSocket ready for connections`)
  console.log(`📝 Watching patterns/ for changes`)
  console.log(`🛑 Press Ctrl+C to stop`)
  console.log('')
})

process.on('SIGINT', () => {
  console.log('\nShutting down...')
  fileManager.stopWatching()
  wss.close()
  server.close()
  process.exit(0)
})
