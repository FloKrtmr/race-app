import RiderCard from '../carbs/RiderCard'
import RiderSwitchButton from '../carbs/RiderSwitchButton'
import PresetButton from '../carbs/PresetButton'
import CustomInput from '../carbs/CustomInput'
import RecentEntries from '../carbs/RecentEntries'
import { calcCarbs } from '../../hooks/useCalculations'

const PRESETS = [
  { label: 'Gel', amount: 40, emoji: '🟡' },
  { label: 'Riegel', amount: 50, emoji: '🍫' },
  { label: 'Banane', amount: 25, emoji: '🍌' },
]

export default function CarbsTab({
  raceConfig,
  entries,
  addEntry,
  undoLast,
  setActiveRider,
  getGoalForHour,
  startStop,
}) {
  const now = Date.now()
  const floStats = calcCarbs(entries, 'flo', raceConfig, getGoalForHour, now, raceConfig?.riderHistory)
  const tadeStats = calcCarbs(entries, 'tade', raceConfig, getGoalForHour, now, raceConfig?.riderHistory)
  const active = raceConfig?.activeRider ?? 'flo'

  function handlePreset(amount, label) {
    addEntry(active, amount, label)
  }

  function handleSwitch() {
    setActiveRider(active === 'flo' ? 'tade' : 'flo')
  }

  function handleSwitchWithStop() {
    handleSwitch()
    startStop('Fahrerwechsel')
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-3">
        <RiderCard name="Flo" stats={floStats} isActive={active === 'flo'} color="blue" />
        <RiderCard name="Tade" stats={tadeStats} isActive={active === 'tade'} color="orange" />
      </div>

      <RiderSwitchButton
        activeRider={active}
        onSwitch={handleSwitch}
        onSwitchWithStop={handleSwitchWithStop}
      />

      <div className="grid grid-cols-3 gap-3">
        {PRESETS.map((p) => (
          <PresetButton key={p.label} {...p} onClick={handlePreset} />
        ))}
      </div>
      <CustomInput onAdd={handlePreset} />
      <RecentEntries entries={entries} onUndo={undoLast} rider={active} />
    </div>
  )
}
