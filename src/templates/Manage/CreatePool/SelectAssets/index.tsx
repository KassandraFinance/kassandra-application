import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import FundSummary from './FundSummary'
import * as S from './styles'

interface ISelectAssetsProps {}

const SelectAssets = ({}: ISelectAssetsProps) => {
  return (
    <S.SelectAssets>
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
            state: 'CURRENT'
          },
          {
            stepNumber: 3,
            stepeTitle: 'Add Liquidity',
            state: 'NEXT'
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

      <FundSummary />
    </S.SelectAssets>
  )
}

export default SelectAssets
