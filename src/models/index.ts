export type Task = {
  id: number
  title: string
  description?: string
  completed: boolean
}

export type TasksList = Task[]

export interface UseTaskState {
  tasksList: TasksList
  completedTasks: TasksList

  addTask: VoidFunction
  clearConfirmedTasks: VoidFunction
  deleteTask: (taskId: number) => void
  toggleTask: (taskId: number) => void
  editTask: (taskId: number, field: string, value: string) => void
}
