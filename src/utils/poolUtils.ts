import { underlyingAssetsInfo } from '../store/reducers/pool'

export const checkTokenWithHigherLiquidityPool = (
  underlyingAssets: underlyingAssetsInfo[]
) => {
  const tokensNormalized = underlyingAssets.map(item => {
    const normalizedWeightToken = item.weight_normalized

    return {
      address: item.token.id,
      normalizedWeight: normalizedWeightToken
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
    item => item.token.id.toLocaleLowerCase() === address.toLocaleLowerCase()
  )

  if (tokenAddresses?.token.wraps) {
    return tokenAddresses?.token.wraps.id
  }

  return address
}

// eslint-disable-next-line prettier/prettier
export const checkTokenInThePool = (underlyingAssets: underlyingAssetsInfo[], address: string) => {
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
