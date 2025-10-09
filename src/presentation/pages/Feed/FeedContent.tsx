import React from 'react'

import { MainLayout } from '@/components/templates'
import { PostList } from '@/components/organisms'
import { CreatePost } from '@/components/molecules'
import { LoadingOverlay } from '@/components/atoms'
import { Post } from '@/models'

interface FeedContentProps {
  posts: Post[]
  isLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean
  loadMoreRef?: (node?: Element | null) => void
  isCreatingPost: boolean
  showSkeleton: boolean
}

export const FeedContent = ({
  posts,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  loadMoreRef,
  isCreatingPost,
  showSkeleton
}: FeedContentProps) => (
  <MainLayout>
    <LoadingOverlay isLoading={isCreatingPost}>
      <CreatePost />
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
