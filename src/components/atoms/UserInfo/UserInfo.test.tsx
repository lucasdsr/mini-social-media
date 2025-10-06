import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../assets/theme'
import { UserInfo } from './UserInfo'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('UserInfo Component', () => {
  it('should render user info with correct data', () => {
    renderWithTheme(<UserInfo userId={1} postId={1} />)

    expect(screen.getByTestId('user-info')).toBeInTheDocument()
    expect(screen.getByTestId('user-name')).toHaveTextContent('User 1')
    expect(screen.getByTestId('post-id')).toHaveTextContent('Post #1')
  })

  it('should handle different user and post IDs correctly', () => {
    renderWithTheme(<UserInfo userId={5} postId={10} />)

    expect(screen.getByTestId('user-name')).toHaveTextContent('User 5')
    expect(screen.getByTestId('post-id')).toHaveTextContent('Post #10')
  })

  it('should render both user name and post ID', () => {
    renderWithTheme(<UserInfo userId={3} postId={7} />)

    expect(screen.getByTestId('user-name')).toBeInTheDocument()
    expect(screen.getByTestId('post-id')).toBeInTheDocument()
  })
})
