import { Routes, Route } from 'react-router-dom'
import RaceApp from './pages/RaceApp'
import SharePage from './pages/SharePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RaceApp />} />
      <Route path="/share/:rider" element={<SharePage />} />
    </Routes>
  )
}
