import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { stringSimilarity } from 'string-similarity-js'

import { ITokenList1InchProps } from '../..'

import { useAppDispatch } from '../../../../store/hooks'
import { setTokenSelected } from '../../../../store/reducers/tokenSelected'

import { setTokenSelect } from '../../../../store/reducers/tokenSelect'

import * as S from './styles'

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
    const tokenFiltered = tokenList1Inch
      .filter(
        token =>
          token.symbol.toLocaleLowerCase().includes(searchToken) ||
          token.name.toLocaleLowerCase().includes(searchToken)
      )
      .map(token => {
        const score = stringSimilarity(token.symbol + token.name, searchToken)
        return {
          ...token,
          tokenScore: score
        }
      })
      .sort((a, b) => {
        if (a.tokenScore > b.tokenScore) return -1
        if (a.tokenScore < b.tokenScore) return 1
        return 0
      })

    return tokenFiltered
  }

  const filteredToken =
    searchToken.length > 1 ? handleFiltered(tokenList1Inch) : tokenList1Inch

  function handleSearchToken(text: string) {
    setSearchToken(text.toLocaleLowerCase())
  }

  React.useEffect(() => {
    handleFetchBalance()
    handleFetchTokenPrice()
  }, [])

  const CurrencyRow = React.useMemo(() => {
    return React.memo(function CurrencyRow({
      index,
      style
    }: ICurrencyRowProps) {
      return (
        <S.Token key={filteredToken[index]?.address} style={style} onClick={() => {
          dispatch(setTokenSelect(filteredToken[index]))
          dispatch(setTokenSelected(false))
        }}>
          <S.TokenNameContent>
            <img
              src={filteredToken[index]?.logoURI}
              alt=""
              width={24}
              height={24}
              onError={(e) => {
                // eslint-disable-next-line prettier/prettier
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = `/assets/icons/coming-soon.svg`  
              }}
            />
            <S.TokenName>
              <span>{filteredToken[index]?.name}</span>
              <p>{filteredToken[index]?.symbol}</p>
            </S.TokenName>
          </S.TokenNameContent>
          <S.TokenValueInWalletContainer>
            <S.TokenValueInWallet>
              <span>$5.600.49</span>
              <p>4</p>
            </S.TokenValueInWallet>
            <img
              src="/assets/utilities/pin.svg"
              alt=""
              width={10}
              height={14}
            />
          </S.TokenValueInWalletContainer>
        </S.Token>
      )
    })
  }, [searchToken, balanceToken, listTokenPrices])

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
        <S.TokenListContainer>
          {filteredToken.length > 0 ? (
            <List
              innerElementType="ul"
              itemCount={filteredToken.length}
              itemSize={58}
              height={3000}
              width={380}
            >
              {CurrencyRow}
            </List>
          ) : (
            <S.NotFoundTokenContent>
              <img
                src="/assets/images/kacy-error.svg"
                alt=""
                width={58}
                height={52}
              />
              <p>Nothing found</p>
            </S.NotFoundTokenContent>
          )}
        </S.TokenListContainer>
      </S.BodyToken>
    </S.TokenSelection>
  )
}

export default TokenSelection
