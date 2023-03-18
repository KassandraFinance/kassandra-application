import React from 'react'
import useSWR from 'swr'
import Big from 'big.js'
import request from 'graphql-request'
import { useRouter } from 'next/router'

import { GET_INFO_POOL } from '@/templates/PoolManager/graphql'
import {
  BACKEND_KASSANDRA,
  mockTokens,
  networks
} from '@/constants/tokenAddresses'

import useCoingecko from '@/hooks/useCoingecko'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  lockToken,
  setNewTokensWights,
  setPoolInfo,
  setPoolTokensList,
  setTotalWeight
} from '@/store/reducers/rebalanceAssetsSlice'

import ExecutionPeriod from './ExecutionPeriod'
import Steps from '../../../../components/Steps'
import AllocationsTable from './AllocationsTable'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

const SetNewWeights = () => {
  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const dispatch = useAppDispatch()
  const { newTokensWights } = useAppSelector(state => state.rebalanceAssets)

  const { data } = useSWR([GET_INFO_POOL, poolId], (query, poolId) =>
    request(BACKEND_KASSANDRA, query, {
      id: poolId
    })
  )

  const { data: coingeckoData, priceToken } = useCoingecko(
    networks[data?.pool.chain.id]?.coingecko,
    data?.pool.chain.addressWrapped,
    handleMockToken(data?.pool.underlying_assets_addresses ?? [])
  )

  function handleMockToken(tokenList: any) {
    const mockTokensList = tokenList?.map((item: string) => {
      return mockTokens[item]
    })

    return mockTokensList
  }

  React.useEffect(() => {
    if (!data) return

    const response = data.pool.underlying_assets.map(
      (item: any, index: number) => {
        return {
          currentAmount: Big(item.balance),
          currentAmountUSD: Big(
            Big(item.balance).mul(priceToken(mockTokens[item.token.id]) ?? 0)
          ),
          currentWeight: Big(
            data.pool.weight_goals[0].weights[index].weight_normalized ?? 0
          ),
          token: {
            decimals: item.token.decimals,
            address: item.token.id,
            logo: item.token.logo,
            name: item.token.name,
            symbol: item.token.symbol
          }
        }
      }
    )

    dispatch(setPoolTokensList(response))
    dispatch(
      setPoolInfo({
        id: data.pool.id,
        name: data.pool.name,
        symbol: data.pool.symbol,
        controller: data.pool.controller,
        chainLogo: data.pool.chain.logo,
        address: data.pool.address,
        chainId: data.pool.chain_id,
        logo: data.pool.logo
      })
    )
  }, [data, coingeckoData])

  React.useEffect(() => {
    if (!data) return

    let totalWeight = Big(0)
    const newWeights = {}
    data.pool.underlying_assets.forEach((item: any) => {
      const address = item.token.id
      totalWeight = totalWeight.add(newTokensWights[address]?.newWeight ?? 0)

      Object.assign(newWeights, {
        [address]: {
          newWeight: newTokensWights[address]?.newWeight ?? Big(0),
          newAmount: newTokensWights[address]?.newAmount ?? Big(0),
          newAmountUSD: newTokensWights[address]?.newAmountUSD ?? Big(0),
          lockPercentage:
            newTokensWights[address]?.lockPercentage ?? lockToken.UNBLOCKED,
          alreadyCalculated:
            newTokensWights[address]?.alreadyCalculated ?? false
        }
      })
    })

    dispatch(setTotalWeight(totalWeight))
    dispatch(setNewTokensWights(newWeights))
  }, [data])

  return (
    <S.SetNewWeights>
      <CreatePoolHeader title="Change token weights" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Set new token weights',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Review',
            state: 'NEXT'
          }
        ]}
      />

      <S.SetNewWeightsBody>
        <h2>Token Weights</h2>
        <p>Define the new Allocations of the assets that make up the pool</p>

        <S.AllocationsAndExecutionPeriod>
          <AllocationsTable priceToken={priceToken} />
          <ExecutionPeriod />
        </S.AllocationsAndExecutionPeriod>
      </S.SetNewWeightsBody>
    </S.SetNewWeights>
  )
}

export default SetNewWeights
