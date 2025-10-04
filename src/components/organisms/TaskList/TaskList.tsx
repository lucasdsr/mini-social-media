import React from 'react'

import { TasksList } from '@/models'
import { useTaskContext } from '@/application/tasks'

import TaskItem from '@/components/molecules/TaskItem/TaskItem'

import CompletedTasksList from '../CompletedTasksList/CompletedTasksList'

import * as S from './styles'

const UncompletedTasksList = ({ tasksList }: { tasksList: TasksList }) => (
  <>
    {tasksList.length === 0 ? (
      <p>No task added</p>
    ) : (
      <S.BoxList>
        {tasksList.map(task => (
          <TaskItem task={task} key={task.id} />
        ))}
      </S.BoxList>
    )}
  </>
)

const TaskList: React.FC = () => {
  const { tasksList, addTask } = useTaskContext()
  return (
    <S.TaskListContainer elevation={6}>
      <S.Title variant='h4'>My Tasks</S.Title>
      <S.AddButton variant='contained' onClick={addTask}>
        Add task
      </S.AddButton>

      <S.TasksContainer>
        <UncompletedTasksList tasksList={tasksList} />
        <CompletedTasksList />
      </S.TasksContainer>
    </S.TaskListContainer>
  )
}

export default TaskList
