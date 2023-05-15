import React from 'react'
import useSWR from 'swr'
import BigNumber from 'bn.js'
import Web3 from 'web3'
import { AbiItem, toChecksumAddress } from 'web3-utils'
import request from 'graphql-request'
import Big from 'big.js'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import useCoingecko from '@/hooks/useCoingecko'
import {
  setTokens,
  setTokenLock,
  setAllocation,
  TokenType
} from '../../../../store/reducers/poolCreationSlice'

import ERC20ABI from '@/constants/abi/ERC20.json'
import KassandraWhitelistAbi from '../../../../constants/abi/KassandraWhitelist.json'
import {
  BACKEND_KASSANDRA,
  mockTokens,
  networks
} from '../../../../constants/tokenAddresses'
import { GET_INFO_TOKENS } from './graphql'

import Steps from '../../../../components/Steps'
import CreatePoolHeader from '../CreatePoolHeader'
import PoolSummary from './PoolSummary'
import AssetsTable from '../AssetsTable'

import * as S from './styles'

export type CoinGeckoAssetsResponseType = {
  [key: string]: {
    usd: number
    usd_24h_change: number
    usd_market_cap: number
  }
}

export type TokensInfoResponseType = {
  id: string
  logo: string
  name: string
  symbol: string
  decimals: number
}

const SelectAssets = () => {
  const [whitelist, setWhitelist] = React.useState<string[]>()
  const [tokenBalance, setTokenBalance] = React.useState<{
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

  const tokensListGoerli =
    networkId === 5
      ? whitelist?.map((token: string) => toChecksumAddress(mockTokens[token]))
      : whitelist

  let totalAllocation = Big(0)
  for (const token of tokensList) {
    totalAllocation = totalAllocation.plus(token.allocation)
  }

  const { data } = useSWR<{ tokensByIds: TokensInfoResponseType[] }>(
    [GET_INFO_TOKENS, tokensListGoerli],
    (query, whitelist) =>
      request(BACKEND_KASSANDRA, query, {
        whitelist
      })
  )

  const tokensListFiltered = data?.tokensByIds.filter(element => {
    return element !== null
  })

  const { data: priceData } = useCoingecko(
    networks[networkId ?? 137].coingecko,
    networks[networkId ?? 137].nativeCurrency.address,
    tokensListGoerli ?? ['']
  )

  async function getBalances(tokensList: string[]) {
    const web3 = new Web3(networks[networkId ?? 137].rpc)
    const batch = new web3.BatchRequest()

    const balanceArr = {}
    for (const token of tokensList) {
      // eslint-disable-next-line prettier/prettier
      const contract = new web3.eth.Contract(
        ERC20ABI as unknown as AbiItem,
        token
      )
      batch.add(
        contract.methods
          .balanceOf(wallet)
          .call.request({ from: wallet }, (error: any, balance: string) => {
            Object.assign(balanceArr, {
              [mockTokens[token] ?? token.toLowerCase()]: new BigNumber(balance)
            })
          })
      )
    }
    batch.execute()

    setTokenBalance(balanceArr)
  }

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
      try {
        const web3 = new Web3(networks[networkId ?? 137].rpc)

        // eslint-disable-next-line prettier/prettier
        const whitelistContract = new web3.eth.Contract(
          KassandraWhitelistAbi as unknown as AbiItem,
          networks[networkId ?? 137].whiteList
        )
        const whitelist = await whitelistContract.methods
          .getTokens(0, 100)
          .call()

        setWhitelist(whitelist)
      } catch (error) {
        console.error('It was not possible to get whitelist')
      }
    }
    getWhitelist()
  }, [])

  React.useEffect(() => {
    getBalances(whitelist ?? [])
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
