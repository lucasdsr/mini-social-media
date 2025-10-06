import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'

import { store } from './application/store'
import { queryClient } from './infrastructure/queryClient'
import { theme } from './assets/theme'

export const Providers = ({ children }: PropsWithChildren) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  </Provider>
)
