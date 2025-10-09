import React from 'react'
import { Avatar, Box, Typography, Tooltip } from '@mui/material'
import * as S from './styles'

export interface UserProfileProps {
  currentUser: {
    name: string
    username: string
    email: string
  }
}

const getAvatarStyles = () => ({
  width: 40,
  height: 40,
  backgroundColor: '#1DA1F2',
  fontSize: '1rem',
  fontWeight: 600
})

const getUsernameStyles = () => ({
  fontWeight: 600,
  color: 'text.primary',
  fontSize: '0.875rem'
})

const getUserHandleStyles = () => ({
  color: 'text.secondary',
  fontSize: '0.75rem'
})

export const UserProfile: React.FC<UserProfileProps> = ({ currentUser }) => (
  <Tooltip title='Mocked user' arrow>
    <S.UserInfoContainer>
      <Avatar sx={getAvatarStyles()}>{currentUser.name.charAt(0)}</Avatar>
      <Box>
        <Typography variant='body2' sx={getUsernameStyles()}>
          {currentUser.name}
        </Typography>
        <Typography variant='caption' sx={getUserHandleStyles()}>
          @{currentUser.username}
        </Typography>
      </Box>
    </S.UserInfoContainer>
  </Tooltip>
)
