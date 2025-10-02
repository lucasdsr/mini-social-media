import { Box, Container, styled, TextField, Typography } from '@mui/material'

export const InputContainer = styled(Container)(({ theme }) => ({
  width: '437px',
  padding: '0px 8px !important',

  [theme.breakpoints.down('sm')]: {
    width: '55vw'
  }
}))

export const InputField = styled(TextField)`
  width: 100%;
  padding: 0px !important;
`

export const InputBox = styled(Box)`
  align-items: center;
  display: flex;
  width: 100%;
  height: 32px;
`

export const InputText = styled(Typography)(({ theme }) => ({
  maxWidth: '420px',
  fontSize: '14px',
  fontWeight: '600',
  overflowX: 'hidden',

  [theme.breakpoints.down('sm')]: {
    maxWidth: '55vw'
  }
}))
