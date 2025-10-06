import { apiClient } from '../apiClient'
import {
  Comment,
  CommentsList,
  CommentsQueryParams,
  ApiResponse
} from '../../models'

/**
 * Comments service for JSONPlaceholder API
 * Handles all comments-related API calls
 */
export class CommentsService {
  private readonly basePath = '/comments'

  /**
   * Get all comments
   */
  async getAllComments(
    params?: CommentsQueryParams
  ): Promise<ApiResponse<CommentsList>> {
    const queryParams = new URLSearchParams()

    if (params?.postId) {
      queryParams.append('postId', params.postId.toString())
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

    return apiClient.get<CommentsList>(url)
  }

  /**
   * Get a single comment by ID
   */
  async getCommentById(id: number): Promise<ApiResponse<Comment>> {
    return apiClient.get<Comment>(`${this.basePath}/${id}`)
  }

  /**
   * Get comments by post ID
   */
  async getCommentsByPostId(
    postId: number
  ): Promise<ApiResponse<CommentsList>> {
    return apiClient.get<CommentsList>(`${this.basePath}?postId=${postId}`)
  }

  /**
   * Create a new comment
   */
  async createComment(
    comment: Omit<Comment, 'id'>
  ): Promise<ApiResponse<Comment>> {
    return apiClient.post<Comment>(this.basePath, comment)
  }

  /**
   * Update an existing comment
   */
  async updateComment(
    id: number,
    comment: Partial<Comment>
  ): Promise<ApiResponse<Comment>> {
    return apiClient.put<Comment>(`${this.basePath}/${id}`, comment)
  }

  /**
   * Partially update a comment
   */
  async patchComment(
    id: number,
    comment: Partial<Comment>
  ): Promise<ApiResponse<Comment>> {
    return apiClient.patch<Comment>(`${this.basePath}/${id}`, comment)
  }

  /**
   * Delete a comment
   */
  async deleteComment(id: number): Promise<ApiResponse<object>> {
    return apiClient.delete<object>(`${this.basePath}/${id}`)
  }
}

// Export singleton instance
export const commentsService = new CommentsService()
export default commentsService
