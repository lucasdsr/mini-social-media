import { useQuery } from '@tanstack/react-query'
import { commentsService } from '../../infrastructure/services'

// Query keys for consistent caching
export const commentsQueryKeys = {
  all: ['comments'] as const,
  byPost: (postId: number) =>
    [...commentsQueryKeys.all, 'post', postId] as const
}

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
