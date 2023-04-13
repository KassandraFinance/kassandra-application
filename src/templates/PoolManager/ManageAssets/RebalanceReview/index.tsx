import React from 'react'

import { useAppSelector } from '@/store/hooks'

import ReviewTable from './ReviewTable'
import Steps from '../../../../components/Steps'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'
import WarningCard from '@/components/WarningCard'

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
            stepeTitle: 'Set new token weights',
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
          <S.ExecutionPeriodCardContainer>
            <S.ExecutionPeriodCard>
              <h3>Execution period</h3>
              <span>{String(periodSelect) ?? 0} hours</span>
              <p>
                The weight rebalance will be completed in{' '}
                {String(periodSelect) ?? 0} hours. Explanation about how will
                the rebalance go, with percentages and what/why it happens how
                it happens
              </p>
            </S.ExecutionPeriodCard>

            <WarningCard>
              <p>
                You <strong>will not be able</strong> to cancel the rebalancing
                process after you have approved all steps
              </p>
            </WarningCard>
          </S.ExecutionPeriodCardContainer>
        </S.ReviewTableAndExecutionPeriod>
      </S.RebalanceReviewBody>
    </S.RebalanceReview>
  )
}

export default RebalanceReview
