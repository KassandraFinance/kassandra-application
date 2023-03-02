import React from 'react'

import ExecutionPeriod from './ExecutionPeriod'
import AllocationsTable from './AllocationsTable'
import Steps from '../../../../../components/Steps'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'

import * as S from './styles'

const SetNewWeights = () => {
  return (
    <S.SetNewWeights>
      <CreatePoolHeader title="Change token weights" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Set new token weights',
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
