import React from 'react'
import Big from 'big.js'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { useTokens } from '@/hooks/query/useTokens'
import { useTokensData } from '@/hooks/query/useTokensData'
import useWhiteList from '@/hooks/useWhiteList'
import useBatchRequests from '@/hooks/useBatchRequests'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  setTokens,
  setTokenLock,
  setAllocation,
  TokenType
} from '@/store/reducers/poolCreationSlice'

import { mockTokens } from '@/constants/tokenAddresses'

import Steps from '@/components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import PoolSummary from './PoolSummary'
import AssetsTable from '../AssetsTable'

import * as S from './styles'

export type TokensInfoResponseType = {
  __typename?: 'Token' | undefined
  id: string
  decimals?: number | null | undefined
  logo?: string | null | undefined
  name?: string | null | undefined
  symbol?: string | null | undefined
}

type BalancesType = Record<string, Big>

const SelectAssets = () => {
  const [whitelist, setWhitelist] = React.useState<string[]>()
  const [tokenBalance, setTokenBalance] = React.useState<BalancesType>({})

  const [{ wallet }] = useConnectWallet()

  const dispatch = useAppDispatch()
  const tokensSummary = useAppSelector(
    state => state.poolCreation.createPoolData.tokens
  )
  const { network, networkId } = useAppSelector(
    state => state.poolCreation.createPoolData
  )
  const { tokensWhitelist } = useWhiteList(networkId || 137)
  const { balances } = useBatchRequests(networkId || 137)

  const tokensList = tokensSummary ? tokensSummary : []

  const whitelistTokenAddresses =
    networkId === 5
      ? whitelist?.map((token: string) => getAddress(mockTokens[token]))
      : whitelist

  let totalAllocation = Big(0)
  for (const token of tokensList) {
    totalAllocation = totalAllocation.plus(token.allocation)
  }

  const { data } = useTokens({ tokensList: whitelistTokenAddresses || [] })

  const tokensListFiltered = data
    ? data?.filter((element): element is Exclude<typeof element, null> => {
        return element !== null
      })
    : []

  const { data: priceData } = useTokensData({
    chainId: networkId || 137,
    tokenAddresses: whitelistTokenAddresses || []
  })

  function handleInput(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    isLocked: boolean
  ) {
    let allocation = e.target.value

    if (allocation.length > 0) {
      allocation = allocation.replace(/^0+/, '')
      if (!isLocked && Number(allocation) > 0) {
        handleLockToken(key)
      } else if (isLocked && Number(allocation) <= 0) {
        handleLockToken(key)
      }
    } else if (isLocked) {
      handleLockToken(key)
    }

    dispatch(
      setAllocation({
        token: e.target.name,
        allocation: allocation ? allocation : '0'
      })
    )
  }

  function handleRemoveToken(token: TokenType) {
    dispatch(setTokens(token))
  }

  function handleLockToken(id: string) {
    dispatch(setTokenLock(id))
  }

  React.useEffect(() => {
    const getWhitelist = async () => {
      const res = await tokensWhitelist()

      setWhitelist(res)
    }

    getWhitelist()
  }, [])

  React.useEffect(() => {
    if (!whitelist) {
      return
    }

    async function getBalances(userWalletAddress: string, whitelist: string[]) {
      const res = await balances(userWalletAddress, whitelist)

      const balancesArr: BalancesType = {}
      if (networkId === 5) {
        for (const [i, token] of whitelist.entries()) {
          balancesArr[mockTokens[token]] = Big(res[i].toString())
        }
      } else {
        for (const [i, token] of whitelist.entries()) {
          balancesArr[token.toLowerCase()] = Big(res[i]?.toString() ?? '0')
        }
      }

      setTokenBalance(balancesArr)
    }

    if (wallet?.provider) {
      getBalances(wallet.accounts[0].address, whitelist)
    }
  }, [whitelist, wallet])

  return (
    <S.SelectAssets>
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
        <AssetsTable
          tokensData={tokensListFiltered}
          priceList={priceData}
          tokenBalance={tokenBalance}
        />

        <PoolSummary
          coinsList={tokensList}
          totalAllocation={totalAllocation.toNumber()}
          creation
          onChange={handleInput}
          onRemoveToken={handleRemoveToken}
          onLockToken={handleLockToken}
          priceList={priceData}
        />
      </S.PoolContainer>
    </S.SelectAssets>
  )
}

export default SelectAssets
