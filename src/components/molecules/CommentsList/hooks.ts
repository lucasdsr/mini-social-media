import { useState } from 'react'
import {
  useAppDispatch,
  useAppSelector
} from '../../../application/store/hooks'
import {
  setCommentTags,
  removeCommentTag,
  addCommentToPost
} from '../../../application/slices/posts/commentsSlice'
import { selectCommentTagsById } from '../../../application/slices/posts/postsSelectors'
import { tagsService } from '../../../infrastructure/services'
import { useCreateComment } from '../../../application/comments'
import { useCurrentUser } from '../../../application/contexts/UserContext'

export const useCommentsListLogic = (postId: number) => {
  const dispatch = useAppDispatch()
  const getCommentTags = useAppSelector(selectCommentTagsById)
  const tagSuggestions = tagsService.getSuggestions('', 20)
  const [showTagInputs, setShowTagInputs] = useState<Record<number, boolean>>(
    {}
  )
  const createCommentMutation = useCreateComment()
  const { currentUser } = useCurrentUser()

  const handleTagChange = (commentId: number, tags: string[]) => {
    dispatch(setCommentTags({ commentId, tags }))

    tags.forEach(tag => {
      if (!tagSuggestions.includes(tag)) {
        tagsService.addDynamicTag(tag)
      }
    })
  }

  const handleTagRemove = (commentId: number, tag: string) => {
    dispatch(removeCommentTag({ commentId, tag }))
  }

  const toggleTagInput = (commentId: number) => {
    setShowTagInputs(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }))
  }

  const handleCommentSubmit = async (commentData: {
    postId: number
    body: string
  }) => {
    try {
      const commentWithUser = {
        ...commentData,
        name: currentUser.name,
        email: currentUser.email
      }
      const newComment =
        await createCommentMutation.mutateAsync(commentWithUser)
      dispatch(addCommentToPost({ postId, comment: newComment }))
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  return {
    getCommentTags,
    tagSuggestions,
    showTagInputs,
    createCommentMutation,
    currentUser,
    handleTagChange,
    handleTagRemove,
    toggleTagInput,
    handleCommentSubmit
  }
}
