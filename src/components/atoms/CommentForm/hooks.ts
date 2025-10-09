import { useState } from 'react'

export const useCommentFormLogic = (
  postId: number,
  onSubmit: (_data: { postId: number; body: string }) => void // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const [body, setBody] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!body.trim()) {
      return
    }

    onSubmit({
      postId,
      body: body.trim()
    })

    setBody('')
  }

  const isFormValid = body.trim()

  return {
    body,
    setBody,
    handleSubmit,
    isFormValid
  }
}
