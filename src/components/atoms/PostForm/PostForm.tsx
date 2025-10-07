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
          label='Título do Post'
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          disabled={disabled || isLoading}
          margin='normal'
          variant='outlined'
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'custom.inputBackground',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              }
            },
            '& .MuiInputLabel-root': {
              color: 'text.secondary'
            }
          }}
        />
        <TextField
          fullWidth
          label='Conteúdo do Post'
          value={body}
          onChange={e => onBodyChange(e.target.value)}
          disabled={disabled || isLoading}
          margin='normal'
          variant='outlined'
          multiline
          rows={4}
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'custom.inputBackground',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              }
            },
            '& .MuiInputLabel-root': {
              color: 'text.secondary'
            }
          }}
        />
        <S.ButtonContainer>
          <Button
            type='button'
            variant='outlined'
            onClick={onCancel}
            disabled={disabled || isLoading}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={disabled || isLoading || !title.trim() || !body.trim()}
          >
            {isLoading ? 'Postando...' : 'Postar'}
          </Button>
        </S.ButtonContainer>
      </Box>
    </S.Container>
  )
}
