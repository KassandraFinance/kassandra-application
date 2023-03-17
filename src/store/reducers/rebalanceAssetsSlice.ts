import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Big from 'big.js'

export enum lockToken {
  BLOCKED,
  UNBLOCKED
}

type INewTokensWeights = {
  newWeight: Big,
  newAmount: Big,
  newAmountUSD: Big,
  lockPercentage: lockToken,
  alreadyCalculated: boolean
}

export type AssetType = {
  currentWeight: Big,
  currentAmount: Big,
  currentAmountUSD: Big,
  token: {
    address: string,
    decimals: number,
    id: string,
    logo: string,
    name: string,
    symbol: string
  }
}

export type IPoolInfoProps = {
  id: string,
  name: string,
  symbol: string,
  controller: string,
  chainLogo: string,
  logo: string,
  chainId: number,
  address: string
}

export type IPeriodProps = {
  periodSelected: number
}

interface IRebalanceAssetsProps {
  poolTokensList: AssetType[];
  poolInfo: IPoolInfoProps;
  periodSelect: number;
  totalWeight: Big;
  newTokensWights: Record<string, INewTokensWeights>;
}

const initialState: IRebalanceAssetsProps = {
  poolTokensList: [],
  poolInfo: {
    id: '',
    name: '',
    symbol: '',
    controller: '',
    chainLogo: '',
    logo: '',
    chainId: 0,
    address: ''
  },
  newTokensWights: {
    ['']: {
      newWeight: Big(0),
      newAmount: Big(0),
      newAmountUSD: Big(0),
      lockPercentage: lockToken.UNBLOCKED,
      alreadyCalculated: false
    }
  },
  totalWeight: Big(0),
  periodSelect: 0
}

export const rebalanceAssetsSlice = createSlice({
  name: 'rebalanceAssets',
  initialState,
  reducers: {
    setPoolInfo: (state, action: PayloadAction<IPoolInfoProps>) => {
      state.poolInfo = action.payload
    },
    setPoolTokensList: (state, action: PayloadAction<AssetType[]>) => {
      state.poolTokensList = action.payload
    },
    setPeriodSelect: (state, action: PayloadAction<number>) => {
      state.periodSelect = action.payload
    },
    setNewTokensWights: (
      state,
      action: PayloadAction<Record<string, INewTokensWeights>>
    ) => {
      state.newTokensWights = action.payload
    },
    setTotalWeight: (state, action: PayloadAction<Big>) => {
      state.totalWeight = action.payload
    }
  }
})

export const {
  setPoolInfo,
  setPoolTokensList,
  setPeriodSelect,
  setNewTokensWights,
  setTotalWeight
} = rebalanceAssetsSlice.actions

export default rebalanceAssetsSlice.reducer
