import React from 'react'

import useDeposits from '@/hooks/useDeposits'

import TitleSection from '../../../components/TitleSection'
import StatusCard from '../../../components/Manage/StatusCard'
import TVMChart from '../../../components/Manage/TVMChart'
import ManagedPools from './ManagedPools'

import managerOveriewIcon from '../../../../public/assets/iconGradient/section-title-eye.svg'
import managedPoolsIcon from '../../../../public/assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const Overview = () => {
  const [depostiPeriod, setDepositPeriod] = React.useState<string>('1D')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')

  const { deposits } = useDeposits(
    '0xb602db4ddaa85b2f8495dbA4Fe6a9950178047cA',
    depostiPeriod,
    withdrawalPeriod
  )

  return (
    <S.Overview>
      <S.TitleWrapper>
        <TitleSection title="Manager Overview" image={managerOveriewIcon} />
      </S.TitleWrapper>

      <S.ManagerOverviewContainer>
        <S.ChartWrapper>
          <TVMChart />
        </S.ChartWrapper>

        <S.StatsContainer>
          <StatusCard
            title="Total Deposits"
            value={`+${deposits.totalDeposits.toFixed(2)}`}
            status="POSITIVE"
            dataList={dataList}
            selected={depostiPeriod}
            onClick={(period: string) => setDepositPeriod(period)}
          />
          <StatusCard
            title="Total Withdrawals"
            value={`-${deposits.totalWithdraws.toFixed(2)}`}
            status="NEGATIVE"
            dataList={dataList}
            selected={withdrawalPeriod}
            onClick={(period: string) => setWithdrawalPeriod(period)}
          />
          <StatusCard
            title="Unique Depositors"
            value={deposits.uniqueDeposits.toString()}
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
