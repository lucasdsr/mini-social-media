import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postsService } from '../../infrastructure/services'
import { Post, PostsQueryParams } from '../../models'

// Query keys for consistent caching
export const postsQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (params?: PostsQueryParams) =>
    [...postsQueryKeys.lists(), params] as const,
  details: () => [...postsQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...postsQueryKeys.details(), id] as const,
  byUser: (userId: number) => [...postsQueryKeys.all, 'user', userId] as const
}

/**
 * Hook to fetch all posts with optional filtering
 */
export const usePostsQuery = (params?: PostsQueryParams) =>
  useQuery({
    queryKey: postsQueryKeys.list(params),
    queryFn: () => postsService.getAllPosts(params),
    select: response => response.data
  })

/**
 * Hook to fetch a single post by ID
 */
export const usePostQuery = (id: number) =>
  useQuery({
    queryKey: postsQueryKeys.detail(id),
    queryFn: () => postsService.getPostById(id),
    select: response => response.data,
    enabled: !!id
  })

/**
 * Hook to fetch posts by user ID
 */
export const usePostsByUserQuery = (userId: number) =>
  useQuery({
    queryKey: postsQueryKeys.byUser(userId),
    queryFn: () => postsService.getPostsByUserId(userId),
    select: response => response.data,
    enabled: !!userId
  })

/**
 * Hook to create a new post
 */
export const useCreatePostMutate = () =>
  useMutation({
    mutationFn: (post: Omit<Post, 'id'>) => postsService.createPost(post)
  })

/**
 * Hook to update an existing post
 */
export const useUpdatePostMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) =>
      postsService.updatePost(id, post),
    onSuccess: (data, variables) => {
      // Update the specific post in cache
      queryClient.setQueryData(postsQueryKeys.detail(variables.id), data)
      // Invalidate posts list to ensure consistency
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() })
    }
  })
}

/**
 * Hook to partially update a post
 */
export const usePatchPostMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) =>
      postsService.patchPost(id, post),
    onSuccess: (data, variables) => {
      // Update the specific post in cache
      queryClient.setQueryData(postsQueryKeys.detail(variables.id), data)
      // Invalidate posts list to ensure consistency
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() })
    }
  })
}

/**
 * Hook to delete a post
 */
export const useDeletePostMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postsService.deletePost(id),
    onSuccess: (_, id) => {
      // Remove the post from cache
      queryClient.removeQueries({ queryKey: postsQueryKeys.detail(id) })
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() })
    }
  })
}
