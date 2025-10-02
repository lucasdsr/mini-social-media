import React, { useState } from 'react'

import { Icon } from '@mui/material'

import { useTaskContext } from '@/contexts/tasks'

import TaskItem from '@/components/molecules/TaskItem/TaskItem'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import * as S from './styles'

const CompletedTasksList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const { completedTasks, clearConfirmedTasks } = useTaskContext()

  if (!completedTasks.length) return null

  const handleOpenCompleted = () => {
    setIsVisible(true)
    setIsOpen(!isOpen)
  }

  const handleDelete = () => {
    setIsVisible(false)

    setTimeout(() => {
      clearConfirmedTasks()
      setIsVisible(true)
      setIsOpen(false)
    }, 500)
  }

  return (
    <S.CompletedContainer data-testid='completed-container'>
      <S.OpenCompletedRow
        onClick={handleOpenCompleted}
        data-testid='open-completed-button'
      >
        Completed tasks ({completedTasks.length})
        <Icon fontSize='medium'>
          {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </Icon>
      </S.OpenCompletedRow>
      {isOpen && (
        <S.BoxList data-testid='box-list'>
          <S.ClearButton
            color='secondary'
            variant='outlined'
            onClick={handleDelete}
            data-testid='clear-all-button'
          >
            clear all
          </S.ClearButton>
          {completedTasks.map(task => (
            <TaskItem task={task} key={task.id} isVisible={isVisible} />
          ))}
        </S.BoxList>
      )}
    </S.CompletedContainer>
  )
}

export default CompletedTasksList
