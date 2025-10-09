import React from 'react'
import { CircularProgress } from '@mui/material'

import * as S from './style'

export const LoadingState = () => (
  <S.LoadingContainer>
    <CircularProgress color='primary' size={60} />
  </S.LoadingContainer>
)
