export const getTextFieldStyles = () => ({
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
})

export const getButtonStyles = () => ({
  backgroundColor: '#1DA1F2',
  '&:hover': {
    backgroundColor: '#0D8BD9'
  },
  '&:disabled': {
    backgroundColor: 'rgba(29, 161, 242, 0.3)',
    color: 'rgba(255, 255, 255, 0.5)'
  }
})
