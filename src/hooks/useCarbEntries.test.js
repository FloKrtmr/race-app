import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useCarbEntries from './useCarbEntries'

beforeEach(() => localStorage.clear())

describe('useCarbEntries', () => {
  it('starts with empty entries', () => {
    const { result } = renderHook(() => useCarbEntries())
    expect(result.current.entries).toEqual([])
  })

  it('addEntry stores entry with rider, amount, label, timestamp', () => {
    const { result } = renderHook(() => useCarbEntries())
    act(() => result.current.addEntry('flo', 40, 'Gel'))
    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0]).toMatchObject({ rider: 'flo', amount: 40, label: 'Gel' })
    expect(typeof result.current.entries[0].id).toBe('string')
    expect(typeof result.current.entries[0].timestamp).toBe('number')
  })

  it('undoLast removes most recent entry for that rider', () => {
    const { result } = renderHook(() => useCarbEntries())
    act(() => result.current.addEntry('flo', 40, 'Gel'))
    act(() => result.current.addEntry('flo', 50, 'Riegel'))
    act(() => result.current.addEntry('tade', 25, 'Banane'))
    act(() => result.current.undoLast('flo'))
    const floEntries = result.current.entries.filter(e => e.rider === 'flo')
    expect(floEntries).toHaveLength(1)
    expect(floEntries[0].label).toBe('Gel')
  })

  it('deleteEntry removes entry by id', () => {
    const { result } = renderHook(() => useCarbEntries())
    act(() => result.current.addEntry('flo', 40, 'Gel'))
    const id = result.current.entries[0].id
    act(() => result.current.deleteEntry(id))
    expect(result.current.entries).toHaveLength(0)
  })

  it('persists entries in localStorage', () => {
    const { result } = renderHook(() => useCarbEntries())
    act(() => result.current.addEntry('tade', 50, 'Riegel'))
    const stored = JSON.parse(localStorage.getItem('carb_entries'))
    expect(stored).toHaveLength(1)
  })
})
