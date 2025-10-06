import React from 'react'
import { PostProps } from './interfaces'
import { UserAvatar, UserInfo, PostTitle, PostBody } from '../../atoms'
import * as S from './styles'

export const Post: React.FC<PostProps> = ({ userId, id, title, body }) => (
  <S.PostContainer data-testid='post-container'>
    <S.PostContent>
      <S.PostHeader>
        <UserAvatar userId={userId} size='medium' />
        <UserInfo userId={userId} postId={id} />
      </S.PostHeader>

      <PostTitle title={title} maxLines={2} />
      <PostBody body={body} maxLines={3} />
    </S.PostContent>
  </S.PostContainer>
)
