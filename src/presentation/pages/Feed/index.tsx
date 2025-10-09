import React, { useEffect } from 'react'
import { CircularProgress } from '@mui/material'

import { MainLayout } from '@/components/templates'
import { PostList } from '@/components/organisms'
import { CreatePost } from '@/components/molecules'
import { LoadingOverlay } from '@/components/atoms'
import { useInfinitePosts } from '@/application/posts'
import { useAppSelector, useAppDispatch } from '@/application/store/hooks'
import { setShowSkeleton } from '@/application/slices/ui/uiSlice'

import * as S from './style'

export const Feed = () => {
  const { posts, isLoading, isFetchingNextPage, hasNextPage, loadMoreRef } =
    useInfinitePosts()
  const isCreatingPost = useAppSelector(state => state.ui.loading)
  const showSkeleton = useAppSelector(state => state.ui.showSkeleton)
  const dispatch = useAppDispatch()

  // Hide skeleton after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setShowSkeleton(false))
    }, 2000)

    return () => clearTimeout(timer)
  }, [dispatch])

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <CircularProgress color='primary' size={60} />
      </S.LoadingContainer>
    )
  }

  return (
    <MainLayout>
      <CreatePost />
      <LoadingOverlay isLoading={isCreatingPost}>
        <PostList
          posts={posts}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          loadMoreRef={loadMoreRef}
          showSkeleton={showSkeleton}
        />
      </LoadingOverlay>
    </MainLayout>
  )
}
