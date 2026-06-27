export function formatDuration(ms) {
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

export function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
}

export function formatETA(ts) {
  return new Date(ts).toLocaleString('de-DE', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' Uhr'
}
