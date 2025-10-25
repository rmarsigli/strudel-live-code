import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import chokidar from 'chokidar'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PATTERNS_DIR = path.join(__dirname, '..', 'src', 'patterns')

export interface FileInfo {
  name: string
  path: string
  content: string
  lastModified: number
}

export class FileManager {
  private watcher: chokidar.FSWatcher | null = null

  async ensurePatternsDir(): Promise<void> {
    try {
      await fs.access(PATTERNS_DIR)
    } catch {
      await fs.mkdir(PATTERNS_DIR, { recursive: true })
    }
  }

  async listFiles(): Promise<string[]> {
    await this.ensurePatternsDir()
    const files = await fs.readdir(PATTERNS_DIR)
    return files.filter(f => f.endsWith('.strudel'))
  }

  async readFile(filename: string): Promise<string> {
    const filePath = path.join(PATTERNS_DIR, filename)
    return await fs.readFile(filePath, 'utf-8')
  }

  async writeFile(filename: string, content: string): Promise<void> {
    const filePath = path.join(PATTERNS_DIR, filename)
    await fs.writeFile(filePath, content, 'utf-8')
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(PATTERNS_DIR, filename)
    await fs.unlink(filePath)
  }

  async renameFile(oldName: string, newName: string): Promise<void> {
    const oldPath = path.join(PATTERNS_DIR, oldName)
    const newPath = path.join(PATTERNS_DIR, newName)
    await fs.rename(oldPath, newPath)
  }

  async getFileInfo(filename: string): Promise<FileInfo> {
    const filePath = path.join(PATTERNS_DIR, filename)
    const content = await this.readFile(filename)
    const stats = await fs.stat(filePath)

    return {
      name: filename,
      path: filePath,
      content,
      lastModified: stats.mtimeMs,
    }
  }

  watchFiles(callback: (filename: string, content: string) => void): void {
    this.watcher = chokidar.watch(`${PATTERNS_DIR}/*.strudel`, {
      persistent: true,
      ignoreInitial: true,
    })

    this.watcher.on('change', async (filePath) => {
      const filename = path.basename(filePath)
      try {
        const content = await this.readFile(filename)
        callback(filename, content)
      } catch (error) {
        console.error(`Error reading file ${filename}:`, error)
      }
    })
  }

  stopWatching(): void {
    if (this.watcher) {
      this.watcher.close()
      this.watcher = null
    }
  }
}
