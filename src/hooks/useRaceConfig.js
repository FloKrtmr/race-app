import { useState } from 'react'

const KEYS = {
  config: 'race_config',
  overrides: 'hour_overrides',
}

function load(key) {
  try { return JSON.parse(localStorage.getItem(key)) } catch { return null }
}
function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

export default function useRaceConfig() {
  const [raceConfig, setRaceConfig] = useState(() => load(KEYS.config))
  const [hourOverrides, setHourOverrides] = useState(() => load(KEYS.overrides) ?? { flo: {}, tade: {} })

  function startRace({ flo, tade, gpxPolyline, totalDistanceKm, startTime: providedStartTime }) {
    const startTime = providedStartTime ?? Date.now()
    const config = {
      startTime,
      flo,
      tade,
      activeRider: 'flo',
      gpxPolyline,
      totalDistanceKm,
      riderHistory: [{ rider: 'flo', startTs: startTime }],
    }
    save(KEYS.config, config)
    setRaceConfig(config)
  }

  function resetRace() {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
    localStorage.removeItem('carb_entries')
    localStorage.removeItem('stop_log')
    localStorage.removeItem('checkpoint_state')
    setRaceConfig(null)
    setHourOverrides({ flo: {}, tade: {} })
  }

  function setActiveRider(rider) {
    const updated = {
      ...raceConfig,
      activeRider: rider,
      riderHistory: [...(raceConfig.riderHistory ?? []), { rider, startTs: Date.now() }],
    }
    save(KEYS.config, updated)
    setRaceConfig(updated)
  }

  function setHourOverride(rider, hourIndex, value) {
    const updated = {
      ...hourOverrides,
      [rider]: { ...hourOverrides[rider], [hourIndex]: value },
    }
    save(KEYS.overrides, updated)
    setHourOverrides(updated)
  }

  function getGoalForHour(rider, hourIndex) {
    return hourOverrides?.[rider]?.[hourIndex] ?? raceConfig?.[rider]?.goalPerHour ?? 75
  }

  return { raceConfig, startRace, resetRace, setActiveRider, hourOverrides, setHourOverride, getGoalForHour }
}
