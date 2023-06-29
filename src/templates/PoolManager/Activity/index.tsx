import React from 'react'
import router from 'next/router'
import Image from 'next/image'
import { useConnectWallet } from '@web3-onboard/react'
import Big from 'big.js'
import useSWRInfinite from 'swr/infinite'
import request from 'graphql-request'

import { getActivityInfo, getManagerActivity } from '../utils'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_ACTIVITIES } from './graphql'

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
  id: string
  type: 'join' | 'exit'
  symbol: string[]
  amount: string[]
  price_usd: string[]
  txHash: string
  timestamp: number
  address: string
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

type RequestParams = {
  first: number
  skip: number
  id: string
  options: string[]
}

const getKey = (
  pageIndex: number,
  prevData: any,
  options: string[],
  poolId: string
) => {
  if (
    prevData &&
    !prevData.pool.activities.length &&
    !prevData.pool.weight_goals.length
  ) {
    return null
  }
  return [
    GET_ACTIVITIES,
    { skip: pageIndex * first, first, id: poolId, options }
  ]
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

  const { data, size, setSize } = useSWRInfinite<Result>(
    (index, prevData) =>
      getKey(
        index,
        prevData,
        optionsSelected.length > 0
          ? optionsSelected
          : options.map(option => option.key),
        poolId
      ),
    (query: string, { first, skip, id, options }: RequestParams) =>
      request(BACKEND_KASSANDRA, query, {
        first,
        skip,
        id,
        options
      }),
    { refreshInterval: 0 }
  )
  const isLoading = data && typeof data[size - 1] === 'undefined'
  const isEnd =
    data &&
    data[data.length - 1].pool.activities.length < first &&
    data[data.length - 1].pool.weight_goals.length < first

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
    if (!data?.length || !wallet) return []
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
    const _length = data.length
    for (let index = 0; index < _length; index++) {
      for (const activity of data[index].pool.activities) {
        _activities.push(activity)
      }
      for (const weight of data[index].pool.weight_goals) {
        weights.push(weight)
      }
    }

    const activitiesInvestors = getActivityInfo(
      _activities,
      data[0].pool.underlying_assets,
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
        {activityHistory.length > 0 && data?.length ? (
          <>
            {activityHistory.slice(0, size * first).map(activity => (
              <ActivityCard
                key={activity.key}
                actionType={activity.actionType}
                date={activity.date}
                scan={data[0].pool.chain?.blockExplorerUrl}
                wallet={activity.wallet}
                txHash={activity.txHash}
                activityInfo={activity.activityInfo}
                pool={{
                  name: data[0].pool.name,
                  symbol: data[0].pool.symbol,
                  logo: data[0].pool.logo
                }}
                sharesRedeemed={activity.sharesRedeemed}
                newBalancePool={activity.newBalancePool}
                managerAddress={data[0]?.pool?.manager.id ?? ''}
              />
            ))}
            {isLoading && <Loading marginTop={0} />}
            {!isEnd && (
              <S.LoadMoreContainer>
                <S.LoadMore onClick={() => setSize(size + 1)}>
                  <Image
                    src="/assets/utilities/arrow-select-down.svg"
                    width={16}
                    height={16}
                  />
                </S.LoadMore>
              </S.LoadMoreContainer>
            )}
          </>
        ) : data?.length && data[0]?.pool ? (
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
