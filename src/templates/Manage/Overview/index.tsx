import React from 'react'

import TitleSection from '../../../components/TitleSection'
import StatusCard from './StatusCard'
import TVMChart from './TVMChart'

import managerOveriewIcon from '../../../../public/assets/iconGradient/section-title-eye.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const Overview = () => {
  const [depostiPeriod, setDepositPeriod] = React.useState<string>('1D')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')

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
    </S.Overview>
  )
}

export default Overview
