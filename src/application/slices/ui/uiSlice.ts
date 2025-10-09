import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  loading: boolean
  showSkeleton: boolean
  modals: {
    postDetails: boolean
    createPost: boolean
  }
}

const initialState: UiState = {
  loading: false,
  showSkeleton: true,
  modals: {
    postDetails: false,
    createPost: false
  }
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setShowSkeleton: (state, action: PayloadAction<boolean>) => {
      state.showSkeleton = action.payload
    },
    openModal: (state, action: PayloadAction<keyof UiState['modals']>) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action: PayloadAction<keyof UiState['modals']>) => {
      state.modals[action.payload] = false
    }
  }
})

export const { setLoading, setShowSkeleton, openModal, closeModal } =
  uiSlice.actions

export default uiSlice.reducer
