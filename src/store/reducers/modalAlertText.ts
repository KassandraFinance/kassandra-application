import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IModalAlerText {
  errorText: string | null
  solutionText?: string | null
  transactionData?: string | null
}

const initialState: IModalAlerText = {
  errorText: null,
  solutionText: null
}

export const modalAlertTextSlice = createSlice({
  name: 'modalAlerText',
  initialState,
  reducers: {
    setModalAlertText: (state, action: PayloadAction<IModalAlerText>) => {
      state.errorText = action.payload.errorText
      state.solutionText = action.payload.solutionText || null
      state.transactionData = action.payload.transactionData || null
    },
    removeModalAlertText: state => {
      state.errorText = null
      state.solutionText = null
      state.transactionData = null
    }
  }
})

export const { setModalAlertText, removeModalAlertText } =
  modalAlertTextSlice.actions

export default modalAlertTextSlice.reducer
