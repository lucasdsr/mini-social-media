import { apiClient } from '../apiClient'
import { User, UsersList, ApiResponse } from '../../models'

/**
 * Users service for JSONPlaceholder API
 * Handles all users-related API calls
 */
export class UsersService {
  private readonly basePath = '/users'

  /**
   * Get all users
   */
  async getAllUsers(): Promise<ApiResponse<UsersList>> {
    return apiClient.get<UsersList>(this.basePath)
  }

  /**
   * Get a single user by ID
   */
  async getUserById(id: number): Promise<ApiResponse<User>> {
    return apiClient.get<User>(`${this.basePath}/${id}`)
  }

  /**
   * Create a new user
   */
  async createUser(user: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    return apiClient.post<User>(this.basePath, user)
  }

  /**
   * Update an existing user
   */
  async updateUser(
    id: number,
    user: Partial<User>
  ): Promise<ApiResponse<User>> {
    return apiClient.put<User>(`${this.basePath}/${id}`, user)
  }

  /**
   * Partially update a user
   */
  async patchUser(id: number, user: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.patch<User>(`${this.basePath}/${id}`, user)
  }

  /**
   * Delete a user
   */
  async deleteUser(id: number): Promise<ApiResponse<object>> {
    return apiClient.delete<object>(`${this.basePath}/${id}`)
  }
}

// Export singleton instance
export const usersService = new UsersService()
export default usersService
