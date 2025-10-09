import React from 'react'

export const getEngagementIcon = (level: string): string => {
  const iconMap: Record<string, string> = {
    low: '📉',
    medium: '📊',
    high: '🔥'
  }
  return iconMap[level] || '📊'
}

export const getEngagementLevelText = (level: string): string => {
  const levelMap: Record<string, string> = {
    low: 'Low Engagement',
    medium: 'Medium Engagement',
    high: 'High Engagement'
  }
  return levelMap[level] || 'Unknown Engagement'
}

export const createTooltipContent = (engagementScore: {
  level: string
  value: number
  commentsCount: number
  titleBonus: number
  baseBonus: number
}) => {
  const { level, value, commentsCount, titleBonus, baseBonus } = engagementScore
  return (
    <div>
      <div>
        <strong>{getEngagementLevelText(level)}</strong>
      </div>
      <div>Score: {value}</div>
      <div>Comments: {commentsCount}</div>
      <div>Title Bonus: {titleBonus}</div>
      <div>Base Bonus: {baseBonus}</div>
    </div>
  )
}
