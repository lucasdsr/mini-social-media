import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

interface BadgeContainerProps {
  level: 'low' | 'medium' | 'high'
  size: 'small' | 'medium' | 'large'
}

export const BadgeContainer = styled(Box)<BadgeContainerProps>(({
  level,
  size
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '12px', padding: '4px 8px' }
      case 'medium':
        return { fontSize: '14px', padding: '6px 10px' }
      case 'large':
        return { fontSize: '16px', padding: '8px 12px' }
      default:
        return { fontSize: '14px', padding: '6px 10px' }
    }
  }

  const getLevelStyles = () => {
    switch (level) {
      case 'low':
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          border: '1px solid #e5e7eb'
        }
      case 'medium':
        return {
          backgroundColor: '#fef3c7',
          color: '#d97706',
          border: '1px solid #fbbf24'
        }
      case 'high':
        return {
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fca5a5',
          boxShadow: '0 2px 4px rgba(220, 38, 38, 0.1)'
        }
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          border: '1px solid #e5e7eb'
        }
    }
  }

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    borderRadius: '12px',
    fontWeight: 600,
    transition: 'all 0.2s ease',
    ...getSizeStyles(),
    ...getLevelStyles(),
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
  }
})

interface IconWrapperProps {
  level: 'low' | 'medium' | 'high'
  size: 'small' | 'medium' | 'large'
}

export const IconWrapper = styled(Box)<IconWrapperProps>(({ level, size }) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { fontSize: '16px' }
      case 'medium':
        return { fontSize: '18px' }
      case 'large':
        return { fontSize: '20px' }
      default:
        return { fontSize: '18px' }
    }
  }

  const getLevelStyles = () => {
    switch (level) {
      case 'low':
        return {
          opacity: 0.5,
          filter: 'grayscale(0.3)'
        }
      case 'medium':
        return {
          opacity: 0.7,
          filter: 'saturate(1.2)'
        }
      case 'high':
        return {
          opacity: 1,
          filter: 'saturate(1.5) brightness(1.1)',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': {
              opacity: 1,
              transform: 'scale(1)'
            },
            '50%': {
              opacity: 0.8,
              transform: 'scale(1.05)'
            }
          }
        }
      default:
        return { opacity: 0.5 }
    }
  }

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderRadius: '50%',
    padding: '4px',
    ...getSizeStyles(),
    ...getLevelStyles(),
    '&:hover': {
      transform: 'scale(1.1)',
      opacity: 1
    }
  }
})

interface ScoreValueProps {
  level: 'low' | 'medium' | 'high'
}

export const ScoreValue = styled(Typography)<ScoreValueProps>(({ level }) => ({
  fontWeight: 700,
  fontSize: '0.9em',
  ...(level === 'high' && {
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  })
}))
