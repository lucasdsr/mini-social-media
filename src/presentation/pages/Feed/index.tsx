import React from 'react'

import { LoadingState } from './LoadingState'
import { FeedContent } from './FeedContent'
import { useFeedLogic } from './useFeedLogic'

export const Feed = () => {
  const {
    posts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    isCreatingPost,
    showSkeleton,
  } = useFeedLogic()

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <FeedContent
      posts={posts}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      loadMoreRef={loadMoreRef}
      isCreatingPost={isCreatingPost}
      showSkeleton={showSkeleton}
    />
  )
}
