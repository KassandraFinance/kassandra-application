import React from 'react'

import Steps from '../../../../../components/Steps'
import SelectTokenRemove from './SelectTokenRemove'
import CreatePoolHeader from '../../../CreatePool/CreatePoolHeader'

import * as S from './styles'

const TokenRemoval = () => {
  return (
    <S.TokenRemoval>
      <CreatePoolHeader title="remove asset from the pool" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to remove',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Review',
            state: 'NEXT'
          }
        ]}
      />
      <S.TokenRemovalsBody>
        <h2>asset removal</h2>
        <p>Select the token you wish to be removed from the pool</p>

        <S.SelectTokenAndTableAllocation>
          <SelectTokenRemove />
          {/* table */}
        </S.SelectTokenAndTableAllocation>
      </S.TokenRemovalsBody>
    </S.TokenRemoval>
  )
}

export default TokenRemoval
