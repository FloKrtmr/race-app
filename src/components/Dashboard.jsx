import { useState } from 'react'
import TabBar from './TabBar'
import MapTab from './tabs/MapTab'
import CarbsTab from './tabs/CarbsTab'
import StopsTab from './tabs/StopsTab'
import StatsTab from './tabs/StatsTab'
import { calcStats } from '../hooks/useCalculations'

export default function Dashboard({
  raceConfig, entries, addEntry, undoLast,
  setActiveRider, getGoalForHour,
  stopLog, activeStop, startStop, endStop, deleteStop, totalStopMs,
  checkpoints, toggleCheckpoint, autoDetect,
  carPosition, locations,
  onReset,
}) {
  const [tab, setTab] = useState('map')

  const stats = calcStats(
    raceConfig,
    carPosition,
    raceConfig?.gpxPolyline ?? [],
    totalStopMs,
    Date.now()
  )

  // auto-detect checkpoints whenever car position updates
  if (carPosition) autoDetect(carPosition.lat, carPosition.lng)

  const sharedProps = { raceConfig, entries, getGoalForHour, stats }

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20">
      <header className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <span className="font-black text-lg">🏁 Race Tracker</span>
        <button className="text-gray-500 text-sm" onPointerDown={e => e.currentTarget.dataset.t = Date.now()}
          onPointerUp={e => { if (Date.now() - e.currentTarget.dataset.t > 2000) onReset() }}>
          ···
        </button>
      </header>

      {tab === 'map' && <MapTab {...sharedProps} carPosition={carPosition} locations={locations} checkpoints={checkpoints} toggleCheckpoint={toggleCheckpoint} autoDetect={autoDetect} />}
      {tab === 'carbs' && <CarbsTab {...sharedProps} addEntry={addEntry} undoLast={undoLast} setActiveRider={setActiveRider} startStop={startStop} />}
      {tab === 'stops' && <StopsTab activeStop={activeStop} startStop={startStop} endStop={endStop} stopLog={stopLog} deleteStop={deleteStop} totalStopMs={totalStopMs} />}
      {tab === 'stats' && <StatsTab {...sharedProps} stopLog={stopLog} currentSpeedKmh={carPosition?.speed != null ? carPosition.speed * 3.6 : null} />}

      <TabBar active={tab} onChange={setTab} />
    </div>
  )
}
