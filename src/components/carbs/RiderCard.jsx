const STATUS_BG = {
  green: 'bg-green-900/40 border-green-500',
  yellow: 'bg-yellow-900/40 border-yellow-500',
  red: 'bg-red-900/40 border-red-500',
}
const STATUS_TEXT = {
  green: 'text-green-400',
  yellow: 'text-yellow-400',
  red: 'text-red-400',
}
const COLOR_TEXT = {
  blue: 'text-blue-400',
  orange: 'text-orange-400',
}

export default function RiderCard({ name, stats, isActive, color }) {
  const { totalEaten, shouldHaveEaten, delta, status } = stats
  const borderClass = isActive ? STATUS_BG[status] : 'bg-gray-800/60 border-gray-600'
  const dimClass = isActive ? '' : 'opacity-60'

  return (
    <div className={`border-2 rounded-2xl p-4 flex flex-col gap-2 flex-1 ${borderClass} ${dimClass}`}>
      <div className="flex items-center justify-between">
        <span className={`text-2xl font-black ${COLOR_TEXT[color]}`}>{name}</span>
        <span
          className={`text-sm font-bold px-2 py-1 rounded-lg ${
            isActive ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300'
          }`}
        >
          {isActive ? '🚴 FÄHRT' : '😴 RUHE'}
        </span>
      </div>
      <div className="text-4xl font-black text-white">{Math.round(totalEaten)}g</div>
      <div className="text-gray-400 text-sm">Gegessen</div>
      {isActive && (
        <>
          <div className="text-gray-300">Soll: {Math.round(shouldHaveEaten)}g</div>
          <div className={`text-lg font-bold ${STATUS_TEXT[status]}`}>
            {delta >= 0 ? `+${Math.round(delta)}g ✅` : `${Math.round(delta)}g ⚠️`}
          </div>
        </>
      )}
    </div>
  )
}
