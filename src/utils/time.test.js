import { describe, it, expect } from 'vitest'
import { formatDuration, formatTime, formatETA } from './time'

describe('formatDuration', () => {
  it('formats milliseconds as HH:MM:SS', () => {
    expect(formatDuration(0)).toBe('00:00:00')
    expect(formatDuration(3661000)).toBe('01:01:01')
    expect(formatDuration(52331000)).toBe('14:32:11')
  })
})

describe('formatTime', () => {
  it('formats timestamp as HH:MM', () => {
    const ts = new Date('2026-07-03T14:32:00').getTime()
    expect(formatTime(ts)).toMatch(/14:32/)
  })
})

describe('formatETA', () => {
  it('formats future timestamp as weekday + time', () => {
    const ts = new Date('2026-07-07T03:20:00').getTime()
    const result = formatETA(ts)
    expect(result).toContain('03:20')
  })
})
