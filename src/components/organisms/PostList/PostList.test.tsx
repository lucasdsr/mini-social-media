import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../assets/theme'
import { PostList } from './PostList'
import { MOCK_POSTS } from '@/application/posts'

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)

describe('PostList Component', () => {
  it('should render list of posts correctly', () => {
    renderWithTheme(<PostList posts={MOCK_POSTS} />)

    expect(screen.getAllByTestId('post-container')).toHaveLength(5)
  })

  it('should show empty state when no posts', () => {
    renderWithTheme(<PostList posts={[]} />)

    expect(screen.getByText('No Post Found')).toBeInTheDocument()
    expect(screen.getByText('Try to share something?')).toBeInTheDocument()
  })

  it('should render posts with correct data', () => {
    const singlePost = [MOCK_POSTS[0]]
    renderWithTheme(<PostList posts={singlePost} />)

    expect(
      screen.getByText('Bem-vindo ao Mini Social Media!')
    ).toBeInTheDocument()
    expect(screen.getByText('User 1')).toBeInTheDocument()
  })

  it('should handle multiple posts correctly', () => {
    renderWithTheme(<PostList posts={MOCK_POSTS.slice(0, 3)} />)

    expect(screen.getAllByTestId('post-container')).toHaveLength(3)
  })
})
