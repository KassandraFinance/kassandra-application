import Big from 'big.js'
import React from 'react'
import request from 'graphql-request'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { GET_TOKENS_POOL } from './graphql'
import {
  BACKEND_KASSANDRA,
  mockTokens,
  networks
} from '@/constants/tokenAddresses'

import useCoingecko from '@/hooks/useCoingecko'
import usePoolAssets from '@/hooks/usePoolAssets'

import { getDateDiff } from '@/utils/date'

import AllocationTable from './AllocationTable'
import AllocationHistory from './AllocationHistory'
import IntroReview, {
  IlistTokenWeightsProps,
  IRebalanceWeightsProps,
  IRebancingProgressProps
} from './IntroReview'

import * as S from './styles'

const Allocations = () => {
  const [RebalancingProgress, setRebalancingProgress] =
    React.useState<IRebancingProgressProps | null>(null)
  const [listTokenWeights, setlistTokenWeights] = React.useState<
    IlistTokenWeightsProps[]
  >([])
  const [rebalanceWeights, setRebalanceWeights] =
    React.useState<IRebalanceWeightsProps>(null)

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { poolAssets } = usePoolAssets(poolId)
  const { data } = useSWR([GET_TOKENS_POOL, poolId], (query, poolId) =>
    request(BACKEND_KASSANDRA, query, {
      id: poolId
    })
  )

  const isRebalancing =
    data.pool.weight_goals[0].end_timestamp * 1000 > new Date().getTime()

  const { data: coingeckoData } = useCoingecko(
    networks[137]?.coingecko,
    '',
    handleMockToken(poolAssets ?? [])
  )

  function handleMockToken(tokenList: any) {
    const mockTokensList = tokenList?.map((item: any) => {
      return mockTokens[item.token.id]
    })

    return mockTokensList
  }

  React.useEffect(() => {
    if (!data || !coingeckoData) return

    const tokenList = poolAssets?.map(item => {
      const tokenPrice = coingeckoData[mockTokens[item.token.id]]

      return {
        token: {
          address: item.token.id,
          logo: item.token.logo ?? '',
          name: item.token.name,
          symbol: item.token.symbol,
          decimals: item.token.decimals
        },
        allocation: Big(item.weight_normalized).mul(100).toFixed(2, 2),
        holding: {
          value: Big(item.balance),
          valueUSD: Big(item.balance).mul(Big(tokenPrice.usd ?? 0))
        },
        price: {
          value: tokenPrice?.usd ?? 0,
          changeValue: tokenPrice?.usd_24h_change ?? 0
        }
      }
    })

    setlistTokenWeights(tokenList ?? [])
  }, [data, coingeckoData])

  React.useEffect(() => {
    if (!data) return

    const currentTime = new Date().getTime()
    const endTime = data.pool.weight_goals[0].end_timestamp * 1000
    const startTime: number = data.pool.weight_goals[0].start_timestamp * 1000
    const oneHourInTimestamp = 3600000

    if (currentTime < endTime) {
      const started = getDateDiff(startTime)
      const remaining = getDateDiff(currentTime, endTime)
      const timeSelected = (endTime - startTime) / oneHourInTimestamp
      const hoursLeft = (endTime - currentTime) / oneHourInTimestamp
      const datePorcentage = ((timeSelected - hoursLeft) * 100) / timeSelected

      setRebalancingProgress({
        started: started ? String(started.value) + '' + started.string : '0',
        remaning: remaining
          ? String(remaining.value) + '' + remaining.string
          : '0',
        progress: datePorcentage > 0 ? datePorcentage : 0
      })
    } else {
      setRebalancingProgress(null)
    }
  }, [data])

  React.useEffect(() => {
    if (!data || !poolAssets) return

    console.log(data)
    const currentTime = new Date().getTime()
    const endTime = data.pool.weight_goals[0].end_timestamp * 1000

    if (currentTime < endTime) {
      const listTokenWeights = poolAssets
        .sort((a, b) =>
          a.token.id.toLowerCase() > b.token.id.toLowerCase() ? 1 : -1
        )
        .map((item, index) => {
          return {
            token: {
              address: item.token.id,
              logo: item.token.logo ?? '',
              name: item.token.name,
              symbol: item.token.symbol
            },
            previous: Big(
              data.pool.weight_goals[1].weights[index].weight_normalized
            )
              .mul(Big(100))
              .toFixed(2, 2),
            current: Big(item.weight_normalized).mul(100).toFixed(2, 2),
            final: Big(
              data.pool.weight_goals[0].weights[index].weight_normalized
            )
              .mul(100)
              .toFixed(2, 2)
          }
        })

      setRebalanceWeights({
        poolName: data.pool.name,
        poolPrice: data.pool.price_usd,
        listTokenWeights
      })
    } else {
      setRebalanceWeights(null)
    }
  }, [data, coingeckoData])

  return (
    <S.Allocations>
      <IntroReview
        RebalancingProgress={RebalancingProgress}
        listTokenWeights={listTokenWeights}
        rebalanceWeights={rebalanceWeights}
      />
      <AllocationTable
        allocationData={listTokenWeights}
        isRebalance={isRebalancing}
      />
      <AllocationHistory />
    </S.Allocations>
  )
}

export default Allocations
