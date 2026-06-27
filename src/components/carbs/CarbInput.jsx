import PresetButton from './PresetButton'
import CustomInput from './CustomInput'

const PRESETS = [
  { label: 'Gel', amount: 40, emoji: '🟡' },
  { label: 'Riegel', amount: 50, emoji: '🍫' },
  { label: 'Banane', amount: 25, emoji: '🍌' },
]

export default function CarbInput({ onAdd }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {PRESETS.map((p) => (
          <PresetButton key={p.label} {...p} onClick={onAdd} />
        ))}
      </div>
      <CustomInput onAdd={onAdd} />
    </div>
  )
}
