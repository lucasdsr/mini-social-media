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
import { Post } from '../../models'

export const useInfinitePosts = () => {
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
  const { searchTerm } = useAppSelector(state => state.posts.filters)
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

  const sortedPosts = filteredPosts

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
