import React from 'react'

import Steps from '../../../../../components/Steps'

import * as S from './styles'

// interface IRemoveAssetsProps {
//   test: string;
// }

const RebalanceReview = () => {
  return (
    <S.RebalanceReview>
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Set new token weights and rebalance execution period',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Review',
            state: 'CURRENT'
          }
        ]}
      />

      <S.RebalanceReviewBody>
        <h2>Rebalance Review</h2>
        <p>Check the information one last time before proceeding</p>

        <S.ReviewTableAndExecutionPeriod>
          <h1>asd</h1>
          <S.ExecutionPeriodCard>
            <h3>Execution period</h3>
            <span>30 hours</span>
            <p>
              The weight rebalance will be completed in 30 hours. Explanation
              about how will the rebalance go, with percentages and what/why it
              happens how it happens
            </p>
          </S.ExecutionPeriodCard>
        </S.ReviewTableAndExecutionPeriod>
      </S.RebalanceReviewBody>
    </S.RebalanceReview>
  )
}

export default RebalanceReview
