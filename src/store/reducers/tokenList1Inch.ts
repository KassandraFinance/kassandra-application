import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITokenList1InchProps {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

const initialState: ITokenList1InchProps[] = [
  {
    symbol: '',
    name: '',
    address: '',
    decimals: 0,
    logoURI: ''
  }
]

export const tokenList1InchSlice = createSlice({
  name: 'tokenList1Inch',
  initialState,
  reducers: {
    setTokenList1Inch: (
      state: ITokenList1InchProps[],
      action: PayloadAction<ITokenList1InchProps[]>
    ) => {
      return action.payload
    }
  }
})

export const { setTokenList1Inch } = tokenList1InchSlice.actions

export default tokenList1InchSlice.reducer
