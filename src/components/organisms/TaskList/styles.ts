import { Box, Button, Paper, styled, Typography } from '@mui/material'

export const Title = styled(Typography)`
  font-weight: 700;
  color: white;
`

export const AddButton = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.primary.main};
`

export const TaskListContainer = styled(Paper)(({ theme }) => ({
  gap: '24px',
  padding: '24px',
  display: 'flex',
  width: '554px',
  paddingRight: '12px',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.palette.secondary.main,

  [theme.breakpoints.down('sm')]: {
    width: '80vw'
  }
}))

export const TasksContainer = styled(Box)`
  max-height: 75vh;
  overflow-y: auto;
  overflow-x: hidden;
`

export const BoxList = styled(Box)({
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
})
