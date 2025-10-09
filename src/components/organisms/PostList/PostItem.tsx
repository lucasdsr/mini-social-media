import React from 'react'
import { Post } from '@/components/molecules'
import { PostWithEngagementScore } from '@/models'

export interface PostItemProps {
  post: {
    id: number
    userId: number
    title: string
    body: string
    engagementScore?: {
      level: string
      value: number
      commentsCount: number
      titleBonus: number
      baseBonus: number
    }
  }
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => (
  <Post
    key={post.id}
    userId={post.userId}
    id={post.id}
    title={post.title}
    body={post.body}
    engagementScore={
      'engagementScore' in post
        ? (post as PostWithEngagementScore).engagementScore
        : undefined
    }
  />
)
