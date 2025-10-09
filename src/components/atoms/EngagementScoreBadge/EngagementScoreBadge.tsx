import React from 'react'
import { Tooltip } from '@mui/material'
import { IconWrapper } from './styles'
import { EngagementScoreBadgeProps } from './interfaces'

/**
 * EngagementScoreBadge component displays engagement score with visual indicators
 *
 * @param engagementScore - The engagement score data
 * @param showValue - Whether to show the numeric value
 * @param size - Size variant of the badge
 * @param className - Additional CSS classes
 */
const EngagementScoreBadge: React.FC<EngagementScoreBadgeProps> = ({
  engagementScore,
  size = 'medium',
  className
}) => {
  const { level, value, commentsCount, titleBonus, baseBonus } = engagementScore

  // Get appropriate icon based on engagement level
  const getIcon = () => {
    switch (level) {
      case 'low':
        return '📉'
      case 'medium':
        return '📊'
      case 'high':
        return '🔥'
      default:
        return '📊'
    }
  }

  // Get level text
  const getLevelText = () => {
    switch (level) {
      case 'low':
        return 'Low Engagement'
      case 'medium':
        return 'Medium Engagement'
      case 'high':
        return 'High Engagement'
      default:
        return 'Unknown Engagement'
    }
  }

  const tooltipContent = (
    <div>
      <div>
        <strong>{getLevelText()}</strong>
      </div>
      <div>Score: {value}</div>
      <div>Comments: {commentsCount}</div>
      <div>Title Bonus: {titleBonus}</div>
      <div>Base Bonus: {baseBonus}</div>
    </div>
  )

  return (
    <Tooltip title={tooltipContent} arrow placement='top'>
      <IconWrapper level={level} size={size} className={className}>
        {getIcon()}
      </IconWrapper>
    </Tooltip>
  )
}

export default EngagementScoreBadge
