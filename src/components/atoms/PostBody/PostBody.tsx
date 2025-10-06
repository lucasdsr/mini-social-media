import React from 'react'
import { PostBodyProps } from './interfaces'
import * as S from './styles'

export const PostBody: React.FC<PostBodyProps> = ({ body, maxLines = 3 }) => (
  <S.PostBodyContainer data-testid='post-body' maxLines={maxLines} as='p'>
    {body}
  </S.PostBodyContainer>
)
