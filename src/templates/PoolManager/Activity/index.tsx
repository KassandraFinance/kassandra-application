import React from 'react'
import router from 'next/router'
import Image from 'next/image'
import Big from 'big.js'

import { getActivityInfo, getManagerActivity } from '../utils'
import { useManagerPoolActivities } from '@/hooks/query/useManagerPoolActivities'
import { useAppSelector } from '@/store/hooks'

import Loading from '@/components/Loading'
import ActivityCard, { actionsType } from '../ActivityCard'
import Filters, { OptionsFilter } from './Filters'

import * as S from './styles'

export const activityProps: Record<string, actionsType> = {
  join: actionsType.DEPOSIT,
  exit: actionsType.WITHDRAWAL,
  add: actionsType.ADDITION,
  removed: actionsType.REMOVAL,
  rebalance: actionsType.REBALANCE,
  swap: actionsType.SWAP
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

export type TransactionData = {
  sharesPrice: string
  tokenIn: {
    logo?: string
    symbol?: string
    amount?: string
    value?: string
  }
  tokenOut: {
    logo?: string
    symbol?: string
    amount?: string
    value?: string
  }
}

export type RebalanceData = {
  logo: string
  symbol: string
  weight: string
  newWeight: string
}

export type RebalancePoolData = {
  assetChange?: RebalanceData
  rebalanceData: RebalanceData[]
}

export interface ActivityCardProps {
  key: string
  actionType: actionsType
  date: Date
  wallet: string
  txHash: string
  transactionData?: TransactionData
  rebalancePoolData?: RebalancePoolData
}

Big.RM = 2
const first = 10
const Activity = () => {
  const [optionsSelected, setOptionsSelected] = React.useState<Array<string>>(
    []
  )

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { tokenListSwapProvider } = useAppSelector(state => state)
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
    if (!data?.pages.length) return []

    let filters: Record<string, boolean> = {
      join: false,
      exit: false,
      rebalance: false,
      add: false,
      removed: false
    }
    if (optionsSelected.length === 0) {
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

    const assets: Record<string, AssetsInfo> = {}
    for (const token of tokenListSwapProvider) {
      if (token.symbol && token.logoURI) {
        assets[token.symbol] = {
          logo: token.logoURI,
          decimals: token?.decimals ?? 18
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
      <S.ActivityCardsContainer>
        {activityHistory.length > 0 && data?.pages.length ? (
          <>
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
