import type { User } from './User'
import type { Comment } from './Comment'
import type { EngagementScore } from './EngagementScore'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type PostsList = Post[]

export type PostWithUser = Post & {
  user: User
}

export type PostWithComments = Post & {
  comments: Comment[]
}

export type PostWithEngagementScore = Post & {
  engagementScore: EngagementScore
}

export type PostWithUserAndComments = Post & {
  user: User
  comments: Comment[]
  engagementScore: EngagementScore
}

export type PostsQueryParams = {
  userId?: number
  _limit?: number
  _page?: number
}
