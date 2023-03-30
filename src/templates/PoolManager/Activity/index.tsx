import React from 'react'
import router from 'next/router'

import Big from 'big.js'
import useSWR from 'swr'
import request from 'graphql-request'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { BNtoDecimal } from '@/utils/numerals'
import { GET_ACTIVITIES } from './graphql'

import { useAppSelector } from '@/store/hooks'

import Loading from '@/components/Loading'
import ActivityCard, { actionsType, ActivityInfo } from '../ActivityCard'
import Filters, { OptionsFilter } from './Filters'

import * as S from './styles'

const activityProps: Record<string, actionsType> = {
  join: actionsType.DEPOSIT,
  exit: actionsType.WITHDRAWAL,
  add: actionsType.ADDITION,
  removed: actionsType.REMOVAL
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

type Result = {
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

type ActivityCardProps = {
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

Big.RM = 1
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

  function getActivityInfo(
    data: Result,
    filters: Record<string, boolean>
  ): Array<ActivityCardProps> {
    const activityInfo: ActivityCardProps[] = []
    const assets = data.pool.underlying_assets
    for (const activity of data.pool.activities) {
      if (filters[activity.type]) {
        activityInfo.push({
          key: activity.id,
          actionType: activityProps[activity.type],
          activityInfo: [],
          date: new Date(activity.timestamp * 1000),
          txHash: activity.txHash,
          wallet: activity.address,
          sharesRedeemed: {
            amount: activity.amount.at(-1) ?? '0',
            value: BNtoDecimal(
              Big(activity.amount.at(-1) ?? '0').mul(
                activity.price_usd.at(-1) ?? '0'
              ),
              5
            )
          }
        })
        const indexOfActivityInfo = activityInfo.length - 1
        const size = activity.symbol.length - 1
        for (let index = 0; index < size; index++) {
          const asset = assets.find(
            asset =>
              activity.symbol[index] ===
              (asset.token.wraps?.symbol ?? asset.token.symbol)
          )
          activityInfo[indexOfActivityInfo].activityInfo.push({
            amount: activity.amount[index],
            logo: asset?.token.wraps?.logo ?? asset?.token.logo ?? '',
            symbol: activity.symbol[index],
            value: Big(activity.amount[index])
              .mul(activity.price_usd[index])
              .toFixed(2)
          })
        }
      }
    }
    return activityInfo
  }

  function getManagerActivity(
    data: Result,
    filters: Record<string, boolean>
  ): Array<ActivityCardProps> {
    const activityInfo: ActivityCardProps[] = []
    let countRebalance = 0
    for (const [i, activity] of data.pool.weight_goals.entries()) {
      if (activity.type === 'rebalance' && filters[activity.type]) {
        if (
          data.pool.weight_goals[i + 1] &&
          data.pool.weight_goals[i + 1].type === 'rebalance' &&
          countRebalance === 0
        ) {
          activityInfo.push({
            key: activity.id,
            actionType: actionsType.REBALANCE,
            activityInfo: [],
            date: new Date(activity.end_timestamp * 1000),
            txHash: '',
            wallet: userWalletAddress
          })
          const indexOfActivityInfo = activityInfo.length - 1
          for (const [_i, operation] of activity.weights.entries()) {
            countRebalance = 1
            activityInfo[indexOfActivityInfo].activityInfo.push({
              amount: '0',
              logo: operation.asset.token.logo ?? '',
              newWeight: operation.weight_normalized,
              symbol: operation.asset.token.symbol,
              weight:
                data.pool.weight_goals[i + 1].weights[_i].weight_normalized,
              value: '0'
            })
          }
        } else {
          countRebalance = 0
        }
      } else {
        if (filters[activity.type] && data.pool.weight_goals[i + 1]) {
          activityInfo.push({
            key: activity.id,
            actionType: activityProps[activity.type],
            activityInfo: [],
            newBalancePool: [],
            date: new Date(activity.end_timestamp * 1000),
            txHash: '',
            wallet: userWalletAddress
          })
          const indexOfActivityInfo = activityInfo.length - 1
          const symbol = activity.token.symbol
          let weightNormalized = '0'
          let newWeight = '0'
          if (activity.type === 'removed') {
            weightNormalized =
              data.pool.weight_goals[i + 1].weights.find(
                weight => weight.asset.token.symbol === symbol
              )?.weight_normalized ?? '0'
          } else {
            const _activity = activity.weights.find(
              op => op.asset.token.symbol === symbol
            )
            if (_activity) {
              newWeight = _activity.weight_normalized
            }
          }

          for (const [_i, operation] of activity.weights.entries()) {
            if (operation.asset.token.symbol !== symbol) {
              activityInfo[indexOfActivityInfo].newBalancePool?.push({
                amount: '0',
                logo: operation.asset.token.logo ?? '',
                newWeight: Big(operation.weight_normalized).toFixed(3),
                symbol: operation.asset.token.symbol,
                weight: Big(
                  data.pool.weight_goals[i + 1].weights[_i].weight_normalized
                ).toFixed(3),
                value: '0'
              })
            }
          }

          activityInfo[indexOfActivityInfo].activityInfo.push({
            amount: '0',
            logo: activity.token.logo ?? '',
            symbol,
            value: '0',
            newWeight: Big(newWeight).toFixed(3),
            weight: Big(weightNormalized).toFixed(3)
          })
        }
      }
    }

    return activityInfo
  }

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
    const activitiesInvestors = getActivityInfo(data, filters)
    const managerActivities = getManagerActivity(data, filters)
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
