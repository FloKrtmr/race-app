import useRaceConfig from '../hooks/useRaceConfig'
import useCarbEntries from '../hooks/useCarbEntries'
import useStopLog from '../hooks/useStopLog'
import useCheckpoints from '../hooks/useCheckpoints'
import useGPS from '../hooks/useGPS'
import useFirebaseLocation from '../hooks/useFirebaseLocation'
import SetupScreen from '../components/SetupScreen'
import Dashboard from '../components/Dashboard'

export default function RaceApp() {
  const { raceConfig, startRace, resetRace, setActiveRider, hourOverrides, setHourOverride, getGoalForHour } = useRaceConfig()
  const { entries, addEntry, undoLast, deleteEntry } = useCarbEntries()
  const { stopLog, activeStop, startStop, endStop, deleteStop, totalStopMs } = useStopLog()
  const { checkpoints, toggleCheckpoint, autoDetect } = useCheckpoints()
  const { position: carPosition } = useGPS()
  const { locations } = useFirebaseLocation()

  if (!raceConfig) return <SetupScreen startRace={startRace} />

  return (
    <Dashboard
      raceConfig={raceConfig}
      entries={entries}
      addEntry={addEntry}
      undoLast={undoLast}
      setActiveRider={setActiveRider}
      getGoalForHour={getGoalForHour}
      stopLog={stopLog}
      activeStop={activeStop}
      startStop={startStop}
      endStop={endStop}
      deleteStop={deleteStop}
      totalStopMs={totalStopMs}
      checkpoints={checkpoints}
      toggleCheckpoint={toggleCheckpoint}
      autoDetect={autoDetect}
      carPosition={carPosition}
      locations={locations}
      onReset={resetRace}
    />
  )
}
