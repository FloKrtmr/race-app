import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useRaceConfig from './useRaceConfig'

beforeEach(() => localStorage.clear())

describe('useRaceConfig', () => {
  it('returns null config when not started', () => {
    const { result } = renderHook(() => useRaceConfig())
    expect(result.current.raceConfig).toBeNull()
  })

  it('startRace saves config and sets startTime', () => {
    const { result } = renderHook(() => useRaceConfig())
    act(() => {
      result.current.startRace({
        flo: { goalPerHour: 75 },
        tade: { goalPerHour: 80 },
        gpxPolyline: [[53, 9], [54, 10]],
        totalDistanceKm: 1008,
      })
    })
    expect(result.current.raceConfig).not.toBeNull()
    expect(result.current.raceConfig.flo.goalPerHour).toBe(75)
    expect(result.current.raceConfig.activeRider).toBe('flo')
    expect(typeof result.current.raceConfig.startTime).toBe('number')
  })

  it('resetRace clears config', () => {
    const { result } = renderHook(() => useRaceConfig())
    act(() => result.current.startRace({ flo: { goalPerHour: 75 }, tade: { goalPerHour: 75 }, gpxPolyline: [], totalDistanceKm: 0 }))
    act(() => result.current.resetRace())
    expect(result.current.raceConfig).toBeNull()
  })

  it('setActiveRider updates active rider', () => {
    const { result } = renderHook(() => useRaceConfig())
    act(() => result.current.startRace({ flo: { goalPerHour: 75 }, tade: { goalPerHour: 75 }, gpxPolyline: [], totalDistanceKm: 0 }))
    act(() => result.current.setActiveRider('tade'))
    expect(result.current.raceConfig.activeRider).toBe('tade')
  })

  it('getGoalForHour returns default when no override', () => {
    const { result } = renderHook(() => useRaceConfig())
    act(() => result.current.startRace({ flo: { goalPerHour: 75 }, tade: { goalPerHour: 80 }, gpxPolyline: [], totalDistanceKm: 0 }))
    expect(result.current.getGoalForHour('flo', 3)).toBe(75)
  })

  it('getGoalForHour returns override when set', () => {
    const { result } = renderHook(() => useRaceConfig())
    act(() => result.current.startRace({ flo: { goalPerHour: 75 }, tade: { goalPerHour: 80 }, gpxPolyline: [], totalDistanceKm: 0 }))
    act(() => result.current.setHourOverride('flo', 3, 0))
    expect(result.current.getGoalForHour('flo', 3)).toBe(0)
  })
})
