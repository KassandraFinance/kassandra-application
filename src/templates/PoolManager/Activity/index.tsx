import React from 'react'
import router from 'next/router'

import Big from 'big.js'
import useSWR from 'swr'
import request from 'graphql-request'

import { getActivityInfo, getManagerActivity } from '../utils'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_ACTIVITIES } from './graphql'

import { useAppSelector } from '@/store/hooks'

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
    logo: string,
    symbol: string,
    wraps: {
      symbol: string,
      logo: string
    }
  }
}

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

export type Result = {
  pool: {
    name: string,
    symbol: string,
    logo: string,
    underlying_assets: Asset[],
    chain: {
      blockExplorerUrl: string
    },
    activities: Activity[],
    weight_goals: {
      id: string,
      type: 'rebalance' | 'add' | 'removed',
      end_timestamp: number,
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
    }[]
  }
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

Big.RM = 2
const Activity = () => {
  const [optionsSelected, setOptionsSelected] = React.useState<Array<string>>(
    options.map(opt => opt.key)
  )

  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data } = useSWR<Result>([GET_ACTIVITIES, poolId], (query, id) =>
    request(BACKEND_KASSANDRA, query, {
      id
    })
  )

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

  function handleSelectAll(options: OptionsFilter[]) {
    setOptionsSelected(options.map(opt => opt.key))
  }

  const activityHistory = React.useMemo((): ActivityCardProps[] => {
    if (!data) return []
    let filters: Record<string, boolean> = {
      join: false,
      exit: false,
      rebalance: false,
      add: false,
      remove: false
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
        remove: true
      }
    } else {
      for (const option of optionsSelected) {
        filters[option] = true
      }
    }
    const activitiesInvestors = getActivityInfo(
      data.pool.activities,
      data.pool.underlying_assets,
      filters
    )
    const managerActivities = getManagerActivity(
      data.pool.weight_goals,
      userWalletAddress,
      filters
    )
    const activities = [...activitiesInvestors, ...managerActivities]

    return activities.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [data, optionsSelected])

  return (
    <S.Activity>
      <S.ActivityCardsContainer>
        {activityHistory.length > 0 && data?.pool ? (
          activityHistory.map(activity => (
            <ActivityCard
              key={activity.key}
              actionType={activity.actionType}
              date={activity.date}
              scan={data.pool.chain?.blockExplorerUrl}
              wallet={activity.wallet}
              txHash={activity.txHash}
              activityInfo={activity.activityInfo}
              pool={{
                name: data.pool.name,
                symbol: data.pool.symbol,
                logo: data.pool.logo
              }}
              sharesRedeemed={activity.sharesRedeemed}
              newBalancePool={activity.newBalancePool}
            />
          ))
        ) : (
          <Loading marginTop={0} />
        )}
      </S.ActivityCardsContainer>
      <Filters
        options={options}
        optionsSelected={optionsSelected}
        handleCheckbox={handleCheckbox}
        handleClear={handleClear}
        handleSelectAll={handleSelectAll}
      />
    </S.Activity>
  )
}

export default Activity
