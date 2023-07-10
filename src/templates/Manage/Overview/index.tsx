import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { useManagerChangeTVL } from '@/hooks/query/useManagerChangeTVL'
import { useManagerDeposits } from '@/hooks/query/useManagerDeposits'
import { useManagerTVMChart } from '@/hooks/query/useManagerTVMChart'
import { useManagerUniqueInvestors } from '@/hooks/query/useManagerUniqueInvestors'
import { useManagerWithdraws } from '@/hooks/query/useManagerWithdraws'

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
] as const

const Overview = () => {
  const [depostiPeriod, setDepositPeriod] = React.useState<string>('1D')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')
  const [tvlPeriod, setTvlPeriod] = React.useState<string>('1D')

  const [{ wallet }] = useConnectWallet()
  const walletAddress = wallet?.provider
    ? getAddress(wallet.accounts[0].address)
    : ''

  const { data } = useManagerTVMChart({
    manager: walletAddress,
    timestamp: Math.trunc(new Date().getTime() / 1000 - periods[tvlPeriod])
  })

  const { data: dataChange } = useManagerChangeTVL({
    manager: walletAddress,
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
  })

  const { data: withdraws } = useManagerWithdraws({
    manager: walletAddress,
    timestamp: Math.trunc(
      new Date().getTime() / 1000 - periods[withdrawalPeriod]
    )
  })

  const { data: deposit } = useManagerDeposits({
    manager: walletAddress,
    timestamp: Math.trunc(new Date().getTime() / 1000 - periods[depostiPeriod])
  })

  const { data: uniqueInvestors } = useManagerUniqueInvestors({
    manager: walletAddress
  })

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
    if (!dataChange) return changeList
    const calcChangeList = changeList.map(change => {
      return {
        name: change.name,
        value: Number(
          calcChange(dataChange.now[0]?.close, dataChange[change.key][0]?.close)
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
          {data && dataChange ? (
            <TVMChart
              data={data?.total_value_locked || []}
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
            value={`+${handleWithdraws(deposit?.deposits || []).toFixed(2)}`}
            status="POSITIVE"
            dataList={dataList}
            selected={depostiPeriod}
            onClick={(period: string) => setDepositPeriod(period)}
          />
          <StatusCard
            title="Total Withdrawals"
            value={`-${handleWithdraws(withdraws?.withdraws || []).toFixed(2)}`}
            status="NEGATIVE"
            dataList={dataList}
            selected={withdrawalPeriod}
            onClick={(period: string) => setWithdrawalPeriod(period)}
          />
          <StatusCard
            title="Unique Depositors"
            value={uniqueInvestors?.unique_investors?.toString() || '0'}
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
