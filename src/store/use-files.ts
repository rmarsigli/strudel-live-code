import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { PatternFile } from '@/types'

interface FilesState {
  files: PatternFile[]
  currentFile: PatternFile | null
  isLoading: boolean

  setFiles: (files: PatternFile[]) => void
  setCurrentFile: (file: PatternFile | null) => void
  setLoading: (isLoading: boolean) => void
  addFile: (file: PatternFile) => void
  removeFile: (filename: string) => void
  updateFile: (filename: string, content: string) => void
  renameFile: (oldName: string, newName: string) => void
  getFileByName: (filename: string) => PatternFile | undefined
}

export const useFiles = create<FilesState>()(
  devtools(
    persist(
      (set, get) => ({
        files: [],
        currentFile: null,
        isLoading: false,

        setFiles: (files) => set({ files }),

        setCurrentFile: (file) => set({ currentFile: file }),

        setLoading: (isLoading) => set({ isLoading }),

        addFile: (file) => set((state) => {
          const exists = state.files.some(f => f.name === file.name)
          if (exists) {
            return state
          }
          return {
            files: [...state.files, file]
          }
        }),

        removeFile: (filename) => set((state) => ({
          files: state.files.filter(f => f.name !== filename),
          currentFile: state.currentFile?.name === filename ? null : state.currentFile
        })),

        updateFile: (filename, content) => set((state) => ({
          files: state.files.map(f =>
            f.name === filename
              ? { ...f, content, lastModified: Date.now() }
              : f
          ),
          currentFile: state.currentFile?.name === filename
            ? { ...state.currentFile, content, lastModified: Date.now() }
            : state.currentFile
        })),

        renameFile: (oldName, newName) => set((state) => ({
          files: state.files.map(f =>
            f.name === oldName
              ? { ...f, name: newName, lastModified: Date.now() }
              : f
          ),
          currentFile: state.currentFile?.name === oldName
            ? { ...state.currentFile, name: newName, lastModified: Date.now() }
            : state.currentFile
        })),

        getFileByName: (filename) => {
          return get().files.find(f => f.name === filename)
        },
      }),
      {
        name: 'files-storage',
        partialize: (state) => ({
          currentFile: state.currentFile,
        }),
      }
    )
  )
)
