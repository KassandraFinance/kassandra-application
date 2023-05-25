import React from 'react'
import Big from 'big.js'
import { isAddress } from 'web3-utils'
import { stringSimilarity } from 'string-similarity-js'
import Web3 from 'web3'

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setTokenSelectionActive } from '../../../../../store/reducers/tokenSelectionActive'

import useCoingecko from '../../../../../hooks/useCoingecko'
import { useBatchRequest } from '@/hooks/useBatchRequest'

import { BNtoDecimal } from '../../../../../utils/numerals'

import {
  NATIVE_ADDRESS,
  networks,
  platform
} from '../../../../../constants/tokenAddresses'

import TokenPin from './TokenPin'
import InputSearch from './InputSearch'
import TokensSwapProviderList from './TokensSwapProviderList'
import Loading from '../../../../../components/Loading'

import * as S from './styles'

export type IListbalanceTokenprops = {
  [key: string]: {
    balance: string
  }
}

export type IListTokenPricesprops = {
  [key: string]: {
    usd: number
  }
}

export interface ITokenListSwapProviderProps {
  symbol: string
  name: string
  address: string
  decimals: number
  logoURI: string
}

export interface IUserTokenProps extends ITokenListSwapProviderProps {
  tokenScore: number
  balanceInDollar: number
  balance: string
}

const TokenSelection = () => {
  const [searchToken, setSearchToken] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [tokenPinList, setTokenPinList] = React.useState<
    ITokenListSwapProviderProps[]
  >([])
  const [balanceToken, setBalanceToken] =
    React.useState<IListbalanceTokenprops>({
      ['']: {
        balance: '0'
      }
    })

  const dispatch = useAppDispatch()
  const { userWalletAddress, tokenListSwapProvider, pool, chainId } =
    useAppSelector(state => state)
  const { batchRequestBalance } = useBatchRequest()

  const tokenAddresses = tokenListSwapProvider.map(token => token.address)
  const { priceToken } = useCoingecko(
    platform[pool.chain_id],
    pool.chain.addressWrapped,
    tokenAddresses
  )

  function handleUserTokensBalance(
    newTokenList: ITokenListSwapProviderProps[],
    isWithScore = false
  ) {
    const userTokensBalance = newTokenList.map(token => {
      const score = isWithScore
        ? stringSimilarity(token.symbol + token.name, searchToken)
        : 0
      const checkToken =
        token.address === NATIVE_ADDRESS
          ? pool.chain.addressWrapped.toLocaleLowerCase()
          : token.address

      const tokenBalance = balanceToken[token.address]?.balance || 0
      const tokenPriceInDollar = priceToken(checkToken.toLowerCase()) ?? 0

      const balanceTokenFormated = Big(tokenBalance || 0).div(
        Big(10).pow(token.decimals)
      )
      const balanceInDollar = balanceTokenFormated.mul(tokenPriceInDollar)

      return {
        ...token,
        tokenScore: score,
        balance: BNtoDecimal(balanceTokenFormated, token.decimals, 2),
        balanceInDollar: balanceInDollar.toNumber()
      }
    })

    return userTokensBalance
  }

  function handleTokenListFiltering(
    newTokenList: ITokenListSwapProviderProps[]
  ) {
    if (isAddress(searchToken)) {
      const tokensFilteredByAddress = newTokenList.filter(
        token => token.address === searchToken
      )
      const tokensWithBalance: IUserTokenProps[] = handleUserTokensBalance(
        tokensFilteredByAddress
      )

      return tokensWithBalance
    }

    const tokenFiltered = newTokenList.filter(
      token =>
        token.symbol.toLocaleLowerCase().includes(searchToken) ||
        token.name.toLocaleLowerCase().includes(searchToken)
    )

    const userTokensBalance: IUserTokenProps[] = handleUserTokensBalance(
      tokenFiltered,
      true
    )
    const userTokensBalanceFilteredByScore = userTokensBalance.sort((a, b) => {
      if (a.tokenScore > b.tokenScore) return -1
      if (a.tokenScore < b.tokenScore) return 1
      return 0
    })

    const filteredbyTokenPin = userTokensBalanceFilteredByScore.sort((a, b) => {
      if (tokenPinList.some(tokenPin => tokenPin.address === a.address))
        return -1
      if (tokenPinList.some(tokenPin => tokenPin.address === b.address))
        return 1
      return 0
    })

    const userTokensBalanceFiltered = userWalletAddress
      ? filteredbyTokenPin.sort((a, b) => {
          if (a.balanceInDollar > b.balanceInDollar) return -1
          if (a.balanceInDollar < b.balanceInDollar) return 1
          return 0
        })
      : userTokensBalanceFilteredByScore

    return userTokensBalanceFiltered
  }

  function handleTokenListFilteringBybalance(
    tokenArray: ITokenListSwapProviderProps[]
  ) {
    const tokenArrayFormated: IUserTokenProps[] =
      handleUserTokensBalance(tokenArray)

    return tokenArrayFormated.sort((a, b) => {
      if (a.balanceInDollar > b.balanceInDollar) return -1
      if (a.balanceInDollar < b.balanceInDollar) return 1
      return 0
    })
  }

  async function handleFetchBalance() {
    if (chainId !== pool.chain_id) return

    try {
      const balances = await batchRequestBalance(
        new Web3(networks[pool.chain_id].rpc),
        tokenListSwapProvider.map(token => token.address),
        userWalletAddress
      )

      setBalanceToken(balances)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredToken =
    searchToken.length > 1
      ? handleTokenListFiltering(tokenListSwapProvider)
      : handleTokenListFilteringBybalance(tokenListSwapProvider)

  React.useEffect(() => {
    if (userWalletAddress) {
      handleFetchBalance()
    }
  }, [userWalletAddress])

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <S.TokenSelection>
      <S.TokenSelectionHeader>
        <span onClick={() => dispatch(setTokenSelectionActive(false))}>
          <img
            src="/assets/utilities/arrow-left-bold.svg"
            alt=""
            width={10}
            height={18}
          />
        </span>
        <p>Select Token</p>
      </S.TokenSelectionHeader>
      <S.BodyToken>
        <InputSearch
          searchToken={searchToken}
          setSearchToken={setSearchToken}
        />

        <TokenPin
          tokenPinList={tokenPinList}
          setTokenPinList={setTokenPinList}
          tokenListSwapProvider={tokenListSwapProvider}
        />

        {loading ? (
          <S.LoadingContainer>
            <Loading marginTop={0} />
          </S.LoadingContainer>
        ) : (
          <TokensSwapProviderList
            listBalanceToken={balanceToken}
            filteredToken={filteredToken}
            tokenPinList={tokenPinList}
            setTokenPinList={setTokenPinList}
          />
        )}
      </S.BodyToken>
    </S.TokenSelection>
  )
}

export default TokenSelection
