import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import request from 'graphql-request'
import BigNumber from 'bn.js'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import useWhiteList from '@/hooks/useWhiteList'
import { getAddress } from 'ethers'

import { ERC20 } from '../../../../hooks/useERC20Contract'
import useCoingecko from '@/hooks/useCoingecko'
import {
  BACKEND_KASSANDRA,
  networks,
  mockTokens,
  mockTokensReverse
} from '../../../../constants/tokenAddresses'
import { GET_INFO_TOKENS } from './graphql'

import AddAssetTable from './AddAssetTable'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'
import Steps from '../../../../components/Steps'

import * as S from './styles'

export type TokensInfoResponseType = {
  id: string
  logo: string
  name: string
  symbol: string
  decimals: number
}

export type TokensListType = TokensInfoResponseType & { balance?: BigNumber }

export type CoinGeckoAssetsResponseType = {
  [key: string]: {
    usd: number
    pricePercentageChangeIn24h: number
    marketCap: number
  }
}

const SelectAssets = () => {
  const [whitelist, setWhitelist] = React.useState<string[]>()
  const [tokensList, setTokensList] = React.useState<TokensListType[]>([])

  const router = useRouter()

  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()

  const chainId = Number(connectedChain?.id ?? '0x89')
  const { tokensWhitelist } = useWhiteList(chainId)

  const tokensListGoerli =
    chainId === 5
      ? whitelist?.map((token: string) => getAddress(mockTokens[token]))
      : whitelist

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const params = {
    id: poolId,
    whitelist: tokensListGoerli
  }

  const { data } = useSWR<{
    tokensByIds: TokensInfoResponseType[]
    pool: { underlying_assets_addresses: string[] }
  }>([GET_INFO_TOKENS, params], (query, params) =>
    request(BACKEND_KASSANDRA, query, params)
  )

  const { data: priceData } = useCoingecko(
    chainId,
    networks[chainId].nativeCurrency.address,
    tokensListGoerli ?? []
  )

  React.useEffect(() => {
    if (!data) {
      return
    }

    if (chainId === 5) {
      setTokensList(
        data?.tokensByIds.filter(
          element =>
            element &&
            !data?.pool?.underlying_assets_addresses.includes(
              mockTokensReverse[element?.id.toLowerCase()]
            )
        )
      )
    } else {
      setTokensList(
        data?.tokensByIds.filter(
          element =>
            element &&
            !data?.pool?.underlying_assets_addresses.includes(element?.id)
        )
      )
    }
  }, [data])

  React.useEffect(() => {
    const getWhitelist = async () => {
      try {
        const whitelist = await tokensWhitelist()
        setWhitelist(whitelist)
      } catch (error) {
        console.error('It was not possible to get whitelist')
      }
    }
    getWhitelist()
  }, [])

  React.useEffect(() => {
    async function getBalances(tokensList: string[]) {
      if (!wallet) return

      type BalanceType = Record<string, BigNumber>
      let balanceArr: BalanceType = {}
      for (const token of tokensList) {
        const { balance } = ERC20(token)
        const balanceValue = await balance(wallet.accounts[0].address)
        balanceArr = {
          ...balanceArr,
          [mockTokens[token] ?? token.toLowerCase()]: balanceValue
        }
      }

      setTokensList(prev => {
        const newArr = prev.map(item => {
          item.balance = balanceArr[item?.id?.toLowerCase()]
          return item
        })
        return newArr
      })
    }

    if (data) {
      getBalances(whitelist ?? [])
    }
  }, [whitelist, wallet, data])

  return (
    <S.SelectAssets>
      <CreatePoolHeader title="Add new assets to the pool" />

      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to add',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Add liquidity to the pool',
            state: 'NEXT'
          },
          {
            stepNumber: 3,
            stepeTitle: 'review',
            state: 'NEXT'
          }
        ]}
      />

      <S.TextContainer>
        <S.AddAssetsTitle>Token addition</S.AddAssetsTitle>
        <S.AddAssetsText>
          Select from the list the asset that will be added to the pool
        </S.AddAssetsText>
      </S.TextContainer>

      <AddAssetTable tokensData={tokensList} priceList={priceData} />
    </S.SelectAssets>
  )
}

export default SelectAssets
