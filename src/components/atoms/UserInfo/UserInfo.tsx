import React from 'react'
import { UserInfoProps } from './interfaces'
import * as S from './styles'

export const UserInfo: React.FC<UserInfoProps> = ({ userId, postId }) => (
  <S.UserInfoContainer data-testid='user-info'>
    <S.UserName data-testid='user-name'>User {userId}</S.UserName>
    <S.PostId data-testid='post-id'>Post #{postId}</S.PostId>
  </S.UserInfoContainer>
)
