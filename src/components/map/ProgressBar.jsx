export default function ProgressBar({ covered, remaining, total }) {
  const pct = total > 0 ? Math.round((covered / total) * 100) : 0
  return (
    <div className="bg-gray-800 p-3 rounded-xl">
      <div className="flex justify-between text-lg text-gray-400 mb-1">
        <span>Flensburg</span>
        <span className="font-bold text-white text-xl">{pct}%</span>
        <span>Garmisch</span>
      </div>
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-lg text-gray-400 mt-1">
        <span>{Math.round(covered)} km zurück</span>
        <span>{Math.round(remaining)} km vor</span>
      </div>
    </div>
  )
}
