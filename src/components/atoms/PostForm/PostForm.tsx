import React from 'react'
import { TextField, Button, Box } from '@mui/material'
import * as S from './styles'

export interface PostFormProps {
  title: string
  body: string
  onTitleChange: (title: string) => void
  onBodyChange: (body: string) => void
  onSubmit: () => void
  onCancel: () => void
  isLoading?: boolean
  disabled?: boolean
}

export const PostForm: React.FC<PostFormProps> = ({
  title,
  body,
  onTitleChange,
  onBodyChange,
  onSubmit,
  onCancel,
  isLoading = false,
  disabled = false
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!disabled && title.trim() && body.trim()) {
      onSubmit()
    }
  }

  return (
    <S.Container>
      <Box component='form' onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label='Post Title'
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          disabled={disabled || isLoading}
          margin='dense'
          variant='outlined'
          required
          size='small'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '6px',
              backgroundColor: 'custom.inputBackground',
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid rgba(0, 0, 0, 0.1)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: '1px solid rgba(0, 0, 0, 0.15)'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid primary.main',
                boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)'
              }
            },
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
              fontSize: '0.875rem'
            }
          }}
        />
        <TextField
          fullWidth
          label='Post Content'
          value={body}
          onChange={e => onBodyChange(e.target.value)}
          disabled={disabled || isLoading}
          margin='dense'
          variant='outlined'
          multiline
          rows={2}
          required
          size='small'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '6px',
              backgroundColor: 'custom.inputBackground',
              fontSize: '0.875rem',
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid rgba(0, 0, 0, 0.1)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: '1px solid rgba(0, 0, 0, 0.15)'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: '1px solid primary.main',
                boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.1)'
              }
            },
            '& .MuiInputLabel-root': {
              color: 'text.secondary',
              fontSize: '0.875rem'
            }
          }}
        />
        <S.ButtonContainer>
          <Button
            size='small'
            type='button'
            variant='outlined'
            onClick={onCancel}
            disabled={disabled || isLoading}
          >
            Cancel
          </Button>
          <Button
            size='small'
            type='submit'
            variant='contained'
            disabled={disabled || isLoading || !title.trim() || !body.trim()}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </S.ButtonContainer>
      </Box>
    </S.Container>
  )
}
