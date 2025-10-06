import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersService } from '../../infrastructure/services'
import { User } from '../../models'

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

/**
 * Hook to create a new user
 */
export const useCreateUserMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user: Omit<User, 'id'>) => usersService.createUser(user),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
    }
  })
}

/**
 * Hook to update an existing user
 */
export const useUpdateUserMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: Partial<User> }) =>
      usersService.updateUser(id, user),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(usersQueryKeys.detail(variables.id), data)
      // Invalidate users list to ensure consistency
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
    }
  })
}

/**
 * Hook to partially update a user
 */
export const usePatchUserMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, user }: { id: number; user: Partial<User> }) =>
      usersService.patchUser(id, user),
    onSuccess: (data, variables) => {
      // Update the specific user in cache
      queryClient.setQueryData(usersQueryKeys.detail(variables.id), data)
      // Invalidate users list to ensure consistency
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
    }
  })
}

/**
 * Hook to delete a user
 */
export const useDeleteUserMutate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => usersService.deleteUser(id),
    onSuccess: (_, id) => {
      // Remove the user from cache
      queryClient.removeQueries({ queryKey: usersQueryKeys.detail(id) })
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.lists() })
    }
  })
}
