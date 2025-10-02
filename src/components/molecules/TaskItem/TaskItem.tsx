import { useState } from 'react'

import { Checkbox } from '@mui/material'

import { Input } from '@/components/atoms'
import { Task, useTaskContext } from '@/contexts/tasks'

import * as S from './styles'

const TaskItem: React.FC<{ task: Task; isVisible?: boolean }> = ({
  task,
  isVisible: isVisibleOutside = true
}) => {
  const [title, setTitle] = useState(task.title)
  const [isVisible, setIsVisible] = useState(true)
  const [description, setDescription] = useState(task.description)

  const { toggleTask, deleteTask, editTask } = useTaskContext()

  const handleTitleChange = (value: string) => {
    setTitle(value)
    editTask(task.id, 'title', value)
  }

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
    editTask(task.id, 'description', value)
  }

  const handleDelete = () => {
    setIsVisible(false)

    setTimeout(() => deleteTask(task.id), 500)
  }

  return (
    <S.TaskItemContainer
      elevation={2}
      data-testid='task-item-container'
      isVisible={isVisible && isVisibleOutside}
    >
      <Checkbox
        aria-label={`Task ${task.id}`}
        id={task.id.toString()}
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <S.InputRow>
        <Input
          value={title}
          placeholder='Title'
          onChange={handleTitleChange}
          data-testid='task-title-input'
        />
        <Input
          value={description}
          placeholder='Description'
          data-testid='task-description-input'
          onChange={handleDescriptionChange}
        />
      </S.InputRow>
      <S.Close data-testid='delete-button' onClick={handleDelete} />
    </S.TaskItemContainer>
  )
}

export default TaskItem
