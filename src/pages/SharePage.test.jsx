import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

vi.mock('../hooks/useShareLocation', () => ({
  default: () => ({ sharing: false, error: null, startSharing: vi.fn() }),
}))

import SharePage from './SharePage'

function renderShare(rider) {
  render(
    <MemoryRouter initialEntries={[`/share/${rider}`]}>
      <Routes>
        <Route path="/share/:rider" element={<SharePage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('SharePage', () => {
  it('shows rider name', () => {
    renderShare('flo')
    expect(screen.getByText(/flo/i)).toBeInTheDocument()
  })

  it('shows start sharing button when not sharing', () => {
    renderShare('tade')
    expect(screen.getByRole('button', { name: /GPS starten/i })).toBeInTheDocument()
  })
})
