import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TokenType = {
  icon: string,
  name: string,
  symbol: string,
  address: string,
  allocation: number,
  amount: number,
  isLocked: boolean
}

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
  tokens?: TokenType[],
  privateAddressList?: {
    address: string
  }[]
}

interface IPoolCreationDataState {
  stepNumber: number;
  isValid: boolean;
  createPoolData: PoolData;
}

function handleAllocation(
  tokensList: TokenType[],
  tokenAllocation?: { token: string, allocation: number }
) {
  const maxAllocation = 100
  let allocationAmount = 0
  let unlokedTokensAmount = 0

  for (const token of tokensList) {
    if (token.symbol !== tokenAllocation?.token) {
      if (token.isLocked === false) {
        unlokedTokensAmount = unlokedTokensAmount + 1
      }

      if (token.isLocked === true) {
        allocationAmount = allocationAmount + token.allocation
      }
    } else {
      allocationAmount = allocationAmount + tokenAllocation.allocation
    }
  }

  const allocationValue =
    (maxAllocation - allocationAmount) / unlokedTokensAmount
  const fixedAllocationValue = Number(allocationValue.toFixed(2))
  const teste =
    maxAllocation -
    (fixedAllocationValue * unlokedTokensAmount + allocationAmount)

  let isFirstUnlocked = true
  const newTokensList = tokensList.map(token => {
    if (token.symbol !== tokenAllocation?.token) {
      if (token.isLocked === true) {
        return token
      }

      if (isFirstUnlocked) {
        isFirstUnlocked = false
        return {
          ...token,
          allocation: fixedAllocationValue + teste
        }
      }

      return {
        ...token,
        allocation: fixedAllocationValue
      }
    } else {
      return {
        ...token,
        allocation: tokenAllocation.allocation
      }
    }
  })

  return newTokensList
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
    tokens: [],
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
    setTokens: (state, action: PayloadAction<TokenType>) => {
      if (
        state.createPoolData.tokens?.some(
          token => token.symbol === action.payload.symbol
        )
      ) {
        const tokensList = state.createPoolData.tokens?.filter(
          token => token.symbol !== action.payload.symbol
        )
        state.createPoolData.tokens = handleAllocation(tokensList)
      } else {
        const tokensArr = state.createPoolData.tokens
          ? state.createPoolData.tokens
          : []
        const tokensList: TokenType[] = [...tokensArr, action.payload]
        state.createPoolData.tokens = handleAllocation(tokensList)
      }
    },
    setTokenLock: (state, action: PayloadAction<string>) => {
      const tokensArr = state.createPoolData.tokens
        ? state.createPoolData.tokens
        : []
      const tokensLinst = tokensArr.map(token => {
        if (token.symbol === action.payload) {
          return {
            ...token,
            isLocked: !token.isLocked
          }
        }
        return token
      })

      state.createPoolData.tokens = handleAllocation(tokensLinst)
    },
    setAllocation: (
      state,
      action: PayloadAction<{ token: string, allocation: number }>
    ) => {
      const tokensArr = state.createPoolData.tokens
        ? state.createPoolData.tokens
        : []
      state.createPoolData.tokens = handleAllocation(tokensArr, action.payload)
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
  setTokens,
  setTokenLock,
  setAllocation
} = poolCreationSlice.actions

export default poolCreationSlice.reducer
