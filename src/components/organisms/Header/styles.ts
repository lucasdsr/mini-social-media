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
  maxWidth: '730px',
  margin: '0 auto',
  padding: `0 ${theme.spacing(2)}`,
  width: '100%',
  [theme.breakpoints.down(600)]: {
    flexDirection: 'column',
    gap: theme.spacing(1.5)
  }
}))

export const SearchContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '100%',
  marginRight: 'auto',
  [theme.breakpoints.down(600)]: {
    maxWidth: '100%',
    marginRight: 0
  }
}))

export const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.75),
  borderRadius: theme.spacing(0.75),
  backgroundColor: 'rgba(29, 161, 242, 0.1)',
  border: `1px solid rgba(29, 161, 242, 0.2)`,
  width: '160px',
  position: 'absolute',
  right: '24px',
  top: '50%',
  transform: 'translateY(-50%)',
  [theme.breakpoints.down(1200)]: {
    position: 'static',
    transform: 'none',
    justifyContent: 'center',
    marginBottom: theme.spacing(1)
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}))
