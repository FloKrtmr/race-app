import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RiderCard from './RiderCard'

const baseStats = { totalEaten: 200, shouldHaveEaten: 180, delta: 20, status: 'green' }

describe('RiderCard', () => {
  it('shows rider name and eaten amount', () => {
    render(<RiderCard name="Flo" stats={baseStats} isActive={true} color="blue" />)
    expect(screen.getByText('Flo')).toBeInTheDocument()
    expect(screen.getByText(/200/)).toBeInTheDocument()
  })

  it('shows FÄHRT badge when active', () => {
    render(<RiderCard name="Flo" stats={baseStats} isActive={true} color="blue" />)
    expect(screen.getByText(/FÄHRT/i)).toBeInTheDocument()
  })

  it('shows RUHE when not active', () => {
    render(<RiderCard name="Tade" stats={baseStats} isActive={false} color="orange" />)
    expect(screen.getByText(/RUHE/i)).toBeInTheDocument()
  })

  it('applies red background on red status', () => {
    const { container } = render(<RiderCard name="Flo" stats={{ ...baseStats, status: 'red' }} isActive={true} color="blue" />)
    expect(container.firstChild.className).toMatch(/red/)
  })
})
