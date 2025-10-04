import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

import { MainLayout } from '@/components/templates'
import TaskList from '@/components/organisms/TaskList/TaskList'

import * as S from './style'

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setInterval(() => setIsLoading(false), 3000)
  }, [])

  if (isLoading)
    return (
      <S.LoadingContainer>
        <CircularProgress color='primary' />
      </S.LoadingContainer>
    )

  return (
    <MainLayout>
      <TaskList />
    </MainLayout>
  )
}
