import { useState } from 'react'

export const useTagInputLogic = (
  value: string[],
  onChange: (_tags: string[]) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
  maxTags: number
) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !value.includes(trimmedTag) && value.length < maxTags) {
      onChange([...value, trimmedTag])
    }
    setInputValue('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      event.preventDefault()
      handleAddTag(inputValue)
    } else if (event.key === 'Backspace' && !inputValue && value.length > 0) {
      handleRemoveTag(value[value.length - 1])
    }
  }

  return {
    inputValue,
    setInputValue,
    open,
    setOpen,
    handleAddTag,
    handleKeyDown
  }
}
