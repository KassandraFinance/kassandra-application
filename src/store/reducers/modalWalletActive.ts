import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = false

export const modalWalletActiveSlice = createSlice({
  name: 'modalWalletActive',
  initialState,
  reducers: {
    setModalWalletActive: (state: boolean, action: PayloadAction<boolean>) => {
      return action.payload
    }
  }
})

export const { setModalWalletActive } = modalWalletActiveSlice.actions

export default modalWalletActiveSlice.reducer
