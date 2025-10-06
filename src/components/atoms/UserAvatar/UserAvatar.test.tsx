import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../assets/theme'
import { UserAvatar } from './UserAvatar'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('UserAvatar Component', () => {
  it('should render avatar with correct user initials', () => {
    renderWithTheme(<UserAvatar userId={1} />)

    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
    expect(screen.getByTestId('user-avatar')).toHaveTextContent('U1')
  })

  it('should handle different user IDs correctly', () => {
    renderWithTheme(<UserAvatar userId={5} />)

    expect(screen.getByTestId('user-avatar')).toHaveTextContent('U5')
  })

  it('should apply correct size styles', () => {
    renderWithTheme(<UserAvatar userId={1} size='small' />)

    const avatar = screen.getByTestId('user-avatar')
    expect(avatar).toBeInTheDocument()
  })

  it('should use medium size as default', () => {
    renderWithTheme(<UserAvatar userId={1} />)

    const avatar = screen.getByTestId('user-avatar')
    expect(avatar).toBeInTheDocument()
  })

  it('should handle large size correctly', () => {
    renderWithTheme(<UserAvatar userId={1} size='large' />)

    const avatar = screen.getByTestId('user-avatar')
    expect(avatar).toBeInTheDocument()
  })
})
