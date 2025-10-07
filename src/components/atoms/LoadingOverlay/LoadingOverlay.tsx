import React from 'react'
import { CircularProgress } from '@mui/material'
import * as S from './styles'

export interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children
}) => (
  <S.Container>
    {children}
    {isLoading && (
      <S.Overlay>
        <S.LoadingContent>
          <CircularProgress color='primary' size={60} />
          <S.LoadingText>Postando...</S.LoadingText>
        </S.LoadingContent>
      </S.Overlay>
    )}
  </S.Container>
)
