import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const Container = styled(Box)(() => ({
  width: '100%'
}))

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  '& .MuiButton-root': {
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 600,
    padding: theme.spacing(1.5, 3),
    fontSize: '0.95rem'
  },
  '& .MuiButton-contained': {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
    boxShadow: `0 3px 5px 2px ${theme.palette.primary.main}30`,
    '&:hover': {
      background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
      boxShadow: `0 4px 8px 2px ${theme.palette.primary.main}40`
    }
  },
  '& .MuiButton-outlined': {
    borderColor: theme.palette.divider,
    color: theme.palette.text.secondary,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      backgroundColor: `${theme.palette.primary.main}10`
    }
  }
}))
