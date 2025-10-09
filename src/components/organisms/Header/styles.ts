import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.custom.darkContainer,
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: 0,
  paddingRight: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  width: '100vw',
  marginLeft: 'calc(-50vw + 50%)',
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}))

export const HeaderContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${theme.spacing(2)}`,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5)
  }
}))

export const SearchContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '600px',
  marginRight: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    marginRight: 0
  }
}))

export const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  backgroundColor: 'rgba(29, 161, 242, 0.1)',
  border: `1px solid rgba(29, 161, 242, 0.2)`,
  minWidth: '200px',
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
    width: '100%',
    justifyContent: 'center',
    marginLeft: 0
  }
}))
