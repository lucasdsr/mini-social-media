import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const AvatarContainer = styled(Box)<{
  size: 'small' | 'medium' | 'large'
}>(({ theme, size }) => ({
  width: size === 'small' ? '32px' : size === 'medium' ? '40px' : '48px',
  height: size === 'small' ? '32px' : size === 'medium' ? '40px' : '48px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  fontSize: size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'
}))
