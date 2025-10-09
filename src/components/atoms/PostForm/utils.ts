export const getTextFieldStyles = () => ({
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
})
