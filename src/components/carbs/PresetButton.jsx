export default function PresetButton({ label, amount, emoji, onClick }) {
  return (
    <button
      onClick={() => onClick(amount, label)}
      className="bg-gray-700 hover:bg-gray-600 text-white rounded-2xl p-4 flex flex-col items-center gap-1 min-h-[72px] font-bold text-lg active:scale-95 transition-transform"
    >
      <span className="text-2xl">{emoji}</span>
      <span>{label}</span>
      <span className="text-gray-400 text-sm">+{amount}g</span>
    </button>
  )
}
