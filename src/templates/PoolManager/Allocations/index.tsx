import Big from 'big.js'
import React from 'react'
import request from 'graphql-request'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { GET_TOKENS_POOL } from './graphql'
import { BACKEND_KASSANDRA, mockTokens } from '@/constants/tokenAddresses'

import { useTokensData } from '@/hooks/query/useTokensData'
import usePoolAssets from '@/hooks/usePoolAssets'
import { underlyingAssetsInfo } from '@/store/reducers/pool'

import { getDateDiff } from '@/utils/date'

import AllocationTable from './AllocationTable'
import AllocationHistory from './AllocationHistory'
import IntroReview, {
  IlistTokenWeightsProps,
  IRebalanceWeightsProps,
  IRebancingProgressProps
} from './IntroReview'

import * as S from './styles'

type IWeightGoalsProps = {
  id: string
  type: 'add' | 'rebalance' | 'removed'
  end_timestamp: number
  start_timestamp: number
  token: {
    symbol: string
    logo: string
    price_usd: string
  }
  weights: {
    weight_normalized: string
    asset: {
      balance: string
      token: {
        symbol: string
        logo: string
      }
    }
  }[]
}

interface IAllocationProps {
  pool: {
    logo: string
    name: string
    symbol: string
    price_usd: string
    chain_id: number
    weight_goals: IWeightGoalsProps[]
    chain: {
      blockExplorerUrl: string
      addressWrapped: string
    }
  }
}

interface IAllocationsProps {
  countDownDate: string
}
const Allocations = ({ countDownDate }: IAllocationsProps) => {
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
  const { data } = useSWR<IAllocationProps>(
    [GET_TOKENS_POOL, poolId],
    (query, poolId) =>
      request(BACKEND_KASSANDRA, query, {
        id: poolId
      })
  )

  const { data: tokensInfo } = useTokensData({
    chainId: data?.pool.chain_id || 137,
    tokenAddresses: handleMockToken(poolAssets ?? [])
  })

  const poolInfo = {
    name: data?.pool.name ?? '',
    symbol: data?.pool.symbol ?? '',
    logo: data?.pool?.logo ?? '',
    blockExplorerUrl: data?.pool?.chain?.blockExplorerUrl ?? ''
  }
  const isRebalancing =
    (data?.pool?.weight_goals[0].end_timestamp ?? 0) * 1000 >
    new Date().getTime()

  function handleMockToken(tokenList: any) {
    if (data?.pool.chain_id === 5) {
      return tokenList?.map((item: any) => {
        return mockTokens[item.token.id]
      })
    } else {
      return tokenList?.map((asset: any) => asset.token.id)
    }
  }

  function tokenWeightFormatted(value: string) {
    return Big(value).mul(100).toFixed(2, 2)
  }

  function handleCurrentAllocationInfo(poolAssets: underlyingAssetsInfo[]) {
    const tokenList = poolAssets.map(item => {
      return {
        token: {
          address: item.token.id,
          logo: item.token.logo ?? '',
          name: item.token.name,
          symbol: item.token.symbol,
          decimals: item.token.decimals
        },
        allocation: tokenWeightFormatted(item.weight_normalized),
        holding: {
          value: Big(item.balance)
        }
      }
    })

    return tokenList
  }

  function handleRebalancingTimeProgress(weightGoals: IWeightGoalsProps[]) {
    const currentTime = new Date().getTime()
    const endTime = weightGoals[0].end_timestamp * 1000

    if (currentTime < endTime) {
      const oneHourInTimestamp = 3600000
      const startTime: number = weightGoals[0].start_timestamp * 1000
      const timeSelected = (endTime - startTime) / oneHourInTimestamp

      const started = getDateDiff(startTime)
      const remaining = getDateDiff(currentTime, endTime)
      const hoursLeft = (endTime - currentTime) / oneHourInTimestamp
      const datePorcentage = ((timeSelected - hoursLeft) * 100) / timeSelected

      return {
        started: started ? String(started.value) + ' ' + started.string : '0',
        remaning: remaining
          ? String(remaining.value) + ' ' + remaining.string
          : '0',
        progress: datePorcentage > 0 ? datePorcentage : 0
      }
    } else {
      return null
    }
  }

  function handleRebalanceWeights(
    name: string,
    price: string,
    weightGoals: IWeightGoalsProps[],
    poolAssets: underlyingAssetsInfo[]
  ) {
    const targetWeights = weightGoals[0]
    const previousWeights = weightGoals[1]
    const currentTime = new Date().getTime()
    const endTime = targetWeights.end_timestamp * 1000

    if (currentTime < endTime) {
      const listTokenWeightsSorted = poolAssets.sort((a, b) =>
        a.token.id.toLowerCase() > b.token.id.toLowerCase() ? 1 : -1
      )

      const listTokenWeights = listTokenWeightsSorted.map((item, index) => {
        return {
          token: {
            address: item.token.id,
            logo: item.token.logo ?? '',
            name: item.token.name,
            symbol: item.token.symbol
          },
          previous: tokenWeightFormatted(
            previousWeights.weights[index].weight_normalized
          ),
          current: tokenWeightFormatted(item.weight_normalized),
          final: tokenWeightFormatted(
            targetWeights.weights[index].weight_normalized
          )
        }
      })

      return {
        poolName: name,
        poolPrice: Big(price).toFixed(2, 2),
        listTokenWeights
      }
    } else {
      return null
    }
  }

  React.useEffect(() => {
    if (!data) return

    const tokenList = poolAssets && handleCurrentAllocationInfo(poolAssets)

    setlistTokenWeights(tokenList ?? [])
  }, [data])

  React.useEffect(() => {
    if (!data) return

    const rebalancingTimeProgress = handleRebalancingTimeProgress(
      data.pool.weight_goals
    )

    setRebalancingProgress(rebalancingTimeProgress)
  }, [data])

  React.useEffect(() => {
    if (!data || !poolAssets) return

    const rebalanceWeights = handleRebalanceWeights(
      data.pool.name,
      Big(data.pool.price_usd).toFixed(2, 2),
      data.pool.weight_goals,
      poolAssets
    )

    setRebalanceWeights(rebalanceWeights)
  }, [data])

  return (
    <S.Allocations>
      <IntroReview
        RebalancingProgress={RebalancingProgress}
        listTokenWeights={listTokenWeights}
        rebalanceWeights={rebalanceWeights}
        countDownDate={countDownDate}
        coingeckoData={tokensInfo ?? {}}
        chainId={data?.pool.chain_id ?? 137}
      />
      <AllocationTable
        allocationData={listTokenWeights}
        isRebalance={isRebalancing}
        coingeckoData={tokensInfo ?? {}}
        chainId={data?.pool.chain_id ?? 137}
      />
      <AllocationHistory poolInfo={poolInfo} />
    </S.Allocations>
  )
}

export default Allocations
