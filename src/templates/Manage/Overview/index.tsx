import React from 'react'
import useSWR from 'swr'
import request from 'graphql-request'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import {
  GET_TVM_CHART,
  GET_CHANGE_TVL,
  GET_WITHDRAWS,
  GET_DEPOSITS,
  GET_UNIQUE_INVESTORS
} from './graphql'

import { calcChange } from '@/utils/numerals'

import TitleSection from '@/components/TitleSection'
import StatusCard from '@/components/Manage/StatusCard'
import TVMChart from '@/components/Manage/TVMChart'
import ManagedPools from './ManagedPools'
import Loading from '@/components/Loading'

import managerOveriewIcon from '@assets/iconGradient/section-title-eye.svg'
import managedPoolsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const periods: Record<string, number> = {
  '1D': 60 * 60 * 24,
  '1M': 60 * 60 * 24 * 30,
  '3M': 60 * 60 * 24 * 30 * 3,
  '6M': 60 * 60 * 24 * 30 * 6,
  '1Y': 60 * 60 * 24 * 30 * 12,
  ALL: new Date().getTime() / 1000
}

const changeList = [
  {
    name: '1 Day',
    key: 'day',
    value: 0
  },
  {
    name: '1 Week',
    key: 'week',
    value: 0
  },

  {
    name: '1 Month',
    key: 'month',
    value: 0
  },
  {
    name: '1 Year',
    key: 'year',
    value: 0
  },
  {
    name: 'All',
    key: 'max',
    value: 0
  }
]

const Overview = () => {
  const [depostiPeriod, setDepositPeriod] = React.useState<string>('1D')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')
  const [tvlPeriod, setTvlPeriod] = React.useState<string>('1D')

  const [{ wallet }] = useConnectWallet()

  const { data } = useSWR(
    [GET_TVM_CHART, wallet?.accounts[0].address, tvlPeriod],
    (query, userWalletAddress, tvlPeriod) =>
      request(BACKEND_KASSANDRA, query, {
        manager: userWalletAddress,
        timestamp: Math.trunc(new Date().getTime() / 1000 - periods[tvlPeriod])
      })
  )

  const { data: dataChange } = useSWR(
    [GET_CHANGE_TVL, wallet?.accounts[0].address],
    (query, userWalletAddress) =>
      request(BACKEND_KASSANDRA, query, {
        manager: userWalletAddress,
        day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
        week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
        month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
        year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
      })
  )

  const { data: withdraws } = useSWR(
    [GET_WITHDRAWS, wallet?.accounts[0].address, withdrawalPeriod],
    (query, userWalletAddress, withdrawalPeriod) =>
      request(BACKEND_KASSANDRA, query, {
        manager: userWalletAddress,
        timestamp: Math.trunc(
          new Date().getTime() / 1000 - periods[withdrawalPeriod]
        )
      })
  )

  const { data: deposit } = useSWR(
    [GET_DEPOSITS, wallet?.accounts[0].address, depostiPeriod],
    (query, userWalletAddress, depostiPeriod) =>
      request(BACKEND_KASSANDRA, query, {
        manager: userWalletAddress,
        timestamp: Math.trunc(
          new Date().getTime() / 1000 - periods[depostiPeriod]
        )
      })
  )

  const { data: uniqueInvestors } = useSWR(
    [GET_UNIQUE_INVESTORS, wallet?.accounts[0].address],
    (query, userWalletAddress) =>
      request(BACKEND_KASSANDRA, query, {
        manager: userWalletAddress
      })
  )

  function handleWithdraws(
    withdraws: {
      timestamp: number
      volume_usd: string
    }[]
  ) {
    let totalWithdraws = Big(0)
    for (const withdraw of withdraws) {
      totalWithdraws = totalWithdraws.add(withdraw.volume_usd)
    }

    return totalWithdraws
  }

  const change = React.useMemo(() => {
    if (!dataChange?.manager) return changeList
    const calcChangeList = changeList.map(change => {
      return {
        name: change.name,
        value: Number(
          calcChange(
            dataChange.manager.now[0]?.close,
            dataChange.manager[change.key][0]?.close
          )
        )
      }
    })
    return calcChangeList
  }, [dataChange])

  return (
    <S.Overview>
      <S.TitleWrapper>
        <TitleSection title="Manager Overview" image={managerOveriewIcon} />
      </S.TitleWrapper>

      <S.ManagerOverviewContainer>
        <S.ChartWrapper>
          {data?.manager && dataChange?.manager ? (
            <TVMChart
              data={data?.manager?.total_value_locked || []}
              changeList={change}
              selectedPeriod={tvlPeriod}
              setSelectedPeriod={setTvlPeriod}
            />
          ) : (
            <Loading marginTop={15} />
          )}
        </S.ChartWrapper>

        <S.StatsContainer>
          <StatusCard
            title="Total Deposits"
            value={`+${handleWithdraws(
              deposit?.manager?.deposits || []
            ).toFixed(2)}`}
            status="POSITIVE"
            dataList={dataList}
            selected={depostiPeriod}
            onClick={(period: string) => setDepositPeriod(period)}
          />
          <StatusCard
            title="Total Withdrawals"
            value={`-${handleWithdraws(
              withdraws?.manager?.withdraws || []
            ).toFixed(2)}`}
            status="NEGATIVE"
            dataList={dataList}
            selected={withdrawalPeriod}
            onClick={(period: string) => setWithdrawalPeriod(period)}
          />
          <StatusCard
            title="Unique Depositors"
            value={
              uniqueInvestors?.manager?.unique_investors?.toString() || '0'
            }
          />
        </S.StatsContainer>
      </S.ManagerOverviewContainer>

      <S.ManagedPoolsContainer>
        <S.TitleWrapper>
          <TitleSection title="Managed Pools" image={managedPoolsIcon} />
        </S.TitleWrapper>

        <ManagedPools />
      </S.ManagedPoolsContainer>
    </S.Overview>
  )
}

export default Overview
