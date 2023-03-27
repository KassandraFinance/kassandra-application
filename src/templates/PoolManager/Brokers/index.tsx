import React from 'react'

import TitleSection from '@/components/TitleSection'
import StatusCard from '@/components/Manage/StatusCard'

import overviewIcon from '@assets/iconGradient/product-bar.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const Brokers = () => {
  const [depositsPeriod, setDepositsPeriod] = React.useState<string>('1D')

  const [rewardsPeriod, setRewardsPeriod] = React.useState<string>('1D')

  return (
    <S.Brokers>
      <S.TitleWrapper>
        <TitleSection title="Overview" image={overviewIcon} />
      </S.TitleWrapper>

      <S.StatusCardContainer>
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
      </S.StatusCardContainer>

      <S.TitleWrapper>
        <TitleSection title="Brokers" image={overviewIcon} />
      </S.TitleWrapper>

      <S.TitleWrapper>
        <TitleSection title="Rewards over time" image={overviewIcon} />
      </S.TitleWrapper>

      <S.TitleWrapper>
        <TitleSection title="Broker comission rates" image={overviewIcon} />
      </S.TitleWrapper>
    </S.Brokers>
  )
}

export default Brokers
