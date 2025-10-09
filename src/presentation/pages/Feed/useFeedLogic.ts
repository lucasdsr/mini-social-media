import { useEffect } from 'react'

import { usePosts } from '@/application/posts'
import { useAppSelector, useAppDispatch } from '@/application/store/hooks'
import { setShowSkeleton } from '@/application/slices/ui/uiSlice'

export const useFeedLogic = () => {
  const { posts, isLoading, isFetchingNextPage, hasNextPage, loadMoreRef } =
    usePosts()
  const isCreatingPost = useAppSelector(state => state.ui.loading)
  const showSkeleton = useAppSelector(state => state.ui.showSkeleton)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setShowSkeleton(false))
    }, 2000)

    return () => clearTimeout(timer)
  }, [dispatch])

  return {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    isCreatingPost,
    showSkeleton,
  }
}
