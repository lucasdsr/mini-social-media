import React from 'react'
import { PostProps } from './interfaces'
import {
  UserAvatar,
  UserInfo,
  PostTitle,
  PostBody,
  CommentsLoading
} from '../../atoms'
import { CommentsList } from '../CommentsList'
import { CommentsToggle } from './CommentsToggle'
import { usePostLogic } from './hooks'
import * as S from './styles'

export const Post: React.FC<PostProps> = ({
  userId,
  id,
  title,
  body,
  engagementScore
}) => {
  const { showComments, comments, isLoading, handleToggleComments } =
    usePostLogic(id)

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
          <CommentsToggle
            onClick={handleToggleComments}
            engagementScore={engagementScore}
            commentsCount={comments.length}
          />

          {showComments && (
            <CommentsLoading isLoading={isLoading}>
              <CommentsList comments={comments} postId={id} />
            </CommentsLoading>
          )}
        </S.CommentsSection>
      </S.PostContent>
    </S.PostContainer>
  )
}
