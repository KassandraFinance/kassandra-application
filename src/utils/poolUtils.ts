import Big from 'big.js'
import { JsonRpcProvider } from 'ethers'

import { ERC20 } from '../hooks/useERC20'
import { underlyingAssetsInfo } from '../store/reducers/pool'

import { NATIVE_ADDRESS, networks } from '../constants/tokenAddresses'

export const checkTokenWithHigherLiquidityPool = (
  underlyingAssets: underlyingAssetsInfo[]
) => {
  const tokensNormalized = underlyingAssets.map(item => {
    const normalizedWeightToken = item.weight_normalized

    return {
      address: item.token.id,
      normalizedWeight: normalizedWeightToken,
      isWrap: item.token.is_wrap_token
    }
  })

  const tokensNormalizedWithSort = tokensNormalized.sort(function (a, b) {
    if (a.normalizedWeight > b.normalizedWeight) {
      return -1
    }
    if (a.normalizedWeight < b.normalizedWeight) {
      return 1
    }
    return 0
  })

  return tokensNormalizedWithSort[0] || {}
}

export const getTokenWrapped = (
  underlyingAssets: underlyingAssetsInfo[],
  address: string
) => {
  const tokenAddresses = underlyingAssets.find(
    item =>
      address.toLowerCase() === item.token.wraps?.id.toLowerCase() ||
      address.toLowerCase() === item.token.id.toLowerCase()
  )
  if (tokenAddresses?.token.wraps) {
    return {
      token: {
        id: tokenAddresses.token.wraps.id,
        decimals: tokenAddresses.token.wraps.decimals
      },
      weight_normalized: tokenAddresses.weight_normalized
    }
  } else if (tokenAddresses) {
    return {
      token: {
        id: tokenAddresses.token.id,
        decimals: tokenAddresses.token.decimals
      },
      weight_normalized: tokenAddresses.weight_normalized ?? '0'
    }
  }
}

// eslint-disable-next-line prettier/prettier
export const checkTokenInThePool = (
  underlyingAssets: underlyingAssetsInfo[],
  address: string
) => {
  const tokensChecked = underlyingAssets.map(item => {
    if (item.token.is_wrap_token === 1) {
      return {
        address: item.token.wraps.id.toLowerCase(),
        is_wraps: 1,
        yrt: item.token.id
      }
    }
    return {
      address: item.token.id.toLowerCase(),
      is_wraps: 0,
      yrt: ''
    }
  })

  return tokensChecked.find(token => {
    if (token.address === address.toLowerCase()) {
      return token
    }
  })
}

export const getBalanceToken = async (
  address: string,
  userWalletAddress: string,
  chainId: number,
  addressWrapped?: string
) => {
  if (address === NATIVE_ADDRESS || address === addressWrapped) {
    const readProvider = new JsonRpcProvider(networks[chainId].rpc)
    const balanceToken = await readProvider.getBalance(userWalletAddress)

    return Big(balanceToken.toString())
  }

  const { balance } = await ERC20(address, networks[chainId].rpc)
  const balanceToken = await balance(userWalletAddress).then(newBalance =>
    Big(newBalance.toString())
  )

  return balanceToken
}

export const decimalToBN = (value: string, decimals?: number) => {
  const decimalsNum = decimals ?? 18
  const values = value.split('.')

  const paddedRight = `${values[0]}${`${values[1] || 0}${'0'.repeat(
    decimalsNum
  )}`.slice(0, decimalsNum)}`

  return paddedRight
}
