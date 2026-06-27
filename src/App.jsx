import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="text-white bg-gray-900 min-h-screen p-4">Race App</div>} />
      <Route path="/share/:rider" element={<div className="text-white bg-gray-900 min-h-screen p-4">Share</div>} />
    </Routes>
  )
}
