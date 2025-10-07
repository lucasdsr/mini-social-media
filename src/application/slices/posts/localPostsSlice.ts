import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../../models'
import { localPostsService } from '../../../infrastructure/services'

interface PostWithTimestamp extends Post {
  createdAt: string
}

interface LocalPostsState {
  posts: PostWithTimestamp[]
  isLoaded: boolean
}

const initialState: LocalPostsState = {
  posts: [],
  isLoaded: false
}

export const localPostsSlice = createSlice({
  name: 'localPosts',
  initialState,
  reducers: {
    loadLocalPosts: state => {
      const posts = localPostsService.loadLocalPosts()
      state.posts = posts
      state.isLoaded = true
    },
    addLocalPost: (state, action: PayloadAction<Post>) => {
      const newPost: PostWithTimestamp = {
        ...action.payload,
        createdAt: new Date().toISOString()
      }
      state.posts.unshift(newPost) // Adiciona no início do array
      localPostsService.saveLocalPosts(state.posts)
    },
    removeLocalPost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload)
      localPostsService.saveLocalPosts(state.posts)
    },
    clearLocalPosts: state => {
      state.posts = []
      localPostsService.clearLocalPosts()
    },
    removeLocalPostsByApiIds: (state, action: PayloadAction<number[]>) => {
      state.posts = state.posts.filter(
        localPost => !action.payload.includes(localPost.id)
      )
      localPostsService.saveLocalPosts(state.posts)
    }
  }
})

export const {
  loadLocalPosts,
  addLocalPost,
  removeLocalPost,
  clearLocalPosts,
  removeLocalPostsByApiIds
} = localPostsSlice.actions

export default localPostsSlice.reducer
