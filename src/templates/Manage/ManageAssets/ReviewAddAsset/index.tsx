import React from 'react'

import CreatePoolHeader from '../../CreatePool/CreatePoolHeader'
import Steps from '../../../../components/Steps'

import * as S from './styles'
import {
  TextContainer,
  AddAssetsTitle,
  AddAssetsText
} from '../SelectAssets/styles'

const ReviewAddAsset = () => {
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

      <S.Container></S.Container>
    </S.ReviewAddAsset>
  )
}

export default ReviewAddAsset
