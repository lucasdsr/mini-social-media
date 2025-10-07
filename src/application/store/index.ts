import { configureStore } from '@reduxjs/toolkit'
import { postsSlice, localPostsSlice } from '../slices/posts'
import { uiSlice } from '../slices/ui'

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    localPosts: localPostsSlice.reducer,
    ui: uiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
