import React from 'react'
import useSWR from 'swr'
import BigNumber from 'bn.js'

import { ERC20 } from '../../../../hooks/useERC20Contract'
import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import {
  setTokens,
  setTokenLock,
  setAllocation,
  TokenType
} from '../../../../store/reducers/poolCreationSlice'

import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import FundSummary from './FundSummary'
import AssetsTable from '../AssetsTable'

import aave from '../../../../../public/assets/logos/aave.svg'
import matic from '../../../../../public/assets/logos/matic.svg'
import btc from '../../../../../public/assets/logos/bitcon.svg'
import eth from '../../../../../public/assets/logos/eth-logo.svg'

import * as S from './styles'

import { CoinType } from './FundSummary'

export const mockData: CoinType[] = [
  {
    coinName: 'Aave',
    coinSymbol: 'aave',
    coinImage: aave.src,
    price: 0.05,
    url: 'www.google.com',
    address: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
    decimals: 18
  },
  {
    coinName: 'matic',
    coinSymbol: 'matic',
    coinImage: matic.src,
    price: 0.73,
    url: 'www.google.com',
    address: '0x0000000000000000000000000000000000001010',
    decimals: 18
  },
  {
    coinName: 'Wrapped Bitcoin',
    coinSymbol: 'wbtc',
    coinImage: btc.src,
    price: 0.05,
    url: 'www.google.com',
    address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
    decimals: 8
  },
  {
    coinName: 'WETH',
    coinSymbol: 'weth',
    coinImage: eth.src,
    price: 0.73,
    url: 'www.google.com',
    address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    decimals: 18
  }
]

export type CoinGeckoAssetsResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number,
    usd_market_cap: number
  }
}

const SelectAssets = () => {
  const dispatch = useAppDispatch()
  const tokensSummary = useAppSelector(
    state => state.poolCreation.createPoolData.tokens
  )

  const tokensList = tokensSummary ? tokensSummary : []

  const wallet = useAppSelector(state => state.userWalletAddress)

  const [tokenBalance, setTokenBalance] = React.useState<{
    [key: string]: BigNumber
  }>({})

  let totalAllocation = 0
  for (const token of tokensList) {
    totalAllocation = totalAllocation + token.allocation
  }

  let addressesList: string[] = []
  for (const token of mockData) {
    addressesList = [...addressesList, token.address]
  }

  async function getBalances() {
    let balanceArr = {}
    for (const token of mockData) {
      const { balance } = ERC20(token.address)
      const balanceValue = await balance(wallet)
      balanceArr = {
        ...balanceArr,
        [token.address]: balanceValue
      }
    }

    setTokenBalance(balanceArr)
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

  const { data } = useSWR<CoinGeckoAssetsResponseType>(
    `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${addressesList.toString()}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
  )

  React.useEffect(() => {
    getBalances()
  }, [])

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
        <AssetsTable priceList={data} tokenBalance={tokenBalance} />

        <FundSummary
          coinsList={tokensList}
          totalAllocation={totalAllocation}
          creation
          onChange={handleInput}
          onRemoveToken={handleRemoveToken}
          onLockToken={handleLockToken}
          priceList={data}
        />
      </S.PoolContainer>
    </S.SelectAssets>
  )
}

export default SelectAssets
