import React from 'react'
import router from 'next/router'
import Big from 'big.js'

import { useFees } from '@/hooks/query/useFees'

import TitleSection from '@/components/TitleSection'
import FeesChart, { FeeGraph } from './FeesChart'
import AvailableRewards from './AvailableRewards'

import Loading from '@ui/Loading'
import FeeBreakDown from './FeeBreakDown'

import poolsAssetsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

type Fees = {
  __typename?: 'Fee' | undefined
  type: string
  period: number
  volume_usd: any
  volume_broker_usd?: any
  timestamp: number
}

export type Pool = {
  __typename?: 'Pool' | undefined
  chain_id: number
  price_usd: any
  symbol: string
  controller: string
  fee_join_manager: any
  fee_join_broker: any
  total_fees_join_manager_usd: any
  total_fees_join_broker_usd: any
  total_fees_aum_manager_usd: any
  total_fees_aum_kassandra_usd: any
  fee_aum: any
  fee_aum_kassandra: any
  last_harvest?: any
  manager: {
    __typename?: 'Manager' | undefined
    id: string
  }
  fees: {
    __typename?: 'Fee' | undefined
    type: string
    period: number
    volume_usd: any
    volume_broker_usd?: any
    timestamp: number
  }[]
  lasCollectedAum: {
    __typename?: 'Fee' | undefined
    timestamp: number
  }[]
}

const legend: Record<string, string> = {
  feesJoinManager: 'DEPOSIT FEE',
  feesAumManager: 'MANAGED FEE'
}

const FeeRewards = () => {
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data } = useFees({ poolId })

  const pool = data ?? undefined

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

  function addTotalOnFees(fees: Fees[]): FeeGraph {
    const periods = createIntervalTime()
    const size = periods.length
    const aggFees: FeeGraph = new Array(periods.length)
    for (let index = 0; index < size; index++) {
      aggFees[index] = {
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
        let feesToManager = Big(fee.volume_usd).sub(feeBroker)
        if (fee.type === 'aum') {
          feesToManager = Big(fee.volume_usd)
          const feeManager = aggFees[index].feesAumManager
          aggFees[index].feesAumManager = Big(feeManager)
            .add(feesToManager)
            .toFixed()
        } else {
          const feeManager = aggFees[index].feesJoinManager
          aggFees[index].feesJoinManager = Big(feeManager)
            .add(feesToManager)
            .toFixed()
        }
        aggFees[index].totalFeesToManager = Big(
          aggFees[index].totalFeesToManager
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
    }

    return aggFees
  }

  return pool ? (
    <S.FeeRewards>
      <S.FeesContainer>
        <AvailableRewards pool={pool} />
        <FeeBreakDown pool={pool} />
      </S.FeesContainer>

      <S.FeesChartContainer>
        <S.TitleWrapper>
          <TitleSection title="Pool Assets" image={poolsAssetsIcon} />
        </S.TitleWrapper>
        <FeesChart
          fees={addTotalOnFees(pool.fees)}
          title="Rewards History"
          legend={legend}
        />
      </S.FeesChartContainer>
    </S.FeeRewards>
  ) : (
    <Loading marginTop={10} />
  )
}

export default FeeRewards
