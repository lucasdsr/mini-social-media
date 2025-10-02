import { TasksList } from './interface'

const noop = () => {}

export const contextDefaultValue = {
  tasksList: [] as TasksList,

  addTask: noop,
  deleteTask: (taskId: number) => {},
  toggleTask: (taskId: number) => {},
  editTask: (taskId: number, field: string, value: string) => {}
}

export const emptyTask = {
  title: '',
  description: '',
  completed: false
}

export const LOCAL_STORAGE_LISTS_KEY = '__TODO_LISTS'
