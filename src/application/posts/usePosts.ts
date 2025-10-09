import React, { useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfinitePostsQuery } from './queries'
import { useUsersQuery } from '../users/queries'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  addLocalPost,
  removeLocalPostsByApiIds,
  loadLocalPosts
} from '../slices/posts'
import { calculateEngagementScores } from '../engagement/engagementService'
import { Post, PostWithEngagementScore } from '../../models'
import { useCommentsByPostQuery } from '../comments/queries'
import {
  setCommentsForPost,
  setLoadingForPost
} from '../slices/posts/commentsSlice'

export const usePosts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfinitePostsQuery()

  const { data: users = [] } = useUsersQuery()
  const { posts: localPosts, isLoaded } = useAppSelector(
    state => state.localPosts
  )
  const { commentsByPost } = useAppSelector(state => state.comments)
  const { searchTerm, engagementThreshold } = useAppSelector(
    state => state.posts.filters
  )
  const sortBy = useAppSelector(state => state.posts.sortBy)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (!isLoaded) {
      dispatch(loadLocalPosts())
    }
  }, [dispatch, isLoaded])

  const allApiPosts = useMemo(() => data?.pages.flat() || [], [data?.pages])

  const usersMap = useMemo(
    () =>
      users.reduce(
        (acc, user) => {
          acc[user.id] = user
          return acc
        },
        {} as Record<number, (typeof users)[0]>
      ),
    [users]
  )

  const allPosts = useMemo(() => {
    const sortedLocalPosts = [...localPosts].sort((a, b) => b.id - a.id)
    const apiPostsInOrder = [...allApiPosts]

    return [...sortedLocalPosts, ...apiPostsInOrder]
  }, [localPosts, allApiPosts])

  // Calculate engagement scores for all posts
  const postsWithEngagement = useMemo(
    () => calculateEngagementScores(allPosts, commentsByPost),
    [allPosts, commentsByPost]
  )

  // Filter posts based on search term and engagement threshold
  const filteredPosts = useMemo(() => {
    let filtered = postsWithEngagement

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = filtered.filter(post => {
        const user = usersMap[post.userId]
        const userName = user?.name || user?.username || `User ${post.userId}`

        return (
          post.title.toLowerCase().includes(searchLower) ||
          post.body.toLowerCase().includes(searchLower) ||
          userName.toLowerCase().includes(searchLower)
        )
      })
    }

    // Apply engagement threshold filter
    if (engagementThreshold > 0) {
      filtered = filtered.filter(
        post =>
          'engagementScore' in post &&
          (post as PostWithEngagementScore).engagementScore.value >=
            engagementThreshold
      )
    }

    return filtered
  }, [postsWithEngagement, searchTerm, engagementThreshold, usersMap])

  // Sort posts based on selected criteria
  const sortedPosts = useMemo(() => {
    const posts = [...filteredPosts]

    switch (sortBy) {
      case 'engagement':
        return posts.sort((a, b) => {
          const scoreA =
            'engagementScore' in a
              ? (a as PostWithEngagementScore).engagementScore.value
              : 0
          const scoreB =
            'engagementScore' in b
              ? (b as PostWithEngagementScore).engagementScore.value
              : 0
          return scoreB - scoreA
        })
      case 'title':
        return posts.sort((a, b) => a.title.localeCompare(b.title))
      case 'date':
      default:
        return posts.sort((a, b) => b.id - a.id)
    }
  }, [filteredPosts, sortBy])

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: '20px',
    triggerOnce: false,
    skip: isFetchingNextPage || isLoading // Skip when already loading
  })

  const isRequestInProgress = React.useRef(false)

  React.useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isLoading &&
      !isRequestInProgress.current
    ) {
      isRequestInProgress.current = true
      fetchNextPage().finally(() => {
        setTimeout(() => {
          isRequestInProgress.current = false
        }, 100)
      })
    }
  }, [inView, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage])

  const handleAddLocalPost = (post: Post) => {
    dispatch(addLocalPost(post))
  }

  React.useEffect(() => {
    if (allApiPosts.length > 0 && localPosts.length > 0) {
      const apiPostIds = allApiPosts.map(post => post.id)
      dispatch(removeLocalPostsByApiIds(apiPostIds))
    }
  }, [allApiPosts, localPosts.length, dispatch])

  return {
    posts: sortedPosts,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    addLocalPost: handleAddLocalPost
  }
}

/**
 * Hook to fetch comments for a specific post
 */
export const usePostComments = (postId: number) => {
  const dispatch = useAppDispatch()
  const { commentsByPost, loadingByPost } = useAppSelector(
    state => state.comments
  )
  const {
    data: comments = [],
    isLoading,
    isFetching
  } = useCommentsByPostQuery(postId)

  // Update store when comments are loaded
  React.useEffect(() => {
    if (comments.length > 0) {
      dispatch(setCommentsForPost({ postId, comments }))
    }
  }, [comments, postId, dispatch])

  // Update loading state in store
  React.useEffect(() => {
    dispatch(setLoadingForPost({ postId, isLoading: isLoading || isFetching }))
  }, [isLoading, isFetching, postId, dispatch])

  return {
    comments: commentsByPost[postId] || [],
    isLoading: loadingByPost[postId] || false
  }
}
