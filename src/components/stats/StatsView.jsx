import { formatDuration, formatETA } from '../../utils/time'
import { calcCarbs } from '../../hooks/useCalculations'

const COLOR_BORDER = { blue: 'border-blue-500/30', orange: 'border-orange-500/30' }
const COLOR_TEXT = { blue: 'text-blue-400', orange: 'text-orange-400' }

function Row({ label, value, sub }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-700">
      <span className="text-gray-400">{label}</span>
      <div className="text-right">
        <div className="text-white font-bold">{value}</div>
        {sub && <div className="text-gray-500 text-xs">{sub}</div>}
      </div>
    </div>
  )
}

export default function StatsView({ raceConfig, entries, stats, stopLog, getGoalForHour, currentSpeedKmh }) {
  const now = Date.now()
  const floStats = calcCarbs(entries, 'flo', raceConfig, getGoalForHour, now)
  const tadeStats = calcCarbs(entries, 'tade', raceConfig, getGoalForHour, now)

  if (!stats || !raceConfig) return <div className="p-4 text-gray-400">Rennen noch nicht gestartet</div>

  return (
    <div className="flex flex-col gap-6 p-4 overflow-y-auto">
      <section>
        <h2 className="text-blue-400 font-black text-lg mb-2">RENNEN</h2>
        <Row label="Gesamtzeit" value={formatDuration(stats.elapsedMs)} />
        <Row label="Fahrzeit" value={formatDuration(stats.movingMs)} />
        <Row label="Stopp-Zeit" value={formatDuration(stats.elapsedMs - stats.movingMs)} />
        <Row label="Anzahl Stopps" value={stopLog.length} />
      </section>

      <section>
        <h2 className="text-blue-400 font-black text-lg mb-2">TEMPO</h2>
        <Row label="Ø Gesamt" value={`${stats.avgSpeedKmh.toFixed(1)} km/h`} sub="inkl. Stopps" />
        <Row label="Ø Bewegung" value={`${stats.avgMovingSpeedKmh.toFixed(1)} km/h`} sub="nur Fahrt" />
        <Row label="Aktuell" value={currentSpeedKmh != null ? `${currentSpeedKmh.toFixed(1)} km/h` : '—'} sub="live" />
      </section>

      <section>
        <h2 className="text-blue-400 font-black text-lg mb-2">STRECKE</h2>
        <Row label="Zurückgelegt" value={`${Math.round(stats.distanceCoveredKm)} km`} sub={`${Math.round((stats.distanceCoveredKm / stats.totalDistanceKm) * 100)}%`} />
        <Row label="Verbleibend" value={`${Math.round(stats.distanceRemainingKm)} km`} />
        <Row label="Gesamt" value={`${Math.round(stats.totalDistanceKm)} km`} />
      </section>

      <section>
        <h2 className="text-blue-400 font-black text-lg mb-2">ANKUNFT</h2>
        {stats.etaTotalMs && <Row label="Basis Ø Gesamt" value={formatETA(stats.etaTotalMs)} />}
        {stats.etaMovingMs && <Row label="Basis Ø Bewegung" value={formatETA(stats.etaMovingMs)} />}
        {stats.etaBestMs && <Row label="Beste Schätzung" value={formatETA(stats.etaBestMs)} sub="Mittelwert" />}
      </section>

      <section>
        <h2 className="text-blue-400 font-black text-lg mb-2">CARBS</h2>
        <div className="grid grid-cols-2 gap-4">
          {[['Flo', floStats, 'blue'], ['Tade', tadeStats, 'orange']].map(([name, s, c]) => (
            <div key={name} className={`bg-gray-800 rounded-xl p-3 border ${COLOR_BORDER[c]}`}>
              <div className={`${COLOR_TEXT[c]} font-black text-lg mb-2`}>{name}</div>
              <Row label="Gesamt" value={`${Math.round(s.totalEaten)}g`} />
              <Row label="Ø/h" value={`${stats.movingMs > 0 ? Math.round(s.totalEaten / (stats.movingMs / 3_600_000 / 2)) : 0}g`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
