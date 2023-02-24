import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TokenType = {
  id: string,
  name: string,
  symbol: string,
  image: string,
  decimals: number
}

interface IAddAssetsProps {
  token: TokenType;
  poolId: string;
  liquidit: {
    amount: string,
    allocation: string
  };
}

const initialState: IAddAssetsProps = {
  token: {
    id: '',
    name: '',
    symbol: '',
    image: '',
    decimals: 18
  },
  poolId: '50x88c7b8479b0f95eaa5c97481a3dd2c8890a63bfb0001000000000000000005d4',
  liquidit: {
    amount: '',
    allocation: ''
  }
}

export const poolCreationSlice = createSlice({
  name: 'addAssets',
  initialState,
  reducers: {
    setSelectedToken: (state, action: PayloadAction<TokenType>) => {
      state.token = action.payload
    },
    setPoolId: (state, action: PayloadAction<string>) => {
      state.poolId = action.payload
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.liquidit.amount = action.payload
    },
    setAllocation: (state, action: PayloadAction<string>) => {
      state.liquidit.allocation = action.payload
    }
  }
})

export const { setSelectedToken, setPoolId, setAmount, setAllocation } =
  poolCreationSlice.actions

export default poolCreationSlice.reducer
