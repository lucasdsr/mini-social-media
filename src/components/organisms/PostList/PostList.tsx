import React from 'react'
import { Typography } from '@mui/material'
import { PostListProps } from './interfaces'
import { Post } from '@/components/molecules'
import * as S from './styles'

export const PostList: React.FC<PostListProps> = ({ posts }) => {
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
    </S.PostListContainer>
  )
}
