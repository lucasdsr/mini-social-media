import React from 'react'
import { Typography, CircularProgress, Box } from '@mui/material'
import { PostListProps } from './interfaces'
import { Post } from '@/components/molecules'
import * as S from './styles'

export const PostList: React.FC<PostListProps> = ({ 
  posts, 
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  loadMoreRef
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
      {posts.map(post => (
        <Post
          key={post.id}
          userId={post.userId}
          id={post.id}
          title={post.title}
          body={post.body}
        />
      ))}
      
      {/* Infinite scroll trigger element */}
      {hasNextPage && (
        <Box ref={loadMoreRef} sx={{ height: '20px', margin: '20px 0' }}>
          {isFetchingNextPage && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress color='primary' size={40} />
            </Box>
          )}
        </Box>
      )}
      
      {/* End of feed message */}
      {!hasNextPage && posts.length > 0 && (
        <S.EndOfFeedContainer>
          <Typography variant='body2' color='text.secondary'>
            You've reached the end of the Feed
          </Typography>
        </S.EndOfFeedContainer>
      )}
    </S.PostListContainer>
  )
}
