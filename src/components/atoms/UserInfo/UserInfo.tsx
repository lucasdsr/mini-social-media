import React from 'react'
import { useUserQuery } from '@/application/users/queries'
import { UserInfoProps } from './interfaces'
import * as S from './styles'

export const UserInfo: React.FC<UserInfoProps> = ({ userId, postId }) => {
  const { data: user } = useUserQuery(userId)
  const userName = user?.name || user?.username || `User ${userId}`

  return (
    <S.UserInfoContainer data-testid='user-info'>
      <S.UserName data-testid='user-name'>{userName}</S.UserName>
      <S.PostId data-testid='post-id'>Post #{postId}</S.PostId>
    </S.UserInfoContainer>
  )
}
