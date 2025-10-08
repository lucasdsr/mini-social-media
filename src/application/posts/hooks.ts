import { useEffect, useMemo } from 'react'
import { usePostsQuery } from './queries'
import { useUsersQuery } from '../users/queries'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  addLocalPost,
  removeLocalPostsByApiIds,
  loadLocalPosts
} from '../slices/posts'
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
