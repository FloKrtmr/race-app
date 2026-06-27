import StopTimer from '../stops/StopTimer'
import StopLog from '../stops/StopLog'

export default function StopsTab({ activeStop, startStop, endStop, stopLog, deleteStop, totalStopMs }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <StopTimer activeStop={activeStop} startStop={startStop} endStop={endStop} />
      <StopLog stopLog={stopLog} deleteStop={deleteStop} totalStopMs={totalStopMs} />
    </div>
  )
}
