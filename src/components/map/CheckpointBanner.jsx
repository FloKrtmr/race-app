import { projectOnPolyline } from '../../utils/geo'

export default function CheckpointBanner({ checkpoints, coveredKm, polyline }) {
  const reached = checkpoints.filter(c => c.reached)
  const upcoming = checkpoints.filter(c => !c.reached)
  const next = upcoming[0] ?? null
  const last = reached[reached.length - 1] ?? null

  let nextDistKm = null
  if (next && polyline?.length > 1) {
    const proj = projectOnPolyline(next.lat, next.lng, polyline)
    nextDistKm = Math.max(0, Math.round(proj.distanceKm - coveredKm))
  }

  return (
    <div className="bg-gray-800 rounded-xl p-3 flex flex-col gap-1">
      {next && (
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-base">Nächster CP:</span>
          <span className="text-white font-bold text-lg">{next.name}{nextDistKm !== null ? ` · noch ${nextDistKm} km` : ''}</span>
        </div>
      )}
      {last && (
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-base">Letzter CP:</span>
          <span className="text-green-400 text-lg">{last.name} ✅</span>
        </div>
      )}
      {!next && <div className="text-green-400 text-center font-bold text-lg">Alle Checkpoints erreicht! 🏁</div>}
    </div>
  )
}
