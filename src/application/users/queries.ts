import { useQuery } from '@tanstack/react-query'
import { usersService } from '../../infrastructure/services'

// Query keys for consistent caching
export const usersQueryKeys = {
  all: ['users'] as const,
  lists: () => [...usersQueryKeys.all, 'list'] as const,
  list: () => [...usersQueryKeys.lists()] as const,
  details: () => [...usersQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...usersQueryKeys.details(), id] as const
}

/**
 * Hook to fetch all users
 */
export const useUsersQuery = () =>
  useQuery({
    queryKey: usersQueryKeys.list(),
    queryFn: () => usersService.getAllUsers(),
    select: response => response.data
  })

/**
 * Hook to fetch a single user by ID
 */
export const useUserQuery = (id: number) =>
  useQuery({
    queryKey: usersQueryKeys.detail(id),
    queryFn: () => usersService.getUserById(id),
    select: response => response.data,
    enabled: !!id
  })
