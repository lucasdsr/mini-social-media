import { Box, Paper, PaperProps, styled } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

export const TaskItemContainer = styled(Paper)<
  PaperProps & { isVisible: boolean }
>(({ theme, isVisible }) => ({
  minHeight: '76px',
  padding: '12px',
  gap: '8px',
  display: 'flex',
  alignItems: 'center',
  marginRight: '12px',
  backgroundColor: 'inherit',
  justifyContent: 'space-between',

  opacity: 1,
  transition: 'opacity 0.5s ease-out',

  [theme.breakpoints.down('sm')]: {
    width: '80vw'
  },

  ...(!isVisible && {
    opacity: 0
  })
}))

export const Close = styled(CloseIcon)`
  align-self: center;
  cursor: pointer;
`

export const InputRow = styled(Box)`
  gap: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
