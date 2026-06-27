import { useState } from 'react'

export default function RiderSwitchButton({ activeRider, onSwitch, onSwitchWithStop }) {
  const [showDialog, setShowDialog] = useState(false)
  const next = activeRider === 'flo' ? 'Tade' : 'Flo'
  const current = activeRider === 'flo' ? 'Flo' : 'Tade'

  if (showDialog) {
    return (
      <div className="bg-gray-800 border border-gray-600 rounded-2xl p-4 flex flex-col gap-3">
        <div className="text-white font-bold text-center">
          Fahrerwechsel: {current} → {next}
        </div>
        <div className="text-gray-400 text-sm text-center">Stopp-Timer starten?</div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onSwitchWithStop()
              setShowDialog(false)
            }}
            className="flex-1 bg-blue-500 text-white font-bold py-3 rounded-xl"
          >
            Ja, Timer starten
          </button>
          <button
            onClick={() => {
              onSwitch()
              setShowDialog(false)
            }}
            className="flex-1 bg-gray-600 text-white py-3 rounded-xl"
          >
            Nur wechseln
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowDialog(true)}
      className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-2xl text-lg"
    >
      ⇄ Fahrerwechsel
    </button>
  )
}
