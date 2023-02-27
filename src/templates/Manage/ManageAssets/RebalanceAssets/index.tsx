import React from 'react'
// import useSWR from 'swr'
// import request from 'graphql-request'

// import { GET_INFO_POOL_MANAGER } from './graphql'
// import { BACKEND_KASSANDRA } from '../../../../constants/tokenAddresses'

import RebalanceReview from './RebalanceReview'
import SetNewWeights from './SetNewWeights'
import RebalanceSuccess from './RebalanceSuccess'

import * as S from './styles'

const RebalanceAssets = () => {
  // const poolId =
  //   '50x88c7b8479b0f95eaa5c97481a3dd2c8890a63bfb0001000000000000000005d4'
  // const { data } = useSWR([GET_INFO_POOL_MANAGER], query =>
  //   request(BACKEND_KASSANDRA, query, {
  //     id: poolId
  //   })
  // )

  return (
    <S.RebalanceAssets>
      <SetNewWeights />
      {/* <RebalanceReview /> */}
      {/* <RebalanceSuccess time={30} pool="asd" /> */}
    </S.RebalanceAssets>
  )
}

export default RebalanceAssets

export const mockCoinsList = [
  {
    imageUrl:
      'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    name: 'Polygon ',
    symbol: 'MATIC',
    currentAmount: 1000,
    currentAmountUSD: 2940,
    allocation: 20,
    newAmount: 1000,
    newAmountUSD: 2940
  },
  {
    imageUrl:
      'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700',
    name: 'Chainlink',
    symbol: 'LINK',
    currentAmount: 10000,
    currentAmountUSD: 29400,
    allocation: 60,
    newAmount: 100000,
    newAmountUSD: 29400
  },
  {
    imageUrl:
      'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
    name: 'Uniswap',
    symbol: 'UNI',
    currentAmount: 10,
    currentAmountUSD: 2940,
    allocation: 20,
    newAmount: 15,
    newAmountUSD: 2940
  },
  {
    imageUrl:
      'https://assets.coingecko.com/coins/images/22918/small/kacy.png?1643459818',
    name: 'Kassandra',
    symbol: 'KACY',
    currentAmount: 10000,
    currentAmountUSD: 440,
    allocation: 70,
    newAmount: 6000,
    newAmountUSD: 40
  },
  {
    imageUrl:
      'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    symbol: 'AVAX',
    currentAmount: 30,
    currentAmountUSD: 290,
    allocation: 1,
    newAmount: 1000,
    newAmountUSD: 29440
  }
]
