export const getFilteredSuggestions = (
  suggestions: string[],
  inputValue: string,
  value: string[]
) =>
  suggestions.filter(
    suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(suggestion)
  )

export const getInputStyles = () => ({
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
})

export const getListboxStyles = () => ({
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
})

export const getOptionStyles = () => ({
  fontSize: '0.875rem',
  color: '#FFFFFF',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(29, 161, 242, 0.1)'
  }
})

export const getAutocompleteStyles = () => ({
  '& .MuiAutocomplete-popper': {
    '& .MuiPaper-root': {
      backgroundColor: '#192734',
      border: '1px solid rgba(29, 161, 242, 0.2)',
      borderRadius: '8px'
    }
  }
})
