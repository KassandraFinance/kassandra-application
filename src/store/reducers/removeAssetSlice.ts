import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Big from 'big.js'

type TokenType = {
  address: string,
  name: string,
  symbol: string,
  logo: string,
  balance: number,
  balanceUSD?: number,
  weight: string,
  decimals: number
}

export type AssetType = {
  weight_normalized: string,
  newWeight: string,
  token: {
    decimals: number,
    id: string,
    logo: string,
    name: string,
    symbol: string
  }
}

export type ILpNeededProps = {
  value: Big,
  balance: Big
}

export type IPoolInfoProps = {
  address: string,
  poolPrice: number,
  tvl: number
}

interface IRemoveAssetProps {
  poolTokensList: TokenType[];
  weights: AssetType[];
  tokenSelection: TokenType;
  lpNeeded: ILpNeededProps;
}

const initialState: IRemoveAssetProps = {
  poolTokensList: [],
  weights: [],
  tokenSelection: {
    address: '',
    name: '',
    symbol: '',
    logo: '',
    balance: 0,
    balanceUSD: 0,
    weight: '',
    decimals: 0
  },
  lpNeeded: {
    value: Big(0),
    balance: Big(0)
  }
}

export const poolCreationSlice = createSlice({
  name: 'removeAsset',
  initialState,
  reducers: {
    setTokenSelection: (state, action: PayloadAction<TokenType>) => {
      state.tokenSelection = action.payload
    },
    setPoolTokensList: (state, action: PayloadAction<TokenType[]>) => {
      state.poolTokensList = action.payload
    },
    setWeight: (state, action: PayloadAction<AssetType[]>) => {
      state.weights = action.payload
    },
    setLpNeeded: (state, action: PayloadAction<ILpNeededProps>) => {
      state.lpNeeded = action.payload
    }
  }
})

export const { setTokenSelection, setPoolTokensList, setWeight, setLpNeeded } =
  poolCreationSlice.actions

export default poolCreationSlice.reducer
