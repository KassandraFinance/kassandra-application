import React from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import Big from 'big.js'
import BigNumber from 'bn.js'

import { BNtoDecimal } from '../../../../utils/numerals'

import { useAppSelector, useAppDispatch } from '../../../../store/hooks'
import {
  setTokens,
  TokenType
} from '../../../../store/reducers/poolCreationSlice'

import InputSearch from '../../../../components/Inputs/InputSearch'

import CoinSummary from '../SelectAssets/CoinSummary'
import Checkbox from '../../../../components/Inputs/Checkbox'
import arrowDownIcon from '../../../../../public/assets/utilities/arrow-down-thin.svg'

import * as S from './styles'

import { mockData, CoinGeckoAssetsResponseType } from '../SelectAssets'

interface IAssetsTable {
  tokenBalance: { [key: string]: BigNumber };
  priceList: CoinGeckoAssetsResponseType | undefined;
}

const AssetsTable = ({ priceList, tokenBalance }: IAssetsTable) => {
  // value vai ser usado na busca alterar nome
  const [value, setValue] = React.useState('')
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
    setValue(e.target.value)
    console.log(e)
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

  return (
    <S.AssetsTable>
      <S.SearchWrapper>
        <InputSearch
          placeholder="Search for assets to add"
          name="search"
          value={value}
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
            <S.Th className="marketCap">
              Market Cap
              <S.HeaderButton>
                <Image src={arrowDownIcon} />
              </S.HeaderButton>
            </S.Th>
            <S.Th className="balance">
              Balance
              <S.HeaderButton>
                <Image src={arrowDownIcon} />
              </S.HeaderButton>
            </S.Th>
            <S.Th className="add">Add</S.Th>
          </S.Tr>
        </S.THead>

        <S.TBody>
          <S.TrsWrapper>
            {mockData.map((coin, i) => (
              <S.Tr
                key={coin.coinName}
                ref={i === mockData.length - 1 ? ref : null}
              >
                <S.Td className="asset">
                  <CoinSummary
                    coinImage={coin.coinImage}
                    coinName={coin.coinName}
                    coinSymbol={coin.coinSymbol}
                    price={priceList ? priceList[coin.address].usd : 0}
                    url={coin.url}
                    table
                  />
                </S.Td>
                <S.Td className="price">
                  ${priceList ? priceList[coin.address].usd : 0}
                </S.Td>
                <S.Td className="marketCap">
                  $
                  {priceList
                    ? BNtoDecimal(
                        Big(priceList[coin.address].usd_market_cap),
                        2
                      )
                    : 0}
                </S.Td>
                <S.Td className="balance">
                  {tokenBalance[coin.address]
                    ? Number(
                        BNtoDecimal(
                          Big(tokenBalance[coin.address].toString()).div(
                            Big(10).pow(coin.decimals)
                          ),
                          2
                        )
                      )
                    : 0}{' '}
                  {coin.coinSymbol}
                  <S.SecondaryText>
                    ~$
                    {tokenBalance[coin.address] && priceList
                      ? BNtoDecimal(
                          Big(tokenBalance[coin.address].toString())
                            .div(Big(10).pow(coin.decimals))
                            .mul(Big(priceList[coin.address].usd)),
                          2
                        )
                      : 0}
                  </S.SecondaryText>
                </S.Td>
                <S.Td className="add">
                  <Checkbox
                    form="poolCreationForm"
                    name={coin.coinSymbol}
                    label={coin.coinSymbol}
                    checked={handleChecked(coin.coinSymbol)}
                    showLabel={false}
                    onChange={() =>
                      handleCheckbox({
                        address: coin.address,
                        name: coin.coinName,
                        icon: coin.coinImage,
                        symbol: coin.coinSymbol,
                        decimals: coin.decimals,
                        url: coin.url ? coin.url : '',
                        allocation: 100,
                        amount: Big(0),
                        isLocked: false
                      })
                    }
                  />
                </S.Td>
              </S.Tr>
            ))}
          </S.TrsWrapper>

          <S.Shadow inView={inView}></S.Shadow>
        </S.TBody>
      </S.Table>
    </S.AssetsTable>
  )
}

export default AssetsTable
