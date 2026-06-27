import { useState, useRef } from 'react'
import { parseGpx, downsample } from '../utils/gpx'
import { haversineKm } from '../utils/geo'

function calcTotalKm(polyline) {
  let total = 0
  for (let i = 0; i < polyline.length - 1; i++) {
    total += haversineKm(polyline[i][0], polyline[i][1], polyline[i+1][0], polyline[i+1][1])
  }
  return total
}

export default function SetupScreen({ startRace }) {
  const [floGoal, setFloGoal] = useState(75)
  const [tadeGoal, setTadeGoal] = useState(75)
  const [gpxLoaded, setGpxLoaded] = useState(false)
  const [gpxError, setGpxError] = useState(null)
  const polylineRef = useRef([])

  async function handleGpx(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    try {
      const pts = parseGpx(text)
      polylineRef.current = downsample(pts, 500)
      setGpxLoaded(true)
      setGpxError(null)
    } catch {
      setGpxError('GPX-Datei konnte nicht gelesen werden')
    }
  }

  function handleStart() {
    const polyline = polylineRef.current
    const totalDistanceKm = polyline.length > 1 ? calcTotalKm(polyline) : 1008
    startRace({
      flo: { goalPerHour: Number(floGoal) },
      tade: { goalPerHour: Number(tadeGoal) },
      gpxPolyline: polyline,
      totalDistanceKm,
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-black">Race Across Germany</h1>
      <h2 className="text-xl text-gray-400">Setup</h2>

      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="flo-goal" className="text-lg font-bold text-blue-400">Flo Carb-Ziel (g/h)</label>
          <input
            id="flo-goal"
            type="number"
            value={floGoal}
            onChange={e => setFloGoal(e.target.value)}
            className="bg-gray-700 text-white text-2xl p-3 rounded-xl w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tade-goal" className="text-lg font-bold text-orange-400">Tade Carb-Ziel (g/h)</label>
          <input
            id="tade-goal"
            type="number"
            value={tadeGoal}
            onChange={e => setTadeGoal(e.target.value)}
            className="bg-gray-700 text-white text-2xl p-3 rounded-xl w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold text-gray-300">GPX-Strecke</label>
          <input type="file" accept=".gpx" onChange={handleGpx} className="text-gray-300" />
          {gpxLoaded && <span className="text-green-400">GPX geladen ({polylineRef.current.length} Punkte)</span>}
          {gpxError && <span className="text-red-400">{gpxError}</span>}
          {!gpxLoaded && <span className="text-gray-500 text-sm">Optional - ohne GPX kein Kartentrack</span>}
        </div>

        <button
          onClick={handleStart}
          style={{ minHeight: '60px' }}
          className="bg-green-500 hover:bg-green-400 text-black text-2xl font-black py-5 rounded-2xl mt-2"
        >
          Rennen starten
        </button>
      </div>
    </div>
  )
}
