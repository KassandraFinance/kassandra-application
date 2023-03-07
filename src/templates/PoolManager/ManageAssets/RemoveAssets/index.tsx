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
  const router = useRouter()

  const dispatch = useAppDispatch()
  const { tokenSelection } = useAppSelector(state => state.removeAsset)
  const { userWalletAddress } = useAppSelector(state => state)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data } = useSWR([GET_INFO_POOL, poolId], (query, poolId) =>
    request(BACKEND_KASSANDRA, query, {
      id: poolId ?? ''
    })
  )

  function handleMockToken(tokenList: any) {
    const tt = tokenList.map((item: string) => {
      return mockTokens[item]
    })

    return tt
  }

  const { data: coingeckoData, priceToken } = useCoingecko(
    networks[data?.pool.chain.id].coingecko,
    data?.pool.chain.addressWrapped,
    handleMockToken(data.pool.underlying_assets_addresses)
  )

  async function handleCheckLpNeeded(
    allocation: string,
    poolPrice: string,
    totalValueLocked: string
  ) {
    if (tokenSelection.address === '') return

    const userBalance = await ERC20(data.pool.address).balance(
      userWalletAddress
    )

    const weightNeeded = Big(totalValueLocked).mul(Big(allocation))
    const lpNeeded = weightNeeded.div(Big(poolPrice))

    dispatch(
      setLpNeeded({
        value: lpNeeded,
        balance: Big(userBalance.toString()).div(Big(10).pow(18))
      })
    )
  }

  function handleCalcNewWeight(weight: string, removeWeight: string) {
    return Big(weight)
      .div(Big(1).sub(Big(removeWeight)))
      .toFixed()
  }

  React.useEffect(() => {
    if (!data) return

    const poolInfo = data?.pool.underlying_assets.map(
      (item: any, index: number) => {
        return {
          address: item.token.id,
          symbol: item.token.symbol,
          logo: item.token.logo,
          decimals: item.token.decimals,
          balance: item.balance,
          weight: data?.pool.weight_goals[0].weights[index].weight_normalized,
          balanceUSD:
            item.balance * (priceToken(mockTokens[item.token.id]) ?? 0)
        }
      }
    )

    dispatch(setPoolTokensList(poolInfo))
  }, [data])

  React.useEffect(() => {
    handleCheckLpNeeded(
      tokenSelection.weight,
      data.pool.price_usd,
      data.pool.total_value_locked_usd
    )
  }, [tokenSelection])

  React.useEffect(() => {
    if (tokenSelection.address === '') return

    const poolWeightInfo: AssetType[] = data?.pool.underlying_assets.map(
      (item: any, index: number) => {
        // eslint-disable-next-line prettier/prettier
        const currentWeight = data?.pool.weight_goals[0].weights[index].weight_normalized
        const isSelectedToken = tokenSelection.address === item.token.id

        return {
          weight_normalized: isSelectedToken ? 0 : currentWeight,
          newWeight: isSelectedToken
            ? 0
            : handleCalcNewWeight(currentWeight, tokenSelection.weight),
          token: {
            decimals: item.token.decimals,
            id: item.token.id,
            logo: item.token.logo,
            name: item.token.name,
            symbol: item.token.symbol
          }
        }
      }
    )

    dispatch(
      setWeight(
        poolWeightInfo.sort((a, b) => {
          if (a.newWeight > b.newWeight) return 1
          if (a.newWeight < b.newWeight) return -1
          return 0
        })
      )
    )
  }, [tokenSelection])

  return (
    <S.RemoveAssets>
      <TokenRemoval />
      {/* <RemoveReview /> */}
      {/* <AssetRemovelCard /> */}
    </S.RemoveAssets>
  )
}

export default RemoveAssets
