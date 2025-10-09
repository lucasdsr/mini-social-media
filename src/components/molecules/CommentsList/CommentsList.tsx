import React from 'react'
import { Comment } from '../../../models'
import { CommentForm } from '../../atoms'
import { CommentItem } from './CommentItem'
import { useCommentsListLogic } from './hooks'
import * as S from './styles'

export interface CommentsListProps {
  comments: Comment[]
  postId: number
}

export const CommentsList: React.FC<CommentsListProps> = ({
  comments,
  postId
}) => {
  const {
    getCommentTags,
    tagSuggestions,
    showTagInputs,
    createCommentMutation,
    currentUser,
    handleTagChange,
    handleTagRemove,
    toggleTagInput,
    handleCommentSubmit
  } = useCommentsListLogic(postId)

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
          <CommentItem
            key={comment.id}
            comment={comment}
            commentTags={commentTags}
            isCurrentUser={isCurrentUser}
            showTagInput={showTagInputs[comment.id]}
            onTagChange={tags => handleTagChange(comment.id, tags)}
            onTagRemove={tag => handleTagRemove(comment.id, tag)}
            onToggleTagInput={() => toggleTagInput(comment.id)}
            tagSuggestions={tagSuggestions}
          />
        )
      })}
    </S.CommentsContainer>
  )
}
