import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import FundSummary from './FundSummary'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import {
  setTokens,
  setTokenLock,
  setAllocation,
  TokenType
} from '../../../../store/reducers/poolCreationSlice'

import aave from '../../../../../public/assets/logos/aave.svg'
import matic from '../../../../../public/assets/logos/matic.svg'

import * as S from './styles'

import { CoinType } from './FundSummary'
import AssetsTable from '../AssetsTable'

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
    coinName: 'Bitcoin',
    coinSymbol: 'btc',
    coinImage: aave.src,
    price: 0.05,
    url: 'www.google.com'
  },
  {
    coinName: 'Etherium',
    coinSymbol: 'eth',
    coinImage: matic.src,
    price: 0.73,
    url: 'www.google.com'
  },
  {
    coinName: 'Kacy',
    coinSymbol: 'kacy',
    coinImage: aave.src,
    price: 0.05,
    url: 'www.google.com'
  },
  {
    coinName: 'Pangolin',
    coinSymbol: 'png',
    coinImage: matic.src,
    price: 0.73,
    url: 'www.google.com'
  }
]

const SelectAssets = () => {
  const dispatch = useAppDispatch()
  const tokensSummary = useAppSelector(
    state => state.poolCreation.createPoolData.tokens
  )

  const tokensList = tokensSummary ? tokensSummary : []

  let totalAllocation = 0
  for (const token of tokensList) {
    totalAllocation = totalAllocation + token.allocation
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      setAllocation({
        token: e.target.name,
        allocation: Number(e.target.value)
      })
    )
  }

  function handleRemoveToken(token: TokenType) {
    dispatch(setTokens(token))
  }

  function handleLockToken(id: string) {
    dispatch(setTokenLock(id))
  }
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

        <FundSummary
          coinsList={tokensList}
          totalAllocation={totalAllocation}
          creation
          onChange={handleInput}
          onRemoveToken={handleRemoveToken}
          onLockToken={handleLockToken}
        />
      </S.PoolContainer>
    </S.SelectAssets>
  )
}

export default SelectAssets
