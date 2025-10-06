import React from 'react'
import { UserAvatarProps } from './interfaces'
import * as S from './styles'

export const UserAvatar: React.FC<UserAvatarProps> = ({
  userId,
  size = 'medium'
}) => {
  const getUserInitials = (userId: number): string => `U${userId}`

  return (
    <S.AvatarContainer data-testid='user-avatar' size={size}>
      {getUserInitials(userId)}
    </S.AvatarContainer>
  )
}
