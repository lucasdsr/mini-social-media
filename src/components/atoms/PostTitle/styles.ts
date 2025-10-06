import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

export const PostTitleContainer = styled(Typography)<{ maxLines: number }>(
  ({ theme, maxLines }) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  })
)
