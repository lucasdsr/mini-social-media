export type EngagementScore = {
  value: number
  level: 'low' | 'medium' | 'high'
  commentsCount: number
  titleBonus: number
  baseBonus: number
}
