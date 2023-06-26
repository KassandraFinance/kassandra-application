import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_JOIN_FESS } from './graphql'

import FeesChart, {
  FeeGraph
} from '@/templates/PoolManager/FeeRewards/FeesChart'
import Loading from '@ui/Loading'

import * as S from './styles'

type Fees = {
  type: 'join'
  period: number
  volume_usd: string
  volume_broker_usd: string | null
  timestamp: number
}

type VolumesType = {
  volume_usd: string
  swap_pair: string
  timestamp: number
}

type GetJoinFeesType = {
  manager: {
    pools: {
      fees: Fees[]
      volumes: VolumesType[]
    }[]
  }
}

const rewardsLegend: Record<string, string> = {
  feesJoinManager: 'MANAGER REWARDS',
  feesAumManager: 'BROKER REWARDS'
}

const depositsLegend: Record<string, string> = {
  feesJoinManager: 'NONBROKERED',
  feesAumManager: 'BROKERED DEPOSITS'
}

const RewardsOvertime = () => {
  const [{ wallet }] = useConnectWallet()
  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

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

  function addTotalOnVolumes(volumes: VolumesType[]) {
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

    for (const volume of volumes) {
      const index = periods.findIndex(period => volume.timestamp > period)
      if (index !== -1) {
        // feesJoinManager is manager volume
        // feesAumManager is broker volume
        if (volume.swap_pair === 'manager') {
          aggFees[index].feesJoinManager = Big(aggFees[index].feesJoinManager)
            .add(volume.volume_usd)
            .toFixed()
        } else {
          aggFees[index].feesAumManager = Big(aggFees[index].feesAumManager)
            .add(volume.volume_usd)
            .toFixed()
        }

        aggFees[index].totalFeesToManager = Big(
          aggFees[index].totalFeesToManager
        )
          .add(volume.volume_usd)
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

  const { data } = useSWR<GetJoinFeesType>(
    wallet && [GET_JOIN_FESS, wallet.accounts[0].address, poolId],
    (query, userWalletAddress, poolId) =>
      request(BACKEND_KASSANDRA, query, {
        id: getAddress(userWalletAddress),
        poolId: poolId
      })
  )

  if (data?.manager?.pools) {
    return (
      <S.RewardsOvertime>
        <FeesChart
          fees={addTotalOnFees(data?.manager?.pools[0]?.fees || [])}
          title="Rewards History"
          legend={rewardsLegend}
        />

        <FeesChart
          fees={addTotalOnVolumes(data?.manager?.pools[0]?.volumes || [])}
          title="Deposits comparisson"
          legend={depositsLegend}
        />
      </S.RewardsOvertime>
    )
  }

  return <Loading marginTop={10} />
}

export default RewardsOvertime
