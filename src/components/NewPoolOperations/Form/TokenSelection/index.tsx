import React from 'react'
import { stringSimilarity } from 'string-similarity-js'
import { isAddress } from 'web3-utils'
import BigNumber from 'bn.js'

import { ITokenList1InchProps } from '../..'

import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setTokenSelected } from '../../../../store/reducers/tokenSelected'

import TokenPin from './TokenPin'
import InputSearch from './InputSearch'
import Token1inchList from './Token1inchList'

import { BNtoDecimal } from '../../../../utils/numerals'

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

export interface IUserTokenProps extends ITokenList1InchProps {
  tokenScore: number;
  balanceInDollar: string;
  balance: string;
}
interface ITokenSelectionProps {
  tokenList1Inch: ITokenList1InchProps[];
}

const URL_COINGECKO = 'https://api.coingecko.com/api/v3'
const URL_1INCH_BALANCE = 'https://balances.1inch.io/v1.1'

const TokenSelection = ({ tokenList1Inch }: ITokenSelectionProps) => {
  const [searchToken, setSearchToken] = React.useState('')
  const [tokenPinList, setTokenPinList] = React.useState<
    ITokenList1InchProps[]
  >([])
  const [balanceToken, setBalanceToken] =
    React.useState<IListbalanceTokenprops>({
      ['']: {
        balance: 0
      }
    })
  const [listTokenPrices, setlistTokenPrices] =
    React.useState<IListTokenPricesprops>({
      ['']: {
        usd: 0
      }
    })

  const dispatch = useAppDispatch()
  const { userWalletAddress } = useAppSelector(state => state)

  // eslint-disable-next-line prettier/prettier
  function handleUserTokensBalance(tokenList1Inch: ITokenList1InchProps[], isWithScore = false) {
    const userTokensBalance = tokenList1Inch.map(token => {
      // eslint-disable-next-line prettier/prettier
      const score = isWithScore ? stringSimilarity(token.symbol + token.name, searchToken) : 0

      const tokenBalance = balanceToken[token.address]?.balance || 0
      const tokenPriceInDollar = listTokenPrices[token.address]?.usd || 0
      const balanceTokenFormated = BNtoDecimal(
        new BigNumber(tokenBalance || 0),
        token.decimals,
        5,
        2
      )

      return {
        ...token,
        tokenScore: score,
        balance: balanceTokenFormated,
        balanceInDollar: (
          Number(balanceTokenFormated) * tokenPriceInDollar
        ).toLocaleString('en-US')
      }
    })

    return userTokensBalance
  }

  function handleTokenListFiltering(tokenList1Inch: ITokenList1InchProps[]) {
    if (isAddress(searchToken)) {
      const token1inchFilteredByAddress = tokenList1Inch.filter(
        token => token.address === searchToken
      )
      const token1inchWithBalance: IUserTokenProps[] = handleUserTokensBalance(
        token1inchFilteredByAddress
      )

      return token1inchWithBalance
    }

    const tokenFiltered = tokenList1Inch.filter(
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
  function handleTokenListFilteringBybalance(tokenArray: ITokenList1InchProps[]) {
    // eslint-disable-next-line prettier/prettier
    const tokenArrayFormated: IUserTokenProps[] = handleUserTokensBalance(tokenArray)

    return tokenArrayFormated.sort((a, b) => {
      if (a.balanceInDollar > b.balanceInDollar) return -1
      if (a.balanceInDollar < b.balanceInDollar) return 1
      return 0
    })
  }

  // eslint-disable-next-line prettier/prettier
  const filteredToken = searchToken.length > 1
      ? handleTokenListFiltering(tokenList1Inch)
      : handleTokenListFilteringBybalance(tokenList1Inch)

  async function handleFetchTokenPrice() {
    // eslint-disable-next-line prettier/prettier
    const tokenPrice = tokenList1Inch.reduce((addressAccumulator, tokenCurrent) => addressAccumulator + (tokenCurrent.address + ','), '')

    const response = await fetch(
      `${URL_COINGECKO}/simple/token_price/avalanche?contract_addresses=${tokenPrice}&vs_currencies=usd`
    )
    const listTokenPrices = await response.json()
    setlistTokenPrices(listTokenPrices)
  }

  async function handleFetchBalance() {
    const response = await fetch(
      `${URL_1INCH_BALANCE}/43114/allowancesAndBalances/0x1111111254eeb25477b68fb85ed929f73a960582/${userWalletAddress}?tokensFetchType=listedTokens`
    )
    const listTokenBalanceInWallet = await response.json()
    setBalanceToken(listTokenBalanceInWallet)
  }

  React.useEffect(() => {
    if (userWalletAddress) {
      handleFetchBalance()
    }
    handleFetchTokenPrice()
  }, [])

  return (
    <S.TokenSelection>
      <S.TokenSelectionHeader>
        <span onClick={() => dispatch(setTokenSelected(false))}>
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

        <Token1inchList
          searchToken={searchToken}
          listBalanceToken={balanceToken}
          filteredToken={filteredToken}
          listTokenPrices={listTokenPrices}
          tokenPinList={tokenPinList}
          setTokenPinList={setTokenPinList}
        />
      </S.BodyToken>
    </S.TokenSelection>
  )
}

export default TokenSelection
