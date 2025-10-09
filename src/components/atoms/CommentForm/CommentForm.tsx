import React from 'react'
import { Box, TextField, Button, CircularProgress } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'
import * as S from './styles'
import { useCommentFormLogic } from './hooks'
import { getTextFieldStyles, getButtonStyles } from './utils'

export interface CommentFormProps {
  postId: number
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSubmit: (_data: { postId: number; body: string }) => void
  isLoading?: boolean
}

export const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  onSubmit,
  isLoading = false
}) => {
  const { body, setBody, handleSubmit, isFormValid } = useCommentFormLogic(
    postId,
    onSubmit
  )

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
          sx={getTextFieldStyles()}
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
            sx={getButtonStyles()}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </S.SubmitButtonContainer>
      </Box>
    </S.CommentFormContainer>
  )
}
