import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

export const PostBodyContainer = styled(Typography)<{ maxLines: number }>(
  ({ theme, maxLines }) => ({
    fontSize: '14px',
    color: theme.palette.text.secondary,
    lineHeight: 1.5,
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  })
)
