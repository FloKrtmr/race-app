export default function CheckpointBanner({ checkpoints, coveredKm }) {
  const reached = checkpoints.filter(c => c.reached)
  const upcoming = checkpoints.filter(c => !c.reached)
  const next = upcoming[0] ?? null
  const last = reached[reached.length - 1] ?? null

  return (
    <div className="bg-gray-800 rounded-xl p-3 flex flex-col gap-1">
      {next && (
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Nächster CP:</span>
          <span className="text-white font-bold">{next.name}</span>
        </div>
      )}
      {last && (
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Letzter CP:</span>
          <span className="text-green-400">{last.name} ✅</span>
        </div>
      )}
      {!next && <div className="text-green-400 text-center font-bold">Alle Checkpoints erreicht! 🏁</div>}
    </div>
  )
}
