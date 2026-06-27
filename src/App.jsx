import { Routes, Route } from 'react-router-dom'
import SharePage from './pages/SharePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="text-white bg-gray-900 min-h-screen p-4">Race App</div>} />
      <Route path="/share/:rider" element={<SharePage />} />
    </Routes>
  )
}
