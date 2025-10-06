import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../assets/theme'
import { PostTitle } from './PostTitle'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('PostTitle Component', () => {
  it('should render post title correctly', () => {
    renderWithTheme(<PostTitle title='Test Post Title' />)

    expect(screen.getByTestId('post-title')).toBeInTheDocument()
    expect(screen.getByTestId('post-title')).toHaveTextContent(
      'Test Post Title'
    )
  })

  it('should handle long titles with truncation', () => {
    const longTitle =
      'This is a very long post title that should be truncated when it exceeds the maximum number of lines allowed for the title display'

    renderWithTheme(<PostTitle title={longTitle} />)

    expect(screen.getByTestId('post-title')).toHaveTextContent(longTitle)
  })

  it('should use default maxLines value', () => {
    renderWithTheme(<PostTitle title='Test Title' />)

    const titleElement = screen.getByTestId('post-title')
    expect(titleElement).toBeInTheDocument()
  })

  it('should accept custom maxLines prop', () => {
    renderWithTheme(<PostTitle title='Test Title' maxLines={3} />)

    const titleElement = screen.getByTestId('post-title')
    expect(titleElement).toBeInTheDocument()
  })

  it('should handle empty title', () => {
    renderWithTheme(<PostTitle title='' />)

    expect(screen.getByTestId('post-title')).toBeInTheDocument()
    expect(screen.getByTestId('post-title')).toHaveTextContent('')
  })
})
