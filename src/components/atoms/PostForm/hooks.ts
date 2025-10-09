export const usePostFormLogic = (onSubmit: () => void, disabled: boolean) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!disabled) {
      onSubmit()
    }
  }

  return {
    handleSubmit
  }
}
