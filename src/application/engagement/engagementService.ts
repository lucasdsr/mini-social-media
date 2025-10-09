import {
  EngagementScore,
  Post,
  Comment,
  PostWithEngagementScore
} from '../../models'

/**
 * Constants for engagement score calculation
 */
const ENGAGEMENT_CONSTANTS = {
  COMMENTS_WEIGHT: 10, // Multiplier for comments count
  BASE_BONUS: 5, // Base bonus for all posts
  TITLE_BONUS_DIVISOR: 10, // Divisor for title length bonus
  THRESHOLDS: {
    LOW: 30,
    HIGH: 60
  }
} as const

/**
 * Calculate engagement score for a post based on comments and title
 * Formula: (commentsCount * 10) + baseBonus + titleBonus
 *
 * @param post - The post to calculate engagement score for
 * @param comments - Array of comments for the post
 * @returns EngagementScore object with calculated values and level
 */
export const calculateEngagementScore = (
  post: Post,
  comments: Comment[] = []
): EngagementScore => {
  const commentsCount = comments.length
  const titleBonus = Math.floor(
    post.title.length / ENGAGEMENT_CONSTANTS.TITLE_BONUS_DIVISOR
  )

  const value =
    commentsCount * ENGAGEMENT_CONSTANTS.COMMENTS_WEIGHT +
    ENGAGEMENT_CONSTANTS.BASE_BONUS +
    titleBonus

  // Determine engagement level based on score
  let level: 'low' | 'medium' | 'high'
  if (value <= ENGAGEMENT_CONSTANTS.THRESHOLDS.LOW) {
    level = 'low'
  } else if (value <= ENGAGEMENT_CONSTANTS.THRESHOLDS.HIGH) {
    level = 'medium'
  } else {
    level = 'high'
  }

  return {
    value,
    level,
    commentsCount,
    titleBonus,
    baseBonus: ENGAGEMENT_CONSTANTS.BASE_BONUS
  }
}

/**
 * Calculate engagement scores for multiple posts
 *
 * @param posts - Array of posts
 * @param commentsByPost - Map of postId to comments array
 * @returns Array of posts with engagement scores
 */
export const calculateEngagementScores = (
  posts: Post[],
  commentsByPost: Record<number, Comment[]>
): Post[] =>
  posts.map(post => ({
    ...post,
    engagementScore: calculateEngagementScore(
      post,
      commentsByPost[post.id] || []
    )
  }))

/**
 * Filter posts by engagement score threshold
 *
 * @param posts - Array of posts with engagement scores
 * @param threshold - Minimum engagement score threshold
 * @returns Filtered posts above threshold
 */
export const filterPostsByEngagement = (
  posts: Post[],
  threshold: number
): Post[] =>
  posts.filter(
    post =>
      'engagementScore' in post &&
      (post as PostWithEngagementScore).engagementScore.value >= threshold
  )

/**
 * Sort posts by engagement score (descending)
 *
 * @param posts - Array of posts with engagement scores
 * @returns Sorted posts by engagement score
 */
export const sortPostsByEngagement = (posts: Post[]): Post[] =>
  [...posts].sort((a, b) => {
    const scoreA =
      'engagementScore' in a
        ? (a as PostWithEngagementScore).engagementScore.value
        : 0
    const scoreB =
      'engagementScore' in b
        ? (b as PostWithEngagementScore).engagementScore.value
        : 0
    return scoreB - scoreA
  })
