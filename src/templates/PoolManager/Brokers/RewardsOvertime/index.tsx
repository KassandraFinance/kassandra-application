import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import { useAppSelector } from '@/store/hooks'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_JOIN_FESS } from './graphql'

import FeesChart, {
  FeeGraph
} from '@/templates/PoolManager/FeeRewards/FeesChart'
import Loading from '@ui/Loading'

import * as S from './styles'

type Fees = {
  type: 'join',
  period: number,
  volume_usd: string,
  volume_broker_usd: string | null,
  timestamp: number
}

type GetJoinFeesType = {
  manager: {
    pools: {
      fees: Fees[]
    }[]
  }
}

const rewardsLegend: Record<string, string> = {
  feesJoinManager: 'MANATGER REWARDS',
  feesAumManager: 'BROKER REWARDS'
}

const depositsLegend: Record<string, string> = {
  feesJoinManager: 'NONBROKERED',
  feesAumManager: 'BROKERED DEPOSITS'
}

const RewardsOvertime = () => {
  const userWalletAddress = useAppSelector(state => state.userWalletAddress)

  function createIntervalTime(months = 12): Array<number> {
    const date = new Date()
    let year = date.getUTCFullYear()
    let month = date.getUTCMonth()
    const periods = []
    for (let index = 0; index < months; index++) {
      const dateTime = Date.UTC(year, month, 1, 0, 0, 0, 0)
      periods.push(dateTime / 1000)
      month = month === 1 ? months : month - 1
      year = month === months ? year - 1 : year
    }
    return periods
  }

  function addTotalOnFees(fees: Fees[]) {
    const periods = createIntervalTime()
    const size = periods.length
    const aggFees: FeeGraph = new Array(periods.length)
    const aggDepositsFees: FeeGraph = new Array(periods.length)
    for (let index = 0; index < size; index++) {
      aggFees[index] = {
        feesAumManager: '0',
        feesJoinManager: '0',
        totalFeesToManager: '0',
        timestamp: periods[index]
      }

      aggDepositsFees[index] = {
        feesAumManager: '0',
        feesJoinManager: '0',
        totalFeesToManager: '0',
        timestamp: periods[index]
      }
    }

    for (const fee of fees) {
      const index = periods.findIndex(period => fee.timestamp > period)
      const feeBroker = Big(fee.volume_broker_usd ?? 0)
      if (index !== -1) {
        // feesJoinManager is manager rewards
        // feesAumManager is broker rewards
        const feesToManager = Big(fee.volume_usd).sub(feeBroker)
        const feeManager = aggFees[index].feesJoinManager
        aggFees[index].feesJoinManager = Big(feeManager)
          .add(feesToManager)
          .toFixed()

        aggFees[index].feesAumManager = Big(aggFees[index].feesAumManager)
          .add(feeBroker)
          .toFixed()

        aggFees[index].totalFeesToManager = Big(
          aggFees[index].totalFeesToManager
        )
          .add(feesToManager)
          .toFixed()

        // feesAumManager is Brokered
        // feesJoinManager is nonBrokered
        if (feeBroker.eq(0)) {
          aggDepositsFees[index].feesJoinManager = Big(
            aggDepositsFees[index].feesJoinManager
          )
            .add(fee.volume_usd)
            .toFixed()
        } else {
          aggDepositsFees[index].feesAumManager = Big(
            aggDepositsFees[index].feesAumManager
          )
            .add(fee.volume_usd)
            .toFixed()
        }

        aggDepositsFees[index].totalFeesToManager = Big(
          aggDepositsFees[index].totalFeesToManager
        )
          .add(feesToManager)
          .toFixed()
      }
    }

    for (let index = 0; index < size; index++) {
      const firstAgg = aggFees.at(-1)
      if (
        firstAgg?.feesAumManager === '0' &&
        firstAgg?.feesJoinManager === '0'
      ) {
        aggFees.pop()
      }
      const firstAggDeposit = aggDepositsFees.at(-1)
      if (
        firstAggDeposit?.feesAumManager === '0' &&
        firstAggDeposit.feesJoinManager === '0'
      ) {
        aggDepositsFees.pop()
      }
    }

    return { aggFees, aggDepositsFees }
  }

  const { data } = useSWR<GetJoinFeesType>(
    [GET_JOIN_FESS, userWalletAddress],
    (query, userWalletAddress) =>
      request(BACKEND_KASSANDRA, query, {
        id: userWalletAddress
      })
  )

  if (data?.manager?.pools) {
    const { aggFees, aggDepositsFees } = addTotalOnFees(
      data?.manager.pools[0].fees
    )

    return (
      <S.RewardsOvertime>
        <FeesChart
          fees={aggFees}
          title="Rewards History"
          legend={rewardsLegend}
        />

        <FeesChart
          fees={aggDepositsFees}
          title="Deposits comparisson"
          legend={depositsLegend}
        />
      </S.RewardsOvertime>
    )
  }

  return <Loading marginTop={10} />
}

export default RewardsOvertime
