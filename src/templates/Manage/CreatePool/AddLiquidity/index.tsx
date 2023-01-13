import React from 'react'
import useSWR from 'swr'
import BigNumber from 'bn.js'
import Big from 'big.js'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import {
  setLiquidity,
  setPoolData
} from '../../../../store/reducers/poolCreationSlice'
import { ERC20 } from '../../../../hooks/useERC20Contract'

import CreatePoolHeader from '../CreatePoolHeader'
import Steps from '../../../../components/Steps'
import FundSummary from '../SelectAssets/FundSummary'
import AddLiquidityTable from './AddLiquidityTable'

import * as S from './styles'

export type CoinGeckoResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number
  }
}

const mockBalance: { [key: string]: BigNumber } = {
  '0xd6df932a45c0f255f85145f286ea0b292b21c90b': new BigNumber(50).mul(
    new BigNumber(10).pow(new BigNumber(18))
  ),
  '0x0000000000000000000000000000000000001010': new BigNumber(300).mul(
    new BigNumber(10).pow(new BigNumber(18))
  ),
  '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6': new BigNumber(2).mul(
    new BigNumber(10).pow(new BigNumber(6))
  ),
  '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619': new BigNumber(3).mul(
    new BigNumber(10).pow(new BigNumber(18))
  )
}
const AddLiquidity = () => {
  const dispatch = useAppDispatch()
  const tokensSummary = useAppSelector(
    state => state.poolCreation.createPoolData.tokens
  )
  const tokensList = tokensSummary ? tokensSummary : []
  const wallet = useAppSelector(state => state.userWalletAddress)

  let totalAllocation = 0
  let addressesList: string[] = []
  for (const token of tokensList) {
    totalAllocation = totalAllocation + token.allocation
    addressesList = [...addressesList, token.address]
  }

  async function getBalances() {
    let balancesList = {}
    for (const token of tokensList) {
      const { balance } = ERC20(token.address)
      const balanceValue = await balance(wallet)
      balancesList = {
        ...balancesList,
        [token.address]: balanceValue
      }
    }

    dispatch(setPoolData({ tokensBalance: mockBalance }))
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      setLiquidity({
        token: e.target.name,
        liquidity: Big(e.target.value ? e.target.value : 0),
        tokenPriceList: data ? data : {}
      })
    )
  }

  function handleInputMax(token: string, liquidity: Big) {
    dispatch(
      setLiquidity({
        token: token,
        liquidity: liquidity,
        tokenPriceList: data ? data : {}
      })
    )
  }

  function handleMaxClick(priceList: CoinGeckoResponseType) {
    let min = Big('99999999999999999999999999999999999999999999999999')
    let tokenSymbol = ''
    let liquidity = Big(0)
    for (const token of tokensList) {
      const diffAllocation = 100 - token.allocation

      const balanceInDollar = Big(mockBalance[token.address].toString())
        .div(Big(10).pow(token.decimals))
        .mul(Big(priceList[token.address].usd))
        .mul(Big(diffAllocation))

      if (min.gte(balanceInDollar)) {
        min = balanceInDollar
        tokenSymbol = token.symbol
        liquidity = Big(mockBalance[token.address].toString()).div(
          Big(10).pow(token.decimals)
        )
      }
    }

    dispatch(
      setLiquidity({
        token: tokenSymbol,
        liquidity: liquidity,
        tokenPriceList: priceList
      })
    )
  }

  const { data } = useSWR<CoinGeckoResponseType>(
    `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${addressesList.toString()}&vs_currencies=usd&include_24hr_change=true`
  )

  React.useEffect(() => {
    getBalances()
  }, [])

  console.log(typeof tokensList[0].amount)
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
        <AddLiquidityTable
          coinsList={tokensList}
          tokenBalance={mockBalance}
          priceList={data}
          onChange={handleInput}
          onInputMaxClick={handleInputMax}
          onMaxClick={handleMaxClick}
        />

        <FundSummary
          coinsList={tokensList}
          totalAllocation={totalAllocation}
          priceList={data}
        />
      </S.PoolContainer>
    </S.AddLiquidity>
  )
}

export default AddLiquidity
