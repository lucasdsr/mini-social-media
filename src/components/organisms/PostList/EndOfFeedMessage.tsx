import React from 'react'
import { Typography } from '@mui/material'
import * as S from './styles'

export interface EndOfFeedMessageProps {
  hasNextPage: boolean
  postsLength: number
  showSkeleton: boolean
}

export const EndOfFeedMessage: React.FC<EndOfFeedMessageProps> = ({
  hasNextPage,
  postsLength,
  showSkeleton
}) => {
  if (showSkeleton || hasNextPage || postsLength === 0) return null

  return (
    <S.EndOfFeedContainer>
      <Typography variant='body2' color='text.secondary'>
        You&apos;ve reached the end of the Feed
      </Typography>
    </S.EndOfFeedContainer>
  )
}
