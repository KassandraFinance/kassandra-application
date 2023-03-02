import React from 'react'

import Steps from '../../../../../components/Steps'
import SelectTokenRemove from './SelectTokenRemove'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'
import NewAllocationTable from '../../AddLiquidity/NewAllocationTable'

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
          <NewAllocationTable assets={test} />
        </S.SelectTokenAndTableAllocation>
      </S.TokenRemovalsBody>
    </S.TokenRemoval>
  )
}

export default TokenRemoval

export const test = [
  {
    newWeight: '12',
    token: {
      decimals: 18,
      id: 'asd',
      logo: '',
      name: 'test123',
      symbol: 'test'
    },
    weight_normalized: '12'
  }
]

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
