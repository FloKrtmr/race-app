import { useState } from 'react'

let counter = 0
function uid() { return `${Date.now()}-${++counter}` }
function load() { try { return JSON.parse(localStorage.getItem('stop_log')) ?? [] } catch { return [] } }
function save(log) { localStorage.setItem('stop_log', JSON.stringify(log)) }

export default function useStopLog() {
  const [stopLog, setStopLog] = useState(load)
  const [activeStop, setActiveStop] = useState(null)

  function startStop(type) {
    setActiveStop({ startTs: Date.now(), type })
  }

  function endStop() {
    if (!activeStop) return
    const endTs = Date.now()
    const entry = {
      id: uid(),
      startTs: activeStop.startTs,
      endTs,
      type: activeStop.type,
      durationMs: endTs - activeStop.startTs,
    }
    const next = [...stopLog, entry]
    save(next)
    setStopLog(next)
    setActiveStop(null)
  }

  function deleteStop(id) {
    const next = stopLog.filter(s => s.id !== id)
    save(next)
    setStopLog(next)
  }

  const totalStopMs = stopLog.reduce((sum, s) => sum + s.durationMs, 0)

  return { stopLog, activeStop, startStop, endStop, deleteStop, totalStopMs }
}
