import { render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../assets/theme'
import { Feed } from './index'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('Feed Page', () => {
  it('should show loading state initially', () => {
    renderWithTheme(<Feed />)

    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('should render posts after loading', async () => {
    renderWithTheme(<Feed />)

    // Aguarda o loading terminar e os posts aparecerem
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
})
