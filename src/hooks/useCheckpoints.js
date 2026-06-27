import { useState } from 'react'
import { CHECKPOINTS } from '../constants/checkpoints'
import { haversineKm } from '../utils/geo'

const STORAGE_KEY = 'checkpoint_state'

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {} } catch { return {} }
}

export default function useCheckpoints() {
  const [state, setState] = useState(loadState)

  const checkpoints = CHECKPOINTS.map(cp => ({
    ...cp,
    reached: state[cp.id]?.reached ?? false,
    reachedTs: state[cp.id]?.reachedTs ?? null,
  }))

  function update(id, reached) {
    const next = { ...state, [id]: { reached, reachedTs: reached ? Date.now() : null } }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setState(next)
  }

  function toggleCheckpoint(id) {
    const current = state[id]?.reached ?? false
    update(id, !current)
  }

  function autoDetect(lat, lng) {
    CHECKPOINTS.forEach(cp => {
      if (state[cp.id]?.reached) return
      const dist = haversineKm(lat, lng, cp.lat, cp.lng)
      if (dist <= 0.5) update(cp.id, true)
    })
  }

  function resetCheckpoints() {
    localStorage.removeItem(STORAGE_KEY)
    const fresh = CHECKPOINTS.reduce((acc, cp) => ({ ...acc, [cp.id]: { reached: false, reachedTs: null } }), {})
    setState(fresh)
  }

  return { checkpoints, toggleCheckpoint, autoDetect, resetCheckpoints }
}
