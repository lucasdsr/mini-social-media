import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const CommentFormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  position: 'relative'
}))

export const CommentFormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center'
}))

export const FormFields = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr'
  }
}))

export const SubmitButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(1.5)
}))
