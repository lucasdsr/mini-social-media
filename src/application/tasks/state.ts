import { useEffect, useMemo, useState } from 'react'

import { emptyTask, LOCAL_STORAGE_LISTS_KEY } from './consts'
import { TasksList, UseTaskState } from '@/models'
import {
  getFromLocalStorage,
  saveToLocalStorage
} from '@/infrastructure/localStorage'

export const useTaskState = (): UseTaskState => {
  const storagedList =
    getFromLocalStorage<TasksList>(LOCAL_STORAGE_LISTS_KEY) || []
  const [allTasks, setAllTasks] = useState<TasksList>(storagedList)
  const [nextTaskId, setNextTaskId] = useState<number>(allTasks.length + 1)

  const { tasksList, completedTasks } = useMemo(
    () =>
      allTasks.reduce(
        (acc, task) => {
          if (task.completed)
            return { ...acc, completedTasks: [...acc.completedTasks, task] }
          return { ...acc, tasksList: [...acc.tasksList, task] }
        },
        { tasksList: [] as TasksList, completedTasks: [] as TasksList }
      ),
    [allTasks]
  )

  const addTask = () => {
    setAllTasks(curr => [...curr, { ...emptyTask, id: nextTaskId }])
    setNextTaskId(id => id + 1)
  }

  const editTask = (id: number, field: string, value: string) => {
    setAllTasks(curr => {
      const updatedList = curr.map(task =>
        task.id === id ? { ...task, [field]: value } : task
      )
      saveToLocalStorage(LOCAL_STORAGE_LISTS_KEY, updatedList)
      return updatedList
    })
  }

  const deleteTask = (taskId: number) =>
    setAllTasks(curr => curr.filter(({ id }) => id !== taskId))

  const toggleTask = (taskId: number) =>
    setAllTasks(curr =>
      curr.reduce((acc, item) => {
        if (item.id === taskId)
          return [...acc, { ...item, completed: !item.completed }]
        return [...acc, item]
      }, [] as TasksList)
    )

  const clearConfirmedTasks = () =>
    setAllTasks(curr => curr.filter(item => !item.completed))

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_LISTS_KEY, allTasks)
  }, [allTasks])

  return {
    tasksList,
    completedTasks,

    addTask,
    editTask,
    deleteTask,
    toggleTask,
    clearConfirmedTasks
  }
}
