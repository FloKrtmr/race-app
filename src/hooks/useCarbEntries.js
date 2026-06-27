import { useState } from 'react'

function load() {
  try { return JSON.parse(localStorage.getItem('carb_entries')) ?? [] } catch { return [] }
}
function save(entries) {
  localStorage.setItem('carb_entries', JSON.stringify(entries))
}

let counter = 0
function uid() {
  return `${Date.now()}-${++counter}-${Math.random().toString(36).slice(2, 7)}`
}

export default function useCarbEntries() {
  const [entries, setEntries] = useState(load)

  function update(next) {
    save(next)
    setEntries(next)
  }

  function addEntry(rider, amount, label) {
    update([...entries, { id: uid(), rider, amount, label, timestamp: Date.now() }])
  }

  function undoLast(rider) {
    const riderEntries = entries.filter(e => e.rider === rider)
    if (!riderEntries.length) return
    const last = riderEntries.reduce((a, b) => a.timestamp > b.timestamp ? a : b)
    update(entries.filter(e => e.id !== last.id))
  }

  function deleteEntry(id) {
    update(entries.filter(e => e.id !== id))
  }

  function resetEntries() {
    localStorage.removeItem('carb_entries')
    setEntries([])
  }

  return { entries, addEntry, undoLast, deleteEntry, resetEntries }
}
