import React from 'react'
import useSWR from 'swr'
import request from 'graphql-request'
import { useRouter } from 'next/router'
import Big from 'big.js'

import { GET_INFO_POOL } from '../../graphql'

import useCoingecko from '@/hooks/useCoingecko'
import { ERC20 } from '@/hooks/useERC20Contract'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setPoolTokensList,
  setLpNeeded,
  setWeight,
  AssetType
} from '@/store/reducers/removeAssetSlice'

import {
  BACKEND_KASSANDRA,
  mockTokens,
  networks
} from '../../../../constants/tokenAddresses'

import TokenRemoval from './TokenRemoval'
import RemoveReview from './RemoveReview'
import AssetRemovelCard from './AssetRemovelCard'

import * as S from './styles'

// interface IRemoveAssetsProps {
//   test: string;
// }

const RemoveAssets = () => {
  return (
    <S.RemoveAssets>
      <TokenRemoval />
      <RemoveReview />
      {/* <AssetRemovelCard /> */}
    </S.RemoveAssets>
  )
}

export default RemoveAssets
