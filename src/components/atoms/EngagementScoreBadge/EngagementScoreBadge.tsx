import React from 'react'
import { Tooltip } from '@mui/material'
import { IconWrapper } from './styles'
import { EngagementScoreBadgeProps } from './interfaces'
import { getEngagementIcon, createTooltipContent } from './utils'

const EngagementScoreBadge: React.FC<EngagementScoreBadgeProps> = ({
  engagementScore,
  size = 'medium',
  className
}) => {
  const { level } = engagementScore

  return (
    <Tooltip
      arrow
      placement='top'
      title={createTooltipContent(engagementScore)}
    >
      <IconWrapper level={level} size={size} className={className}>
        {getEngagementIcon(level)}
      </IconWrapper>
    </Tooltip>
  )
}

export default EngagementScoreBadge
