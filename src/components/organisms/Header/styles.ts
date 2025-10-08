import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.custom.darkContainer,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: 0,
  paddingRight: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)'
}))

export const SearchContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  width: '100%',
  margin: '0 auto',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2)
}))
