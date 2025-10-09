import { useEffect, useMemo } from 'react'
import { usePostsQuery } from './queries'
import { useUsersQuery } from '../users/queries'
import { useCommentsByPostQuery } from '../comments/queries'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  addLocalPost,
  removeLocalPostsByApiIds,
  loadLocalPosts
} from '../slices/posts'
import {
  setCommentsForPost,
  setLoadingForPost
} from '../slices/posts/commentsSlice'
import { calculateEngagementScores } from '../engagement/engagementService'
import { Post, PostWithEngagementScore } from '../../models'

export const usePosts = () => {
  const { data: posts = [], isFetching: isLoading } = usePostsQuery()
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

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadLocalPosts())
    }
  }, [dispatch, isLoaded])

  const allPosts = [...localPosts, ...posts]

  // Calculate engagement scores for all posts
  const postsWithEngagement = useMemo(
    () => calculateEngagementScores(allPosts, commentsByPost),
    [allPosts, commentsByPost]
  )

  // Create a map of users for quick lookup
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

  const handleAddLocalPost = (post: Post) => {
    dispatch(addLocalPost(post))
  }

  useEffect(() => {
    if (posts.length > 0 && localPosts.length > 0) {
      const apiPostIds = posts.map(post => post.id)
      dispatch(removeLocalPostsByApiIds(apiPostIds))
    }
  }, [posts, localPosts.length, dispatch])

  return {
    posts: sortedPosts,
    isLoading,
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
  useEffect(() => {
    if (comments.length > 0) {
      dispatch(setCommentsForPost({ postId, comments }))
    }
  }, [comments, postId, dispatch])

  // Update loading state in store
  useEffect(() => {
    dispatch(setLoadingForPost({ postId, isLoading: isLoading || isFetching }))
  }, [isLoading, isFetching, postId, dispatch])

  return {
    comments: commentsByPost[postId] || [],
    isLoading: loadingByPost[postId] || false
  }
}
