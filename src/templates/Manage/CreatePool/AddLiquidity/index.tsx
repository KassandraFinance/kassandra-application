import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import useBatchRequests from '@/hooks/useBatchRequests'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setLiquidity,
  setMethodCreate
} from '@/store/reducers/poolCreationSlice'
import { useTokensData } from '@/hooks/query/useTokensData'
import useGetToken from '@/hooks/useGetToken'

import {
  mockTokens,
  networks,
  mockTokensReverse
} from '@/constants/tokenAddresses'

import SelectMethodToAddLiquidity from './SelectMethodToAddLiquidity'
import CreatePoolHeader from '../CreatePoolHeader'
import Steps from '@/components/Steps'
import PoolSummary from '../SelectAssets/PoolSummary'
import AddLiquidityTable from './AddLiquidityTable'
import AddLiquidityAsset from './AddLiquidityAsset'

import * as S from './styles'

export type CoinGeckoResponseType = {
  [key: string]: {
    heimdallId: string
    name: string
    symbol: string
    logo: string
    usd: string
    marketCap: number
    volume: number
    pricePercentageChangeIn24h: number
    pricePercentageChangeIn7d: number
    decimals: number
    sparklineFrom7d: number[]
  }
}

export type BalancesType = Record<string, Big>

const AddLiquidity = () => {
  const [tokensBalance, setTokensBalance] = React.useState<BalancesType>({})

  const dispatch = useAppDispatch()
  const {
    network,
    networkId,
    tokens: tokensSummary,
    methodCreate
  } = useAppSelector(state => state.poolCreation.createPoolData)

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

  const { data } = useTokensData({
    chainId: networkId || 137,
    tokenAddresses: []
  })

  const { priceToken } = useGetToken({
    nativeTokenAddress: networks[networkId ?? 137].nativeCurrency.address,
    tokens: data || {}
  })

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
      arr = data ? Object.keys(data) : []
    }

    async function getBalances(userWalletAddress: string, tokens: string[]) {
      const res = await balances(userWalletAddress, tokens)

      const balancesArr: BalancesType = {}
      if (networkId === 5) {
        for (const [i, token] of tokens.entries()) {
          balancesArr[mockTokens[token]] = Big(res[i].toString())
        }
      } else {
        for (const [i, token] of tokens.entries()) {
          balancesArr[token] = Big(res[i].toString())
        }
      }

      setTokensBalance(balancesArr)
    }

    if (wallet?.provider && data) {
      getBalances(wallet.accounts[0].address, arr)
    }
  }, [wallet, data])

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
        <S.AddLiquidityContainer>
          <SelectMethodToAddLiquidity
            setMethod={(param: 'any-asset' | 'pool-assets') =>
              dispatch(setMethodCreate(param))
            }
            method={methodCreate}
          />
          {methodCreate === 'any-asset' ? (
            data && (
              <AddLiquidityAsset
                tokensList={data}
                tokensBalance={tokensBalance}
                priceToken={priceToken}
              />
            )
          ) : (
            <AddLiquidityTable
              coinsList={tokensList}
              tokensBalance={tokensBalance}
              priceList={data}
              onChange={handleInput}
              onInputMaxClick={handleInputMax}
              onMaxClick={handleMaxClick}
            />
          )}
        </S.AddLiquidityContainer>

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
