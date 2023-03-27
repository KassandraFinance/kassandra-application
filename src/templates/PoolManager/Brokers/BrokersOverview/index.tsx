import React from 'react'

import StatusCard from '@/components/Manage/StatusCard'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const BrokersOverview = () => {
  const [depositsPeriod, setDepositsPeriod] = React.useState<string>('1D')

  const [rewardsPeriod, setRewardsPeriod] = React.useState<string>('1D')

  return (
    <S.BrokersOverview>
      <StatusCard
        title="Brokered Deposits"
        value="$251,360.00"
        dataList={dataList}
        selected={depositsPeriod}
        onClick={period => setDepositsPeriod(period)}
      />
      <StatusCard
        title="Brokers rewards"
        value="$251,360.00"
        dataList={dataList}
        selected={rewardsPeriod}
        onClick={period => setRewardsPeriod(period)}
      />
      <StatusCard title="Total Deposits" value="$251,360.00" />
      <StatusCard title="Unique Depositors" value="$251,360.00" />
    </S.BrokersOverview>
  )
}

export default BrokersOverview
