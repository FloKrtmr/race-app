import { useState, useEffect } from 'react'
import { formatDuration } from '../../utils/time'

const TYPES = ['Fahrerwechsel', 'Ampel/Verkehr', 'Sonstiges']

export default function StopTimer({ activeStop, startStop, endStop }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!activeStop) { setElapsed(0); return }
    const id = setInterval(() => setElapsed(Date.now() - activeStop.startTs), 1000)
    return () => clearInterval(id)
  }, [activeStop])

  if (activeStop) return (
    <div className="bg-red-900/40 border-2 border-red-500 rounded-2xl p-6 flex flex-col items-center gap-4">
      <div className="text-5xl font-black text-white font-mono">{formatDuration(elapsed)}</div>
      <div className="text-gray-300">{activeStop.type}</div>
      <button onClick={endStop} className="bg-red-500 text-white font-bold text-xl px-10 py-4 min-h-[60px] rounded-2xl">
        ■ Stopp beenden
      </button>
    </div>
  )

  return (
    <StopStarter onStart={startStop} />
  )
}

function StopStarter({ onStart }) {
  const [type, setType] = useState(TYPES[0])
  return (
    <div className="bg-gray-800 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`px-3 py-2 min-h-[60px] rounded-xl text-sm font-bold ${type === t ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
            {t}
          </button>
        ))}
      </div>
      <button onClick={() => onStart(type)}
        className="bg-blue-500 text-white font-bold text-2xl py-5 min-h-[60px] rounded-2xl">
        ▶ Stopp starten
      </button>
    </div>
  )
}
