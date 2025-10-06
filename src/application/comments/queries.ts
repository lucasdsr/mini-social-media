import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commentsService } from '../../infrastructure/services'
import { Comment, CommentsQueryParams } from '../../models'

// Query keys for consistent caching
export const commentsQueryKeys = {
  all: ['comments'] as const,
  lists: () => [...commentsQueryKeys.all, 'list'] as const,
  list: (params?: CommentsQueryParams) =>
    [...commentsQueryKeys.lists(), params] as const,
  details: () => [...commentsQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...commentsQueryKeys.details(), id] as const,
  byPost: (postId: number) =>
    [...commentsQueryKeys.all, 'post', postId] as const
}

/**
 * Hook to fetch all comments with optional filtering
 */
export const useCommentsQuery = (params?: CommentsQueryParams) =>
  useQuery({
    queryKey: commentsQueryKeys.list(params),
    queryFn: () => commentsService.getAllComments(params),
    select: response => response.data
  })

/**
 * Hook to fetch a single comment by ID
 */
export const useCommentQuery = (id: number) =>
  useQuery({
    queryKey: commentsQueryKeys.detail(id),
    queryFn: () => commentsService.getCommentById(id),
    select: response => response.data,
    enabled: !!id
  })

/**
 * Hook to fetch comments by post ID
 */
export const useCommentsByPostQuery = (postId: number) =>
  useQuery({
    queryKey: commentsQueryKeys.byPost(postId),
    queryFn: () => commentsService.getCommentsByPostId(postId),
    select: response => response.data,
    enabled: !!postId
  })

/**
 * Hook to create a new comment
 */
export const useCreateCommentMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: Omit<Comment, 'id'>) =>
      commentsService.createComment(comment),
    onSuccess: data => {
      // Invalidate comments list
      queryClient.invalidateQueries({ queryKey: commentsQueryKeys.lists() })
      // Invalidate comments for the specific post
      if (data.data.postId) {
        queryClient.invalidateQueries({
          queryKey: commentsQueryKeys.byPost(data.data.postId)
        })
      }
    }
  })
}

/**
 * Hook to update an existing comment
 */
export const useUpdateCommentMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: Partial<Comment> }) =>
      commentsService.updateComment(id, comment),
    onSuccess: (data, variables) => {
      // Update the specific comment in cache
      queryClient.setQueryData(commentsQueryKeys.detail(variables.id), data)
      // Invalidate comments list to ensure consistency
      queryClient.invalidateQueries({ queryKey: commentsQueryKeys.lists() })
      // Invalidate comments for the specific post if postId is provided
      if (data.data.postId) {
        queryClient.invalidateQueries({
          queryKey: commentsQueryKeys.byPost(data.data.postId)
        })
      }
    }
  })
}

/**
 * Hook to partially update a comment
 */
export const usePatchCommentMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: Partial<Comment> }) =>
      commentsService.patchComment(id, comment),
    onSuccess: (data, variables) => {
      // Update the specific comment in cache
      queryClient.setQueryData(commentsQueryKeys.detail(variables.id), data)
      // Invalidate comments list to ensure consistency
      queryClient.invalidateQueries({ queryKey: commentsQueryKeys.lists() })
      // Invalidate comments for the specific post if postId is provided
      if (data.data.postId) {
        queryClient.invalidateQueries({
          queryKey: commentsQueryKeys.byPost(data.data.postId)
        })
      }
    }
  })
}

/**
 * Hook to delete a comment
 */
export const useDeleteCommentMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => commentsService.deleteComment(id),
    onSuccess: (_, id) => {
      // Remove the comment from cache
      queryClient.removeQueries({ queryKey: commentsQueryKeys.detail(id) })
      // Invalidate comments list
      queryClient.invalidateQueries({ queryKey: commentsQueryKeys.lists() })
    }
  })
}
