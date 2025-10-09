import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Comment } from '../../../models'
import {
  saveToLocalStorage,
  getFromLocalStorage
} from '../../../infrastructure/localStorage'

interface CommentsState {
  commentsByPost: Record<number, Comment[]>
  loadingByPost: Record<number, boolean>
  commentTags: Record<number, string[]> // commentId -> tags
}

// Load tags from localStorage on initialization
const loadTagsFromStorage = (): Record<number, string[]> => {
  const savedTags = getFromLocalStorage<Record<number, string[]>>('commentTags')
  return savedTags || {}
}

const initialState: CommentsState = {
  commentsByPost: {},
  loadingByPost: {},
  commentTags: loadTagsFromStorage()
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
      state.commentTags = {}
    },
    setCommentTags: (
      state,
      action: PayloadAction<{ commentId: number; tags: string[] }>
    ) => {
      const { commentId, tags } = action.payload
      state.commentTags[commentId] = tags
      // Save to localStorage
      saveToLocalStorage('commentTags', state.commentTags)
    },
    addCommentTag: (
      state,
      action: PayloadAction<{ commentId: number; tag: string }>
    ) => {
      const { commentId, tag } = action.payload
      if (!state.commentTags[commentId]) {
        state.commentTags[commentId] = []
      }
      if (!state.commentTags[commentId].includes(tag)) {
        state.commentTags[commentId].push(tag)
        // Save to localStorage
        saveToLocalStorage('commentTags', state.commentTags)
      }
    },
    removeCommentTag: (
      state,
      action: PayloadAction<{ commentId: number; tag: string }>
    ) => {
      const { commentId, tag } = action.payload
      if (state.commentTags[commentId]) {
        state.commentTags[commentId] = state.commentTags[commentId].filter(
          t => t !== tag
        )
        // Save to localStorage
        saveToLocalStorage('commentTags', state.commentTags)
      }
    },
    clearCommentTags: (state, action: PayloadAction<number>) => {
      const commentId = action.payload
      delete state.commentTags[commentId]
      // Save to localStorage
      saveToLocalStorage('commentTags', state.commentTags)
    }
  }
})

export const {
  setCommentsForPost,
  setLoadingForPost,
  clearCommentsForPost,
  clearAllComments,
  setCommentTags,
  addCommentTag,
  removeCommentTag,
  clearCommentTags
} = commentsSlice.actions

export default commentsSlice.reducer
