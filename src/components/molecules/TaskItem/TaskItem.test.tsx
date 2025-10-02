import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import TaskItem from './TaskItem'

vi.mock('@/components/atoms', () => ({
  Input: vi.fn(
    ({ value, onChange, placeholder, 'data-testid': testId, ...props }) => (
      <input
        data-testid={testId}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    )
  )
}))

const mockToggleTask = vi.fn()
const mockDeleteTask = vi.fn()
const mockEditTask = vi.fn()

vi.mock('@/contexts/tasks', () => ({
  useTaskContext: () => ({
    toggleTask: mockToggleTask,
    deleteTask: mockDeleteTask,
    editTask: mockEditTask
  })
}))

vi.mock('./styles', () => {
  const MockTaskItemContainer = vi.fn(
    ({ children, isVisible, ...props }: any) => (
      <div
        data-testid='task-item-container'
        style={{ opacity: isVisible ? 1 : 0 }}
        {...props}
      >
        {children}
      </div>
    )
  )

  return {
    TaskItemContainer: MockTaskItemContainer,
    InputRow: ({ children, ...props }: any) => (
      <div data-testid='input-row' {...props}>
        {children}
      </div>
    ),
    Close: (props: any) => (
      <button data-testid='delete-button' {...props}>
        X
      </button>
    )
  }
})

const theme = createTheme()
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('TaskItem Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const sampleTask = {
    id: 1,
    title: 'My Test Task',
    description: 'This is a description.',
    completed: false
  }

  it('should render task details correctly', () => {
    renderWithTheme(<TaskItem task={sampleTask} />)

    const checkboxInput = screen.getByLabelText(`Task ${sampleTask.id}`)
    expect(checkboxInput).toBeInTheDocument()
    expect(checkboxInput).not.toBeChecked()

    expect(screen.getByTestId('task-title-input')).toHaveValue(sampleTask.title)
    expect(screen.getByTestId('task-description-input')).toHaveValue(
      sampleTask.description
    )
    expect(screen.getByTestId('delete-button')).toBeInTheDocument()
  })

  it('should call editTask for title when title input changes', () => {
    renderWithTheme(<TaskItem task={sampleTask} />)
    const titleInput = screen.getByTestId('task-title-input')
    const newTitle = 'New Title for Task'

    fireEvent.change(titleInput, { target: { value: newTitle } })

    expect(mockEditTask).toHaveBeenCalledTimes(1)
    expect(mockEditTask).toHaveBeenCalledWith(sampleTask.id, 'title', newTitle)
    expect(titleInput).toHaveValue(newTitle)
  })

  it('should call editTask for description when description input changes', () => {
    renderWithTheme(<TaskItem task={sampleTask} />)
    const descriptionInput = screen.getByTestId('task-description-input')
    const newDescription = 'Updated description text'

    fireEvent.change(descriptionInput, { target: { value: newDescription } })

    expect(mockEditTask).toHaveBeenCalledTimes(1)
    expect(mockEditTask).toHaveBeenCalledWith(
      sampleTask.id,
      'description',
      newDescription
    )
    expect(descriptionInput).toHaveValue(newDescription)
  })
})
