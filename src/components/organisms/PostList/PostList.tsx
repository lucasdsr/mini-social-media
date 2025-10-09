import React from 'react'
import { Typography, CircularProgress, Box } from '@mui/material'
import { PostListProps } from './interfaces'
import { Post, PostCardSkeleton } from '@/components/molecules'
import * as S from './styles'
import { PostWithEngagementScore } from '@/models'

export const PostList: React.FC<PostListProps> = ({
  posts,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  loadMoreRef,
  showSkeleton = false
}) => {
  if (isLoading && posts.length === 0) {
    return (
      <S.LoadingContainer>
        <CircularProgress color='primary' size={60} />
      </S.LoadingContainer>
    )
  }

  if (posts.length === 0) {
    return (
      <S.EmptyStateContainer>
        <Typography variant='h6' gutterBottom>
          No Post Found
        </Typography>
        <Typography variant='body2'>Try to share something?</Typography>
      </S.EmptyStateContainer>
    )
  }

  return (
    <S.PostListContainer>
      {showSkeleton
        ? // Render skeleton cards
          Array.from({ length: 4 }).map((_, index) => (
            <PostCardSkeleton key={`skeleton-${index}`} />
          ))
        : // Render actual posts
          posts.map(post => (
            <Post
              key={post.id}
              userId={post.userId}
              id={post.id}
              title={post.title}
              body={post.body}
              engagementScore={
                'engagementScore' in post
                  ? (post as PostWithEngagementScore).engagementScore
                  : undefined
              }
            />
          ))}

      {/* Infinite scroll trigger element - only show when not showing skeleton */}
      {!showSkeleton && hasNextPage && (
        <Box ref={loadMoreRef} sx={{ height: '20px', margin: '20px 0' }}>
          {isFetchingNextPage && (
            <Box display='flex' justifyContent='center' alignItems='center'>
              <CircularProgress color='primary' size={40} />
            </Box>
          )}
        </Box>
      )}

      {/* End of feed message - only show when not showing skeleton */}
      {!showSkeleton && !hasNextPage && posts.length > 0 && (
        <S.EndOfFeedContainer>
          <Typography variant='body2' color='text.secondary'>
            You&apos;ve reached the end of the Feed
          </Typography>
        </S.EndOfFeedContainer>
      )}
    </S.PostListContainer>
  )
}
