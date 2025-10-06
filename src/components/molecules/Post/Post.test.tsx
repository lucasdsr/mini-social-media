import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../assets/theme'
import { Post } from './Post'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('Post Component (Molecule)', () => {
  const mockPostProps = {
    userId: 1,
    id: 1,
    title: 'Test Post Title',
    body: 'This is a test post body content that should be displayed correctly.'
  }

  it('should render post with all required props', () => {
    renderWithTheme(<Post {...mockPostProps} />)

    expect(screen.getByTestId('post-container')).toBeInTheDocument()
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
    expect(screen.getByTestId('user-info')).toBeInTheDocument()
    expect(screen.getByTestId('user-name')).toBeInTheDocument()
    expect(screen.getByTestId('post-id')).toBeInTheDocument()
    expect(screen.getByTestId('post-title')).toBeInTheDocument()
    expect(screen.getByTestId('post-body')).toBeInTheDocument()
  })

  it('should display correct user information', () => {
    renderWithTheme(<Post {...mockPostProps} />)

    expect(screen.getByTestId('user-name')).toHaveTextContent('User 1')
    expect(screen.getByTestId('post-id')).toHaveTextContent('Post #1')
    expect(screen.getByTestId('user-avatar')).toHaveTextContent('U1')
  })

  it('should display correct post content', () => {
    renderWithTheme(<Post {...mockPostProps} />)

    expect(screen.getByTestId('post-title')).toHaveTextContent(
      'Test Post Title'
    )
    expect(screen.getByTestId('post-body')).toHaveTextContent(
      'This is a test post body content that should be displayed correctly.'
    )
  })

  it('should handle different user IDs correctly', () => {
    const differentUserProps = {
      ...mockPostProps,
      userId: 5,
      id: 10
    }

    renderWithTheme(<Post {...differentUserProps} />)

    expect(screen.getByTestId('user-name')).toHaveTextContent('User 5')
    expect(screen.getByTestId('post-id')).toHaveTextContent('Post #10')
    expect(screen.getByTestId('user-avatar')).toHaveTextContent('U5')
  })

  it('should handle long content with text truncation', () => {
    const longContentProps = {
      ...mockPostProps,
      title:
        'This is a very long post title that should be truncated when it exceeds the maximum number of lines allowed for the title display',
      body: 'This is a very long post body content that should be truncated when it exceeds the maximum number of lines allowed for the body display. This content is intentionally long to test the truncation functionality of the component.'
    }

    renderWithTheme(<Post {...longContentProps} />)

    expect(screen.getByTestId('post-title')).toHaveTextContent(
      longContentProps.title
    )
    expect(screen.getByTestId('post-body')).toHaveTextContent(
      longContentProps.body
    )
  })

  it('should compose atoms correctly as a molecule', () => {
    renderWithTheme(<Post {...mockPostProps} />)

    // Verify that all atoms are present and working together
    expect(screen.getByTestId('user-avatar')).toBeInTheDocument()
    expect(screen.getByTestId('user-info')).toBeInTheDocument()
    expect(screen.getByTestId('post-title')).toBeInTheDocument()
    expect(screen.getByTestId('post-body')).toBeInTheDocument()
  })
})
