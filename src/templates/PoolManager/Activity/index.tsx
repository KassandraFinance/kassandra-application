import React from 'react'
import router from 'next/router'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'
import Big from 'big.js'

import { getActivityInfo, getManagerActivity } from '../utils'
import { useManagerPoolActivities } from '@/hooks/query/useManagerPoolActivities'

import Loading from '@/components/Loading'
import ActivityCard, { actionsType, ActivityInfo } from '../ActivityCard'
import Filters, { OptionsFilter } from './Filters'

import * as S from './styles'

export const activityProps: Record<string, actionsType> = {
  join: actionsType.DEPOSIT,
  exit: actionsType.WITHDRAWAL,
  add: actionsType.ADDITION,
  removed: actionsType.REMOVAL,
  rebalance: actionsType.REBALANCE
}

const options: OptionsFilter[] = [
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

type Asset = {
  token: {
    logo: string
    symbol: string
    wraps: {
      symbol: string
      logo: string
    }
  }
}

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

export type Result = {
  pool: {
    name: string
    symbol: string
    logo: string
    underlying_assets: Asset[]
    chain: {
      blockExplorerUrl: string
    }
    manager: {
      id: string
    }
    activities: Activity[]
    weight_goals: {
      id: string
      txHash: string
      type: 'rebalance' | 'add' | 'removed'
      end_timestamp: number
      previous: {
        weights: {
          weight_normalized: string
          asset: {
            token: {
              symbol: string
            }
          }
        }[]
      }
      token: {
        symbol: string
        logo: string
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
    }[]
  }
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

Big.RM = 2
const first = 10
const Activity = () => {
  const [optionsSelected, setOptionsSelected] = React.useState<Array<string>>(
    []
  )

  const [{ wallet }] = useConnectWallet()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data, fetchNextPage, isFetchingNextPage } = useManagerPoolActivities({
    id: poolId,
    first,
    options:
      optionsSelected.length > 0
        ? optionsSelected
        : options.map(option => option.key)
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
    if (!data?.pages.length || !wallet) return []
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
      wallet.accounts[0].address,
      filters
    )
    const activities = [...activitiesInvestors, ...managerActivities]

    return activities.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [data, optionsSelected])

  return (
    <S.Activity>
      <S.ActivityCardsContainer>
        {activityHistory.length > 0 && data?.pages.length ? (
          <>
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
            {isFetchingNextPage && <Loading marginTop={0} />}
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
          </>
        ) : data?.pages.length && data.pages[0] ? (
          <></>
        ) : (
          <Loading marginTop={0} />
        )}
      </S.ActivityCardsContainer>
      <Filters
        options={options}
        optionsSelected={optionsSelected}
        handleCheckbox={handleCheckbox}
        handleClear={handleClear}
      />
    </S.Activity>
  )
}

export default Activity
