import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import TaskList from './TaskList'

const mockTasksList = vi.fn()
const mockAddTask = vi.fn()

vi.mock('@/contexts/tasks', () => ({
  useTaskContext: () => ({
    tasksList: mockTasksList(),
    addTask: mockAddTask
  })
}))

vi.mock('@/components/molecules/TaskItem/TaskItem', () => ({
  __esModule: true,
  default: vi.fn(({ task }) => (
    <div data-testid={`mock-task-item-${task.id}`}>
      {task.title} (Status: {task.completed ? 'Completed' : 'Uncompleted'})
    </div>
  ))
}))

vi.mock('../CompletedTasksList/CompletedTasksList', () => ({
  __esModule: true,
  default: vi.fn(() => (
    <div data-testid='mock-completed-tasks-list'>Mock Completed Tasks List</div>
  ))
}))

vi.mock('./styles', () => ({
  TaskListContainer: ({ children }: any) => (
    <div data-testid='task-list-container'>{children}</div>
  ),
  Title: ({ children }: any) => (
    <h4 data-testid='task-list-title'>{children}</h4>
  ),
  AddButton: ({ children, onClick }: any) => (
    <button data-testid='add-task-button' onClick={onClick}>
      {children}
    </button>
  ),
  TasksContainer: ({ children }: any) => (
    <div data-testid='tasks-container'>{children}</div>
  ),
  BoxList: ({ children }: any) => (
    <div data-testid='uncompleted-tasks-box-list'>{children}</div>
  )
}))

const theme = createTheme()
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('TaskList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render "No task added" message when tasksList is empty', () => {
    mockTasksList.mockReturnValue([])

    renderWithTheme(<TaskList />)

    expect(screen.getByText('No task added')).toBeInTheDocument()
    expect(
      screen.queryByTestId('uncompleted-tasks-box-list')
    ).not.toBeInTheDocument()
  })

  it('should render TaskItems when tasksList is not empty', () => {
    const tasks = [
      {
        id: 1,
        title: 'Buy groceries',
        description: 'Milk, Eggs, Bread',
        completed: false
      },
      {
        id: 2,
        title: 'Clean room',
        description: 'Vacuum, dust',
        completed: false
      }
    ]
    mockTasksList.mockReturnValue(tasks)

    renderWithTheme(<TaskList />)

    expect(screen.getByTestId('uncompleted-tasks-box-list')).toBeInTheDocument()
    expect(screen.getByTestId('mock-task-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('mock-task-item-1')).toHaveTextContent(
      'Buy groceries (Status: Uncompleted)'
    )
    expect(screen.getByTestId('mock-task-item-2')).toBeInTheDocument()
    expect(screen.getByTestId('mock-task-item-2')).toHaveTextContent(
      'Clean room (Status: Uncompleted)'
    )
    expect(screen.queryByText('No task added')).not.toBeInTheDocument()
  })

  it('should call addTask function when "Add task" button is clicked', () => {
    mockTasksList.mockReturnValue([])

    renderWithTheme(<TaskList />)

    const addButton = screen.getByTestId('add-task-button')
    expect(addButton).toBeInTheDocument()
    expect(addButton).toHaveTextContent('Add task')

    fireEvent.click(addButton)

    expect(mockAddTask).toHaveBeenCalledTimes(1)
  })

  it('should render CompletedTasksList component', () => {
    mockTasksList.mockReturnValue([])

    renderWithTheme(<TaskList />)

    expect(screen.getByTestId('mock-completed-tasks-list')).toBeInTheDocument()
    expect(screen.getByTestId('mock-completed-tasks-list')).toHaveTextContent(
      'Mock Completed Tasks List'
    )
  })

  it('should render "My Tasks" title', () => {
    mockTasksList.mockReturnValue([])

    renderWithTheme(<TaskList />)

    expect(screen.getByTestId('task-list-title')).toBeInTheDocument()
    expect(screen.getByTestId('task-list-title')).toHaveTextContent('My Tasks')
  })
})
