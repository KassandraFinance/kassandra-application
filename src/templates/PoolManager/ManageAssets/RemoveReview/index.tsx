import React from 'react'
import Big from 'big.js'

import { useAppSelector } from '@/store/hooks'

import Steps from '@/components/Steps'
import TransactionSummaryCard from './TransactionSummaryCard'
import NewAllocationsTable from '@/components/Manage/NewAllocationsTable'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

const RemoveReview = () => {
  const { weights } = useAppSelector(state => state.removeAsset)

  const weightsTokensList = weights.map(item => {
    return {
      name: item.token.name,
      symbol: item.token.symbol,
      logo: item.token.logo,
      link: item.token.symbol,
      currentWeight: Number(Big(item.weight_normalized).mul(100).toFixed(2)),
      NewWeight: Number(Big(item.newWeight).mul(100).toFixed(2))
    }
  })

  return (
    <S.RemoveReview>
      <CreatePoolHeader title="remove asset from the pool" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to remove',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Review',
            state: 'CURRENT'
          }
        ]}
      />
      <S.RemoveReviewBody>
        <h2>Asset Removal Review</h2>
        <p>Check the information one last time before proceeding</p>

        <S.ReviewCardAndTable>
          <TransactionSummaryCard />
          <NewAllocationsTable AllocationList={weightsTokensList} />
        </S.ReviewCardAndTable>
      </S.RemoveReviewBody>
    </S.RemoveReview>
  )
}

export default RemoveReview
