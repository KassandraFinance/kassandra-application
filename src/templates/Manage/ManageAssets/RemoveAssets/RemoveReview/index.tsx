import React from 'react'
import NewAllocationsTable from '../../../../../components/Manage/NewAllocationsTable'

import Steps from '../../../../../components/Steps'
import CreatePoolHeader from '../../../CreatePool/CreatePoolHeader'

import * as S from './styles'

// interface IRemoveReviewProps {
//   test: string;
// }

const RemoveReview = () => {
  return (
    <S.RemoveReview>
      <CreatePoolHeader title="remove asset from the pool" />
      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to remove',
            state: 'PREVIOUS'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Review',
            state: 'CURRENT'
          }
        ]}
      />
      <S.RemoveReviewBody>
        <h2>Asset Removal Review</h2>
        <p>Check the information one last time before proceeding</p>

        <S.ReviewCardAndTable>
          <h1>CARD REMOVE</h1>
          <NewAllocationsTable AllocationList={mockCoinsList} />
        </S.ReviewCardAndTable>
      </S.RemoveReviewBody>
    </S.RemoveReview>
  )
}

export default RemoveReview

export const mockCoinsList = [
  {
    logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    name: 'Polygon ',
    link: '',
    symbol: 'MATIC',
    currentWeight: 20,
    NewWeight: 20
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700',
    name: 'Chainlink',
    link: '',
    symbol: 'LINK',
    currentWeight: 60,
    NewWeight: 60
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png?1600306604',
    name: 'Uniswap',
    link: '',
    symbol: 'UNI',
    currentWeight: 20,
    NewWeight: 20
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/22918/small/kacy.png?1643459818',
    name: 'Kassandra',
    link: '',
    symbol: 'KACY',
    currentWeight: 70,
    NewWeight: 70
  },
  {
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png?1670992574',
    name: 'Avalanche',
    link: '',
    symbol: 'AVAX',
    currentWeight: 1,
    NewWeight: 80
  }
]
