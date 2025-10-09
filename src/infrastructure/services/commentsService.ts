import { apiClient } from '../apiClient'
import {
  Comment,
  CommentsList,
  CommentsQueryParams,
  ApiResponse
} from '../../models'
import { getFromLocalStorage, saveToLocalStorage } from '../localStorage'

/**
 * Comments service with local persistence
 * Handles all comments-related operations with localStorage fallback
 */
export class CommentsService {
  private readonly basePath = '/comments'
  private readonly localStorageKey = 'localComments'

  /**
   * Get all comments from API and merge with local comments
   */
  async getAllComments(
    params?: CommentsQueryParams
  ): Promise<ApiResponse<CommentsList>> {
    try {
      // Try to get from API first
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

      const apiResponse = await apiClient.get<CommentsList>(url)

      // Merge with local comments
      const localComments = this.getLocalComments()
      const allComments = [...apiResponse.data, ...localComments]

      return {
        ...apiResponse,
        data: allComments
      }
    } catch {
      // Fallback to local storage only
      const localComments = this.getLocalComments()
      return {
        data: localComments,
        status: 200,
        statusText: 'OK'
      }
    }
  }

  /**
   * Get a single comment by ID
   */
  async getCommentById(id: number): Promise<ApiResponse<Comment>> {
    try {
      return await apiClient.get<Comment>(`${this.basePath}/${id}`)
    } catch {
      // Fallback to local storage
      const localComments = this.getLocalComments()
      const comment = localComments.find(c => c.id === id)

      if (comment) {
        return {
          data: comment,
          status: 200,
          statusText: 'OK'
        }
      }

      throw new Error('Comment not found')
    }
  }

  /**
   * Get comments by post ID
   */
  async getCommentsByPostId(
    postId: number
  ): Promise<ApiResponse<CommentsList>> {
    try {
      // Try API first
      const apiResponse = await apiClient.get<CommentsList>(
        `${this.basePath}?postId=${postId}`
      )

      // Merge with local comments for this post
      const localComments = this.getLocalComments()
      const localCommentsForPost = localComments.filter(
        c => c.postId === postId
      )
      const allComments = [...apiResponse.data, ...localCommentsForPost]

      return {
        ...apiResponse,
        data: allComments
      }
    } catch {
      // Fallback to local storage only
      const localComments = this.getLocalComments()
      const commentsForPost = localComments.filter(c => c.postId === postId)

      return {
        data: commentsForPost,
        status: 200,
        statusText: 'OK'
      }
    }
  }

  /**
   * Create a new comment (saves locally)
   */
  async createComment(
    comment: Omit<Comment, 'id'>
  ): Promise<ApiResponse<Comment>> {
    // Generate a unique ID for local comments (using timestamp + random)
    const newId = Date.now() + Math.floor(Math.random() * 1000)
    const newComment: Comment = {
      ...comment,
      id: newId
    }

    // Save to local storage
    this.saveLocalComment(newComment)

    // Simulate API response
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          data: newComment,
          status: 201,
          statusText: 'Created'
        })
      }, 500) // Simulate network delay
    })
  }

  /**
   * Update an existing comment
   */
  async updateComment(
    id: number,
    comment: Partial<Comment>
  ): Promise<ApiResponse<Comment>> {
    try {
      return await apiClient.put<Comment>(`${this.basePath}/${id}`, comment)
    } catch {
      // Fallback to local storage
      const localComments = this.getLocalComments()
      const commentIndex = localComments.findIndex(c => c.id === id)

      if (commentIndex !== -1) {
        localComments[commentIndex] = {
          ...localComments[commentIndex],
          ...comment
        }
        saveToLocalStorage(this.localStorageKey, localComments)

        return {
          data: localComments[commentIndex],
          status: 200,
          statusText: 'OK'
        }
      }

      throw new Error('Comment not found')
    }
  }

  /**
   * Partially update a comment
   */
  async patchComment(
    id: number,
    comment: Partial<Comment>
  ): Promise<ApiResponse<Comment>> {
    try {
      return await apiClient.patch<Comment>(`${this.basePath}/${id}`, comment)
    } catch {
      // Fallback to local storage
      const localComments = this.getLocalComments()
      const commentIndex = localComments.findIndex(c => c.id === id)

      if (commentIndex !== -1) {
        localComments[commentIndex] = {
          ...localComments[commentIndex],
          ...comment
        }
        saveToLocalStorage(this.localStorageKey, localComments)

        return {
          data: localComments[commentIndex],
          status: 200,
          statusText: 'OK'
        }
      }

      throw new Error('Comment not found')
    }
  }

  /**
   * Delete a comment
   */
  async deleteComment(id: number): Promise<ApiResponse<object>> {
    try {
      return await apiClient.delete<object>(`${this.basePath}/${id}`)
    } catch {
      // Fallback to local storage
      const localComments = this.getLocalComments()
      const filteredComments = localComments.filter(c => c.id !== id)
      saveToLocalStorage(this.localStorageKey, filteredComments)

      return {
        data: {},
        status: 200,
        statusText: 'OK'
      }
    }
  }

  /**
   * Get comments from local storage
   */
  private getLocalComments(): Comment[] {
    return getFromLocalStorage<Comment[]>(this.localStorageKey) || []
  }

  /**
   * Save comment to local storage
   */
  private saveLocalComment(comment: Comment): void {
    const localComments = this.getLocalComments()
    localComments.push(comment)
    saveToLocalStorage(this.localStorageKey, localComments)
  }
}

// Export singleton instance
export const commentsService = new CommentsService()
export default commentsService
