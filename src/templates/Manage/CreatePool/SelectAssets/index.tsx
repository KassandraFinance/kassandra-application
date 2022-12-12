import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import FundSummary from './FundSummary'

import aave from '../../../../../public/assets/logos/aave.svg'
import matic from '../../../../../public/assets/logos/matic.svg'

import * as S from './styles'

import { CoinType } from './FundSummary'

interface ISelectAssetsProps {}

const mockData: CoinType[] = [
  {
    coinName: 'Aave',
    coinSymbol: 'aave',
    coinImage: aave.src,
    price: 0.051
  },
  { coinName: 'matic', coinSymbol: 'matic', coinImage: matic.src, price: 0.73 }
]

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

      <FundSummary coins={mockData} creation />
    </S.SelectAssets>
  )
}

export default SelectAssets
