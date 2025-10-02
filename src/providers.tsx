import { PropsWithChildren } from 'react'
import { TasksProvider } from './contexts'

import { ThemeProvider } from '@mui/material/styles'

import { theme } from './assets/theme'

export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <TasksProvider>{children}</TasksProvider>
  </ThemeProvider>
)
