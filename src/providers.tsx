import { PropsWithChildren } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './infrastructure/queryClient'

import { ThemeProvider } from '@mui/material/styles'

import { theme } from './assets/theme'

export const Providers = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </QueryClientProvider>
)
