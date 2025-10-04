import { useContext } from 'react'

import { Context } from './component'
import { UseTaskState } from '@/models'

export const useTaskContext = (): UseTaskState => {
  const value = useContext(Context)

  if (!value)
    throw new Error('useTaskContext must be used insided TaskProvider')

  return value
}
