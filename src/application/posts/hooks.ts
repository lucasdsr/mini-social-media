import { useEffect } from 'react'
import { usePostsQuery } from './queries'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {
  addLocalPost,
  removeLocalPostsByApiIds,
  loadLocalPosts
} from '../slices/posts'
import { Post } from '../../models'

export const usePosts = () => {
  const { data: posts = [], isFetching: isLoading } = usePostsQuery()
  const { posts: localPosts, isLoaded } = useAppSelector(
    state => state.localPosts
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoaded) {
      dispatch(loadLocalPosts())
    }
  }, [dispatch, isLoaded])

  const allPosts = [...localPosts, ...posts]

  const sortedPosts = allPosts.sort((a, b) => b.id - a.id)

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
