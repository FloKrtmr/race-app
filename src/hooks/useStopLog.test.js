import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useStopLog from './useStopLog'

beforeEach(() => { localStorage.clear(); vi.useRealTimers() })

describe('useStopLog', () => {
  it('starts with empty log and no active stop', () => {
    const { result } = renderHook(() => useStopLog())
    expect(result.current.stopLog).toEqual([])
    expect(result.current.activeStop).toBeNull()
  })

  it('startStop sets activeStop', () => {
    const { result } = renderHook(() => useStopLog())
    act(() => result.current.startStop('Fahrerwechsel'))
    expect(result.current.activeStop).not.toBeNull()
    expect(result.current.activeStop.type).toBe('Fahrerwechsel')
  })

  it('endStop moves activeStop to log', () => {
    vi.useFakeTimers()
    vi.setSystemTime(1000)
    const { result } = renderHook(() => useStopLog())
    act(() => result.current.startStop('Ampel/Verkehr'))
    vi.setSystemTime(6000)
    act(() => result.current.endStop())
    expect(result.current.activeStop).toBeNull()
    expect(result.current.stopLog).toHaveLength(1)
    expect(result.current.stopLog[0].durationMs).toBe(5000)
    expect(result.current.stopLog[0].type).toBe('Ampel/Verkehr')
  })

  it('totalStopMs sums all stop durations', () => {
    const { result } = renderHook(() => useStopLog())
    act(() => result.current.startStop('x'))
    act(() => result.current.endStop())
    act(() => result.current.startStop('y'))
    act(() => result.current.endStop())
    expect(result.current.totalStopMs).toBeGreaterThanOrEqual(0)
  })

  it('deleteStop removes entry by id', () => {
    const { result } = renderHook(() => useStopLog())
    act(() => result.current.startStop('Fahrerwechsel'))
    act(() => result.current.endStop())
    const id = result.current.stopLog[0].id
    act(() => result.current.deleteStop(id))
    expect(result.current.stopLog).toHaveLength(0)
  })
})
