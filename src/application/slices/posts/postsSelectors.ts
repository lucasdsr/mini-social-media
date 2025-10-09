import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { Post } from '../../../models'

// Base selectors
export const selectPostsState = (state: RootState) => state.posts
export const selectSelectedPost = (state: RootState) => state.posts.selectedPost
export const selectFilters = (state: RootState) => state.posts.filters
export const selectSortBy = (state: RootState) => state.posts.sortBy

// Comments selectors
export const selectCommentsState = (state: RootState) => state.comments
export const selectCommentsByPost = (state: RootState) =>
  state.comments.commentsByPost
export const selectCommentTags = (state: RootState) =>
  state.comments.commentTags

// Computed selectors
export const selectFilteredPosts = createSelector(
  [selectFilters],
  filters => (posts: Post[]) =>
    posts.filter(post => {
      const matchesSearch =
        !filters.searchTerm ||
        post.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(filters.searchTerm.toLowerCase())

      const matchesUser = !filters.userId || post.userId === filters.userId

      return matchesSearch && matchesUser
    })
)

export const selectSortedPosts = createSelector(
  [selectSortBy],
  sortBy => (posts: Post[]) => {
    switch (sortBy) {
      case 'title':
        return [...posts].sort((a, b) => a.title.localeCompare(b.title))
      case 'engagement':
        // Implementar lógica de engagement score
        return [...posts].sort((a, b) => b.id - a.id) // Placeholder
      case 'date':
      default:
        return [...posts].sort((a, b) => b.id - a.id)
    }
  }
)

// Comment tags selectors
export const selectCommentTagsById = createSelector(
  [selectCommentTags],
  commentTags => (commentId: number) => commentTags[commentId] || []
)

export const selectCommentsWithTags = createSelector(
  [selectCommentsByPost, selectCommentTags],
  (commentsByPost, commentTags) => (postId: number) => {
    const comments = commentsByPost[postId] || []
    return comments.map(comment => ({
      ...comment,
      tags: commentTags[comment.id] || []
    }))
  }
)
