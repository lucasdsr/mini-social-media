import { styled } from '@mui/material/styles'
import { Card, CardContent, Box, Typography } from '@mui/material'

export const PostContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    boxShadow: `0 4px 12px ${theme.palette.primary.main}20`,
    transform: 'translateY(-2px)'
  }
}))

export const PostContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2)
  }
}))

export const PostHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  gap: theme.spacing(1)
}))

export const CommentsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
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

export const CommentsToggle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(1, 1.5),
  backgroundColor: `color-mix(in srgb, ${theme.palette.background.paper} 60%, ${theme.palette.custom.darkContainer} 40%)`,
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.main}10`
  }
}))

export const CommentsCount = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
  letterSpacing: '0.5px'
}))
