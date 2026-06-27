import { projectOnPolyline } from '../utils/geo'

export function calcCarbs(entries, rider, raceConfig, getGoalForHour, now, riderHistory = []) {
  if (!raceConfig) return { totalEaten: 0, shouldHaveEaten: 0, delta: 0, status: 'green', hourlyBreakdown: [] }

  const { startTime } = raceConfig
  const riderEntries = entries.filter(e => e.rider === rider)
  const totalEaten = riderEntries.reduce((sum, e) => sum + e.amount, 0)

  const totalHours = Math.floor((now - startTime) / 3_600_000)

  // Compute shouldHaveEaten only for hours when this rider was active
  const history = [...(riderHistory ?? [])].sort((a, b) => a.startTs - b.startTs)

  let shouldHaveEaten = 0
  if (history.length === 0) {
    // Fallback: no history, accumulate for all hours (legacy behaviour)
    for (let h = 0; h < totalHours; h++) {
      shouldHaveEaten += getGoalForHour(rider, h)
    }
    const fraction = ((now - startTime) % 3_600_000) / 3_600_000
    shouldHaveEaten += getGoalForHour(rider, totalHours) * fraction
  } else {
    for (let h = 0; h <= totalHours; h++) {
      const hourStartMs = startTime + h * 3_600_000
      const hourEndMs = hourStartMs + 3_600_000
      // Clamp hour end to now for the current (partial) hour
      const effectiveEnd = Math.min(hourEndMs, now)
      if (effectiveEnd <= hourStartMs) break

      // Determine active fraction for this rider during this hour
      let activeFraction = 0
      for (let i = 0; i < history.length; i++) {
        if (history[i].rider !== rider) continue
        const segStart = history[i].startTs
        const segEnd = history[i + 1]?.startTs ?? now
        // Overlap of [segStart, segEnd) with [hourStartMs, effectiveEnd)
        const overlapStart = Math.max(segStart, hourStartMs)
        const overlapEnd = Math.min(segEnd, effectiveEnd)
        if (overlapEnd > overlapStart) {
          activeFraction += (overlapEnd - overlapStart) / (effectiveEnd - hourStartMs)
        }
      }

      shouldHaveEaten += getGoalForHour(rider, h) * activeFraction
    }
  }

  const delta = totalEaten - shouldHaveEaten
  const ratio = shouldHaveEaten === 0 ? 1 : totalEaten / shouldHaveEaten
  const status = ratio >= 1 ? 'green' : ratio >= 0.8 ? 'yellow' : 'red'

  const hourlyBreakdown = []
  for (let h = 0; h <= totalHours; h++) {
    const segStart = startTime + h * 3_600_000
    const segEnd = segStart + 3_600_000
    const eaten = riderEntries
      .filter(e => e.timestamp >= segStart && e.timestamp < segEnd)
      .reduce((s, e) => s + e.amount, 0)
    const goal = getGoalForHour(rider, h)
    hourlyBreakdown.push({ hour: h, eaten, goal })
  }

  return { totalEaten, shouldHaveEaten, delta, status, hourlyBreakdown }
}

export function calcStats(raceConfig, currentPos, polyline, totalStopMs, now) {
  if (!raceConfig) return null

  const elapsedMs = now - raceConfig.startTime
  const movingMs = Math.max(0, elapsedMs - totalStopMs)

  let distanceCoveredKm = 0
  let distanceRemainingKm = raceConfig.totalDistanceKm ?? 0

  if (currentPos && polyline?.length > 1) {
    const proj = projectOnPolyline(currentPos.lat, currentPos.lng, polyline)
    distanceCoveredKm = proj.distanceKm
    distanceRemainingKm = proj.totalKm - proj.distanceKm
  }

  const avgSpeedKmh = elapsedMs > 0 ? distanceCoveredKm / (elapsedMs / 3_600_000) : 0
  const avgMovingSpeedKmh = movingMs > 0 ? distanceCoveredKm / (movingMs / 3_600_000) : 0

  const etaTotalMs = avgSpeedKmh > 0 ? now + (distanceRemainingKm / avgSpeedKmh) * 3_600_000 : null
  const etaMovingMs = avgMovingSpeedKmh > 0 ? now + (distanceRemainingKm / avgMovingSpeedKmh) * 3_600_000 : null
  const etaBestMs = etaTotalMs != null && etaMovingMs != null ? (etaTotalMs + etaMovingMs) / 2 : null

  return {
    elapsedMs,
    movingMs,
    avgSpeedKmh,
    avgMovingSpeedKmh,
    distanceCoveredKm,
    distanceRemainingKm,
    totalDistanceKm: raceConfig.totalDistanceKm ?? 0,
    etaTotalMs,
    etaMovingMs,
    etaBestMs,
  }
}
