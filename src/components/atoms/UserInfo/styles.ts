import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25)
}))

export const UserName = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.text.primary,
  lineHeight: 1.2
}))

export const PostId = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.text.secondary,
  lineHeight: 1.2
}))
