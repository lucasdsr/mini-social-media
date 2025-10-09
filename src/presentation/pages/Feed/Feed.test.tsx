import { screen, waitFor } from '@testing-library/react'
import { Feed } from './index'
import { renderWithTheme } from '../../test-utils'

describe('Feed Page', () => {
  it('should show loading state initially', () => {
    renderWithTheme(<Feed />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should render posts after loading', async () => {
    renderWithTheme(<Feed />)

    await waitFor(
      () => {
        expect(screen.getAllByTestId('post-container')).toHaveLength(5)
      },
      { timeout: 3000 }
    )

    expect(
      screen.getByText('Bem-vindo ao Mini Social Media!')
    ).toBeInTheDocument()
  })

  it('should handle loading state transition', async () => {
    renderWithTheme(<Feed />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()

    await waitFor(
      () => {
        expect(screen.getByTestId('create-post')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
  })
})
