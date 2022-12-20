import React from 'react'

import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import PoolReview from './PoolReview'
import PriceFee from './PriceFee'

import * as S from './styles'

const Review = () => {
  return (
    <S.Review>
      <CreatePoolHeader title={`Create pool on Avalanche`} />

      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'set details',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'select assets',
            state: 'CURRENT'
          },
          {
            stepNumber: 3,
            stepeTitle: 'Add Liquidity',
            state: 'CURRENT'
          },
          {
            stepNumber: 4,
            stepeTitle: 'Configure Fee',
            state: 'CURRENT'
          },
          {
            stepNumber: 5,
            stepeTitle: 'Review',
            state: 'NEXT'
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
