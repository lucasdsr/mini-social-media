import { useState } from 'react'
import { usePostComments } from '../../../application/posts'

export const usePostLogic = (id: number) => {
  const [showComments, setShowComments] = useState(false)
  const { comments, isLoading } = usePostComments(id)

  const handleToggleComments = () => {
    setShowComments(!showComments)
  }

  return {
    showComments,
    comments,
    isLoading,
    handleToggleComments
  }
}
