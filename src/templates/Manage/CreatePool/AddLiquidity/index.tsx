import React from 'react'
import BigNumber from 'bn.js'
import Big from 'big.js'
import Web3 from 'web3'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import { setLiquidity } from '../../../../store/reducers/poolCreationSlice'
import { ERC20 } from '../../../../hooks/useERC20Contract'
import useCoingecko from '@/hooks/useCoingecko'

import {
  mockTokensReverse,
  networks
} from '../../../../constants/tokenAddresses'

import CreatePoolHeader from '../CreatePoolHeader'
import Steps from '../../../../components/Steps'
import PoolSummary from '../SelectAssets/PoolSummary'
import AddLiquidityTable from './AddLiquidityTable'

import * as S from './styles'

export type CoinGeckoResponseType = {
  [key: string]: {
    usd: number,
    usd_24h_change: number
  }
}

const AddLiquidity = () => {
  const [tokensBalance, setTokensBalance] = React.useState<{
    [key: string]: BigNumber
  }>({})

  const dispatch = useAppDispatch()
  const tokensSummary = useAppSelector(
    state => state.poolCreation.createPoolData.tokens
  )
  const { network, networkId } = useAppSelector(
    state => state.poolCreation.createPoolData
  )
  const wallet = useAppSelector(state => state.userWalletAddress)

  const tokensList = tokensSummary ? tokensSummary : []

  let totalAllocation = Big(0)
  let addressesList: string[] = []
  for (const token of tokensList) {
    totalAllocation = totalAllocation.plus(token.allocation)
    addressesList = [...addressesList, token.address]
  }

  async function getBalances() {
    let balancesList = {}
    for (const token of tokensList) {
      const tokenAddress =
        networkId === 5 ? mockTokensReverse[token.address] : token.address

      const { balance } = ERC20(
        tokenAddress,
        new Web3(networks[networkId ?? 137].rpc)
      )
      const balanceValue = await balance(wallet)
      balancesList = {
        ...balancesList,
        [token.address]: balanceValue
      }
    }

    setTokensBalance(balancesList)
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    let liquidity = e.target.value

    if (liquidity.length > 0) {
      liquidity = liquidity.replace(/^0+/, '')
    }

    dispatch(
      setLiquidity({
        token: e.target.name,
        liquidity: liquidity ? liquidity : '0',
        tokenPriceList: data ? data : {}
      })
    )
  }

  function handleInputMax(token: string, liquidity: string) {
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
      const diffAllocation = 100 - Number(token.allocation)

      const balanceInDollar = Big(tokensBalance[token.address]?.toString())
        .div(Big(10).pow(token.decimals))
        .mul(Big(priceList[token.address].usd))
        .mul(Big(diffAllocation))

      if (min.gte(balanceInDollar)) {
        min = balanceInDollar
        tokenSymbol = token.symbol
        liquidity = Big(tokensBalance[token.address].toString()).div(
          Big(10).pow(token.decimals)
        )
      }
    }

    dispatch(
      setLiquidity({
        token: tokenSymbol,
        liquidity: liquidity.toString(),
        tokenPriceList: priceList
      })
    )
  }

  const { data } = useCoingecko(
    networks[networkId ?? 137].coingecko,
    networks[networkId ?? 137].nativeCurrency.address,
    addressesList
  )

  React.useEffect(() => {
    getBalances()
  }, [wallet])

  return (
    <S.AddLiquidity>
      <CreatePoolHeader
        title={`Pool creation on ${network}`}
      ></CreatePoolHeader>

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
          tokensBalance={tokensBalance}
          priceList={data}
          onChange={handleInput}
          onInputMaxClick={handleInputMax}
          onMaxClick={handleMaxClick}
        />

        <PoolSummary
          coinsList={tokensList}
          totalAllocation={totalAllocation.toNumber()}
          priceList={data}
        />
      </S.PoolContainer>
    </S.AddLiquidity>
  )
}

export default AddLiquidity
