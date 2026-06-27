import { useState } from 'react'

export default function CustomInput({ onAdd }) {
  const [value, setValue] = useState('')

  function submit() {
    const n = Number(value)
    if (n > 0) {
      onAdd(n, 'Custom')
      setValue('')
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="g"
        className="bg-gray-700 text-white text-xl p-3 rounded-xl flex-1"
        onKeyDown={(e) => e.key === 'Enter' && submit()}
      />
      <button
        onClick={submit}
        className="bg-blue-500 text-white font-bold px-6 rounded-xl text-xl min-h-[60px]"
      >
        +
      </button>
    </div>
  )
}
