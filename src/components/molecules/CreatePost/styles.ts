import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.custom.darkContainer,
  borderRadius: '16px',
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 6px 16px ${theme.palette.primary.main}20`
  }
}))
