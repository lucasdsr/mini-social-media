import React from 'react'
import { PostTitleProps } from './interfaces'
import * as S from './styles'

export const PostTitle: React.FC<PostTitleProps> = ({
  title,
  maxLines = 2
}) => (
  <S.PostTitleContainer data-testid='post-title' maxLines={maxLines} as='h3'>
    {title}
  </S.PostTitleContainer>
)
