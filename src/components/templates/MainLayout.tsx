import { PropsWithChildren } from 'react'
import { Box } from '@mui/material'
import { Header } from '@/components/organisms'

import * as S from './styles'

export const MainLayout = ({ children }: PropsWithChildren) => (
  <Box>
    <Header />
    <S.Layout>{children}</S.Layout>
  </Box>
)
