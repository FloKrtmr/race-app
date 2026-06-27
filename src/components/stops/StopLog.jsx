import { formatDuration, formatTime } from '../../utils/time'

export default function StopLog({ stopLog, deleteStop, totalStopMs }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-400 font-bold">Stopp-Log</span>
        <span className="text-yellow-400 font-bold">Total: {formatDuration(totalStopMs)}</span>
      </div>
      {stopLog.length === 0 && <div className="text-gray-600 text-center py-4">Noch keine Stopps</div>}
      {[...stopLog].reverse().map((s, i) => (
        <div key={s.id} className="bg-gray-800 rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-white font-bold">{s.type}</div>
            <div className="text-gray-400 text-sm">{formatTime(s.startTs)}</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 font-mono">{formatDuration(s.durationMs)}</span>
            <button onClick={() => deleteStop(s.id)} className="text-red-400 text-lg">🗑</button>
          </div>
        </div>
      ))}
    </div>
  )
}
