import { useEffect } from 'react'
import RaceMap from '../map/RaceMap'
import ProgressBar from '../map/ProgressBar'
import CheckpointBanner from '../map/CheckpointBanner'

export default function MapTab({ raceConfig, carPosition, locations, checkpoints, toggleCheckpoint, autoDetect, stats }) {
  const polyline = raceConfig?.gpxPolyline ?? []
  const covered = stats?.distanceCoveredKm ?? 0
  const remaining = stats?.distanceRemainingKm ?? (raceConfig?.totalDistanceKm ?? 1008)
  const total = raceConfig?.totalDistanceKm ?? 1008

  useEffect(() => {
    if (carPosition && autoDetect) autoDetect(carPosition.lat, carPosition.lng)
  }, [carPosition])

  return (
    <div className="flex flex-col gap-3 p-3">
      <ProgressBar covered={covered} remaining={remaining} total={total} />
      <RaceMap
        polyline={polyline}
        carPosition={carPosition}
        floPosition={locations?.flo}
        tadePosition={locations?.tade}
        checkpoints={checkpoints}
        onCheckpointToggle={toggleCheckpoint}
      />
      <CheckpointBanner checkpoints={checkpoints} coveredKm={covered} polyline={polyline} />
    </div>
  )
}
