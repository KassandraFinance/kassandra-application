import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { gql } from 'graphql-request'
import Big from 'big.js'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'

type PoolDepositsType = {
  manager: {
    unique_investors: number,
    total_value_locked_usd: string,
    total_value_locked: {
      close: string,
      timestamp: number
    }[],
    withdraws: {
      volume_usd: string
    }[],
    deposits: {
      volume_usd: string
    }[]
  }
}

function useDeposits(
  manager: string,
  depositsPeriod: string,
  withdrawPeriod: string,
  tvlPeriod: string
) {
  const GET_POOL_DEPOSITS = gql`
    query (
      $manager: ID!
      $tvl_timestamp: Int
      $deposits_timestamp: Int
      $withdraws_timestamp: Int
    ) {
      manager(id: $manager) {
        unique_investors
        total_value_locked_usd
        total_value_locked(
          where: { base: "usd", timestamp_gt: $tvl_timestamp }
          orderBy: timestamp
        ) {
          close
          timestamp
        }
        deposits: volumes(
          where: {
            period: 86400
            type: "join"
            swap_pair_in: ["manager", "broker"]
            timestamp_gt: $deposits_timestamp
          }
        ) {
          volume_usd
          timestamp
        }
        withdraws: volumes(
          where: {
            period: 86400
            type: "exit"
            timestamp_gt: $withdraws_timestamp
          }
        ) {
          volume_usd
          timestamp
        }
      }
    }
  `

  const dateNow = new Date()
  const [depositsParams, setDepositsParams] = React.useState({
    timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24)
  })

  const [withdrawParams, setWithdrawParams] = React.useState({
    timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24)
  })

  const [tvlParams, setTvlParams] = React.useState({
    timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24)
  })

  console.log(tvlParams)

  const periodList: {
    [key: string]: {
      timestamp: number
    }
  } = {
    '1D': {
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24)
    },
    '1M': {
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 30)
    },
    '3M': {
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 90)
    },
    '6M': {
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 180)
    },

    '1Y': {
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 365)
    }
  }

  const { data, error, isValidating } = useSWR<PoolDepositsType>(
    manager.length > 0
      ? [GET_POOL_DEPOSITS, manager, tvlParams, depositsParams, withdrawParams]
      : null,
    (query, manager, tvlParams, depositsParams, withdrawParams) =>
      request(
        'https://graph.kassandra.finance/subgraphs/name/KassandraGoerli',
        query,
        {
          manager: manager,
          tvl_timestamp: tvlParams.timestamp,
          deposits_timestamp: depositsParams.timestamp,
          withdraws_timestamp: withdrawParams.timestamp
        }
      )
  )
  console.log(data)

  let uniqueDeposits = 0
  let totalWithdraws = Big(0)
  let totalDeposits = Big(0)
  const finalGraph = []
  let last_timestamp = 0
  if (data) {
    uniqueDeposits = data.manager.unique_investors - 1

    for (const withdraw of data.manager.withdraws) {
      totalWithdraws = totalWithdraws.add(withdraw.volume_usd)
    }

    for (const deposits of data.manager.deposits) {
      totalDeposits = totalDeposits.add(deposits.volume_usd)
    }

    for (const item of data.manager.total_value_locked) {
      if (item.timestamp > last_timestamp) {
        finalGraph.push({ close: item.close, timestamp: item.timestamp })
        last_timestamp = item.timestamp
      } else {
        finalGraph[finalGraph.length - 1].close = Big(
          finalGraph[finalGraph.length - 1].close
        )
          .add(item.close)
          .toString()
      }
    }
  }

  React.useEffect(() => {
    const deposits = periodList[depositsPeriod]
    if (deposits) {
      setDepositsParams(deposits)
    } else {
      setDepositsParams(periodList['1Y'])
    }
  }, [depositsPeriod])

  React.useEffect(() => {
    const withdraw = periodList[withdrawPeriod]
    if (withdraw) {
      setWithdrawParams(withdraw)
      return
    } else {
      setWithdrawParams(periodList['1Y'])
    }
  }, [withdrawPeriod])

  React.useEffect(() => {
    const withdraw = periodList[tvlPeriod]
    if (withdraw) {
      setTvlParams(withdraw)
      return
    } else {
      setTvlParams(periodList['1Y'])
    }
  }, [tvlPeriod])

  return {
    deposits: {
      uniqueDeposits,
      totalDeposits,
      totalWithdraws
    },
    tvlGraph: finalGraph,
    error: error,
    isValidating: isValidating
  }
}

export default useDeposits
