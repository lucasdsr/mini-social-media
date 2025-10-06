import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../../models'

interface PostsState {
  selectedPost: Post | null
  filters: {
    searchTerm: string
    userId: number | null
    engagementThreshold: number
  }
  sortBy: 'date' | 'engagement' | 'title'
}

const initialState: PostsState = {
  selectedPost: null,
  filters: {
    searchTerm: '',
    userId: null,
    engagementThreshold: 0
  },
  sortBy: 'date'
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload
    },
    setUserIdFilter: (state, action: PayloadAction<number | null>) => {
      state.filters.userId = action.payload
    },
    setEngagementThreshold: (state, action: PayloadAction<number>) => {
      state.filters.engagementThreshold = action.payload
    },
    setSortBy: (
      state,
      action: PayloadAction<'date' | 'engagement' | 'title'>
    ) => {
      state.sortBy = action.payload
    },
    clearFilters: state => {
      state.filters = initialState.filters
    }
  }
})

export const {
  setSelectedPost,
  setSearchTerm,
  setUserIdFilter,
  setEngagementThreshold,
  setSortBy,
  clearFilters
} = postsSlice.actions

export default postsSlice.reducer
