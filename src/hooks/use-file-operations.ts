import { useCallback } from 'react'
import { useConnection } from '@/store/use-connection'
import { useFiles } from '@/store/use-files'
import { useUI } from '@/store/use-ui'
import type { WSMessage } from '@/types/websocket'

export function useFileOperations() {
  const { ws } = useConnection()
  const { addFile, removeFile, updateFile } = useFiles()
  const { showToast } = useUI()

  const createFile = useCallback(
    (filename: string, content: string) => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        showToast('Not connected to server', 'error')
        return
      }

      const message: WSMessage = {
        type: 'create-file',
        payload: { filename, content },
        timestamp: Date.now(),
      }

      ws.send(JSON.stringify(message))

      addFile({
        name: filename,
        path: `patterns/${filename}`,
        content,
        lastModified: Date.now(),
      })

      showToast(`File ${filename} created`, 'success')
    },
    [ws, addFile, showToast]
  )

  const deleteFile = useCallback(
    (filename: string) => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        showToast('Not connected to server', 'error')
        return
      }

      const message: WSMessage = {
        type: 'delete-file',
        payload: { filename },
        timestamp: Date.now(),
      }

      ws.send(JSON.stringify(message))
      removeFile(filename)
      showToast(`File ${filename} deleted`, 'success')
    },
    [ws, removeFile, showToast]
  )

  const renameFile = useCallback(
    (oldFilename: string, newFilename: string) => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        showToast('Not connected to server', 'error')
        return
      }

      const message: WSMessage = {
        type: 'rename-file',
        payload: { oldFilename, newFilename },
        timestamp: Date.now(),
      }

      ws.send(JSON.stringify(message))
      showToast(`File renamed to ${newFilename}`, 'success')
    },
    [ws, showToast]
  )

  const saveFile = useCallback(
    (filename: string, content: string) => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        showToast('Not connected to server', 'error')
        return
      }

      const message: WSMessage = {
        type: 'save-file',
        payload: { filename, content },
        timestamp: Date.now(),
      }

      ws.send(JSON.stringify(message))
      updateFile(filename, content)
    },
    [ws, updateFile, showToast]
  )

  const requestFileList = useCallback(() => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return
    }

    const message: WSMessage = {
      type: 'get-files',
      timestamp: Date.now(),
    }

    ws.send(JSON.stringify(message))
  }, [ws])

  return {
    createFile,
    deleteFile,
    renameFile,
    saveFile,
    requestFileList,
  }
}
