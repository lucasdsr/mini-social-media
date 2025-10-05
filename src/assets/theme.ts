import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DA1F2', // Twitter blue
      light: '#4AB3F4',
      dark: '#0D8BD9'
    },
    secondary: {
      main: '#657786', // Twitter gray
      light: '#8899A6',
      dark: '#14171A'
    },
    background: {
      default: '#15202B', // Dark blue-gray background
      paper: '#192734' // Slightly lighter for cards/paper
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#8899A6'
    },
    success: {
      main: '#17BF63' // Twitter green
    },
    error: {
      main: '#E0245E' // Twitter red/pink
    },
    warning: {
      main: '#FFAD1F' // Twitter orange
    },
    info: {
      main: '#1DA1F2' // Same as primary
    },
    divider: '#2F3336'
  }
})
