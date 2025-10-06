import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../assets/theme'
import { PostBody } from './PostBody'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('PostBody Component', () => {
  it('should render post body correctly', () => {
    renderWithTheme(<PostBody body='This is a test post body content.' />)

    expect(screen.getByTestId('post-body')).toBeInTheDocument()
    expect(screen.getByTestId('post-body')).toHaveTextContent(
      'This is a test post body content.'
    )
  })

  it('should handle long content with truncation', () => {
    const longBody =
      'This is a very long post body content that should be truncated when it exceeds the maximum number of lines allowed for the body display. This content is intentionally long to test the truncation functionality of the component.'

    renderWithTheme(<PostBody body={longBody} />)

    expect(screen.getByTestId('post-body')).toHaveTextContent(longBody)
  })

  it('should use default maxLines value', () => {
    renderWithTheme(<PostBody body='Test body content' />)

    const bodyElement = screen.getByTestId('post-body')
    expect(bodyElement).toBeInTheDocument()
  })

  it('should accept custom maxLines prop', () => {
    renderWithTheme(<PostBody body='Test body content' maxLines={5} />)

    const bodyElement = screen.getByTestId('post-body')
    expect(bodyElement).toBeInTheDocument()
  })

  it('should handle empty body', () => {
    renderWithTheme(<PostBody body='' />)

    expect(screen.getByTestId('post-body')).toBeInTheDocument()
    expect(screen.getByTestId('post-body')).toHaveTextContent('')
  })
})
