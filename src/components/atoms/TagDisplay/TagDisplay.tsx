import React from 'react'
import { Chip } from '@mui/material'
import * as S from './styles'

export interface TagDisplayProps {
  tags: string[]
  onRemove?: (_tag: string) => void // eslint-disable-line @typescript-eslint/no-unused-vars
  editable?: boolean
}

export const TagDisplay: React.FC<TagDisplayProps> = ({
  tags,
  onRemove,
  editable = false
}) => {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <S.TagsContainer>
      {tags.map((tag, index) => (
        <Chip
          key={`${tag}-${index}`}
          label={tag}
          size='small'
          onDelete={editable && onRemove ? () => onRemove(tag) : undefined}
          sx={{
            backgroundColor: 'rgba(29, 161, 242, 0.1)',
            color: '#1DA1F2',
            border: '1px solid rgba(29, 161, 242, 0.2)',
            fontSize: '0.75rem',
            height: '24px',
            '& .MuiChip-deleteIcon': {
              color: '#1DA1F2',
              fontSize: '16px',
              '&:hover': {
                color: '#0D8BD9'
              }
            },
            '&:hover': {
              backgroundColor: 'rgba(29, 161, 242, 0.15)'
            }
          }}
        />
      ))}
    </S.TagsContainer>
  )
}
