import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage
} from '../localStorage'
import { Post } from '../../models'

export interface PostWithTimestamp extends Post {
  createdAt: string
}

const LOCAL_POSTS_KEY = 'mini-social-media-local-posts'

/**
 * Service for managing local posts persistence
 * Handles saving and loading posts from localStorage
 */
export class LocalPostsService {
  /**
   * Save local posts to localStorage
   */
  saveLocalPosts(posts: PostWithTimestamp[]): void {
    saveToLocalStorage(LOCAL_POSTS_KEY, posts)
  }

  /**
   * Load local posts from localStorage
   */
  loadLocalPosts(): PostWithTimestamp[] {
    const posts = getFromLocalStorage<PostWithTimestamp[]>(LOCAL_POSTS_KEY)
    return posts || []
  }

  /**
   * Clear all local posts from localStorage
   */
  clearLocalPosts(): void {
    removeFromLocalStorage(LOCAL_POSTS_KEY)
  }

  /**
   * Add a single post to localStorage
   */
  addLocalPost(post: Post): void {
    const existingPosts = this.loadLocalPosts()
    const newPost: PostWithTimestamp = {
      ...post,
      createdAt: new Date().toISOString()
    }
    const updatedPosts = [newPost, ...existingPosts]
    this.saveLocalPosts(updatedPosts)
  }

  /**
   * Remove a post from localStorage by ID
   */
  removeLocalPost(postId: number): void {
    const existingPosts = this.loadLocalPosts()
    const updatedPosts = existingPosts.filter(post => post.id !== postId)
    this.saveLocalPosts(updatedPosts)
  }

  /**
   * Remove multiple posts from localStorage by IDs
   */
  removeLocalPostsByIds(postIds: number[]): void {
    const existingPosts = this.loadLocalPosts()
    const updatedPosts = existingPosts.filter(
      post => !postIds.includes(post.id)
    )
    this.saveLocalPosts(updatedPosts)
  }
}

// Export singleton instance
export const localPostsService = new LocalPostsService()
export default localPostsService
