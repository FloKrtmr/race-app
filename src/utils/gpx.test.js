import { describe, it, expect } from 'vitest'
import { parseGpx, downsample } from './gpx'

const SAMPLE_GPX = `<?xml version="1.0"?>
<gpx version="1.1">
  <trk><trkseg>
    <trkpt lat="53.0" lon="9.0"></trkpt>
    <trkpt lat="53.5" lon="9.5"></trkpt>
    <trkpt lat="54.0" lon="10.0"></trkpt>
  </trkseg></trk>
</gpx>`

describe('parseGpx', () => {
  it('extracts track points as [lat, lng] pairs', () => {
    const pts = parseGpx(SAMPLE_GPX)
    expect(pts).toHaveLength(3)
    expect(pts[0]).toEqual([53.0, 9.0])
    expect(pts[2]).toEqual([54.0, 10.0])
  })
})

describe('downsample', () => {
  it('returns points unchanged if already below max', () => {
    const pts = [[0,0],[1,1],[2,2]]
    expect(downsample(pts, 10)).toHaveLength(3)
  })

  it('reduces to roughly maxPoints when input is large', () => {
    const pts = Array.from({ length: 1000 }, (_, i) => [i * 0.01, 0])
    const result = downsample(pts, 100)
    expect(result.length).toBeLessThanOrEqual(101)
    expect(result[0]).toEqual(pts[0])
    expect(result[result.length - 1]).toEqual(pts[pts.length - 1])
  })
})
