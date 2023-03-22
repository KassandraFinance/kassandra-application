import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Big from 'big.js'

type TokenType = {
  id: string,
  name: string,
  symbol: string,
  logo: string,
  image: string,
  decimals: number
}

export type AssetType = {
  weight_normalized: string,
  token: {
    decimals: number,
    id: string,
    logo?: string,
    name: string,
    symbol: string
  }
}

interface IAddAssetsProps {
  token: TokenType;
  poolId: string;
  tvl: string;
  controller: string;
  chainId: number;
  liquidit: {
    amount: string,
    allocation: string,
    price: number
  };
  weights: (AssetType & { newWeight: string })[];
}

const initialState: IAddAssetsProps = {
  token: {
    id: '',
    name: '',
    logo: '',
    symbol: '',
    image: '',
    decimals: 18
  },
  poolId: '',
  tvl: '',
  controller: '',
  chainId: 5,
  liquidit: {
    amount: '',
    allocation: '',
    price: 0
  },
  weights: []
}

export const poolCreationSlice = createSlice({
  name: 'addAssets',
  initialState,
  reducers: {
    setSelectedToken: (state, action: PayloadAction<TokenType>) => {
      state.token = action.payload
    },
    setAmount: (state, action: PayloadAction<string>) => {
      const balanceInUsd = Big(action.payload).mul(state.liquidit.price)

      const allocationTokenAdd = balanceInUsd
        .div(balanceInUsd.plus(state.tvl))
        .mul(100)

      state.liquidit.amount = action.payload
      state.liquidit.allocation = allocationTokenAdd.toString()
    },
    setAllocation: (state, action: PayloadAction<string>) => {
      const allocationTokenAdd = Big(action.payload).div(100)
      const balanceInUsd = allocationTokenAdd
        .mul(state.tvl)
        .div(Big(Big(1).minus(allocationTokenAdd)))
      const balance = balanceInUsd.div(state.liquidit.price)

      state.liquidit.allocation = action.payload
      state.liquidit.amount = balance.toString()
    },
    setTVL: (state, action: PayloadAction<string>) => {
      state.tvl = action.payload
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.liquidit.price = action.payload
    },
    setWeights: (
      state,
      action: PayloadAction<(AssetType & { newWeight: string })[]>
    ) => {
      state.weights = action.payload
    },
    setController: (state, action: PayloadAction<string>) => {
      state.controller = action.payload
    }
  }
})

export const {
  setSelectedToken,
  setAmount,
  setAllocation,
  setTVL,
  setPrice,
  setWeights,
  setController
} = poolCreationSlice.actions

export default poolCreationSlice.reducer
