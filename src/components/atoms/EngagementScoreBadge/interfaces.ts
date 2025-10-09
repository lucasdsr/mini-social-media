import { EngagementScore } from '../../../models'

export interface EngagementScoreBadgeProps {
  engagementScore: EngagementScore
  showValue?: boolean
  size?: 'small' | 'medium' | 'large'
  className?: string
}
