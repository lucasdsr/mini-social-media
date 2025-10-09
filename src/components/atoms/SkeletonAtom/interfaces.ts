import { SkeletonProps } from '@mui/material'

export interface SkeletonAtomProps extends Omit<SkeletonProps, 'width' | 'height'> {
  width?: string | number
  height?: string | number
}
