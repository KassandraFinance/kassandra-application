import React from 'react'
import useSWR from 'swr'
import { request } from 'graphql-request'
import { useRouter } from 'next/router'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { GET_BROKERS_FEES } from './graphql'

import StatusCard from '@/components/Manage/StatusCard'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y']

type GetBrokersFees = {
  manager: {
    pools: {
      num_deposits_broker: string
      unique_investors_broker: number
      brokeredDeposits: {
        volume_usd: string
        timestamp: number
      }[]
      brokersRewards: {
        volume_broker_usd: string
        timestamp: number
      }[]
    }[]
  }
}

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

  const { data } = useSWR<GetBrokersFees>(
    wallet && poolId.length > 0
      ? [GET_BROKERS_FEES, wallet.accounts[0].address, depositsPeriod]
      : null,
    (query, userWalletAddress) =>
      request(BACKEND_KASSANDRA, query, {
        id: getAddress(userWalletAddress),
        poolId: poolId,
        depositsTimestamp: periodList[depositsPeriod].timestamp,
        rewardsTimestamp: periodList[rewardsPeriod].timestamp
      })
  )

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
      volume_broker_usd: string
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
        value={`$${addDeposits(
          data?.manager?.pools[0]?.brokeredDeposits || []
        ).toFixed(2)}`}
        dataList={dataList}
        selected={depositsPeriod}
        onClick={period => setDepositsPeriod(period)}
      />
      <StatusCard
        title="Brokers rewards"
        value={`$${addRewards(
          data?.manager?.pools[0]?.brokersRewards || []
        ).toFixed(2)}`}
        dataList={dataList}
        selected={rewardsPeriod}
        onClick={period => setRewardsPeriod(period)}
      />
      <StatusCard
        title="Total Deposits"
        value={data?.manager?.pools[0]?.num_deposits_broker || '0'}
      />
      <StatusCard
        title="Unique Depositors"
        value={
          data?.manager?.pools[0]?.unique_investors_broker?.toString() || '0'
        }
      />
    </S.BrokersOverview>
  )
}

export default BrokersOverview
