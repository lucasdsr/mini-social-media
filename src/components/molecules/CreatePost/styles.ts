import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const Container = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.custom.darkContainer,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 2px 8px ${theme.palette.primary.main}15`
  }
}))
