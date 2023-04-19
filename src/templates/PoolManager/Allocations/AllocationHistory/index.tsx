import useSWR from 'swr'
import React from 'react'
import request from 'graphql-request'
import { useRouter } from 'next/router'

import { useAppSelector } from '@/store/hooks'

import { GET_ALLOCATION_POOL } from './graphql'
import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'

import { getManagerActivity } from '../../utils'

import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination'
import TitleSection from '@/components/TitleSection'
import ActivityCard, { actionsType } from '../../ActivityCard'

import assetDistribution from '../../../../../public/assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

export type ActivityInfo = {
  amount: string,
  symbol: string,
  value: string,
  logo: string,
  weight?: string,
  newWeight?: string
}

export type IPoolInfo = {
  name: string,
  symbol: string,
  logo: string,
  blockExplorerUrl: string
}

export type ActivityCardProps = {
  key: string,
  actionType: actionsType,
  date: Date,
  wallet: string,
  txHash: string,
  activityInfo: ActivityInfo[],
  newBalancePool?: ActivityInfo[],
  sharesRedeemed?: {
    amount: string,
    value: string
  }
}
interface IAllocationHistoryProps {
  poolInfo: IPoolInfo;
}

const AllocationHistory = ({ poolInfo }: IAllocationHistoryProps) => {
  const [skip, setSkip] = React.useState(0)
  const [totalAllocationHistory, setTotalAllocationHistory] = React.useState(0)
  const [allocationHistory, setAllocationHistory] = React.useState<
    ActivityCardProps[]
  >([])

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const { data } = useSWR(
    [GET_ALLOCATION_POOL, poolId, skip],
    (query, poolId) =>
      request(BACKEND_KASSANDRA, query, {
        id: poolId,
        skip: skip
      })
  )

  React.useEffect(() => {
    if (!data) return setAllocationHistory([])

    const managerActivities = getManagerActivity(
      data.pool.weight_goals,
      userWalletAddress
    )

    setAllocationHistory(
      managerActivities.sort((a, b) => b.date.getTime() - a.date.getTime())
    )

    setTotalAllocationHistory(Number(data.pool.num_weight_goals))
  }, [data])

  return (
    <S.AllocationHistory>
      <TitleSection title="Allocation History" image={assetDistribution} />

      <S.ActivityCardContainer>
        {allocationHistory.length > 0 ? (
          allocationHistory.map(allocation => (
            <ActivityCard
              key={allocation.key}
              actionType={allocation.actionType}
              date={allocation.date}
              scan={poolInfo.blockExplorerUrl}
              wallet={allocation.wallet}
              txHash={allocation.txHash}
              activityInfo={allocation.activityInfo}
              pool={poolInfo}
              sharesRedeemed={allocation.sharesRedeemed}
              newBalancePool={allocation.newBalancePool}
              managerAddress={data?.pool?.manager?.id ?? ''}
            />
          ))
        ) : (
          <Loading marginTop={2.4} />
        )}
      </S.ActivityCardContainer>

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
    </S.AllocationHistory>
  )
}

export default AllocationHistory
