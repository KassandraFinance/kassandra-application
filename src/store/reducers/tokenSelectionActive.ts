import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = false

export const tokenSelectionActiveSlice = createSlice({
  name: 'tokenSelectionActive',
  initialState,
  reducers: {
    setTokenSelectionActive: (
      state: boolean,
      action: PayloadAction<boolean>
    ) => {
      return action.payload
    }
  }
})

export const { setTokenSelectionActive } = tokenSelectionActiveSlice.actions

export default tokenSelectionActiveSlice.reducer
