import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C23B8'
    },
    secondary: {
      dark: '#2F2139',
      main: '#6B5D7A',
      light: '#6B5D7A'
    },
    success: {
      main: '#32CD32'
    },
    error: {
      main: '#FF4500'
    },
    warning: {
      main: '#FFA500'
    },
    info: {
      main: '#FFA500'
    }
  }
})
