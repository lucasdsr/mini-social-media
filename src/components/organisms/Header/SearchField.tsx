import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

export interface SearchFieldProps {
  searchTerm: string
  onSearchChange: (_event: React.ChangeEvent<HTMLInputElement>) => void // eslint-disable-line @typescript-eslint/no-unused-vars
}

const getSearchIconStyles = () => ({
  fontSize: { xs: '1.2rem', sm: '1.5rem' }
})

const getInputPropsStyles = () => ({
  backgroundColor: 'custom.inputBackground',
  borderRadius: { xs: '8px', sm: '12px' },
  height: { xs: '40px', sm: '48px' },
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'divider',
    borderRadius: { xs: '8px', sm: '12px' }
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary.main',
    borderRadius: { xs: '8px', sm: '12px' }
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary.main',
    borderRadius: { xs: '8px', sm: '12px' }
  }
})

const getTextFieldStyles = () => ({
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  '& .MuiInputBase-input': {
    color: 'text.primary',
    fontSize: { xs: '0.875rem', sm: '1rem' },
    padding: { xs: '8px 12px', sm: '12px 16px' },
    '&::placeholder': {
      color: 'text.secondary',
      opacity: 1,
      fontSize: { xs: '0.8rem', sm: '0.875rem' }
    }
  }
})

export const SearchField: React.FC<SearchFieldProps> = ({
  searchTerm,
  onSearchChange
}) => (
  <TextField
    fullWidth
    placeholder='Search posts by title, content or username...'
    value={searchTerm}
    onChange={onSearchChange}
    variant='outlined'
    size='small'
    InputProps={{
      startAdornment: (
        <InputAdornment position='start'>
          <SearchIcon color='action' sx={getSearchIconStyles()} />
        </InputAdornment>
      ),
      sx: getInputPropsStyles()
    }}
    sx={getTextFieldStyles()}
  />
)
