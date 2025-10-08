import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment } from '../../../models'

interface CommentsState {
  commentsByPost: Record<number, Comment[]>
  loadingByPost: Record<number, boolean>
}

const initialState: CommentsState = {
  commentsByPost: {},
  loadingByPost: {}
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCommentsForPost: (
      state,
      action: PayloadAction<{ postId: number; comments: Comment[] }>
    ) => {
      const { postId, comments } = action.payload
      state.commentsByPost[postId] = comments
    },
    setLoadingForPost: (
      state,
      action: PayloadAction<{ postId: number; isLoading: boolean }>
    ) => {
      const { postId, isLoading } = action.payload
      state.loadingByPost[postId] = isLoading
    },
    clearCommentsForPost: (state, action: PayloadAction<number>) => {
      const postId = action.payload
      delete state.commentsByPost[postId]
      delete state.loadingByPost[postId]
    },
    clearAllComments: state => {
      state.commentsByPost = {}
      state.loadingByPost = {}
    }
  }
})

export const {
  setCommentsForPost,
  setLoadingForPost,
  clearCommentsForPost,
  clearAllComments
} = commentsSlice.actions

export default commentsSlice.reducer
