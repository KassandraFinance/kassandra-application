import React from 'react'
import useSWR from 'swr'
import request from 'graphql-request'

import TokenRemoval from './TokenRemoval'
import RemoveReview from './RemoveReview'
import AssetRemovelCard from './AssetRemovelCard'

import { BACKEND_KASSANDRA } from '../../../../constants/tokenAddresses'
import { GET_POOL_TOKENS } from './graphql'

import * as S from './styles'

// interface IRemoveAssetsProps {
//   test: string;
// }

const RemoveAssets = () => {
  const { data } = useSWR([GET_POOL_TOKENS], query =>
    request(BACKEND_KASSANDRA, query, {
      id: '50x88c7b8479b0f95eaa5c97481a3dd2c8890a63bfb0001000000000000000005d4'
    })
  )

  console.log(data)

  return (
    <S.RemoveAssets>
      <TokenRemoval />
      {/* <RemoveReview /> */}
      {/* <AssetRemovelCard /> */}
    </S.RemoveAssets>
  )
}

export default RemoveAssets
