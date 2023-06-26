import React from 'react'
import BigNumber from 'bn.js'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import useBatchRequests from '@/hooks/useBatchRequests'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setLiquidity } from '@/store/reducers/poolCreationSlice'
import useCoingecko from '@/hooks/useCoingecko'

import {
  mockTokens,
  networks,
  mockTokensReverse
} from '@/constants/tokenAddresses'

import CreatePoolHeader from '../CreatePoolHeader'
import Steps from '@/components/Steps'
import PoolSummary from '../SelectAssets/PoolSummary'
import AddLiquidityTable from './AddLiquidityTable'

import * as S from './styles'

export type CoinGeckoResponseType = {
  [key: string]: {
    usd: number
    pricePercentageChangeIn24h: number
  }
}

type BalancesType = Record<string, BigNumber>

const AddLiquidity = () => {
  const [tokensBalance, setTokensBalance] = React.useState<BalancesType>({})

  const dispatch = useAppDispatch()
  const tokensSummary = useAppSelector(
    state => state.poolCreation.createPoolData.tokens
  )
  const { network, networkId } = useAppSelector(
    state => state.poolCreation.createPoolData
  )

  const { balances } = useBatchRequests(networkId || 137)

  const [{ wallet }] = useConnectWallet()

  const tokensList = tokensSummary ? tokensSummary : []

  let totalAllocation = Big(0)
  let addressesList: string[] = []
  for (const token of tokensList) {
    totalAllocation = totalAllocation.plus(token.allocation)
    addressesList = [...addressesList, token.address]
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
    networkId ?? 137,
    networks[networkId ?? 137].nativeCurrency.address,
    addressesList
  )

  React.useEffect(() => {
    if (!tokensList) {
      return
    }

    let arr = []
    if (networkId === 5) {
      arr = tokensList.map(token =>
        getAddress(mockTokensReverse[token.address.toLowerCase()])
      )
    } else {
      arr = tokensList.map(token => token.address)
    }

    async function getBalances(userWalletAddress: string, tokens: string[]) {
      const res = await balances(userWalletAddress, tokens)

      const balancesArr: BalancesType = {}
      if (networkId === 5) {
        for (const [i, token] of tokens.entries()) {
          balancesArr[mockTokens[token]] = new BigNumber(res[i].toString())
        }
      } else {
        for (const [i, token] of tokens.entries()) {
          balancesArr[token] = res[i].toString()
        }
      }

      setTokensBalance(balancesArr)
    }

    if (wallet?.provider) {
      getBalances(wallet.accounts[0].address, arr)
    }
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
