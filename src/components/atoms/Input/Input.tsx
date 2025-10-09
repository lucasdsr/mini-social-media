import { useState } from 'react'

import * as S from './styles'
import { useTheme } from '@mui/material'

type InputType = {
  value?: string
  placeholder?: string
  onChange: (_value: string) => void // eslint-disable-line @typescript-eslint/no-unused-vars
}

export const Input = ({ value = '', onChange, placeholder }: InputType) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)

  const theme = useTheme()

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setEditedValue(value)
  }

  const handleEditBlur = () => {
    onChange(editedValue?.trim())

    setIsEditing(false)
  }

  return (
    <S.InputContainer>
      {isEditing ? (
        <S.InputField
          data-testdd='input-field'
          autoFocus
          variant='standard'
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '14px',
              fontWeight: '600'
            }
          }}
          value={editedValue}
          onBlur={handleEditBlur}
          onChange={handleEditChange}
        />
      ) : (
        <S.InputBox
          data-testdd='input-box'
          onBlur={handleEditBlur}
          onClick={() => setIsEditing(true)}
        >
          {value ? (
            <S.InputText
              data-testdd='input-texxt'
              color={theme.palette.grey[300]}
            >
              {value}
            </S.InputText>
          ) : (
            <S.InputText
              data-testdd='input-text'
              color={theme.palette.grey[600]}
            >
              {placeholder}
            </S.InputText>
          )}
        </S.InputBox>
      )}
    </S.InputContainer>
  )
}
