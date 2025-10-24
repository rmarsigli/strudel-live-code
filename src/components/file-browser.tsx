import { useState } from 'react'
import { useFiles, useConnection } from '@/store'
import { useFileOperations } from '@/hooks/use-file-operations'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PlusIcon, FileTextIcon, TrashIcon } from '@radix-ui/react-icons'
import { CreateFileModal } from '@/components/modals/create-file-modal'
import { DeleteFileModal } from '@/components/modals/delete-file-modal'

export function FileBrowser() {
  const { files, currentFile, setCurrentFile } = useFiles()
  const { ws } = useConnection()
  const { createFile, deleteFile } = useFileOperations()
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)

  const handleCreateFile = (filename: string, content: string) => {
    createFile(filename, content)
  }

  const handleDeleteFile = () => {
    if (fileToDelete) {
      deleteFile(fileToDelete)
      setFileToDelete(null)
    }
  }

  const handleFileClick = (file: typeof files[0]) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'get-file',
        payload: { filename: file.name },
        timestamp: Date.now(),
      }))
    }
    setCurrentFile(file)
  }

  const handleDeleteClick = (filename: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFileToDelete(filename)
    setDeleteModalOpen(true)
  }

  return (
    <>
      <div className="flex h-full w-64 flex-col border-r border-border bg-muted/30">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold">Patterns</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCreateModalOpen(true)}
            className="h-8 w-8"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {files.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No patterns yet. Create one to get started!
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.name}
                  className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent cursor-pointer transition-colors ${
                    currentFile?.name === file.name ? 'bg-accent' : ''
                  }`}
                  onClick={() => handleFileClick(file)}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <FileTextIcon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => handleDeleteClick(file.name, e)}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <TrashIcon className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      <CreateFileModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onConfirm={handleCreateFile}
      />

      <DeleteFileModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        filename={fileToDelete}
        onConfirm={handleDeleteFile}
      />
    </>
  )
}
