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
import { useAppSelector } from '@/store/hooks'
import { underlyingAssetsInfo } from '@/store/reducers/pool'

import { getDateDiff } from '@/utils/date'
import { getActivityInfo, getManagerActivity } from '../utils'

import AllocationTable from './AllocationTable'
import AllocationHistory, { ActivityCardProps } from './AllocationHistory'
import IntroReview, {
  IlistTokenWeightsProps,
  IRebalanceWeightsProps,
  IRebancingProgressProps
} from './IntroReview'

import * as S from './styles'

type Activity = {
  id: string,
  type: 'join' | 'exit',
  symbol: string[],
  amount: string[],
  price_usd: string[],
  txHash: string,
  timestamp: number,
  address: string
}

type IWeightGoalsProps = {
  id: string,
  type: 'add' | 'rebalance' | 'removed',
  end_timestamp: number,
  start_timestamp: number,
  token: {
    symbol: string,
    logo: string,
    price_usd: string
  },
  weights: {
    weight_normalized: string,
    asset: {
      balance: string,
      token: {
        symbol: string,
        logo: string
      }
    }
  }[]
}

interface IAllocationProps {
  pool: {
    logo: string,
    name: string,
    symbol: string,
    price_usd: string,
    chainId: number,
    activities: Activity[],
    weight_goals: IWeightGoalsProps[],
    chain: {
      blockExplorerUrl: string,
      addressWrapped: string
    }
  };
}

type CoinGeckoResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number
  }
}

const Allocations = () => {
  const [RebalancingProgress, setRebalancingProgress] =
    React.useState<IRebancingProgressProps | null>(null)
  const [listTokenWeights, setlistTokenWeights] = React.useState<
    IlistTokenWeightsProps[]
  >([])
  const [rebalanceWeights, setRebalanceWeights] =
    React.useState<IRebalanceWeightsProps>(null)
  const [allocationHistory, setAllocationHistory] = React.useState<
    ActivityCardProps[]
  >([])

  const router = useRouter()

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

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

  const { data: coingeckoData } = useCoingecko(
    networks[data?.pool.chainId ?? 137]?.coingecko,
    data?.pool?.chain?.addressWrapped ?? '',
    handleMockToken(poolAssets ?? [])
  )

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
    const mockTokensList = tokenList?.map((item: any) => {
      return mockTokens[item.token.id]
    })

    return mockTokensList
  }

  function tokenWeightFormatted(value: string) {
    return Big(value).mul(100).toFixed(2, 2)
  }

  function handleCurrentAllocationInfo(
    poolAssets: underlyingAssetsInfo[],
    coingeckoData: CoinGeckoResponseType
  ) {
    const tokenList = poolAssets.map(item => {
      const tokenPrice =
        coingeckoData && coingeckoData[mockTokens[item.token.id]]

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
          value: Big(item.balance),
          valueUSD: Big(item.balance).mul(Big(tokenPrice.usd ?? 0))
        },
        price: {
          value: tokenPrice?.usd ?? 0,
          changeValue: tokenPrice?.usd_24h_change ?? 0
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
    if (!data || !coingeckoData) return

    const tokenList =
      poolAssets && handleCurrentAllocationInfo(poolAssets, coingeckoData)

    setlistTokenWeights(tokenList ?? [])
  }, [data, coingeckoData])

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

  React.useEffect(() => {
    if (!data || !poolAssets) return setAllocationHistory([])

    const underlyingAssets = poolAssets?.map(item => {
      const { logo, symbol } = item.token

      return {
        token: {
          logo: logo ?? '',
          symbol: symbol,
          wraps: {
            symbol: symbol,
            logo: logo ?? ''
          }
        }
      }
    })

    const activitiesInvestors = getActivityInfo(
      data.pool.activities,
      underlyingAssets
    )
    const managerActivities = getManagerActivity(
      data.pool.weight_goals,
      userWalletAddress
    )
    const activities = [...activitiesInvestors, ...managerActivities]

    setAllocationHistory(
      activities.sort((a, b) => b.date.getTime() - a.date.getTime())
    )
  }, [data])

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
      <AllocationHistory
        allocationHistory={allocationHistory}
        poolInfo={poolInfo}
      />
    </S.Allocations>
  )
}

export default Allocations
