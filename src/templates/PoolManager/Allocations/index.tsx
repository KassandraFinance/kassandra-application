import Big from 'big.js'
import React from 'react'
import { useRouter } from 'next/router'

import { mockTokens } from '@/constants/tokenAddresses'
import { UnderlyingAssetsInfoType } from '@/utils/updateAssetsToV2'

import { useTokensData } from '@/hooks/query/useTokensData'
import { usePoolAssets } from '@/hooks/query/usePoolAssets'
import { useTokensPool } from '@/hooks/query/useTokensPool'
import useAllocationInfo from '@/hooks/useAllocationInfo'

import AllocationTable from './AllocationTable'
import AllocationHistory from './AllocationHistory'
import IntroReview, {
  IlistTokenWeightsProps,
  IRebalanceWeightsProps,
  IRebancingProgressProps
} from './IntroReview'

import * as S from './styles'

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

  const { data: poolAssets } = usePoolAssets({ id: poolId })
  const { data } = useTokensPool({ id: poolId })

  const { data: tokensInfo } = useTokensData({
    chainId: data?.chain_id || 137,
    tokenAddresses: handleMockToken(poolAssets ?? [])
  })
  const useAllocation = useAllocationInfo()

  const poolInfo = {
    id: poolId,
    name: data?.name ?? '',
    symbol: data?.symbol ?? '',
    logo: data?.logo ?? '',
    blockExplorerUrl: data?.chain?.block_explorer_url ?? ''
  }
  const isRebalancing =
    (data?.weight_goals[0]?.end_timestamp ?? 0) * 1000 > new Date().getTime()

  function handleMockToken(tokenList: UnderlyingAssetsInfoType[]) {
    if (data?.chain_id === 5) {
      return tokenList?.map(item => {
        return mockTokens[item.token.id]
      })
    } else {
      return tokenList?.map(asset => asset.token.id)
    }
  }

  React.useEffect(() => {
    if (!data || !poolAssets) return

    const tokenList = useAllocation.handleCurrentAllocationInfo(poolAssets)

    if (tokenList.length <= 0) {
      return
    }

    setlistTokenWeights(tokenList)
  }, [data])

  React.useEffect(() => {
    if (!data) return

    const rebalancingTimeProgress = useAllocation.handleRebalancingTimeProgress(
      data?.weight_goals
    )

    setRebalancingProgress(rebalancingTimeProgress)
  }, [data])

  React.useEffect(() => {
    if (!data || !poolAssets) return

    const rebalanceWeights = useAllocation.handleRebalanceWeights(
      data.name,
      Big(data.price_usd).toFixed(2, 2),
      data.weight_goals,
      poolAssets
    )

    if (!rebalanceWeights) {
      return
    }

    setRebalanceWeights(rebalanceWeights)
  }, [data])

  return (
    <S.Allocations>
      <S.IntroReview>
        <IntroReview
          RebalancingProgress={RebalancingProgress}
          listTokenWeights={listTokenWeights}
          rebalanceWeights={rebalanceWeights}
          countDownDate={countDownDate}
          coingeckoData={tokensInfo ?? {}}
          chainId={data?.chain_id ?? 137}
        />
      </S.IntroReview>
      <S.AllocationTable>
        <AllocationTable
          allocationData={listTokenWeights}
          isRebalance={isRebalancing}
          coingeckoData={tokensInfo ?? {}}
          chainId={data?.chain_id ?? 137}
        />
      </S.AllocationTable>
      <S.AllocationHistory>
        <AllocationHistory poolInfo={poolInfo} />
      </S.AllocationHistory>
    </S.Allocations>
  )
}

export default Allocations
