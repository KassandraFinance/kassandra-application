import React from 'react'
import Big from 'big.js'
import { isAddress } from 'web3-utils'
import { stringSimilarity } from 'string-similarity-js'

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { setTokenSelectionActive } from '../../../../../store/reducers/tokenSelectionActive'

import useCoingecko from '../../../../../hooks/useCoingecko'

import { BNtoDecimal } from '../../../../../utils/numerals'

import {
  addressNativeToken1Inch,
  platform,
  URL_1INCH_BALANCE
} from '../../../../../constants/tokenAddresses'

import TokenPin from './TokenPin'
import InputSearch from './InputSearch'
import Token1inchList from './Token1inchList'
import Loading from '../../../../../components/Loading'

import * as S from './styles'

export type IListbalanceTokenprops = {
  [key: string]: {
    balance: number
  }
}

export type IListTokenPricesprops = {
  [key: string]: {
    usd: number
  }
}

export interface ITokenList1InchProps {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI: string;
}

export interface IUserTokenProps extends ITokenList1InchProps {
  tokenScore: number;
  balanceInDollar: number;
  balance: string;
}

const TokenSelection = () => {
  const [searchToken, setSearchToken] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [tokenPinList, setTokenPinList] = React.useState<
    ITokenList1InchProps[]
  >([])
  const [balanceToken, setBalanceToken] =
    React.useState<IListbalanceTokenprops>({
      ['']: {
        balance: 0
      }
    })

  const dispatch = useAppDispatch()
  const { userWalletAddress, tokenList1Inch, pool, chainId } = useAppSelector(
    state => state
  )

  const tokenAddresses = tokenList1Inch.map(token => token.address)
  const { priceToken } = useCoingecko(
    platform[pool.chain_id],
    pool.chain.addressWrapped,
    tokenAddresses
  )

  // eslint-disable-next-line prettier/prettier
  function handleUserTokensBalance(
    newTokenList1inch: ITokenList1InchProps[],
    isWithScore = false
  ) {
    const userTokensBalance = newTokenList1inch.map(token => {
      const score = isWithScore
        ? stringSimilarity(token.symbol + token.name, searchToken)
        : 0
      const checkToken =
        token.address === addressNativeToken1Inch
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

  function handleTokenListFiltering(newTokenList1inch: ITokenList1InchProps[]) {
    if (isAddress(searchToken)) {
      const token1inchFilteredByAddress = newTokenList1inch.filter(
        token => token.address === searchToken
      )
      const token1inchWithBalance: IUserTokenProps[] = handleUserTokensBalance(
        token1inchFilteredByAddress
      )

      return token1inchWithBalance
    }

    const tokenFiltered = newTokenList1inch.filter(
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

  // eslint-disable-next-line prettier/prettier
  function handleTokenListFilteringBybalance(
    tokenArray: ITokenList1InchProps[]
  ) {
    // eslint-disable-next-line prettier/prettier
    const tokenArrayFormated: IUserTokenProps[] =
      handleUserTokensBalance(tokenArray)

    return tokenArrayFormated.sort((a, b) => {
      if (a.balanceInDollar > b.balanceInDollar) return -1
      if (a.balanceInDollar < b.balanceInDollar) return 1
      return 0
    })
  }

  // eslint-disable-next-line prettier/prettier
  const filteredToken =
    searchToken.length > 1
      ? handleTokenListFiltering(tokenList1Inch)
      : handleTokenListFilteringBybalance(tokenList1Inch)

  async function handleFetchBalance() {
    if (chainId !== pool.chain_id) return

    try {
      const response = await fetch(
        `${URL_1INCH_BALANCE}/${pool.chain_id}/allowancesAndBalances/0x1111111254eeb25477b68fb85ed929f73a960582/${userWalletAddress}?tokensFetchType=listedTokens`
      )
      const listTokenBalanceInWallet = await response.json()
      setBalanceToken(listTokenBalanceInWallet)
    } catch (error) {
      console.log(error)
    }
  }

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
          tokenList1Inch={tokenList1Inch}
        />

        {loading ? (
          <S.LoadingContainer>
            <Loading marginTop={0} />
          </S.LoadingContainer>
        ) : (
          <Token1inchList
            searchToken={searchToken}
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
