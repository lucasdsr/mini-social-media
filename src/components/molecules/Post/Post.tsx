import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import { ChatBubbleOutline } from '@mui/icons-material'
import { PostProps } from './interfaces'
import {
  UserAvatar,
  UserInfo,
  PostTitle,
  PostBody,
  CommentsLoading
} from '../../atoms'
import { CommentsList } from '../CommentsList'
import { usePostComments } from '../../../application/posts/hooks'
import * as S from './styles'

export const Post: React.FC<PostProps> = ({ userId, id, title, body }) => {
  const [showComments, setShowComments] = useState(false)
  const { comments, isLoading } = usePostComments(id)

  const handleToggleComments = () => {
    setShowComments(!showComments)
  }

  return (
    <S.PostContainer data-testid='post-container'>
      <S.PostContent>
        <S.PostHeader>
          <UserAvatar userId={userId} size='medium' />
          <UserInfo userId={userId} postId={id} />
        </S.PostHeader>

        <PostTitle title={title} maxLines={2} />
        <PostBody body={body} maxLines={3} />

        <S.CommentsSection>
          <S.CommentsToggle
            onClick={handleToggleComments}
            data-testid='comments-toggle'
          >
            <IconButton
              size='small'
              color='primary'
              sx={{ pointerEvents: 'none' }}
            >
              <ChatBubbleOutline fontSize='small' />
            </IconButton>
            <S.CommentsCount variant='body2' color='text.secondary'>
              {comments.length} comment{comments.length !== 1 ? 's' : ''}
            </S.CommentsCount>
          </S.CommentsToggle>

          {showComments && (
            <CommentsLoading isLoading={isLoading}>
              <CommentsList comments={comments} />
            </CommentsLoading>
          )}
        </S.CommentsSection>
      </S.PostContent>
    </S.PostContainer>
  )
}
