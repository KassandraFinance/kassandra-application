import React from 'react'

// import RebalanceReview from './RebalanceReview'
import SetNewWeights from './SetNewWeights'
import CreatePoolHeader from '../../CreatePool/CreatePoolHeader'

import * as S from './styles'

// interface IRemoveAssetsProps {
//   test: string;
// }

const RebalanceAssets = () => {
  return (
    <S.RebalanceAssets>
      <CreatePoolHeader title="Change token weights" />
      {/* <Steps
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
      /> */}

      {/* <S.RebalanceAssetsBody>
        <h2>Token Weights</h2>
        <p>Define the new Allocations of the assets that make up the pool</p>

        <S.AllocationsAndExecutionPeriod>
          <AllocationsTable />
          <ExecutionPeriod />
        </S.AllocationsAndExecutionPeriod>
      </S.RebalanceAssetsBody> */}
      <SetNewWeights />
      {/* <RebalanceReview /> */}
    </S.RebalanceAssets>
  )
}

export default RebalanceAssets
