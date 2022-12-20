import CreatePoolHeader from '../CreatePoolHeader'
import Steps from '../../../../components/Steps'
import FundSummary from '../SelectAssets/FundSummary'
import AddLiquidityTable from './AddLiquidityTable'

import * as S from './styles'

import { mockData } from '../SelectAssets'

const AddLiquidity = () => {
  return (
    <S.AddLiquidity>
      <CreatePoolHeader title="Pool creation on"></CreatePoolHeader>

      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'set details',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 2,
            stepeTitle: 'select assets',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 3,
            stepeTitle: 'Add Liquidity',
            state: 'CURRENT'
          },
          {
            stepNumber: 4,
            stepeTitle: 'Configure Fee',
            state: 'NEXT'
          },
          {
            stepNumber: 5,
            stepeTitle: 'Review',
            state: 'NEXT'
          }
        ]}
      />

      <S.PoolContainer>
        <AddLiquidityTable />

        <FundSummary coins={mockData} />
      </S.PoolContainer>
    </S.AddLiquidity>
  )
}

export default AddLiquidity
