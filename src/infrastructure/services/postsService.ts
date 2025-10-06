import { apiClient } from '../apiClient'
import { Post, PostsList, PostsQueryParams, ApiResponse } from '../../models'

/**
 * Posts service for JSONPlaceholder API
 * Handles all posts-related API calls
 */
export class PostsService {
  private readonly basePath = '/posts'

  /**
   * Get all posts
   */
  async getAllPosts(
    params?: PostsQueryParams
  ): Promise<ApiResponse<PostsList>> {
    const queryParams = new URLSearchParams()

    if (params?.userId) {
      queryParams.append('userId', params.userId.toString())
    }
    if (params?._limit) {
      queryParams.append('_limit', params._limit.toString())
    }
    if (params?._page) {
      queryParams.append('_page', params._page.toString())
    }

    const url = queryParams.toString()
      ? `${this.basePath}?${queryParams.toString()}`
      : this.basePath

    return apiClient.get<PostsList>(url)
  }

  /**
   * Get a single post by ID
   */
  async getPostById(id: number): Promise<ApiResponse<Post>> {
    return apiClient.get<Post>(`${this.basePath}/${id}`)
  }

  /**
   * Get posts by user ID
   */
  async getPostsByUserId(userId: number): Promise<ApiResponse<PostsList>> {
    return apiClient.get<PostsList>(`${this.basePath}?userId=${userId}`)
  }

  /**
   * Create a new post
   */
  async createPost(post: Omit<Post, 'id'>): Promise<ApiResponse<Post>> {
    return apiClient.post<Post>(this.basePath, post)
  }

  /**
   * Update an existing post
   */
  async updatePost(
    id: number,
    post: Partial<Post>
  ): Promise<ApiResponse<Post>> {
    return apiClient.put<Post>(`${this.basePath}/${id}`, post)
  }

  /**
   * Partially update a post
   */
  async patchPost(id: number, post: Partial<Post>): Promise<ApiResponse<Post>> {
    return apiClient.patch<Post>(`${this.basePath}/${id}`, post)
  }

  /**
   * Delete a post
   */
  async deletePost(id: number): Promise<ApiResponse<object>> {
    return apiClient.delete<object>(`${this.basePath}/${id}`)
  }
}

// Export singleton instance
export const postsService = new PostsService()
export default postsService
