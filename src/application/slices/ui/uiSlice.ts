import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  loading: boolean
  modals: {
    postDetails: boolean
    createPost: boolean
  }
}

const initialState: UiState = {
  loading: false,
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
    openModal: (state, action: PayloadAction<keyof UiState['modals']>) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action: PayloadAction<keyof UiState['modals']>) => {
      state.modals[action.payload] = false
    }
  }
})

export const { setLoading, openModal, closeModal } = uiSlice.actions

export default uiSlice.reducer
