import React, { useState } from 'react'
import { Comment } from '../../../models'
import { TagDisplay, TagInput, CommentForm } from '../../atoms'
import {
  useAppDispatch,
  useAppSelector
} from '../../../application/store/hooks'
import {
  setCommentTags,
  removeCommentTag,
  addCommentToPost
} from '../../../application/slices/posts/commentsSlice'
import { selectCommentTagsById } from '../../../application/slices/posts/postsSelectors'
import { tagsService } from '../../../infrastructure/services'
import { useCreateComment } from '../../../application/comments'
import { useCurrentUser } from '../../../application/contexts/UserContext'
import { IconButton, Tooltip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import * as S from './styles'

export interface CommentsListProps {
  comments: Comment[]
  postId: number
}

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  postId
}) => {
  const dispatch = useAppDispatch()
  const getCommentTags = useAppSelector(selectCommentTagsById)
  const tagSuggestions = tagsService.getSuggestions('', 20)
  const [showTagInputs, setShowTagInputs] = useState<Record<number, boolean>>(
    {}
  )
  const createCommentMutation = useCreateComment()
  const { currentUser } = useCurrentUser()

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

  const handleCommentSubmit = async (commentData: {
    postId: number
    body: string
  }) => {
    try {
      const commentWithUser = {
        ...commentData,
        name: currentUser.name,
        email: currentUser.email
      }
      const newComment =
        await createCommentMutation.mutateAsync(commentWithUser)
      // Add comment to Redux store at the top of the list
      dispatch(addCommentToPost({ postId, comment: newComment }))
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  return (
    <S.CommentsContainer>
      <CommentForm
        postId={postId}
        onSubmit={handleCommentSubmit}
        isLoading={createCommentMutation.isPending}
      />

      {comments.map(comment => {
        const commentTags = getCommentTags(comment.id)
        const isCurrentUser = comment.email === currentUser.email

        return (
          <S.CommentItem key={comment.id} isCurrentUser={isCurrentUser}>
            <S.CommentAuthor>
              <S.AuthorName isCurrentUser={isCurrentUser}>
                {comment.name}
                {isCurrentUser && ' (You)'}
              </S.AuthorName>
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
