import React from 'react'
import { Typography } from '@mui/material'
import * as S from './styles'

export const EmptyState: React.FC = () => (
  <S.EmptyStateContainer>
    <Typography variant='h6' gutterBottom>
      No Post Found
    </Typography>
    <Typography variant='body2'>Try to share something?</Typography>
  </S.EmptyStateContainer>
)
