import React from 'react'

import { useAppSelector } from '@/store/hooks'

import ReviewTable from './ReviewTable'
import Steps from '../../../../../components/Steps'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

const RebalanceReview = () => {
  const periodSelect = useAppSelector(
    state => state.rebalanceAssets.periodSelect
  )

  return (
    <S.RebalanceReview>
      <CreatePoolHeader title="Change token weights" />
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
          <ReviewTable />
          <S.ExecutionPeriodCard>
            <h3>Execution period</h3>
            <span>{String(periodSelect) ?? 0} hours</span>
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
