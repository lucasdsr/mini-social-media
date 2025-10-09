import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../assets/theme'

export const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
