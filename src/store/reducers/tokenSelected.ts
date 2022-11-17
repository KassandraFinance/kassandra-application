import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = false

export const tokenSelectedSlice = createSlice({
  name: 'tokenSelected',
  initialState,
  reducers: {
    setTokenSelected: (state: boolean, action: PayloadAction<boolean>) => {
      return action.payload
    }
  }
})

export const { setTokenSelected } = tokenSelectedSlice.actions

export default tokenSelectedSlice.reducer
