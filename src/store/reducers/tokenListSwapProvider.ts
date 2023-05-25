import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ITokenListSwapProviderProps {
  symbol: string
  name: string
  address: string
  decimals: number
  logoURI: string
  tags?: string[]
}

const initialState: ITokenListSwapProviderProps[] = [
  {
    symbol: '',
    name: '',
    address: '',
    decimals: 0,
    logoURI: '',
    tags: []
  }
]

export const tokenListSwapProviderSlice = createSlice({
  name: 'tokenListSwapProvider',
  initialState,
  reducers: {
    setTokensSwapProvider: (
      state: ITokenListSwapProviderProps[],
      action: PayloadAction<ITokenListSwapProviderProps[]>
    ) => {
      return action.payload
    }
  }
})

export const { setTokensSwapProvider } = tokenListSwapProviderSlice.actions

export default tokenListSwapProviderSlice.reducer
