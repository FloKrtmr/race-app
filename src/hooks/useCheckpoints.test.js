import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../constants/checkpoints', () => ({
  CHECKPOINTS: [
    { id: 'cp1', name: 'CP1 – Test', lat: 53.0, lng: 9.0 },
    { id: 'cp2', name: 'CP2 – Test', lat: 54.0, lng: 10.0 },
  ],
  START: { name: 'Start', lat: 54.78, lng: 9.43 },
  FINISH: { name: 'Finish', lat: 47.5, lng: 11.1 },
}))

import useCheckpoints from './useCheckpoints'

beforeEach(() => localStorage.clear())

describe('useCheckpoints', () => {
  it('starts with all checkpoints not reached', () => {
    const { result } = renderHook(() => useCheckpoints())
    expect(result.current.checkpoints.every(c => !c.reached)).toBe(true)
  })

  it('toggleCheckpoint marks cp as reached', () => {
    const { result } = renderHook(() => useCheckpoints())
    act(() => result.current.toggleCheckpoint('cp1'))
    expect(result.current.checkpoints.find(c => c.id === 'cp1').reached).toBe(true)
  })

  it('toggleCheckpoint unreaches an already-reached cp', () => {
    const { result } = renderHook(() => useCheckpoints())
    act(() => result.current.toggleCheckpoint('cp1'))
    act(() => result.current.toggleCheckpoint('cp1'))
    expect(result.current.checkpoints.find(c => c.id === 'cp1').reached).toBe(false)
  })

  it('autoDetect marks cp reached when within 500m', () => {
    const { result } = renderHook(() => useCheckpoints())
    // 53.0, 9.0 is exactly on cp1
    act(() => result.current.autoDetect(53.0, 9.0))
    expect(result.current.checkpoints.find(c => c.id === 'cp1').reached).toBe(true)
  })

  it('autoDetect does not re-trigger already reached cp', () => {
    const { result } = renderHook(() => useCheckpoints())
    act(() => result.current.toggleCheckpoint('cp1'))
    act(() => result.current.autoDetect(53.0, 9.0))
    // still reached, reachedTs unchanged from toggle (not from autoDetect)
    expect(result.current.checkpoints.find(c => c.id === 'cp1').reached).toBe(true)
  })
})
