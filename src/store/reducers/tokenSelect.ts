import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ITokenSelectProps {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

const initialState = {
  address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  decimals: 18,
  logoURI:
    'https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png',
  name: 'Avalanche',
  symbol: 'AVAX'
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
