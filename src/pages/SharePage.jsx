import { useParams } from 'react-router-dom'
import useShareLocation from '../hooks/useShareLocation'

export default function SharePage() {
  const { rider } = useParams()
  const { sharing, error, startSharing } = useShareLocation(rider)
  const name = rider === 'flo' ? 'Flo' : 'Tade'
  const color = rider === 'flo' ? 'text-blue-400' : 'text-orange-400'

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-white">Race Tracker</h1>
      <div className={`text-6xl font-black ${color}`}>{name}</div>

      {!sharing ? (
        <button
          onClick={startSharing}
          className="bg-green-500 text-black text-2xl font-bold px-10 py-6 rounded-2xl"
        >
          GPS starten
        </button>
      ) : (
        <div className="text-center">
          <div className="text-5xl mb-4">📡</div>
          <div className="text-green-400 text-2xl font-bold">Standort wird geteilt ✅</div>
        </div>
      )}

      {error && <div className="text-red-400 text-lg">{error}</div>}

      <p className="text-gray-500 text-sm text-center max-w-xs">
        Diese Seite muss offen bleiben.<br />
        Auto-Lock deaktivieren: Einstellungen → Anzeige & Helligkeit → Auto-Lock → Nie
      </p>
    </div>
  )
}
