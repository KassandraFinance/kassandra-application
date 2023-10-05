import React from 'react'
import Image from 'next/image'
import router from 'next/router'

import { useManagerPoolActivities } from '@/hooks/query/useManagerPoolActivities'
import {
  getActivityInfo,
  getManagerActivity
} from '@/templates/PoolManager/utils'

import ActivityCard, {
  actionsType,
  ActivityInfo
} from '@/templates/PoolManager/ActivityCard'
import Loading from '@/components/Loading'

import * as S from './styles'

const options = [
  {
    name: 'Deposits',
    key: 'join'
  },
  {
    name: 'Withdraws',
    key: 'exit'
  },
  {
    name: 'Weight Changes',
    key: 'rebalance'
  },
  {
    name: 'Asset Addition',
    key: 'add'
  },
  {
    name: 'Asset Removal',
    key: 'removed'
  }
]

type Activity = {
  __typename?: 'Activity' | undefined
  id: string
  type: string
  timestamp: number
  price_usd: string[]
  txHash: string
  address: string
  symbol: string[]
  amount: string[]
}

export type ActivityCardProps = {
  key: string
  actionType: actionsType
  date: Date
  wallet: string
  txHash: string
  activityInfo: ActivityInfo[]
  newBalancePool?: ActivityInfo[]
  sharesRedeemed?: {
    amount: string
    value: string
  }
}

const first = 10
const Activity = () => {
  const [optionsSelected, setOptionsSelected] = React.useState<Array<string>>(
    []
  )

  const poolId = Array.isArray(router.query.address)
    ? router.query.address[0]
    : router.query.address ?? ''

  const { data, fetchNextPage, isFetchingNextPage } = useManagerPoolActivities({
    id: poolId,
    first,
    options:
      optionsSelected.length > 0
        ? optionsSelected
        : options.map(option => option.key)
  })
  console.log(data)

  const isEnd =
    data &&
    data.pages &&
    (data.pages[data.pages.length - 1]?.activities?.length || 0) < first &&
    (data.pages[data.pages.length - 1]?.weight_goals?.length || 0) < first

  const activityHistory = React.useMemo((): ActivityCardProps[] => {
    if (!data?.pages.length) return []
    let filters: Record<string, boolean> = {
      join: false,
      exit: false,
      rebalance: false,
      add: false,
      removed: false
    }
    if (
      optionsSelected.length === options.length ||
      optionsSelected.length === 0
    ) {
      filters = {
        join: true,
        exit: true,
        rebalance: true,
        add: true,
        removed: true
      }
    } else {
      for (const option of optionsSelected) {
        filters[option] = true
      }
    }

    const _activities: Activity[] = []
    const weights = []
    const _length = data.pages.length
    for (let index = 0; index < _length; index++) {
      for (const activity of data.pages[index]?.activities || []) {
        _activities.push(activity)
      }
      for (const weight of data.pages[index]?.weight_goals || []) {
        weights.push(weight)
      }
    }

    const activitiesInvestors = getActivityInfo(
      _activities,
      data.pages[0]?.underlying_assets || [],
      filters
    )
    const managerActivities = getManagerActivity(
      weights,
      data.pages[0]?.manager.id || '',
      filters
    )
    const activities = [...activitiesInvestors, ...managerActivities]

    return activities.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [data, optionsSelected])
  return (
    <S.Activity>
      {activityHistory.length > 0 && data?.pages.length ? (
        <S.CardContainer>
          {activityHistory
            .slice(0, Number(data?.pageParams?.at(-1) || '0') + 10)
            .map(activity => (
              <ActivityCard
                key={activity.key}
                actionType={activity.actionType}
                date={activity.date}
                scan={data.pages[0]?.chain?.block_explorer_url || ''}
                wallet={activity.wallet}
                txHash={activity.txHash}
                activityInfo={activity.activityInfo}
                pool={{
                  name: data.pages[0]?.name || '',
                  symbol: data.pages[0]?.symbol || '',
                  logo: data.pages[0]?.logo || ''
                }}
                sharesRedeemed={activity.sharesRedeemed}
                newBalancePool={activity.newBalancePool}
                managerAddress={data.pages[0]?.manager.id ?? ''}
              />
            ))}
          {!isEnd && (
            <S.LoadMoreContainer>
              <S.LoadMore onClick={() => fetchNextPage()}>
                <Image
                  src="/assets/utilities/arrow-select-down.svg"
                  width={16}
                  height={16}
                />
              </S.LoadMore>
            </S.LoadMoreContainer>
          )}
        </S.CardContainer>
      ) : data?.pages.length && data.pages[0] ? null : (
        <Loading marginTop={0} />
      )}
      {isFetchingNextPage ? <Loading marginTop={0} /> : null}
    </S.Activity>
  )
}

export default Activity
