import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const PostListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  border: `1px solid ${theme.palette.primary.dark}`,
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  overflow: 'hidden'
}))

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))
