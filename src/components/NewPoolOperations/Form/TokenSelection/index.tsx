import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { stringSimilarity } from 'string-similarity-js'
import { isAddress } from 'web3-utils'
import BigNumber from 'bn.js'

import { ITokenList1InchProps } from '../..'

import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { setTokenSelected } from '../../../../store/reducers/tokenSelected'

import TokenList from './Token1inchList'

import { BNtoDecimal } from '../../../../utils/numerals'

import * as S from './styles'

export interface IUserTokenProps extends ITokenList1InchProps {
  balanceInDollar: string;
  balance: string;
}
interface ITokenSelectionProps {
  tokenList1Inch: ITokenList1InchProps[];
}

interface ICurrencyRowProps {
  index: number;
  style: React.CSSProperties;
}

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

const URL_COINGECKO = 'https://api.coingecko.com/api/v3'
const URL_1INCH_BALANCE = 'https://balances.1inch.io/v1.1'

const TokenSelection = ({ tokenList1Inch }: ITokenSelectionProps) => {
  const [searchToken, setSearchToken] = React.useState('')
  const [balanceToken, setBalanceToken] = React.useState<IListbalanceTokenprops>({['']: {
    balance: 0
  }})
  const [listTokenPrices, setlistTokenPrices] = React.useState<IListTokenPricesprops>({['']: {
    usd: 0
  }})

  const dispatch = useAppDispatch()
  const { userWalletAddress } = useAppSelector(state => state)

  async function handleFetchTokenPrice() {
    const tokenPrice = tokenList1Inch.reduce((addressAccumulator, tokenCurrent) => addressAccumulator + (tokenCurrent.address + ','), '')

    const response = await fetch(`${URL_COINGECKO}/simple/token_price/avalanche?contract_addresses=${tokenPrice}&vs_currencies=usd`)
    const listTokenPrices = await response.json()
    setlistTokenPrices(listTokenPrices)
  }

  async function handleFetchBalance() {
    const response = await fetch(`${URL_1INCH_BALANCE}/43114/allowancesAndBalances/0x1111111254eeb25477b68fb85ed929f73a960582/0xFdFeC1cbc5A10FC8F69C08af8D91Ea3B5190b5e6?tokensFetchType=listedTokens`)
    const listTokenBalanceInWallet = await response.json()
    setBalanceToken(listTokenBalanceInWallet)
  }

  function handleFiltered(tokenList1Inch: ITokenList1InchProps[]) {
    if (isAddress(searchToken)) {
      const token1inchFilteredByAddress = tokenList1Inch.filter(token => token.address === searchToken)

      const token1inchWithBalance: IUserTokenProps[] = token1inchFilteredByAddress.map(token => {
        const tokenBalance = balanceToken[token.address]?.balance || 0
        const tokenPriceInDollar = listTokenPrices[token.address]?.usd || 0
        const balanceTokenFormated = BNtoDecimal((new BigNumber(tokenBalance || 0)), token.decimals, 5, 2)

        return {
          ...token,
          tokenScore: 0,
          balance: balanceTokenFormated,
          balanceInDollar: (Number(balanceTokenFormated) * tokenPriceInDollar).toLocaleString('en-US')
        }
      })

    return token1inchWithBalance
    }

    const tokenFiltered: IUserTokenProps[] = tokenList1Inch
      .filter(
        token =>
          token.symbol.toLocaleLowerCase().includes(searchToken) ||
          token.name.toLocaleLowerCase().includes(searchToken)
      )
      .map(token => {
        const score = stringSimilarity(token.symbol + token.name, searchToken)
        const tokenBalance = balanceToken[token.address]?.balance || 0
        const tokenPriceInDollar = listTokenPrices[token.address]?.usd || 0
        const balanceTokenFormated = BNtoDecimal((new BigNumber(tokenBalance || 0)), token.decimals, 5, 2)

        return {
          ...token,
          tokenScore: score,
          balance: balanceTokenFormated,
          balanceInDollar: (Number(balanceTokenFormated) * tokenPriceInDollar).toLocaleString('en-US')
        }

      })
      .sort((a, b) => {
        if (a.tokenScore > b.tokenScore) return -1
        if (a.tokenScore < b.tokenScore) return 1
        return 0
      })

    return userWalletAddress ? tokenFiltered.sort((a, b) => {
      if (a.balanceInDollar > b.balanceInDollar) return -1
      if (a.balanceInDollar < b.balanceInDollar) return 1
      return 0
    }) : tokenFiltered
  }

  function FilteredBalance(tokenArray: ITokenList1InchProps[]) {
    const tokenArrayFormated: IUserTokenProps[] = tokenArray.map(token => {
      const tokenBalance = balanceToken[token.address]?.balance || 0
      const tokenPriceInDollar = listTokenPrices[token.address]?.usd || 0
      const balanceTokenFormated = BNtoDecimal((new BigNumber(tokenBalance || 0)), token.decimals, 5, 2)

      return {
        ...token,
        balance: balanceTokenFormated,
        balanceInDollar: (Number(balanceTokenFormated) * tokenPriceInDollar).toLocaleString('en-US')
      }
    })

    return tokenArrayFormated.sort((a, b) => {
      if (a.balanceInDollar > b.balanceInDollar) return -1
      if (a.balanceInDollar < b.balanceInDollar) return 1
      return 0
    })
  }

  const filteredToken =
    searchToken.length > 1 ? handleFiltered(tokenList1Inch) : FilteredBalance(tokenList1Inch)


  function handleSearchToken(text: string) {
    setSearchToken(text.trim().toLocaleLowerCase())
  }

  React.useEffect(() => {
    handleFetchBalance()
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
        <S.InputContent>
          <img src="/assets/utilities/search.svg" alt="" />
          <S.SearchListInput
            placeholder="Search by name or paste address"
            value={searchToken}
            onChange={event => handleSearchToken(event.target.value)}
          />
          <S.deleteSearch isShowIcon={searchToken.length > 0} onClick={() => setSearchToken('')}>
            <img src="/assets/utilities/close.svg" alt="" />
          </S.deleteSearch>
        </S.InputContent>
        <S.tokenPinContainer>
          <S.tokenPin>
            <img
              src="/assets/utilities/edit-icon.svg"
              alt=""
              width={16}
              height={16}
            />
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>WETH.E</p>
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>WETH.E</p>
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>WETH.E</p>
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>AVAX</p>
          </S.tokenPin>
          <S.tokenPin>
            <img src="/assets/logos/avax.png" alt="" width={16} height={16} />
            <p>WETH.E</p>
          </S.tokenPin>
        </S.tokenPinContainer>

        <TokenList
          searchToken={searchToken}
          listBalanceToken={balanceToken}
          filteredToken={filteredToken}
          listTokenPrices={listTokenPrices}
              />
      </S.BodyToken>
    </S.TokenSelection>
  )
}

export default TokenSelection
