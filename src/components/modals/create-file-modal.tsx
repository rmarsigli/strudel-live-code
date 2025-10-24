import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUI } from '@/store'
import { PATTERN_TEMPLATES, type TemplateType } from '@/lib/constants'
import { sanitizeFilename } from '@/lib/validation'

interface CreateFileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (filename: string, content: string) => void
}

export function CreateFileModal({ open, onOpenChange, onConfirm }: CreateFileModalProps) {
  const [filename, setFilename] = useState('')
  const [template, setTemplate] = useState<TemplateType>('blank')
  const { showToast } = useUI()

  const handleCreate = () => {
    if (!filename.trim()) {
      showToast('Please enter a filename', 'error')
      return
    }

    const sanitized = sanitizeFilename(filename)
    const content = PATTERN_TEMPLATES[template]

    onConfirm(sanitized, content)
    setFilename('')
    setTemplate('blank')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Pattern</DialogTitle>
          <DialogDescription>
            Create a new Strudel pattern file. Choose a template to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="filename">Filename</Label>
            <Input
              id="filename"
              placeholder="my-pattern"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <p className="text-xs text-muted-foreground">
              Extension .strudel will be added automatically
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="template">Template</Label>
            <select
              id="template"
              value={template}
              onChange={(e) => setTemplate(e.target.value as TemplateType)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="blank">Blank</option>
              <option value="techno">Techno</option>
              <option value="ambient">Ambient</option>
              <option value="drum-bass">Drum & Bass</option>
              <option value="melodic">Melodic</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
