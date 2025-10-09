import React, { useState } from 'react'
import { Comment } from '../../../models'
import { TagDisplay, TagInput } from '../../atoms'
import {
  useAppDispatch,
  useAppSelector
} from '../../../application/store/hooks'
import {
  setCommentTags,
  removeCommentTag
} from '../../../application/slices/posts/commentsSlice'
import { selectCommentTagsById } from '../../../application/slices/posts/postsSelectors'
import { tagsService } from '../../../infrastructure/services'
import { IconButton, Tooltip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import * as S from './styles'

export interface CommentsListProps {
  comments: Comment[]
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  const dispatch = useAppDispatch()
  const getCommentTags = useAppSelector(selectCommentTagsById)
  const tagSuggestions = tagsService.getSuggestions('', 20)
  const [showTagInputs, setShowTagInputs] = useState<Record<number, boolean>>(
    {}
  )

  if (comments.length === 0) {
    return null
  }

  const handleTagChange = (commentId: number, tags: string[]) => {
    dispatch(setCommentTags({ commentId, tags }))

    // Add new tags to dynamic suggestions
    tags.forEach(tag => {
      if (!tagSuggestions.includes(tag)) {
        tagsService.addDynamicTag(tag)
      }
    })
  }

  const handleTagRemove = (commentId: number, tag: string) => {
    dispatch(removeCommentTag({ commentId, tag }))
  }

  const toggleTagInput = (commentId: number) => {
    setShowTagInputs(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }))
  }

  return (
    <S.CommentsContainer>
      {comments.map(comment => {
        const commentTags = getCommentTags(comment.id)

        return (
          <S.CommentItem key={comment.id}>
            <S.CommentAuthor>
              <S.AuthorName>{comment.name}</S.AuthorName>
              <S.AuthorEmail>{comment.email}</S.AuthorEmail>
            </S.CommentAuthor>
            <S.CommentBody>{comment.body}</S.CommentBody>

            <TagDisplay
              tags={commentTags}
              onRemove={tag => handleTagRemove(comment.id, tag)}
              editable={true}
            />

            <S.TagActionsContainer>
              <Tooltip title='Add tags' arrow>
                <IconButton
                  size='small'
                  onClick={() => toggleTagInput(comment.id)}
                  sx={{
                    color: '#1DA1F2',
                    '&:hover': {
                      backgroundColor: 'rgba(29, 161, 242, 0.1)'
                    }
                  }}
                >
                  <AddIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </S.TagActionsContainer>

            {showTagInputs[comment.id] && (
              <S.TagInputWrapper>
                <TagInput
                  value={commentTags}
                  onChange={tags => handleTagChange(comment.id, tags)}
                  suggestions={tagSuggestions}
                  placeholder='Add tags to this comment...'
                  maxTags={5}
                />
              </S.TagInputWrapper>
            )}
          </S.CommentItem>
        )
      })}
    </S.CommentsContainer>
  )
}
