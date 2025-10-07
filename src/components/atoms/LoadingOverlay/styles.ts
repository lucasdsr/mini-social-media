import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const Container = styled(Box)({
  position: 'relative'
})

export const Overlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  borderRadius: '16px',
  backdropFilter: 'blur(4px)'
}))

export const LoadingContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
}))

export const LoadingText = styled('span')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  color: theme.palette.primary.main
}))
