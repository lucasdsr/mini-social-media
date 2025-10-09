import React from 'react'
import { Skeleton } from '@mui/material'
import { SkeletonAtomProps } from './interfaces'
import * as S from './styles'

export const SkeletonAtom: React.FC<SkeletonAtomProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  ...props
}) => {
  return (
    <S.SkeletonContainer width={width} height={height}>
      <Skeleton
        variant={variant}
        width={width}
        height={height}
        animation={animation}
        {...props}
      />
    </S.SkeletonContainer>
  )
}
