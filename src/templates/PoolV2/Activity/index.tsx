import React from 'react'
import Image from 'next/image'
import router from 'next/router'

import { useManagerPoolActivities } from '@/hooks/query/useManagerPoolActivities'
import { useAppSelector } from '@/store/hooks'

import {
  getActivityInfo,
  getManagerActivity
} from '@/templates/PoolManager/utils'

import Loading from '@/components/Loading'
import Overlay from '@/components/Overlay'
import ActivityCard from '@/templates/PoolManager/ActivityCard'
import Filters from '@/templates/PoolManager/Activity/Filters'
import { ActivityCardProps } from '@/templates/PoolManager/Activity'

import * as S from './styles'

const initialFilterOptions = ['join', 'exit', 'rebalance', 'add', 'removed']
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
    name: 'Swap',
    key: 'swap'
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

type AssetsInfo = {
  logo: string
  decimals: number
}

type Activity = {
  id: string
  type: string
  timestamp: number
  price_usd: string[]
  txHash: string
  address: string
  symbol: string[]
  amount: string[]
}

const first = 10
const Activity = () => {
  const [optionsSelected, setOptionsSelected] =
    React.useState<string[]>(initialFilterOptions)
  const [isOpenFilter, setIsOpenFilter] = React.useState(false)

  const poolId = Array.isArray(router.query.address)
    ? router.query.address[0]
    : router.query.address ?? ''

  const { tokenListSwapProvider } = useAppSelector(state => state)
  const { data, fetchNextPage, isFetchingNextPage } = useManagerPoolActivities({
    id: poolId,
    first,
    options: optionsSelected.length > 0 ? optionsSelected : initialFilterOptions
  })

  const isEnd =
    data &&
    data.pages &&
    (data.pages[data.pages.length - 1]?.activities?.length || 0) < first &&
    (data.pages[data.pages.length - 1]?.weight_goals?.length || 0) < first

  function handleCheckbox(key: string) {
    const index = optionsSelected.findIndex(option => option === key)
    if (index !== -1) {
      setOptionsSelected(optionsSelected.filter(opt => opt !== key))
      return
    }
    setOptionsSelected(prev => [...prev, key])
  }

  function handleClear() {
    setOptionsSelected([])
  }

  const activityHistory = React.useMemo((): ActivityCardProps[] => {
    if (!data?.pages.length) return []

    let filters: Record<string, boolean> = {
      join: false,
      exit: false,
      swap: false,
      rebalance: false,
      add: false,
      removed: false
    }
    if (optionsSelected.length === 0) {
      filters = {
        join: true,
        exit: true,
        swap: false,
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

    const assets: Record<string, AssetsInfo> = {}
    for (const token of tokenListSwapProvider) {
      if (token.symbol && token.logoURI) {
        assets[token.symbol] = {
          logo: token.logoURI,
          decimals: token.decimals ?? 18
        }
      }
    }

    const activitiesInvestors = getActivityInfo(_activities, assets, filters)
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
      <S.FilterContainer>
        <S.FilterIconContainer onClick={() => setIsOpenFilter(!isOpenFilter)}>
          <img src="/assets/icons/filter.svg" alt="" width={24} height={24} />
        </S.FilterIconContainer>

        <S.FilterContent>
          {isOpenFilter && (
            <>
              <Overlay
                isOpen={isOpenFilter}
                onClick={() => setIsOpenFilter(false)}
              />
              <Filters
                options={options}
                optionsSelected={optionsSelected}
                handleCheckbox={handleCheckbox}
                handleClear={handleClear}
              />
            </>
          )}
        </S.FilterContent>
      </S.FilterContainer>
      {activityHistory.length > 0 && data?.pages.length ? (
        <S.CardContainer>
          {activityHistory
            .slice(0, Number(data?.pageParams?.at(-1) || '0') + 10)
            .map(activity => (
              <ActivityCard
                key={activity.key}
                date={activity.date}
                wallet={activity.wallet}
                txHash={activity.txHash}
                actionType={activity.actionType}
                transactionData={activity.transactionData}
                rebalancePoolData={activity.rebalancePoolData}
                scan={data.pages[0]?.chain?.block_explorer_url || ''}
                pool={{
                  name: data.pages[0]?.name || '',
                  symbol: data.pages[0]?.symbol || '',
                  logo: data.pages[0]?.logo || ''
                }}
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
