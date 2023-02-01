import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITokenSelectProps {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

const initialState = {
  address: '',
  decimals: 0,
  logoURI: '',
  name: '',
  symbol: ''
}

export const tokenSelect = createSlice({
  name: 'tokenSelect',
  initialState,
  reducers: {
    setTokenSelect: (
      state: ITokenSelectProps,
      action: PayloadAction<ITokenSelectProps>
    ) => {
      return action.payload
    }
  }
})

export const { setTokenSelect } = tokenSelect.actions
export default tokenSelect.reducer
