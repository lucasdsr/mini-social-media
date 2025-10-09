import { EngagementScore } from '../../../models'

export interface PostProps {
  userId: number
  id: number
  title: string
  body: string
  engagementScore?: EngagementScore
}
