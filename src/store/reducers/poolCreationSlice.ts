import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PoolData = {
  network?: string,
  poolName?: string,
  poolSymbol?: string,
  icon?: {
    image_preview: string,
    image_file: unknown
  },
  strategy?: string,
  privacy?: string,
  tokens?: [
    {
      icon: string,
      symbol: string,
      address: string,
      allocation: string,
      amount: string
    }
  ],
  privateAddressList?: {
    address: string
  }[]
}

interface IPoolCreationDataState {
  stepNumber: number;
  isValid: boolean;
  createPoolData: PoolData;
}

const initialState: IPoolCreationDataState = {
  stepNumber: 0,
  isValid: false,
  createPoolData: {
    network: '',
    poolName: '',
    poolSymbol: '',
    icon: {
      image_preview: '',
      image_file: null
    },
    strategy: '',
    privacy: 'public',
    tokens: [
      {
        icon: '',
        symbol: '',
        address: '',
        allocation: '',
        amount: ''
      }
    ],
    privateAddressList: []
  }
}

export const poolCreationSlice = createSlice({
  name: 'poolCreationData',
  initialState,
  reducers: {
    setNextStepNumber: state => {
      state.stepNumber = state.stepNumber + 1
      state.isValid = false
    },
    setBackStepNumber: state => {
      state.stepNumber = state.stepNumber - 1
    },
    setIsValid: (state, action: PayloadAction<boolean>) => {
      state.isValid = action.payload
    },
    setPoolData: (state, action: PayloadAction<PoolData>) => {
      state.createPoolData = {
        ...state.createPoolData,
        ...action.payload
      }
    },
    setPrivateAddress: (state, action: PayloadAction<{ address: string }>) => {
      if (
        state.createPoolData.privateAddressList?.some(
          wallet => wallet.address === action.payload.address
        )
      ) {
        state.createPoolData.privateAddressList
      } else {
        state.createPoolData.privateAddressList?.push(action.payload)
      }
    },
    removePrivateAddress: (state, action: PayloadAction<string>) => {
      state.createPoolData.privateAddressList =
        state.createPoolData.privateAddressList?.filter(
          wallett => wallett.address !== action.payload
        )
    },
    setTokens: (
      state,
      action: PayloadAction<{
        icon: string,
        symbol: string,
        address: string,
        allocation: string,
        amount: string
      }>
    ) => {
      state.createPoolData.tokens?.push(action.payload)
    }
  }
})

export const {
  setBackStepNumber,
  setNextStepNumber,
  setIsValid,
  setPoolData,
  setPrivateAddress,
  removePrivateAddress,
  setTokens
} = poolCreationSlice.actions

export default poolCreationSlice.reducer
