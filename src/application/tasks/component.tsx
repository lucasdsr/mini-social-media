import React, { createContext, PropsWithChildren } from 'react'

import { useTaskState } from './state'

import { contextDefaultValue } from './consts'
import { UseTaskState } from '@/models'

export const Context = createContext<UseTaskState | null>(null)

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const tasksState = useTaskState()

  const value = { ...tasksState }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
