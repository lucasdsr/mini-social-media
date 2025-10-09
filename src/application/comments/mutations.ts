import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentsService } from '../../infrastructure/services'
import { commentsQueryKeys } from './queries'
import { Comment } from '../../models'

export interface CreateCommentData {
  postId: number
  name: string
  email: string
  body: string
}

/**
 * Hook to create a new comment
 */
export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (commentData: CreateCommentData) => {
      const response = await commentsService.createComment(commentData)
      return response.data
    },
    onSuccess: (newComment: Comment) => {
      // Invalidate and refetch comments for the specific post
      queryClient.invalidateQueries({
        queryKey: commentsQueryKeys.byPost(newComment.postId)
      })
    }
  })
}
