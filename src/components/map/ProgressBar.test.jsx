import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('shows covered and remaining distance', () => {
    render(<ProgressBar covered={387} remaining={621} total={1008} />)
    expect(screen.getByText(/387/)).toBeInTheDocument()
    expect(screen.getByText(/621/)).toBeInTheDocument()
  })

  it('shows percentage', () => {
    render(<ProgressBar covered={504} remaining={504} total={1008} />)
    expect(screen.getByText(/50%/)).toBeInTheDocument()
  })
})
