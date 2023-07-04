import React from 'react'
import Big from 'big.js'
import { stringSimilarity } from 'string-similarity-js'
import { useConnectWallet } from '@web3-onboard/react'
import { isAddress } from 'ethers'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setTokenSelectionActive } from '@/store/reducers/tokenSelectionActive'

import useCoingecko from '@/hooks/useCoingecko'
import useBatchRequests from '@/hooks/useBatchRequests'

import { BNtoDecimal } from '@/utils/numerals'

import { NATIVE_ADDRESS } from '@/constants/tokenAddresses'

import TokenPin from './TokenPin'
import InputSearch from './InputSearch'
import TokensSwapProviderList from './TokensSwapProviderList'
import Loading from '../../../../../components/Loading'

import * as S from './styles'
import { setTokenSelect } from '@/store/reducers/tokenSelect'

export type IListbalanceTokenprops = {
  [key: string]: string
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
      ['']: '0'
    })

  const dispatch = useAppDispatch()
  const { tokenListSwapProvider, pool } = useAppSelector(state => state)
  const { balances } = useBatchRequests(pool.chain_id)
  const [{ wallet }] = useConnectWallet()

  const tokenAddresses = tokenListSwapProvider.map(token => token.address)
  const { priceToken } = useCoingecko(
    pool.chain_id,
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

      const tokenBalance = balanceToken[token.address.toLowerCase()] || 0
      const tokenPriceInDollar = priceToken(checkToken.toLowerCase()) ?? 0

      const balanceTokenFormated = Big(tokenBalance || '0').div(
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

    const userTokensBalanceFiltered = wallet
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
    if (!wallet) return

    try {
      const addresses = tokenListSwapProvider.map(token =>
        token.address.toLowerCase()
      )
      const balanceList = await balances(wallet.accounts[0].address, addresses)

      const balanceListFormatted: IListbalanceTokenprops = {}
      for (const [i, token] of addresses.entries()) {
        balanceListFormatted[token] = balanceList[i]?.toString() ?? '0'
      }

      setBalanceToken(balanceListFormatted)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredToken =
    searchToken.length > 1
      ? handleTokenListFiltering(tokenListSwapProvider)
      : handleTokenListFilteringBybalance(tokenListSwapProvider)

  React.useEffect(() => {
    if (wallet) {
      handleFetchBalance()
    }
  }, [wallet])

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
            filteredToken={filteredToken}
            tokenPinList={tokenPinList}
            setTokenPinList={setTokenPinList}
            setTokenSelected={token => dispatch(setTokenSelect(token))}
          />
        )}
      </S.BodyToken>
    </S.TokenSelection>
  )
}

export default TokenSelection
