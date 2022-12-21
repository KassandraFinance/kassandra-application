import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import FundSummary from './FundSummary'

import aave from '../../../../../public/assets/logos/aave.svg'
import matic from '../../../../../public/assets/logos/matic.svg'

import * as S from './styles'

import { CoinType } from './FundSummary'
import AssetsTable from '../AssetsTable'

interface ISelectAssetsProps {}

export const mockData: CoinType[] = [
  {
    coinName: 'Aave',
    coinSymbol: 'aave',
    coinImage: aave.src,
    price: 0.05,
    url: 'www.google.com'
  },
  {
    coinName: 'matic',
    coinSymbol: 'matic',
    coinImage: matic.src,
    price: 0.73,
    url: 'www.google.com'
  },
  {
    coinName: 'Aave',
    coinSymbol: 'aave',
    coinImage: aave.src,
    price: 0.05,
    url: 'www.google.com'
  },
  {
    coinName: 'matic',
    coinSymbol: 'matic',
    coinImage: matic.src,
    price: 0.73,
    url: 'www.google.com'
  },
  {
    coinName: 'Aave',
    coinSymbol: 'aave',
    coinImage: aave.src,
    price: 0.05,
    url: 'www.google.com'
  },
  {
    coinName: 'matic',
    coinSymbol: 'matic',
    coinImage: matic.src,
    price: 0.73,
    url: 'www.google.com'
  }
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
      <S.PoolContainer>
        <AssetsTable />

        <FundSummary coins={mockData} creation />
      </S.PoolContainer>
    </S.SelectAssets>
  )
}

export default SelectAssets
