import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Big from 'big.js'

import { CoinsMetadataType } from '@/hooks/query/useTokensData'
import { VERSION_POOL_CREATE } from '@/constants/tokenAddresses'

export type TokenType = {
  icon: string
  name: string
  symbol: string
  url: string
  address: string
  decimals: number
  allocation: string
  amount: string
  isLocked: boolean
}

type MethodCreate = 'any-asset' | 'pool-assets'

export type TokenSelectProps = {
  address: string
  decimals: number | null | undefined
  logoURI: string
  name: string | null | undefined
  symbol: string | null | undefined
}

export type PoolData = {
  version: string
  id?: string
  txHash?: string
  termsAndConditions?: boolean
  network?: string
  networkId?: number
  poolName?: string
  poolSymbol?: string
  icon?: {
    image_preview: string
    image_file: unknown
  }
  strategy?: string
  privacy?: string
  tokens?: TokenType[]
  privateAddressList?: {
    address: string
  }[]
  fees?: {
    [key: string]: {
      isChecked: boolean
      feeRate?: string
      brokerCommision?: number
      managerShare?: number
    }
  }
  methodCreate: MethodCreate
  tokenIn: TokenSelectProps
  tokenInAmount: string
}

export interface IPoolCreationDataState {
  stepNumber: number
  isValid: boolean
  createPoolData: PoolData
}

function handleAllocation(
  tokensList: TokenType[],
  tokenAllocation?: { token: string; allocation: string }
) {
  const maxAllocation = Big(100)
  let allocationAmount = Big(0)
  let unlokedTokensAmount = 0

  for (const token of tokensList) {
    if (token.symbol !== tokenAllocation?.token) {
      if (token.isLocked === false) {
        unlokedTokensAmount = unlokedTokensAmount + 1
      }

      if (token.isLocked === true) {
        allocationAmount = allocationAmount.plus(token.allocation)
      }
    } else {
      allocationAmount = allocationAmount.plus(tokenAllocation.allocation)
    }
  }

  const allocationValue =
    unlokedTokensAmount === 0
      ? 0
      : maxAllocation.minus(allocationAmount).div(unlokedTokensAmount)
  const fixedAllocationValue = Big(allocationValue.toFixed(2))
  const teste = maxAllocation.minus(
    fixedAllocationValue.mul(unlokedTokensAmount).plus(allocationAmount)
  )

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
          allocation: fixedAllocationValue.plus(teste).toFixed()
        }
      }

      return {
        ...token,
        allocation: fixedAllocationValue.toFixed()
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

export function handleLiquidity(
  tokenInputLiquidity: string,
  inputToken: string,
  tokensArr: TokenType[],
  tokenPriceList: CoinsMetadataType
) {
  let inputAddress = ''
  let tokenInputAllocation = '0'
  for (const token of tokensArr) {
    if (token.symbol === inputToken) {
      inputAddress = token.address
      tokenInputAllocation = token.allocation
    }
  }

  const tokenInputDolar = Big(tokenInputLiquidity).mul(
    Big(tokenPriceList[inputAddress.toLowerCase()]?.usd ?? 0)
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
    return { ...token, amount: liquidityInToken.toFixed() }
  })

  return newArr
}

const initialState: IPoolCreationDataState = {
  stepNumber: 0,
  isValid: false,
  createPoolData: {
    version: VERSION_POOL_CREATE,
    methodCreate: 'any-asset',
    tokenIn: {
      address: '',
      decimals: 0,
      logoURI: '',
      name: '',
      symbol: ''
    },
    tokenInAmount: '0',
    network: '',
    networkId: 0,
    poolName: '',
    termsAndConditions: false,
    poolSymbol: '',
    icon: {
      image_preview: '',
      image_file: null
    },
    strategy: '',
    privacy: 'public',
    tokens: [],
    privateAddressList: [],
    fees: {
      depositFee: {
        isChecked: false,
        feeRate: '0'
      },
      refferalFee: {
        isChecked: false,
        brokerCommision: 0,
        managerShare: 0
      },
      managementFee: {
        isChecked: false,
        feeRate: '0'
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
    setPoolData: (state, action: PayloadAction<Partial<PoolData>>) => {
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
      action: PayloadAction<{ token: string; allocation: string }>
    ) => {
      const tokensArr = state.createPoolData.tokens
        ? state.createPoolData.tokens
        : []
      state.createPoolData.tokens = handleAllocation(tokensArr, action.payload)
    },
    setLiquidity: (
      state,
      action: PayloadAction<{
        token: string
        liquidity: string
        tokenPriceList: CoinsMetadataType
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
      const feesList = state.createPoolData.fees
        ? state.createPoolData.fees
        : {}

      if (
        action.payload === 'depositFee' &&
        feesList[action.payload].isChecked
      ) {
        state.createPoolData.fees = {
          ...feesList,
          [action.payload]: {
            feeRate: '0',
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
        !feesList[action.payload].isChecked
      ) {
        const feeRate = feesList.depositFee?.feeRate
          ? feesList.depositFee?.feeRate
          : 0
        const fee = Number(feeRate) / 2
        state.createPoolData.fees = {
          ...feesList,
          refferalFee: {
            isChecked: true,
            brokerCommision: fee,
            managerShare: fee
          }
        }
      } else if (
        action.payload === 'refferalFee' &&
        feesList[action.payload].isChecked
      ) {
        state.createPoolData.fees = {
          ...feesList,
          refferalFee: {
            isChecked: false,
            brokerCommision: 0,
            managerShare: 0
          }
        }
      } else if (
        action.payload === 'managementFee' &&
        feesList[action.payload].isChecked
      ) {
        state.createPoolData.fees = {
          ...feesList,
          managementFee: {
            isChecked: false,
            feeRate: '0'
          }
        }
      } else {
        state.createPoolData.fees = {
          ...feesList,
          [action.payload]: {
            ...feesList[action.payload],
            isChecked: !feesList[action.payload].isChecked
          }
        }
      }
    },
    setFee: (
      state,
      action: PayloadAction<{ inputName: string; inputValue: string }>
    ) => {
      const feesList = state.createPoolData.fees
        ? state.createPoolData.fees
        : {}

      if (
        action.payload.inputName === 'depositFee' &&
        feesList.refferalFee.isChecked
      ) {
        state.createPoolData.fees = {
          ...feesList,
          [action.payload.inputName]: {
            ...feesList[action.payload.inputName],
            feeRate: action.payload.inputValue
          },
          refferalFee: {
            ...feesList.refferalFee,
            brokerCommision: Number(action.payload.inputValue) / 2,
            managerShare: Number(action.payload.inputValue) / 2
          }
        }
      } else {
        state.createPoolData.fees = {
          ...feesList,
          [action.payload.inputName]: {
            ...feesList[action.payload.inputName],
            feeRate: action.payload.inputValue
          }
        }
      }
    },
    setRefferalFee: (
      state,
      action: PayloadAction<{ inputName: string; inputValue: number }>
    ) => {
      const fessList = state.createPoolData.fees
        ? state.createPoolData.fees
        : {}

      const depositFee = fessList.depositFee.feeRate
        ? fessList.depositFee.feeRate
        : '0'

      if (action.payload.inputName === 'brokerCommision') {
        state.createPoolData.fees = {
          ...fessList,
          refferalFee: {
            ...fessList.refferalFee,
            [action.payload.inputName]: action.payload.inputValue,
            managerShare: parseFloat(
              (parseFloat(depositFee) - action.payload.inputValue).toFixed(2)
            )
          }
        }
      } else {
        state.createPoolData.fees = {
          ...fessList,
          refferalFee: {
            ...fessList.refferalFee,
            [action.payload.inputName]: action.payload.inputValue,
            brokerCommision: parseFloat(
              (parseFloat(depositFee) - action.payload.inputValue).toFixed(2)
            )
          }
        }
      }
    },
    setTermsAndConditions: state => {
      state.createPoolData.termsAndConditions =
        !state.createPoolData.termsAndConditions
    },
    setClear: state => {
      state.createPoolData = {
        version: VERSION_POOL_CREATE,
        methodCreate: 'any-asset',
        tokenIn: {
          address: '',
          decimals: 0,
          logoURI: '',
          name: '',
          symbol: ''
        },
        tokenInAmount: '0',
        network: '',
        networkId: 0,
        poolName: '',
        termsAndConditions: false,
        poolSymbol: '',
        icon: {
          image_preview: '',
          image_file: null
        },
        strategy: '',
        privacy: 'public',
        tokens: [],
        privateAddressList: [],
        fees: {
          depositFee: {
            isChecked: false,
            feeRate: '0'
          },
          refferalFee: {
            isChecked: false,
            brokerCommision: 0,
            managerShare: 0
          },
          managementFee: {
            isChecked: false,
            feeRate: '0'
          }
        }
      }
    },
    setToFirstStep: state => {
      state.stepNumber = 0
    },
    setMethodCreate: (state, action: PayloadAction<MethodCreate>) => {
      state.createPoolData.methodCreate = action.payload
    },
    setTokenIn: (state, action: PayloadAction<TokenSelectProps>) => {
      state.createPoolData.tokenIn = action.payload
    },
    setTokenInAmount: (state, action: PayloadAction<string>) => {
      state.createPoolData.tokenInAmount = action.payload
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
  setRefferalFee,
  setTermsAndConditions,
  setClear,
  setToFirstStep,
  setMethodCreate,
  setTokenIn,
  setTokenInAmount
} = poolCreationSlice.actions

export default poolCreationSlice.reducer
