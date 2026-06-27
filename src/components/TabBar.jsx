const TABS = [
  { id: 'map',   label: 'Karte',  emoji: '🗺' },
  { id: 'carbs', label: 'Carbs',  emoji: '🍌' },
  { id: 'stops', label: 'Stopps', emoji: '⏱' },
  { id: 'stats', label: 'Stats',  emoji: '📊' },
]

export default function TabBar({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 flex z-50">
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-1 flex flex-col items-center py-3 gap-1 text-xs font-bold transition-colors
            ${active === t.id ? 'text-blue-400' : 'text-gray-500'}`}
        >
          <span className="text-2xl">{t.emoji}</span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}
