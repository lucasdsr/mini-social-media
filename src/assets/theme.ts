import { createTheme } from '@mui/material/styles'

// Declare module to extend the theme
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      darkContainer: string
      inputBackground: string
    }
  }

  interface PaletteOptions {
    custom?: {
      darkContainer?: string
      inputBackground?: string
    }
  }
}

export const theme = createTheme({
  typography: {
    fontFamily:
      '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 600
    },
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 500
    },
    h6: {
      fontWeight: 500
    },
    button: {
      fontWeight: 500
    }
  },
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
    divider: '#2F3336',
    custom: {
      darkContainer: '#0F1419', // Tom mais escuro para containers
      inputBackground: '#2F3336' // Cor cinza para fundo dos inputs
    }
  }
})
