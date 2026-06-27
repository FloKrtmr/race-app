import { describe, it, expect } from 'vitest'
import { haversineKm, projectOnPolyline } from './geo'

describe('haversineKm', () => {
  it('returns 0 for same point', () => {
    expect(haversineKm(53.0, 9.0, 53.0, 9.0)).toBe(0)
  })

  it('returns approx 111km per degree latitude', () => {
    const d = haversineKm(53.0, 9.0, 54.0, 9.0)
    expect(d).toBeGreaterThan(110)
    expect(d).toBeLessThan(112)
  })
})

describe('projectOnPolyline', () => {
  const line = [[0, 0], [0, 1], [0, 2]]

  it('projects point at start → distance 0, fraction 0', () => {
    const r = projectOnPolyline(0, 0, line)
    expect(r.fraction).toBeCloseTo(0, 1)
    expect(r.distanceKm).toBeCloseTo(0, 0)
  })

  it('projects point at end → fraction 1', () => {
    const r = projectOnPolyline(0, 2, line)
    expect(r.fraction).toBeCloseTo(1, 1)
  })

  it('projects midpoint → fraction ~0.5', () => {
    const r = projectOnPolyline(0, 1, line)
    expect(r.fraction).toBeCloseTo(0.5, 1)
  })
})
