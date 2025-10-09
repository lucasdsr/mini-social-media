import React from 'react'
import { CircularProgress } from '@mui/material'
import * as S from './styles'

export const LoadingState: React.FC = () => (
  <S.LoadingContainer>
    <CircularProgress color='primary' size={60} />
  </S.LoadingContainer>
)
