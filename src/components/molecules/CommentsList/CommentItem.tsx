import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { Comment } from '../../../models'
import { TagDisplay, TagInput } from '../../atoms'
import * as S from './styles'

export interface CommentItemProps {
  comment: Comment
  commentTags: string[]
  isCurrentUser: boolean
  showTagInput: boolean
  onTagChange: (_tags: string[]) => void // eslint-disable-line @typescript-eslint/no-unused-vars
  onTagRemove: (_tag: string) => void // eslint-disable-line @typescript-eslint/no-unused-vars
  onToggleTagInput: () => void
  tagSuggestions: string[]
}

const getAddButtonStyles = () => ({
  color: '#1DA1F2',
  '&:hover': {
    backgroundColor: 'rgba(29, 161, 242, 0.1)'
  }
})

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  commentTags,
  isCurrentUser,
  showTagInput,
  onTagChange,
  onTagRemove,
  onToggleTagInput,
  tagSuggestions
}) => (
  <S.CommentItem key={comment.id} isCurrentUser={isCurrentUser}>
    <S.CommentAuthor>
      <S.AuthorName isCurrentUser={isCurrentUser}>
        {comment.name}
        {isCurrentUser && ' (You)'}
      </S.AuthorName>
      <S.AuthorEmail>{comment.email}</S.AuthorEmail>
    </S.CommentAuthor>
    <S.CommentBody>{comment.body}</S.CommentBody>

    <TagDisplay tags={commentTags} onRemove={onTagRemove} editable={true} />

    <S.TagActionsContainer>
      <Tooltip title='Add tags' arrow>
        <IconButton
          size='small'
          onClick={onToggleTagInput}
          sx={getAddButtonStyles()}
        >
          <AddIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </S.TagActionsContainer>

    {showTagInput && (
      <S.TagInputWrapper>
        <TagInput
          value={commentTags}
          onChange={onTagChange}
          suggestions={tagSuggestions}
          placeholder='Add tags to this comment...'
          maxTags={5}
        />
      </S.TagInputWrapper>
    )}
  </S.CommentItem>
)
