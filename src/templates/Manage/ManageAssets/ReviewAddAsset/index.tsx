import React from 'react'
import Big from 'big.js'

import { useAppSelector } from '../../../../store/hooks'

import CreatePoolHeader from '../../CreatePool/CreatePoolHeader'
import Steps from '../../../../components/Steps'
import TransactionSummary from './TransactionSummary'
import NewAllocationsTable, {
  IAllocationListProps
} from '../../../../components/Manage/NewAllocationsTable'

import * as S from './styles'
import {
  TextContainer,
  AddAssetsTitle,
  AddAssetsText
} from '../SelectAssets/styles'

const ReviewAddAsset = () => {
  const tokens = useAppSelector(state => state.addAsset.weights)
  const tokensList: IAllocationListProps[] = tokens.map(token => {
    return {
      name: token.token.name,
      symbol: token.token.symbol,
      logo: token.token.logo,
      link: token.token.symbol,
      currentWeight: Number(Big(token.weight_normalized).mul(100).toFixed(2)),
      NewWeight: Number(Big(token.newWeight).mul(100).toFixed(2))
    }
  })

  return (
    <S.ReviewAddAsset>
      <CreatePoolHeader title="Add new assets to the pool" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to add',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Add liquidity to the pool',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 3,
            stepeTitle: 'review',
            state: 'CURRENT'
          }
        ]}
      />
      <TextContainer>
        <AddAssetsTitle>Asset addition Review</AddAssetsTitle>
        <AddAssetsText>
          Check the information one last time before proceeding
        </AddAssetsText>
      </TextContainer>

      <S.Container>
        <TransactionSummary />

        <NewAllocationsTable AllocationList={tokensList} />
      </S.Container>
    </S.ReviewAddAsset>
  )
}

export default ReviewAddAsset
