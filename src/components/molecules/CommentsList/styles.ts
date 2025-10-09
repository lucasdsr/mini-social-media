import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const CommentsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.custom.darkContainer,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  maxHeight: '320px',
  overflowY: 'auto',
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
    opacity: 0.3
  },
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '3px',
    '&:hover': {
      background: theme.palette.primary.main
    }
  }
}))

export const CommentItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  position: 'relative',
  '&:not(:last-child)': {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: theme.spacing(1),
      right: theme.spacing(1),
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
      opacity: 0.5
    }
  }
}))

export const CommentAuthor = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.75),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25)
}))

export const AuthorName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  color: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    opacity: 0.7
  }
}))

export const AuthorEmail = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  fontStyle: 'italic',
  opacity: 0.8,
  marginLeft: theme.spacing(1.5) // Align with the name text (after the dot)
}))

export const CommentBody = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  lineHeight: 1.5,
  color: theme.palette.text.primary,
  paddingLeft: theme.spacing(2),
  fontStyle: 'italic',
  opacity: 0.9
}))

export const TagInputWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1)
}))

export const TagActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(0.5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1)
}))
