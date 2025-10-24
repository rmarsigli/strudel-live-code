import { describe, it, expect, beforeEach } from 'vitest'
import { useFiles } from './use-files'
import type { PatternFile } from '@/types'

describe('useFiles', () => {
  const mockFile1: PatternFile = {
    name: 'test1.txt',
    path: 'patterns/test1.txt',
    content: 's("bd sd")',
    lastModified: Date.now(),
  }

  const mockFile2: PatternFile = {
    name: 'test2.txt',
    path: 'patterns/test2.txt',
    content: 's("hh cp")',
    lastModified: Date.now(),
  }

  beforeEach(() => {
    const store = useFiles.getState()
    store.setFiles([])
    store.setCurrentFile(null)
    store.setLoading(false)
  })

  it('should have initial state', () => {
    const { files, currentFile, isLoading } = useFiles.getState()

    expect(files).toEqual([])
    expect(currentFile).toBeNull()
    expect(isLoading).toBe(false)
  })

  it('should set files', () => {
    const { setFiles } = useFiles.getState()
    const testFiles = [mockFile1, mockFile2]

    setFiles(testFiles)
    expect(useFiles.getState().files).toEqual(testFiles)
  })

  it('should set current file', () => {
    const { setCurrentFile } = useFiles.getState()

    setCurrentFile(mockFile1)
    expect(useFiles.getState().currentFile).toEqual(mockFile1)

    setCurrentFile(null)
    expect(useFiles.getState().currentFile).toBeNull()
  })

  it('should set loading state', () => {
    const { setLoading } = useFiles.getState()

    setLoading(true)
    expect(useFiles.getState().isLoading).toBe(true)

    setLoading(false)
    expect(useFiles.getState().isLoading).toBe(false)
  })

  it('should add file', () => {
    const { addFile } = useFiles.getState()

    addFile(mockFile1)
    expect(useFiles.getState().files).toHaveLength(1)
    expect(useFiles.getState().files[0]).toEqual(mockFile1)

    addFile(mockFile2)
    expect(useFiles.getState().files).toHaveLength(2)
    expect(useFiles.getState().files[1]).toEqual(mockFile2)
  })

  it('should remove file', () => {
    const { setFiles, removeFile } = useFiles.getState()
    setFiles([mockFile1, mockFile2])

    removeFile('test1.txt')
    expect(useFiles.getState().files).toHaveLength(1)
    expect(useFiles.getState().files[0]!.name).toBe('test2.txt')
  })

  it('should remove file and clear current file if it matches', () => {
    const { setFiles, setCurrentFile, removeFile } = useFiles.getState()
    setFiles([mockFile1, mockFile2])
    setCurrentFile(mockFile1)

    removeFile('test1.txt')
    expect(useFiles.getState().currentFile).toBeNull()
  })

  it('should keep current file if removing different file', () => {
    const { setFiles, setCurrentFile, removeFile } = useFiles.getState()
    setFiles([mockFile1, mockFile2])
    setCurrentFile(mockFile1)

    removeFile('test2.txt')
    expect(useFiles.getState().currentFile).toEqual(mockFile1)
  })

  it('should update file content', () => {
    const { setFiles, updateFile } = useFiles.getState()
    setFiles([mockFile1, mockFile2])

    const newContent = 's("bd*4")'
    updateFile('test1.txt', newContent)

    const updatedFile = useFiles.getState().files.find(f => f.name === 'test1.txt')
    expect(updatedFile?.content).toBe(newContent)
    expect(updatedFile?.lastModified).toBeGreaterThan(mockFile1.lastModified)
  })

  it('should update current file content when updating', () => {
    const { setFiles, setCurrentFile, updateFile } = useFiles.getState()
    setFiles([mockFile1])
    setCurrentFile(mockFile1)

    const newContent = 's("bd*4")'
    updateFile('test1.txt', newContent)

    expect(useFiles.getState().currentFile?.content).toBe(newContent)
  })

  it('should rename file', () => {
    const { setFiles, renameFile } = useFiles.getState()
    setFiles([mockFile1, mockFile2])

    renameFile('test1.txt', 'renamed.txt')

    const files = useFiles.getState().files
    expect(files.find(f => f.name === 'test1.txt')).toBeUndefined()
    expect(files.find(f => f.name === 'renamed.txt')).toBeDefined()
  })

  it('should rename current file', () => {
    const { setFiles, setCurrentFile, renameFile } = useFiles.getState()
    setFiles([mockFile1])
    setCurrentFile(mockFile1)

    renameFile('test1.txt', 'renamed.txt')

    expect(useFiles.getState().currentFile?.name).toBe('renamed.txt')
  })

  it('should get file by name', () => {
    const { setFiles, getFileByName } = useFiles.getState()
    setFiles([mockFile1, mockFile2])

    const found = getFileByName('test1.txt')
    expect(found).toEqual(mockFile1)

    const notFound = getFileByName('nonexistent.txt')
    expect(notFound).toBeUndefined()
  })
})
