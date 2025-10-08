import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const Container = styled(Box)(() => ({
  position: 'relative',
  width: '100%'
}))

export const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(15, 20, 25, 0.85)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}20, transparent)`,
    borderRadius: theme.spacing(2),
    pointerEvents: 'none'
  }
}))

export const LoadingContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  position: 'relative',
  zIndex: 1
}))

export const LoadingText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.primary.light,
  fontWeight: 500,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  opacity: 0.8
}))
