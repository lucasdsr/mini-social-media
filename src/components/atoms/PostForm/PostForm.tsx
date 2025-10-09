import React from 'react'
import { TextField, Button, Box } from '@mui/material'
import * as S from './styles'
import { usePostFormLogic } from './hooks'
import { getTextFieldStyles } from './utils'

export interface PostFormProps {
  title: string
  body: string
  onTitleChange: (_title: string) => void // eslint-disable-line @typescript-eslint/no-unused-vars
  onBodyChange: (_body: string) => void // eslint-disable-line @typescript-eslint/no-unused-vars
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
  const { handleSubmit } = usePostFormLogic(onSubmit, disabled)
  const isFormValid = title.trim() && body.trim()

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
          sx={getTextFieldStyles()}
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
          sx={getTextFieldStyles()}
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
            disabled={disabled || isLoading || !isFormValid}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </S.ButtonContainer>
      </Box>
    </S.Container>
  )
}
