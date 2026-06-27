import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SetupScreen from './SetupScreen'

describe('SetupScreen', () => {
  it('renders goal inputs and start button', () => {
    render(<SetupScreen startRace={vi.fn()} />)
    expect(screen.getByLabelText(/Flo.*g\/h/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Tade.*g\/h/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Rennen starten/i })).toBeInTheDocument()
  })

  it('calls startRace with correct goals on submit', async () => {
    const user = userEvent.setup()
    const onStart = vi.fn()
    render(<SetupScreen startRace={onStart} />)
    await user.clear(screen.getByLabelText(/Flo.*g\/h/i))
    await user.type(screen.getByLabelText(/Flo.*g\/h/i), '80')
    await user.click(screen.getByRole('button', { name: /Rennen starten/i }))
    expect(onStart).toHaveBeenCalledWith(expect.objectContaining({
      flo: { goalPerHour: 80 },
    }))
  })
})
