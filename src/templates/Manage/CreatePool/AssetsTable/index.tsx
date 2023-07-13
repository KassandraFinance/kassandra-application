import React from 'react'
import { useInView } from 'react-intersection-observer'
import Big from 'big.js'
import Link from 'next/link'

import { BNtoDecimal } from '@/utils/numerals'
import { abbreviateNumber } from '@/utils/abbreviateNumber'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setTokens, TokenType } from '@/store/reducers/poolCreationSlice'
import { setTokenSelectionActive } from '@/store/reducers/tokenSelectionActive'

import InputSearch from '@/components/Inputs/InputSearch'
import Checkbox from '@/components/Inputs/Checkbox'
import CoinSummary from '../SelectAssets/CoinSummary'
import Button from '@/components/Button'
import {
  CoinGeckoAssetsResponseType,
  TokensInfoResponseType
} from '../SelectAssets'

import * as S from './styles'

interface IAssetsTable {
  tokensData: TokensInfoResponseType[]
  tokenBalance: { [key: string]: Big }
  priceList: CoinGeckoAssetsResponseType | undefined
}

const AssetsTable = ({ tokensData, priceList, tokenBalance }: IAssetsTable) => {
  const [search, setSearch] = React.useState('')
  const [tokensArr, setTokensArr] = React.useState<TokensInfoResponseType[]>([])
  const dispatch = useAppDispatch()
  const assetsList = useAppSelector(
    state => state.poolCreation.createPoolData.tokens
  )

  const inputEl = React.useRef<HTMLInputElement>(null)

  function handleChecked(symbol: string): boolean {
    const assetsArr = assetsList ? assetsList : []
    const result = assetsArr.some(asset => asset.symbol === symbol)
    return result
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  function handleCheckbox(token: TokenType) {
    const assets = assetsList ? assetsList : []
    if (assets?.length <= 2) {
      inputEl.current?.setCustomValidity('')
    }

    dispatch(setTokens(token))
  }

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.5
  })

  React.useEffect(() => {
    const expressao = new RegExp(search, 'i')
    const arr = tokensData
    const tokensFiltered = arr.filter(token => {
      return expressao.test(token?.symbol || '')
    })

    setTokensArr(tokensFiltered)
    dispatch(setTokenSelectionActive(true))
  }, [tokensData, search])

  return (
    <S.AssetsTable>
      <S.SearchWrapper>
        <InputSearch
          placeholder="Search for assets to add"
          name="search"
          value={search}
          onChange={handleSearch}
        />
      </S.SearchWrapper>

      <S.Table>
        <S.InputValidation
          ref={inputEl}
          form="poolCreationForm"
          type="radio"
          id="selectToken"
          name="selectToken"
          value="selectToken"
          required={assetsList && assetsList?.length < 2}
          onInvalid={() => {
            inputEl.current?.setCustomValidity(
              'You show select at least two tokens'
            )
          }}
        />

        <S.THead>
          <S.Tr>
            <S.Th className="asset">Asset</S.Th>
            <S.Th className="price">Price</S.Th>
            <S.Th className="marketCap">Market Cap</S.Th>
            <S.Th className="balance">Balance</S.Th>
            <S.Th className="add">Add</S.Th>
          </S.Tr>
        </S.THead>

        <S.TBody>
          <S.TrsWrapper>
            {tokensArr.length > 0 ? (
              tokensArr.map((coin, i) => (
                <S.Tr
                  key={coin.id}
                  ref={i === tokensArr.length - 1 ? ref : null}
                >
                  <S.Td className="asset">
                    <CoinSummary
                      coinImage={coin?.logo || ''}
                      coinName={coin?.name || ''}
                      coinSymbol={coin?.symbol || ''}
                      price={
                        priceList ? priceList[coin.id.toLowerCase()]?.usd : '0'
                      }
                      url={`https://heimdall-frontend.vercel.app/coins/${coin?.symbol?.toLocaleLowerCase()}`}
                      table
                    />
                  </S.Td>
                  <S.Td className="price">
                    ${priceList ? priceList[coin.id.toLowerCase()]?.usd : 0}
                  </S.Td>
                  <S.Td className="marketCap">
                    $
                    {priceList
                      ? BNtoDecimal(
                          Big(priceList[coin.id.toLowerCase()]?.marketCap ?? 0),
                          2
                        )
                      : 0}
                  </S.Td>
                  <S.Td className="balance">
                    {tokenBalance[coin.id.toLowerCase()] &&
                    tokenBalance[coin.id.toLowerCase()].gt(Big(0))
                      ? abbreviateNumber(
                          Big(tokenBalance[coin.id.toLowerCase()].toString())
                            .div(Big(10).pow(coin?.decimals || 18))
                            .toFixed()
                        )
                      : 0}{' '}
                    <S.SecondaryText>
                      ~$
                      {tokenBalance[coin.id.toLowerCase()] && priceList
                        ? abbreviateNumber(
                            Big(tokenBalance[coin.id.toLowerCase()].toString())
                              .div(Big(10).pow(coin?.decimals || 18))
                              .mul(
                                Big(priceList[coin.id.toLowerCase()]?.usd ?? 0)
                              )
                              .toString()
                          )
                        : 0}
                    </S.SecondaryText>
                  </S.Td>
                  <S.Td className="add">
                    <Checkbox
                      form="poolCreationForm"
                      name={coin?.symbol || ''}
                      label={coin?.symbol || ''}
                      checked={handleChecked(coin?.symbol || '')}
                      showLabel={false}
                      onChange={() =>
                        handleCheckbox({
                          address: coin?.id?.toLowerCase(),
                          name: coin?.name || '',
                          icon: coin?.logo || '',
                          symbol: coin?.symbol || '',
                          decimals: coin?.decimals ? coin.decimals : 18,
                          url: `https://heimdall-frontend.vercel.app/coins/${coin?.symbol?.toLocaleLowerCase()}`,
                          allocation: '100',
                          amount: '0',
                          isLocked: false
                        })
                      }
                    />
                  </S.Td>
                </S.Tr>
              ))
            ) : (
              <S.EmptyListContainer>
                <p>
                  The asset you are looking for is not supported by kassandra
                  whitelist. If you want to add it, create a proposal at the
                  forum
                </p>
                <Link href="https://gov.kassandra.finance/" passHref>
                  <Button
                    as="a"
                    target="_black"
                    backgroundSecondary
                    text="Go To The Forum"
                  />
                </Link>
              </S.EmptyListContainer>
            )}
          </S.TrsWrapper>

          <S.Shadow inView={tokensArr.length > 5 ? inView : true}></S.Shadow>
        </S.TBody>
      </S.Table>
    </S.AssetsTable>
  )
}

export default AssetsTable
