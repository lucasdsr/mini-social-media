import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const SkeletonContainer = styled(Box)<{
  width?: string | number
  height?: string | number
}>(({ width, height }) => ({
  width: typeof width === 'number' ? `${width}px` : width || '100%',
  height: typeof height === 'number' ? `${height}px` : height || 'auto'
}))
