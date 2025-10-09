import React, { useState, useRef, useEffect } from 'react'
import { Box, TextField, Autocomplete } from '@mui/material'
import * as S from './styles'

export interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  suggestions?: string[]
  placeholder?: string
  maxTags?: number
}

export const TagInput: React.FC<TagInputProps> = ({
  value = [],
  onChange,
  suggestions = [],
  placeholder = 'Add tags...',
  maxTags = 5
}) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !value.includes(trimmedTag) && value.length < maxTags) {
      onChange([...value, trimmedTag])
    }
    setInputValue('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault()
      handleAddTag(inputValue)
    } else if (event.key === 'Backspace' && !inputValue && value.length > 0) {
      handleRemoveTag(value[value.length - 1])
    }
  }

  const filteredSuggestions = suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(suggestion)
  )

  useEffect(() => {
    if (inputValue && filteredSuggestions.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [inputValue, filteredSuggestions.length])

  return (
    <S.TagInputContainer>
      <Autocomplete
        freeSolo
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={filteredSuggestions}
        value={inputValue}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            handleAddTag(newValue)
          }
        }}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
        renderInput={params => (
          <TextField
            {...params}
            ref={inputRef}
            placeholder={
              value.length >= maxTags ? 'Max tags reached' : placeholder
            }
            size='small'
            onKeyDown={handleKeyDown}
            disabled={value.length >= maxTags}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(47, 51, 54, 0.3)',
                border: '1px solid rgba(29, 161, 242, 0.2)',
                borderRadius: '8px',
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
              }
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            {...props}
            component='li'
            sx={{
              fontSize: '0.875rem',
              color: '#FFFFFF',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(29, 161, 242, 0.1)'
              }
            }}
          >
            {option}
          </Box>
        )}
        ListboxProps={{
          sx: {
            backgroundColor: '#192734',
            border: '1px solid rgba(29, 161, 242, 0.2)',
            borderRadius: '8px',
            '& .MuiAutocomplete-option': {
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: 'rgba(29, 161, 242, 0.1)'
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(29, 161, 242, 0.15)'
              }
            }
          }
        }}
        sx={{
          '& .MuiAutocomplete-popper': {
            '& .MuiPaper-root': {
              backgroundColor: '#192734',
              border: '1px solid rgba(29, 161, 242, 0.2)',
              borderRadius: '8px'
            }
          }
        }}
      />
    </S.TagInputContainer>
  )
}
