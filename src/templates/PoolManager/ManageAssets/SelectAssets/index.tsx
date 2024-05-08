import React from 'react'
import { useRouter } from 'next/router'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import useWhiteList from '@/hooks/useWhiteList'
import { getAddress } from 'ethers'
import Big from 'big.js'

import { useTokensData } from '@/hooks/query/useTokensData'
import useBatchRequests from '@/hooks/useBatchRequests'
import { mockTokens, mockTokensReverse } from '@/constants/tokenAddresses'
import { useTokensInfo } from '@/hooks/query/useTokensInfo'

import AddAssetTable from './AddAssetTable'
import CreatePoolHeader from '@/templates/Manage/CreatePool/CreatePoolHeader'
import Steps from '@/components/Steps'

import * as S from './styles'

export type TokensInfoResponseType = {
  __typename?: 'Token' | undefined
  id: string
  name?: string | null | undefined
  logo?: string | null | undefined
  symbol?: string | null | undefined
  decimals?: number | null | undefined
  balance?: Big
} | null

const SelectAssets = () => {
  const [whitelist, setWhitelist] = React.useState<string[]>()
  const [tokensList, setTokensList] = React.useState<TokensInfoResponseType[]>(
    []
  )

  const router = useRouter()

  const [{ wallet }] = useConnectWallet()
  const [{ connectedChain }] = useSetChain()

  const chainId = Number(connectedChain?.id ?? '0x89')

  const { balances } = useBatchRequests(chainId)
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
    whitelist: tokensListGoerli || []
  }

  const { data } = useTokensInfo(params)

  const { data: priceData } = useTokensData({
    chainId,
    tokenAddresses: tokensListGoerli ?? []
  })

  React.useEffect(() => {
    if (!data) {
      return
    }

    if (chainId === 5) {
      setTokensList(
        data?.tokens?.filter(
          element =>
            element &&
            !data?.pool?.underlying_assets_addresses.includes(
              mockTokensReverse[element?.id.toLowerCase()]
            )
        )
      )
    } else {
      setTokensList(
        data?.tokens?.filter(
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

      const res = await balances(wallet.accounts[0].address, tokensList)

      type BalanceType = Record<string, Big>
      const balanceArr: BalanceType = {}

      if (chainId === 5) {
        for (const [i, token] of tokensList.entries()) {
          balanceArr[mockTokens[token]] = Big(res[i].toString())
        }
      } else {
        for (const [i, token] of tokensList.entries()) {
          balanceArr[token.toLowerCase()] = Big(res[i].toString())
        }
      }

      setTokensList(prev => {
        const newArr = prev.map(item => {
          if (item) {
            item.balance = balanceArr[item?.id?.toLowerCase()]
          }
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
      <CreatePoolHeader title="Add new assets to the portfolio" />

      <Steps
        steps={[
          {
            stepNumber: 1,
            stepeTitle: 'Select asset to add',
            state: 'CURRENT'
          },
          {
            stepNumber: 2,
            stepeTitle: 'Add liquidity to the portfolio',
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
          Select from the list the asset that will be added to the portfolio
        </S.AddAssetsText>
      </S.TextContainer>

      <AddAssetTable tokensData={tokensList} priceList={priceData} />
    </S.SelectAssets>
  )
}

export default SelectAssets
