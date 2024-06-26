import React from 'react'

import { usePoolAllocation } from '@/hooks/query/usePoolAllocation'

import { getManagerActivity } from '../../utils'

import Pagination from '@/components/Pagination'
import TitleSection from '@/components/TitleSection'
import ActivityCard, { actionsType } from '../../ActivityCard'

import assetDistribution from '../../../../../public/assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

export type ActivityInfo = {
  amount: string
  symbol: string
  value: string
  logo: string
  weight?: string
  newWeight?: string
}

export type IPoolInfo = {
  id: string
  name: string
  logo: string
  symbol: string
  blockExplorerUrl: string
}

type TransactionData = {
  sharesPrice: string
  tokenIn: {
    logo?: string
    amount?: string
    value?: string
  }
  tokenOut: {
    logo?: string
    amount?: string
    value?: string
  }
}

type RebalanceData = {
  logo: string
  symbol: string
  weight: string
  newWeight: string
}

type RebalancePoolData = {
  assetChange?: RebalanceData
  rebalanceData: RebalanceData[]
}
interface ActivityCardProps {
  key: string
  actionType: actionsType
  date: Date
  wallet: string
  txHash: string
  transactionData?: TransactionData
  rebalancePoolData?: RebalancePoolData
}

interface IAllocationHistoryProps {
  poolInfo: IPoolInfo
}

const AllocationHistory = ({ poolInfo }: IAllocationHistoryProps) => {
  const [skip, setSkip] = React.useState(0)
  const [totalAllocationHistory, setTotalAllocationHistory] = React.useState(0)
  const [allocationHistory, setAllocationHistory] = React.useState<
    ActivityCardProps[]
  >([])

  const { data } = usePoolAllocation({ id: poolInfo.id, skip })

  React.useEffect(() => {
    if (!data) return

    const managerActivities = getManagerActivity(
      data.weight_goals,
      data.manager.id
    )

    setAllocationHistory(
      managerActivities.sort((a, b) => b.date.getTime() - a.date.getTime())
    )

    setTotalAllocationHistory(Number(data.num_weight_goals))
  }, [data])

  return (
    <S.AllocationHistory>
      <TitleSection title="Allocation History" image={assetDistribution} />

      <S.ActivityCardContainer>
        {allocationHistory.length > 0 ? (
          allocationHistory.map(allocation => (
            <ActivityCard
              pool={poolInfo}
              key={allocation.key}
              date={allocation.date}
              wallet={allocation.wallet}
              txHash={allocation.txHash}
              scan={poolInfo.blockExplorerUrl}
              actionType={allocation.actionType}
              transactionData={allocation.transactionData}
              rebalancePoolData={allocation.rebalancePoolData}
            />
          ))
        ) : (
          <S.WasNoAllocationsChange>
            no change has yet occurred in the allocations of portfolio assets
          </S.WasNoAllocationsChange>
        )}
      </S.ActivityCardContainer>

      {allocationHistory.length > 0 && (
        <S.PaginationContainer>
          <Pagination
            skip={skip}
            totalItems={totalAllocationHistory}
            take={4}
            handlePageClick={({ selected }) => {
              setSkip(selected * 4)
            }}
          />
        </S.PaginationContainer>
      )}
    </S.AllocationHistory>
  )
}

export default AllocationHistory
