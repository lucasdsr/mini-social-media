import React from 'react'
import { CircularProgress } from '@mui/material'
import * as S from './styles'

export interface CommentsLoadingProps {
  isLoading: boolean
  children: React.ReactNode
}

export const CommentsLoading: React.FC<CommentsLoadingProps> = ({
  isLoading,
  children
}) => (
  <S.Container>
    {children}
    {isLoading && (
      <S.Overlay>
        <S.LoadingContent>
          <CircularProgress color='primary' size={40} />
          <S.LoadingText>Carregando comentários...</S.LoadingText>
        </S.LoadingContent>
      </S.Overlay>
    )}
  </S.Container>
)
