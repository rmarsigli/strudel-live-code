import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useUI } from './use-ui'

describe('useUI', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    const store = useUI.getState()
    store.clearLogs()
    useUI.setState({ toasts: [], modals: { type: null, isOpen: false } })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have initial state', () => {
    const { logs, modals, toasts } = useUI.getState()

    expect(logs).toEqual([])
    expect(modals).toEqual({ type: null, isOpen: false })
    expect(toasts).toEqual([])
  })

  it('should add log entry', () => {
    const { addLog } = useUI.getState()

    addLog('Test message')
    const logs = useUI.getState().logs

    expect(logs).toHaveLength(1)
    expect(logs[0]!.message).toBe('Test message')
    expect(logs[0]!.level).toBe('info')
    expect(logs[0]!.id).toBeDefined()
    expect(logs[0]!.timestamp).toBeDefined()
  })

  it('should add log with custom level', () => {
    const { addLog } = useUI.getState()

    addLog('Error message', 'error')
    addLog('Warning message', 'warn')

    const logs = useUI.getState().logs
    expect(logs).toHaveLength(2)
    expect(logs[0]!.level).toBe('error')
    expect(logs[1]!.level).toBe('warn')
  })

  it('should limit logs to 100 entries', () => {
    const { addLog } = useUI.getState()

    for (let i = 0; i < 150; i++) {
      addLog(`Message ${i}`)
    }

    const logs = useUI.getState().logs
    expect(logs).toHaveLength(100)
    expect(logs[0]!.message).toBe('Message 50')
    expect(logs[99]!.message).toBe('Message 149')
  })

  it('should clear logs', () => {
    const { addLog, clearLogs } = useUI.getState()

    addLog('Test 1')
    addLog('Test 2')
    expect(useUI.getState().logs).toHaveLength(2)

    clearLogs()
    expect(useUI.getState().logs).toHaveLength(0)
  })

  it('should open modal', () => {
    const { openModal } = useUI.getState()

    openModal('create-file', { filename: 'test.txt' })

    const { modals } = useUI.getState()
    expect(modals.isOpen).toBe(true)
    expect(modals.type).toBe('create-file')
    expect(modals.data).toEqual({ filename: 'test.txt' })
  })

  it('should close modal', () => {
    const { openModal, closeModal } = useUI.getState()

    openModal('create-file', { filename: 'test.txt' })
    expect(useUI.getState().modals.isOpen).toBe(true)

    closeModal()
    const { modals } = useUI.getState()
    expect(modals.isOpen).toBe(false)
    expect(modals.type).toBeNull()
    expect(modals.data).toBeUndefined()
  })

  it('should show toast with default values', () => {
    const { showToast } = useUI.getState()

    showToast('Test toast')

    const toasts = useUI.getState().toasts
    expect(toasts).toHaveLength(1)
    expect(toasts[0]!.message).toBe('Test toast')
    expect(toasts[0]!.type).toBe('info')
    expect(toasts[0]!.duration).toBe(3000)
    expect(toasts[0]!.id).toBeDefined()
  })

  it('should show toast with custom type and duration', () => {
    const { showToast } = useUI.getState()

    showToast('Error toast', 'error', 5000)

    const toasts = useUI.getState().toasts
    expect(toasts[0]!.message).toBe('Error toast')
    expect(toasts[0]!.type).toBe('error')
    expect(toasts[0]!.duration).toBe(5000)
  })

  it('should auto-remove toast after duration', () => {
    const { showToast } = useUI.getState()

    showToast('Test toast', 'info', 1000)
    expect(useUI.getState().toasts).toHaveLength(1)

    vi.advanceTimersByTime(1000)
    expect(useUI.getState().toasts).toHaveLength(0)
  })

  it('should handle multiple toasts', () => {
    const { showToast } = useUI.getState()

    showToast('Toast 1', 'info', 2000)
    showToast('Toast 2', 'success', 3000)
    showToast('Toast 3', 'error', 4000)

    expect(useUI.getState().toasts).toHaveLength(3)

    vi.advanceTimersByTime(2000)
    expect(useUI.getState().toasts).toHaveLength(2)

    vi.advanceTimersByTime(1000)
    expect(useUI.getState().toasts).toHaveLength(1)

    vi.advanceTimersByTime(1000)
    expect(useUI.getState().toasts).toHaveLength(0)
  })

  it('should remove toast manually', () => {
    const { showToast, removeToast } = useUI.getState()

    showToast('Toast 1')
    showToast('Toast 2')

    const toasts = useUI.getState().toasts
    expect(toasts).toHaveLength(2)

    const firstToastId = toasts[0]!.id
    removeToast(firstToastId)

    expect(useUI.getState().toasts).toHaveLength(1)
    expect(useUI.getState().toasts[0]!.message).toBe('Toast 2')
  })
})
