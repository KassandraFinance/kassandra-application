import React from 'react'
import { useRouter } from 'next/router'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { useBrokersFees } from '@/hooks/query/useBrokersFees'

import StatusCard from '@/components/Manage/StatusCard'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y']

const BrokersOverview = () => {
  const [depositsPeriod, setDepositsPeriod] = React.useState<string>('1D')
  const [rewardsPeriod, setRewardsPeriod] = React.useState<string>('1D')

  const [{ wallet }] = useConnectWallet()
  const router = useRouter()
  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const dateNow = new Date()

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

  const { data } = useBrokersFees({
    id: wallet?.accounts[0].address,
    poolId,
    depositsTimestamp: periodList[depositsPeriod].timestamp,
    rewardsTimestamp: periodList[rewardsPeriod].timestamp
  })

  function addDeposits(
    deposits: {
      volume_usd: string
      timestamp: number
    }[]
  ) {
    let totalDeposits = Big(0)
    for (const deposit of deposits) {
      totalDeposits = totalDeposits.add(deposit?.volume_usd || 0)
    }

    return totalDeposits
  }

  function addRewards(
    deposits: {
      __typename?: 'Fee' | undefined
      volume_broker_usd?: any
      timestamp: number
    }[]
  ) {
    let total = Big(0)
    for (const deposit of deposits) {
      total = total.add(deposit?.volume_broker_usd || 0)
    }

    return total
  }

  return (
    <S.BrokersOverview>
      <StatusCard
        title="Brokered Deposits"
        value={`$${addDeposits(data?.pools[0]?.brokeredDeposits || []).toFixed(
          2
        )}`}
        dataList={dataList}
        selected={depositsPeriod}
        onClick={period => setDepositsPeriod(period)}
      />
      <StatusCard
        title="Brokers rewards"
        value={`$${addRewards(data?.pools[0]?.brokersRewards || []).toFixed(
          2
        )}`}
        dataList={dataList}
        selected={rewardsPeriod}
        onClick={period => setRewardsPeriod(period)}
      />
      <StatusCard
        title="Total Deposits"
        value={data?.pools[0]?.num_deposits_broker || '0'}
      />
      <StatusCard
        title="Unique Depositors"
        value={data?.pools[0]?.unique_investors_broker?.toString() || '0'}
      />
    </S.BrokersOverview>
  )
}

export default BrokersOverview
