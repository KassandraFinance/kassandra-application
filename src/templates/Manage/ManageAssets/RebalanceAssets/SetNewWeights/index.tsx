import React from 'react'

import Steps from '../../../../../components/Steps'
import ExecutionPeriod from './ExecutionPeriod'
import AllocationsTable from './AllocationsTable'

import * as S from './styles'

// interface IRemoveAssetsProps {
//   test: string;
// }

const SetNewWeights = () => {
  return (
    <S.SetNewWeights>
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Set new token weights and rebalance execution period',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Review',
            state: 'NEXT'
          }
        ]}
      />

      <S.SetNewWeightsBody>
        <h2>Token Weights</h2>
        <p>Define the new Allocations of the assets that make up the pool</p>

        <S.AllocationsAndExecutionPeriod>
          <AllocationsTable />
          <ExecutionPeriod />
        </S.AllocationsAndExecutionPeriod>
      </S.SetNewWeightsBody>
    </S.SetNewWeights>
  )
}

export default SetNewWeights
