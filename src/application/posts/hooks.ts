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
import { Post } from '../../models'

export const usePosts = () => {
  const { data: posts = [], isFetching: isLoading } = usePostsQuery()
  const { data: users = [] } = useUsersQuery()
  const { posts: localPosts, isLoaded } = useAppSelector(
    state => state.localPosts
  )
  const { searchTerm } = useAppSelector(state => state.posts.filters)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadLocalPosts())
    }
  }, [dispatch, isLoaded])

  const allPosts = [...localPosts, ...posts]

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

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) {
      return allPosts
    }

    const searchLower = searchTerm.toLowerCase()

    return allPosts.filter(post => {
      const user = usersMap[post.userId]
      const userName = user?.name || user?.username || `User ${post.userId}`

      return (
        post.title.toLowerCase().includes(searchLower) ||
        post.body.toLowerCase().includes(searchLower) ||
        userName.toLowerCase().includes(searchLower)
      )
    })
  }, [allPosts, searchTerm, usersMap])

  const sortedPosts = filteredPosts.sort((a, b) => b.id - a.id)

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
