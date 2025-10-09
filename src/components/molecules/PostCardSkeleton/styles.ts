import { styled } from '@mui/material/styles'
import { Card, CardContent, Box } from '@mui/material'

export const PostContainer = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  position: 'relative',
  transition: 'all 0.2s ease-in-out'
}))

export const PostContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2)
  }
}))

export const PostHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  gap: theme.spacing(1)
}))

export const UserInfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flex: 1
})

export const TitleContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})

export const BodyContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})

export const CommentsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2),
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    opacity: 0.6
  }
}))

export const CommentsToggle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1)
}))
