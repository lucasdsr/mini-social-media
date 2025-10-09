import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import { FeedContent } from './FeedContent'
import { renderWithTheme } from '../../test-utils'

describe('FeedContent Component', () => {
  const mockLoadMoreRef = vi.fn()

  const mockProps = {
    posts: [],
    isLoading: false,
    isFetchingNextPage: false,
    hasNextPage: false,
    loadMoreRef: mockLoadMoreRef,
    isCreatingPost: false,
    showSkeleton: false
  }

  it('should render feed content with create post and post list', () => {
    renderWithTheme(<FeedContent {...mockProps} />)

    expect(screen.getByTestId('create-post')).toBeInTheDocument()
    expect(screen.getByTestId('post-list')).toBeInTheDocument()
  })

  it('should pass correct props to PostList', () => {
    const customProps = {
      ...mockProps,
      posts: [{ id: 1, userId: 1, title: 'Test Post', body: 'Test body' }],
      isLoading: true,
      showSkeleton: true
    }

    renderWithTheme(<FeedContent {...customProps} />)

    expect(screen.getByTestId('post-list')).toBeInTheDocument()
  })

  it('should show loading overlay when creating post', () => {
    const customProps = {
      ...mockProps,
      isCreatingPost: true
    }

    renderWithTheme(<FeedContent {...customProps} />)

    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument()
  })
})
