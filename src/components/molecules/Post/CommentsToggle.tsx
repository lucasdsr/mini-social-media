import React from 'react'
import { IconButton } from '@mui/material'
import { ChatBubbleOutline } from '@mui/icons-material'
import { EngagementScoreBadge } from '../../atoms'
import { EngagementScore } from '../../../models'
import * as S from './styles'

export interface CommentsToggleProps {
  onClick: () => void
  engagementScore?: EngagementScore
  commentsCount: number
}

const getIconButtonStyles = () => ({
  pointerEvents: 'none'
})

export const CommentsToggle: React.FC<CommentsToggleProps> = ({
  onClick,
  engagementScore,
  commentsCount
}) => (
  <S.CommentsToggle onClick={onClick} data-testid='comments-toggle'>
    {engagementScore && (
      <EngagementScoreBadge engagementScore={engagementScore} size='small' />
    )}
    <IconButton size='small' color='primary' sx={getIconButtonStyles()}>
      <ChatBubbleOutline fontSize='small' />
    </IconButton>
    <S.CommentsCount variant='body2' color='text.secondary'>
      {commentsCount}
    </S.CommentsCount>
  </S.CommentsToggle>
)
