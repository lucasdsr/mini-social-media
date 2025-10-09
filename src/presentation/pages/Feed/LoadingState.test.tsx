import { screen } from '@testing-library/react'
import { LoadingState } from './LoadingState'
import { renderWithTheme } from '../../test-utils'

describe('LoadingState Component', () => {
  it('should render loading spinner', () => {
    renderWithTheme(<LoadingState />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should have correct loading container styling', () => {
    renderWithTheme(<LoadingState />)

    const container = screen.getByRole('progressbar').parentElement
    expect(container).toHaveStyle({
      display: 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    })
  })
})
