import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Big from 'big.js'
import BigNumber from 'bn.js'

import { CoinGeckoResponseType } from '../../templates/Manage/CreatePool/AddLiquidity'

export type TokenType = {
  icon: string,
  name: string,
  symbol: string,
  url: string,
  address: string,
  decimals: number,
  allocation: number,
  amount: Big,
  isLocked: boolean
}

export type PoolData = {
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
  }[],
  tokensBalance?: {
    [key: string]: BigNumber
  },
  fees?: {
    [key: string]: {
      isChecked: boolean,
      feeRate?: number,
      brokerCommision?: number,
      managerShare?: number
    }
  }
}

export interface IPoolCreationDataState {
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

function handleLiquidity(
  tokenInputLiquidity: Big,
  inputToken: string,
  tokensArr: TokenType[],
  tokenPriceList: CoinGeckoResponseType
) {
  let inputAddress = ''
  let tokenInputAllocation = 0
  for (const token of tokensArr) {
    if (token.symbol === inputToken) {
      inputAddress = token.address
      tokenInputAllocation = token.allocation
    }
  }

  const tokenInputDolar = tokenInputLiquidity.mul(
    Big(tokenPriceList[inputAddress].usd)
  )

  const newArr = tokensArr.map(token => {
    if (token.symbol === inputToken) {
      return {
        ...token,
        amount: tokenInputLiquidity
      }
    }

    const tokenRealocatedLiquidity = tokenInputDolar
      .mul(token.allocation)
      .div(tokenInputAllocation)

    const liquidityInToken = tokenRealocatedLiquidity.div(
      tokenPriceList[token.address].usd
    )
    return { ...token, amount: liquidityInToken }
  })

  return newArr
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
    privateAddressList: [],
    tokensBalance: {},
    fees: {
      depositFee: {
        isChecked: false,
        feeRate: 0
      },
      refferalFee: {
        isChecked: false,
        brokerCommision: 0,
        managerShare: 0
      },
      managementFee: {
        isChecked: false,
        feeRate: 0
      }
    }
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
    },
    setLiquidity: (
      state,
      action: PayloadAction<{
        token: string,
        liquidity: Big,
        tokenPriceList: CoinGeckoResponseType
      }>
    ) => {
      const tokensArr = state.createPoolData.tokens
        ? state.createPoolData.tokens
        : []

      const newLiquidity = handleLiquidity(
        action.payload.liquidity,
        action.payload.token,
        tokensArr,
        action.payload.tokenPriceList
      )
      state.createPoolData.tokens = newLiquidity
    },
    setToggle: (state, action: PayloadAction<string>) => {
      const fessList = state.createPoolData.fees
        ? state.createPoolData.fees
        : {}

      if (
        action.payload === 'depositFee' &&
        fessList[action.payload].isChecked
      ) {
        state.createPoolData.fees = {
          ...fessList,
          [action.payload]: {
            feeRate: 0,
            isChecked: false
          },
          refferalFee: {
            isChecked: false,
            brokerCommision: 0,
            managerShare: 0
          }
        }
      } else if (
        action.payload === 'refferalFee' &&
        fessList[action.payload].isChecked
      ) {
        state.createPoolData.fees = {
          ...fessList,
          refferalFee: {
            isChecked: false,
            brokerCommision: 0,
            managerShare: 0
          }
        }
      } else if (
        action.payload === 'managementFee' &&
        fessList[action.payload].isChecked
      ) {
        state.createPoolData.fees = {
          ...fessList,
          managementFee: {
            isChecked: false,
            feeRate: 0
          }
        }
      } else {
        state.createPoolData.fees = {
          ...fessList,
          [action.payload]: {
            ...fessList[action.payload],
            isChecked: !fessList[action.payload].isChecked
          }
        }
      }
    },
    setFee: (
      state,
      action: PayloadAction<{ inputName: string, inputValue: number }>
    ) => {
      const fessList = state.createPoolData.fees
        ? state.createPoolData.fees
        : {}

      if (
        action.payload.inputName === 'depositFee' &&
        fessList.refferalFee.isChecked
      ) {
        state.createPoolData.fees = {
          ...fessList,
          [action.payload.inputName]: {
            ...fessList[action.payload.inputName],
            feeRate: action.payload.inputValue
          },
          refferalFee: {
            ...fessList.refferalFee,
            brokerCommision: action.payload.inputValue / 2,
            managerShare: action.payload.inputValue / 2
          }
        }
      } else {
        state.createPoolData.fees = {
          ...fessList,
          [action.payload.inputName]: {
            ...fessList[action.payload.inputName],
            feeRate: action.payload.inputValue
          }
        }
      }
    },
    setRefferalFee: (
      state,
      action: PayloadAction<{ inputName: string, inputValue: number }>
    ) => {
      const fessList = state.createPoolData.fees
        ? state.createPoolData.fees
        : {}

      const depositFee = fessList.depositFee.feeRate
        ? fessList.depositFee.feeRate
        : 0

      if (action.payload.inputName === 'brokerCommision') {
        state.createPoolData.fees = {
          ...fessList,
          refferalFee: {
            ...fessList.refferalFee,
            [action.payload.inputName]: action.payload.inputValue,
            managerShare: depositFee - action.payload.inputValue
          }
        }
      } else {
        state.createPoolData.fees = {
          ...fessList,
          refferalFee: {
            ...fessList.refferalFee,
            [action.payload.inputName]: action.payload.inputValue,
            brokerCommision: depositFee - action.payload.inputValue
          }
        }
      }
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
  setAllocation,
  setLiquidity,
  setToggle,
  setFee,
  setRefferalFee
} = poolCreationSlice.actions

export default poolCreationSlice.reducer
