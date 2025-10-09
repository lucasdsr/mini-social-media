import React from 'react'
import { PostListProps } from './interfaces'
import { LoadingState } from './LoadingState'
import { EmptyState } from './EmptyState'
import { SkeletonList } from './SkeletonList'
import { PostItem } from './PostItem'
import { InfiniteScrollTrigger } from './InfiniteScrollTrigger'
import { EndOfFeedMessage } from './EndOfFeedMessage'
import { usePostListLogic } from './hooks'
import * as S from './styles'

export const PostList: React.FC<PostListProps> = ({
  posts,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  loadMoreRef,
  showSkeleton = false
}) => {
  const { shouldShowLoading, shouldShowEmpty } = usePostListLogic(
    posts,
    isLoading
  )

  if (shouldShowLoading) {
    return <LoadingState />
  }

  if (shouldShowEmpty) {
    return <EmptyState />
  }

  return (
    <S.PostListContainer>
      {showSkeleton ? (
        <SkeletonList />
      ) : (
        posts.map(post => <PostItem key={post.id} post={post} />)
      )}

      <InfiniteScrollTrigger
        loadMoreRef={loadMoreRef}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        showSkeleton={showSkeleton}
      />

      <EndOfFeedMessage
        hasNextPage={hasNextPage}
        postsLength={posts.length}
        showSkeleton={showSkeleton}
      />
    </S.PostListContainer>
  )
}
