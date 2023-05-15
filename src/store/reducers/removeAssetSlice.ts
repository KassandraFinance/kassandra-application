import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Big from 'big.js'

type TokenType = {
  address: string
  name: string
  symbol: string
  logo: string | undefined
  balance: string
  weight: string
  decimals: number
}

interface ITokenSelectionProps extends TokenType {
  balanceInUSD: string
}

export type AssetType = {
  weight_normalized: string
  newWeight: string
  token: {
    decimals: number
    id: string
    logo: string | undefined
    name: string
    symbol: string
  }
}

export type ILpNeededProps = {
  value: Big
  valueInDollar: Big
  balanceInWallet: Big
}

interface IRemoveAssetProps {
  poolTokensList: TokenType[]
  weights: AssetType[]
  tokenSelection: ITokenSelectionProps
  lpNeeded: ILpNeededProps
}

const initialState: IRemoveAssetProps = {
  poolTokensList: [],
  weights: [],
  tokenSelection: {
    address: '',
    name: '',
    symbol: '',
    logo: '',
    balance: '',
    balanceInUSD: '',
    weight: '0',
    decimals: 0
  },
  lpNeeded: {
    value: Big(0),
    valueInDollar: Big(0),
    balanceInWallet: Big(0)
  }
}

export const poolCreationSlice = createSlice({
  name: 'removeAsset',
  initialState,
  reducers: {
    setTokenSelection: (state, action: PayloadAction<ITokenSelectionProps>) => {
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
