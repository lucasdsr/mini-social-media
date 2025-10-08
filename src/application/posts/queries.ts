import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { postsService } from '../../infrastructure/services'
import { Post, PostsQueryParams } from '../../models'

// Query keys for consistent caching
export const postsQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (params?: PostsQueryParams) =>
    [...postsQueryKeys.lists(), params] as const,
  infinite: (params?: Omit<PostsQueryParams, '_page'>) =>
    [...postsQueryKeys.all, 'infinite', params] as const
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
 * Hook to fetch posts with infinite scroll pagination
 * Loads posts in order, with newer posts first, but maintains loaded order
 */
export const useInfinitePostsQuery = (
  params?: Omit<PostsQueryParams, '_page'>
) =>
  useInfiniteQuery({
    queryKey: postsQueryKeys.infinite(params),
    queryFn: ({ pageParam = 1 }) =>
      postsService.getAllPosts({
        ...params,
        _page: pageParam,
        _limit: 20
      }),
    select: data => ({
      pages: data.pages.map(page => page.data),
      pageParams: data.pageParams
    }),
    getNextPageParam: (lastPage, allPages) => {
      // If we got less than 20 posts, we've reached the end
      if (lastPage.data.length < 20) {
        return undefined
      }
      return allPages.length + 1
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    retry: 2,
    retryDelay: 1000
  })

/**
 * Hook to create a new post
 */
export const useCreatePostMutate = () =>
  useMutation({
    mutationFn: (post: Omit<Post, 'id'>) => postsService.createPost(post)
  })
