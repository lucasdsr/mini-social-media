import { PropsWithChildren } from 'react'

import * as S from './styles'

export const MainLayout = ({ children }: PropsWithChildren) => (
  <S.Layout>{children}</S.Layout>
)
