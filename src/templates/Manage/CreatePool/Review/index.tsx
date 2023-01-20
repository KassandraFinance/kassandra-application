import React from 'react'

import { useAppSelector } from '../../../../store/hooks'

import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import PoolReview from './PoolReview'
import PriceFee from './PriceFee'

import * as S from './styles'

const Review = () => {
  const network = useAppSelector(
    state => state.poolCreation.createPoolData.network
  )

  return (
    <S.Review>
      <CreatePoolHeader title={`Create pool on ${network}`} />

      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'set details',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 2,
            stepeTitle: 'select assets',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 3,
            stepeTitle: 'Add Liquidity',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 4,
            stepeTitle: 'Configure Fee',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 5,
            stepeTitle: 'Review',
            state: 'CURRENT'
          }
        ]}
      />
      <S.ReviewContainer>
        <PoolReview />
        <PriceFee />
      </S.ReviewContainer>
    </S.Review>
  )
}

export default Review
