import React from 'react'

import TitleSection from '../../../components/TitleSection'
import TVMChart from '../../../components/Manage/TVMChart'
import StatusCard from '../../../components/Manage/StatusCard'

import PoolAssets from './PoolAssets'

import poolsAssetsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

interface IAnalyticsProps {
  poolId: string;
}

const Analytics = (props: IAnalyticsProps) => {
  const [depostiPeriod, setDepositPeriod] = React.useState<string>('1D')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')

  return (
    <S.Analytics>
      <S.ManagerOverviewContainer>
        <S.ChartWrapper>
          <TVMChart />
        </S.ChartWrapper>

        <S.StatsContainer>
          <StatusCard
            title="Total Deposits"
            value="+$251,360.00"
            status="POSITIVE"
            dataList={dataList}
            selected={depostiPeriod}
            onClick={(period: string) => setDepositPeriod(period)}
          />
          <StatusCard
            title="Total Withdrawals"
            value="-$2,204.21"
            status="NEGATIVE"
            dataList={dataList}
            selected={withdrawalPeriod}
            onClick={(period: string) => setWithdrawalPeriod(period)}
          />
          <StatusCard title="Unique Depositors" value="362" />
        </S.StatsContainer>
      </S.ManagerOverviewContainer>
      <S.TitleWrapper>
        <TitleSection title="Pool Assets" image={poolsAssetsIcon} />
      </S.TitleWrapper>
      <PoolAssets poolId={props.poolId} />
    </S.Analytics>
  )
}

export default Analytics
