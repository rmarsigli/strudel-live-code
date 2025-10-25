import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input', () => {
  it('should render input', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('should handle text input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)

    const input = screen.getByPlaceholderText('Type here')
    await user.type(input, 'Hello World')

    expect(input).toHaveValue('Hello World')
  })

  it('should apply custom className', () => {
    render(<Input className="custom-input" placeholder="Test" />)
    const input = screen.getByPlaceholderText('Test')
    expect(input).toHaveClass('custom-input')
  })

  it('should accept different input types', () => {
    const { rerender } = render(<Input type="text" placeholder="Text" />)
    expect(screen.getByPlaceholderText('Text')).toHaveAttribute('type', 'text')

    rerender(<Input type="password" placeholder="Password" />)
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password')

    rerender(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
  })

  it('should accept default value', () => {
    render(<Input defaultValue="Initial value" />)
    expect(screen.getByDisplayValue('Initial value')).toBeInTheDocument()
  })
})
