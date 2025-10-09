import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { calculateEngagementScores, filterPostsByEngagement, sortPostsByEngagement } from './engagementService'
import { Post } from '../../models'

/**
 * Selector to get all posts with engagement scores calculated
 */
export const selectPostsWithEngagement = createSelector(
  [
    (state: RootState) => state.localPosts.posts,
    (state: RootState) => state.comments.commentsByPost
  ],
  (posts, commentsByPost) => {
    return calculateEngagementScores(posts, commentsByPost)
  }
)

/**
 * Selector to get posts filtered by engagement threshold
 */
export const selectPostsByEngagementThreshold = createSelector(
  [
    selectPostsWithEngagement,
    (state: RootState) => state.posts.filters.engagementThreshold
  ],
  (posts, threshold) => {
    if (threshold === 0) return posts
    return filterPostsByEngagement(posts, threshold)
  }
)

/**
 * Selector to get posts sorted by engagement score
 */
export const selectPostsSortedByEngagement = createSelector(
  [selectPostsByEngagementThreshold],
  (posts) => sortPostsByEngagement(posts)
)

/**
 * Selector to get engagement statistics
 */
export const selectEngagementStats = createSelector(
  [selectPostsWithEngagement],
  (posts) => {
    const scores = posts.map(post => 
      'engagementScore' in post ? (post as any).engagementScore.value : 0
    )
    
    const total = scores.length
    const average = total > 0 ? scores.reduce((sum, score) => sum + score, 0) / total : 0
    const max = Math.max(...scores, 0)
    const min = Math.min(...scores, 0)
    
    const levelCounts = posts.reduce((acc, post) => {
      if ('engagementScore' in post) {
        const level = (post as any).engagementScore.level
        acc[level] = (acc[level] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    return {
      total,
      average: Math.round(average * 100) / 100,
      max,
      min,
      levelCounts
    }
  }
)
