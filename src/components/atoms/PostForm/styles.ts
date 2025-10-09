import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const Container = styled(Box)(() => ({
  width: '100%'
}))

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(1.5),
  '& .MuiButton-root': {
    borderRadius: '6px',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '0.8rem',
    minWidth: '70px'
  },
  '& .MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: `0 2px 4px ${theme.palette.primary.main}25`,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 4px 8px ${theme.palette.primary.main}35`,
      transform: 'translateY(-1px)'
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: `0 2px 4px ${theme.palette.primary.main}25`
    }
  },
  '& .MuiButton-outlined': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: theme.palette.primary.dark,
      color: theme.palette.primary.dark,
      backgroundColor: `${theme.palette.primary.main}08`,
      transform: 'translateY(-1px)',
      boxShadow: `0 2px 4px ${theme.palette.primary.main}15`
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: 'none'
    }
  }
}))
