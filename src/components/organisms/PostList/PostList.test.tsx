import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../../assets/theme'
import { PostList } from './PostList'
import { Post } from '@/models'

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    userId: 1,
    title: 'Bem-vindo ao Mini Social Media!',
    body: 'Este é o primeiro post do nosso mini social media.'
  },
  {
    id: 2,
    userId: 1,
    title: 'Segundo Post',
    body: 'Este é o segundo post.'
  },
  {
    id: 3,
    userId: 1,
    title: 'Terceiro Post',
    body: 'Este é o terceiro post.'
  },
  {
    id: 4,
    userId: 1,
    title: 'Quarto Post',
    body: 'Este é o quarto post.'
  },
  {
    id: 5,
    userId: 1,
    title: 'Quinto Post',
    body: 'Este é o quinto post.'
  }
]

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
