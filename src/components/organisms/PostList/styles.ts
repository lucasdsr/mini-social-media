import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const PostListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: '700px',
  minWidth: '320px',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
  borderRadius: '12px',
  backgroundColor: theme.palette.custom.darkContainer,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.up('sm')]: {
    minWidth: '700px'
  }
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

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '200px',
  padding: theme.spacing(4)
}))

export const EndOfFeedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    opacity: 0.6
  }
}))
