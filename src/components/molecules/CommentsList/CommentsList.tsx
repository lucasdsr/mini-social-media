import React from 'react'
import { Comment } from '../../../models'
import * as S from './styles'

export interface CommentsListProps {
  comments: Comment[]
}

export const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return null
  }

  return (
    <S.CommentsContainer>
      {comments.map(comment => (
        <S.CommentItem key={comment.id}>
          <S.CommentAuthor>{comment.name}</S.CommentAuthor>
          <S.CommentBody>{comment.body}</S.CommentBody>
        </S.CommentItem>
      ))}
    </S.CommentsContainer>
  )
}
