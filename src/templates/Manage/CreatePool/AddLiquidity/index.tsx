import { useAppSelector } from '../../../../store/hooks'

import CreatePoolHeader from '../CreatePoolHeader'
import Steps from '../../../../components/Steps'
import FundSummary from '../SelectAssets/FundSummary'
import AddLiquidityTable from './AddLiquidityTable'

import * as S from './styles'

const AddLiquidity = () => {
  const tokensSummary = useAppSelector(
    state => state.poolCreation.createPoolData.tokens
  )

  const tokensList = tokensSummary ? tokensSummary : []

  let totalAllocation = 0
  for (const token of tokensList) {
    totalAllocation = totalAllocation + token.allocation
  }

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

        <FundSummary coinsList={tokensList} totalAllocation={totalAllocation} />
      </S.PoolContainer>
    </S.AddLiquidity>
  )
}

export default AddLiquidity
