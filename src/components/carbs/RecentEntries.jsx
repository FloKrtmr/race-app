import { formatTime } from '../../utils/time'

export default function RecentEntries({ entries, onUndo, rider }) {
  const recent = [...entries]
    .filter((e) => e.rider === rider)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 3)

  if (!recent.length) return null

  return (
    <div className="mt-2">
      <div className="text-gray-400 text-sm mb-1">Letzte Einträge</div>
      {recent.map((e) => (
        <div
          key={e.id}
          className="flex justify-between text-gray-300 text-sm py-1 border-b border-gray-700"
        >
          <span>
            {formatTime(e.timestamp)} – {e.label}
          </span>
          <span className="text-green-400">+{e.amount}g</span>
        </div>
      ))}
      <button onClick={() => onUndo(rider)} className="text-red-400 text-sm mt-2">
        ↩ Letzten rückgängig
      </button>
    </div>
  )
}
