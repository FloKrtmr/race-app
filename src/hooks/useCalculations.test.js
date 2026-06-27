import { describe, it, expect } from 'vitest'
import { calcCarbs, calcStats } from './useCalculations'

const baseConfig = {
  startTime: 1000 * 60 * 60 * 2, // 2 hours after epoch
  flo: { goalPerHour: 60 },
  tade: { goalPerHour: 60 },
  gpxPolyline: [[0,0],[0,1]],
  totalDistanceKm: 111,
}
const getGoal = () => 60

describe('calcCarbs', () => {
  it('returns green status when on track', () => {
    const entries = [{ rider: 'flo', amount: 120, timestamp: baseConfig.startTime + 1000 }]
    const now = baseConfig.startTime + 2 * 3600 * 1000
    const result = calcCarbs(entries, 'flo', baseConfig, getGoal, now)
    expect(result.totalEaten).toBe(120)
    expect(result.shouldHaveEaten).toBeCloseTo(120, 0)
    expect(result.status).toBe('green')
  })

  it('returns red when below 80% of goal', () => {
    const entries = []
    const now = baseConfig.startTime + 2 * 3600 * 1000
    const result = calcCarbs(entries, 'flo', baseConfig, getGoal, now)
    expect(result.status).toBe('red')
  })

  it('returns green when shouldHaveEaten is 0', () => {
    const now = baseConfig.startTime
    const result = calcCarbs([], 'flo', baseConfig, getGoal, now)
    expect(result.status).toBe('green')
  })

  it('does not accumulate shouldHaveEaten for resting rider', () => {
    const startTime = 1000000
    const config = { startTime, flo: { goalPerHour: 60 }, tade: { goalPerHour: 60 }, activeRider: 'tade' }
    const riderHistory = [
      { rider: 'flo', startTs: startTime },            // flo active 0-2h
      { rider: 'tade', startTs: startTime + 7200000 }, // tade active 2-4h
    ]
    const now = startTime + 14400000 // 4 hours in
    const getGoalFixed = () => 60

    const floResult = calcCarbs([], 'flo', config, getGoalFixed, now, riderHistory)
    // Flo only rode 2 hours, so shouldHaveEaten = 120 (not 240)
    expect(floResult.shouldHaveEaten).toBeCloseTo(120, 0)

    const tadeResult = calcCarbs([], 'tade', config, getGoalFixed, now, riderHistory)
    // Tade rode 2 hours, so shouldHaveEaten = 120
    expect(tadeResult.shouldHaveEaten).toBeCloseTo(120, 0)
  })
})

describe('calcStats', () => {
  it('calculates elapsed time', () => {
    const now = baseConfig.startTime + 3600 * 1000
    const result = calcStats(baseConfig, null, [], 0, now)
    expect(result.elapsedMs).toBeCloseTo(3600 * 1000, -3)
  })

  it('calculates movingMs = elapsed - stops', () => {
    const now = baseConfig.startTime + 3600 * 1000
    const result = calcStats(baseConfig, null, [], 600 * 1000, now)
    expect(result.movingMs).toBeCloseTo(3000 * 1000, -3)
  })
})
