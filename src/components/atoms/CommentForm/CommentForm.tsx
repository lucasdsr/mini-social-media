import React, { useState } from 'react'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import * as S from './styles'

export interface CommentFormProps {
  postId: number
  onSubmit: (data: { postId: number; body: string }) => void
  isLoading?: boolean
}

export const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onSubmit,
  isLoading = false
}) => {
  const [body, setBody] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!body.trim()) {
      return
    }

    onSubmit({
      postId,
      body: body.trim()
    })

    // Reset form
    setBody('')
  }

  const isFormValid = body.trim()

  return (
    <S.CommentFormContainer>
      <Box component='form' onSubmit={handleSubmit}>
        <TextField
          label='Write a comment...'
          value={body}
          onChange={e => setBody(e.target.value)}
          required
          multiline
          rows={2}
          fullWidth
          disabled={isLoading}
          placeholder='Share your thoughts...'
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(47, 51, 54, 0.3)',
              border: '1px solid rgba(29, 161, 242, 0.2)',
              borderRadius: '12px',
              '&:hover': {
                borderColor: 'rgba(29, 161, 242, 0.4)'
              },
              '&.Mui-focused': {
                borderColor: '#1DA1F2',
                boxShadow: '0 0 0 2px rgba(29, 161, 242, 0.1)'
              },
              '& fieldset': {
                border: 'none'
              }
            },
            '& .MuiInputBase-input': {
              color: '#FFFFFF',
              fontSize: '0.875rem',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 1
              }
            },
            '& .MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-focused': {
                color: '#1DA1F2'
              }
            }
          }}
        />

        <S.SubmitButtonContainer>
          <Button
            type='submit'
            size='small'
            variant='contained'
            disabled={!isFormValid || isLoading}
            startIcon={
              isLoading ? <CircularProgress size={16} /> : <SendIcon />
            }
            sx={{
              backgroundColor: '#1DA1F2',
              '&:hover': {
                backgroundColor: '#0D8BD9'
              },
              '&:disabled': {
                backgroundColor: 'rgba(29, 161, 242, 0.3)',
                color: 'rgba(255, 255, 255, 0.5)'
              }
            }}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </S.SubmitButtonContainer>
      </Box>
    </S.CommentFormContainer>
  )
}
