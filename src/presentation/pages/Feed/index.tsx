import React from 'react'
import { CircularProgress } from '@mui/material'

import { MainLayout } from '@/components/templates'
import { PostList } from '@/components/organisms'
import { usePosts } from '@/application/posts'

import * as S from './style'

export const Feed = () => {
  const { posts, isLoading } = usePosts()

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <CircularProgress color='primary' size={60} />
      </S.LoadingContainer>
    )
  }

  return (
    <MainLayout>
      <PostList posts={posts} />
    </MainLayout>
  )
}
