import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should handle click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click</Button>)

    await user.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should render with default variant', () => {
    render(<Button>Default</Button>)
    const button = screen.getByText('Default')
    expect(button).toHaveClass('bg-primary')
  })

  it('should render with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByText('Delete')
    expect(button).toHaveClass('bg-destructive')
  })

  it('should render with outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByText('Outline')
    expect(button).toHaveClass('border')
  })

  it('should render with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByText('Ghost')
    expect(button).toHaveClass('hover:bg-accent')
  })

  it('should render with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByText('Small')).toHaveClass('h-9')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByText('Large')).toHaveClass('h-11')

    rerender(<Button size="icon">Icon</Button>)
    expect(screen.getByText('Icon')).toHaveClass('h-10')
  })

  it('should be disabled when disabled prop is true', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button disabled onClick={handleClick}>Disabled</Button>)

    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByText('Custom')
    expect(button).toHaveClass('custom-class')
  })

  it('should render as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    const link = screen.getByText('Link Button')
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/test')
  })
})
