import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from './index'
import { ThemeProvider, createTheme } from '@mui/material/styles'

vi.mock('./styles', () => ({
  InputContainer: ({ children, ...props }: any) => (
    <div data-testid='input-component-container' {...props}>
      {children}
    </div>
  ),
  InputField: (props: any) => (
    <input data-testid='input-field-editing' {...props} />
  ),
  InputBox: ({ children, ...props }: any) => (
    <div data-testid='input-box-viewing' {...props}>
      {children}
    </div>
  ),
  InputText: ({ children, ...props }: any) => (
    <span data-testid='input-text-display' {...props}>
      {children}
    </span>
  )
}))

const theme = createTheme()
const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)

describe('Input Component', () => {
  it('should render the placeholder when no value is provided', () => {
    renderWithTheme(<Input onChange={() => {}} placeholder='Enter text here' />)
    expect(screen.getByText('Enter text here')).toBeInTheDocument()
  })

  it('should render the initial value when provided', () => {
    const initialValue = 'Initial task name'
    renderWithTheme(<Input onChange={() => {}} value={initialValue} />)
    expect(screen.getByText(initialValue)).toBeInTheDocument()
  })

  it('should switch to editing mode when clicked', () => {
    const initialValue = 'Click to edit'
    renderWithTheme(<Input onChange={() => {}} value={initialValue} />)

    const viewModeElement = screen.getByText(initialValue)
    fireEvent.click(viewModeElement)

    expect(screen.getByDisplayValue(initialValue)).toBeInTheDocument()
    expect(screen.queryByText(initialValue)).not.toBeInTheDocument() // Texto de visualização some
  })

  it('should update value on type and call onChange with trimmed value on blur', async () => {
    const initialValue = 'Old Value'
    const mockOnChange = vi.fn()

    renderWithTheme(<Input onChange={mockOnChange} value={initialValue} />)
    fireEvent.click(screen.getByText(initialValue))

    const inputField = screen.getByDisplayValue(initialValue)
    fireEvent.change(inputField, { target: { value: '  New Value  ' } })

    fireEvent.blur(inputField)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1)
      expect(mockOnChange).toHaveBeenCalledWith('New Value')
    })

    expect(screen.queryByDisplayValue('  New Value  ')).not.toBeInTheDocument()

    expect(screen.getByText(initialValue)).toBeInTheDocument()
  })

  it('should display placeholder when value is empty and not in editing mode', () => {
    renderWithTheme(
      <Input onChange={() => {}} value='' placeholder='Type something' />
    )
    expect(screen.getByText('Type something')).toBeInTheDocument()
    expect(screen.queryByTestId('input-field-editing')).not.toBeInTheDocument()
  })
})
