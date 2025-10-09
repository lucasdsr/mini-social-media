import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'

import { store } from './application/store'
import { queryClient } from './infrastructure/queryClient'
import { theme } from './assets/theme'
import { UserProvider } from './application/contexts/UserContext'

export const Providers = ({ children }: PropsWithChildren) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserProvider>{children}</UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
)
