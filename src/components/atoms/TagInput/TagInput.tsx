import React, { useRef, useEffect } from 'react'
import { Box, TextField, Autocomplete } from '@mui/material'
import * as S from './styles'
import { useTagInputLogic } from './hooks'
import {
  getFilteredSuggestions,
  getInputStyles,
  getListboxStyles,
  getOptionStyles,
  getAutocompleteStyles
} from './utils'

export interface TagInputProps {
  value: string[]
  onChange: (_tags: string[]) => void // eslint-disable-line @typescript-eslint/no-unused-vars
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
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    inputValue,
    setInputValue,
    open,
    setOpen,
    handleAddTag,
    handleKeyDown
  } = useTagInputLogic(value, onChange, maxTags)

  const filteredSuggestions = getFilteredSuggestions(
    suggestions,
    inputValue,
    value
  )

  useEffect(() => {
    if (inputValue && filteredSuggestions.length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [inputValue, filteredSuggestions.length, setOpen])

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
            sx={getInputStyles()}
          />
        )}
        renderOption={(props, option) => (
          <Box {...props} component='li' sx={getOptionStyles()}>
            {option}
          </Box>
        )}
        ListboxProps={{
          sx: getListboxStyles()
        }}
        sx={getAutocompleteStyles()}
      />
    </S.TagInputContainer>
  )
}
