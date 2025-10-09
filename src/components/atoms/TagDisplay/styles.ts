import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.75),
  paddingLeft: theme.spacing(2)
}))
