import React from 'react'

import TitleSection from '@/components/TitleSection'
import BrokersOverview from './BrokersOverview'
import RewardsOvertime from './RewardsOvertime'
import BrokersTable from './BrokersTable'
import ComissionRates from './ComissionRates'

import overviewIcon from '@assets/iconGradient/product-bar.svg'

import * as S from './styles'

const Brokers = () => {
  return (
    <S.Brokers>
      <BrokersOverview />

      <S.TitleWrapper>
        <TitleSection title="Brokers" image={overviewIcon} />
      </S.TitleWrapper>

      <BrokersTable />

      <S.TitleWrapper>
        <TitleSection title="Rewards over time" image={overviewIcon} />
      </S.TitleWrapper>

      <RewardsOvertime />

      <S.TitleWrapper>
        <TitleSection title="Broker comission rates" image={overviewIcon} />
      </S.TitleWrapper>

      <ComissionRates />
    </S.Brokers>
  )
}

export default Brokers
