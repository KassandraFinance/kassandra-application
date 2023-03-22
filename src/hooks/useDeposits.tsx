import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { gql } from 'graphql-request'
import Big from 'big.js'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'

type PoolDepositsType = {
  manager: {
    pools: {
      unique_investors: number,
      withdraws: {
        volume_usd: string
      }[],
      deposits: {
        volume_usd: string
      }[]
    }[]
  }
}

function useDeposits(
  manager: string,
  depositsPeriod: string,
  withdrawPeriod: string
) {
  const GET_POOL_DEPOSITS = gql`
    query (
      $id: ID!
      $deposits_period: Int
      $deposits_timestamp: Int
      $withdraws_period: Int
      $withdraws_timestamp: Int
    ) {
      manager(id: $id) {
        pools {
          unique_investors
          deposits: volumes(
            where: {
              period: $deposits_period
              type: "join"
              swap_pair_in: ["manager", "broker"]
              timestamp_gt: $deposits_timestamp
            }
          ) {
            volume_usd
          }
          withdraws: volumes(
            where: {
              period: $withdraws_period
              type: "exit"
              timestamp_gt: $withdraws_timestamp
            }
          ) {
            volume_usd
          }
        }
      }
    }
  `

  const dateNow = new Date()
  const [depositsParams, setDepositsParams] = React.useState({
    period: 3600,
    timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24)
  })

  const [withdrawParams, setWithdrawParams] = React.useState({
    period: 3600,
    timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24)
  })

  const periodList: {
    [key: string]: {
      period: number,
      timestamp: number
    }
  } = {
    '1D': {
      period: 3600,
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24)
    },
    '1M': {
      period: 86400,
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 30)
    },
    '3M': {
      period: 86400,
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 90)
    },
    '6M': {
      period: 86400,
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 180)
    },

    '1Y': {
      period: 86400,
      timestamp: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 365)
    }
  }

  const { data, error, isValidating } = useSWR<PoolDepositsType>(
    manager.length > 0
      ? [GET_POOL_DEPOSITS, manager, depositsParams, withdrawParams]
      : null,
    (query, manager, depositsParams, withdrawParams) =>
      request(BACKEND_KASSANDRA, query, {
        id: manager,
        withdraws_period: withdrawParams.period,
        withdraws_timestamp: withdrawParams.timestamp,
        deposits_period: depositsParams.period,
        deposits_timestamp: depositsParams.timestamp
      })
  )

  let uniqueDeposits = 0
  let totalWithdraws = Big(0)
  let totalDeposits = Big(0)
  if (data) {
    for (const pool of data.manager.pools) {
      uniqueDeposits += pool.unique_investors

      for (const withdraw of pool.withdraws) {
        totalWithdraws = totalWithdraws.add(withdraw.volume_usd)
      }

      for (const deposits of pool.deposits) {
        totalDeposits = totalDeposits.add(deposits.volume_usd)
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

  return {
    deposits: {
      uniqueDeposits,
      totalDeposits,
      totalWithdraws
    },
    error: error,
    isValidating: isValidating
  }
}

export default useDeposits
