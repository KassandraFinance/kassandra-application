import React from 'react'

import CreatePoolHeader from '../../CreatePool/CreatePoolHeader'
import Steps from '../../../../components/Steps'
import NewAllocationTable from './NewAllocationTable'
import AddLiquidityOperation from './AddLiquidityOperation'

import * as S from './styles'
import {
  TextContainer,
  AddAssetsTitle,
  AddAssetsText
} from '../SelectAssets/styles'

const AddLiquidity = () => {
  return (
    <S.AddLiquidity>
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
            state: 'CURRENT'
          },
          {
            stepNumber: 3,
            stepeTitle: 'review',
            state: 'NEXT'
          }
        ]}
      />
      <TextContainer>
        <AddAssetsTitle>Liquidity addition</AddAssetsTitle>
        <AddAssetsText>
          Add the necessary liquidity to add the selected asset
        </AddAssetsText>
      </TextContainer>

      <S.Container>
        <AddLiquidityOperation />

        <NewAllocationTable />
      </S.Container>
    </S.AddLiquidity>
  )
}

export default AddLiquidity
