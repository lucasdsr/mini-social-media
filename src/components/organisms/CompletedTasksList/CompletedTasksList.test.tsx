import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
// Importe 'act' explicitamente
import { act } from 'react'
import CompletedTasksList from './CompletedTasksList'

const mockCompletedTasks = vi.fn()
const mockClearConfirmedTasks = vi.fn()

vi.mock('@/application/tasks', () => ({
  useTaskContext: () => ({
    completedTasks: mockCompletedTasks(),
    clearConfirmedTasks: mockClearConfirmedTasks
  })
}))

vi.mock('@/components/molecules/TaskItem/TaskItem', () => ({
  __esModule: true,
  default: vi.fn(({ task, isVisible }) => (
    <div data-testid={`mock-task-item-${task.id}`} data-visible={isVisible}>
      {task.title} (Completed: {task.completed ? 'Yes' : 'No'})
    </div>
  ))
}))

vi.mock('./styles', () => ({
  CompletedContainer: ({ children }: any) => (
    <div data-testid='completed-container'>{children}</div>
  ),
  OpenCompletedRow: ({ children, onClick }: any) => (
    <button data-testid='open-completed-button' onClick={onClick}>
      {children}
    </button>
  ),
  BoxList: ({ children }: any) => <div data-testid='box-list'>{children}</div>,
  ClearButton: ({ children, onClick }: any) => (
    <button data-testid='clear-all-button' onClick={onClick}>
      {children}
    </button>
  )
}))

const theme = createTheme()
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('CompletedTasksList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should not render if there are no completed tasks', () => {
    mockCompletedTasks.mockReturnValue([])
    const { container } = renderWithTheme(<CompletedTasksList />)
    expect(container).toBeEmptyDOMElement()
  })

  it('should render the "Completed tasks" button when there are completed tasks (initially closed)', () => {
    const tasks = [{ id: 1, title: 'Task 1', description: '', completed: true }]
    mockCompletedTasks.mockReturnValue(tasks)

    renderWithTheme(<CompletedTasksList />)

    const openButton = screen.getByTestId('open-completed-button')
    expect(openButton).toBeInTheDocument()
    expect(openButton).toHaveTextContent(`Completed tasks (${tasks.length})`)

    expect(screen.queryByTestId('box-list')).not.toBeInTheDocument()
    expect(screen.queryByTestId('clear-all-button')).not.toBeInTheDocument()
  })

  it('should open the list of completed tasks when the button is clicked', () => {
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Desc 1', completed: true },
      { id: 2, title: 'Task 2', description: 'Desc 2', completed: true }
    ]
    mockCompletedTasks.mockReturnValue(tasks)

    renderWithTheme(<CompletedTasksList />)

    const openButton = screen.getByTestId('open-completed-button')
    fireEvent.click(openButton)

    const boxList = screen.getByTestId('box-list')
    expect(boxList).toBeInTheDocument()

    expect(screen.getByTestId('clear-all-button')).toBeInTheDocument()
    expect(screen.getByTestId('clear-all-button')).toHaveTextContent(
      'clear all'
    )

    expect(screen.getByTestId('mock-task-item-1')).toBeInTheDocument()
    expect(screen.getByTestId('mock-task-item-2')).toBeInTheDocument()
    expect(screen.getByTestId('mock-task-item-1')).toHaveTextContent(
      'Task 1 (Completed: Yes)'
    )
    expect(screen.getByTestId('mock-task-item-2')).toHaveTextContent(
      'Task 2 (Completed: Yes)'
    )
  })

  it('should close the list of completed tasks when the button is clicked again', () => {
    const tasks = [{ id: 1, title: 'Task 1', description: '', completed: true }]
    mockCompletedTasks.mockReturnValue(tasks)

    renderWithTheme(<CompletedTasksList />)

    const openButton = screen.getByTestId('open-completed-button')
    fireEvent.click(openButton)
    expect(screen.getByTestId('box-list')).toBeInTheDocument()

    fireEvent.click(openButton)
    expect(screen.queryByTestId('box-list')).not.toBeInTheDocument()
  })

  it('should call clearConfirmedTasks when "clear all" button is clicked', () => {
    const tasks = [{ id: 1, title: 'Task 1', description: '', completed: true }]
    mockCompletedTasks.mockReturnValue(tasks)

    renderWithTheme(<CompletedTasksList />)

    const openButton = screen.getByTestId('open-completed-button')
    fireEvent.click(openButton)

    const clearButton = screen.getByTestId('clear-all-button')
    fireEvent.click(clearButton)

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(mockClearConfirmedTasks).toHaveBeenCalledTimes(1)
    expect(screen.queryByTestId('box-list')).not.toBeInTheDocument()
  })
})
