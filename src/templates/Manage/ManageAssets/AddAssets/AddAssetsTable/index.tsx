import React from 'react'
import Image from 'next/image'
import BigNumber from 'bn.js'
import Big from 'big.js'

import { BNtoDecimal } from '../../../../../utils/numerals'

import InputSearch from '../../../../../components/Inputs/InputSearch'
import CoinSummary from '../../../CreatePool/SelectAssets/CoinSummary'

import arrowLeftBoldIcon from '../../../../../../public/assets/utilities/arrow-left-bold.svg'
import arrowRightBoldIcon from '../../../../../../public/assets/utilities/arrow-right-bold.svg'
import eyeShowIcon from '../../../../../../public/assets/utilities/eye-show.svg'

import * as S from './styles'

import {
  TokensInfoResponseType,
  CoinGeckoAssetsResponseType
} from '../../AddAssets'
import InputRadio from '../../../../../components/Inputs/InputRadio'

interface IAddAssestsTableProps {
  tokensData: TokensInfoResponseType[] | undefined;
  tokenBalance: { [key: string]: BigNumber };
  priceList: CoinGeckoAssetsResponseType | undefined;
}

const AddAssetsTable = ({
  tokensData,
  tokenBalance,
  priceList
}: IAddAssestsTableProps) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [filteredArr, setFilteredArr] = React.useState<
    TokensInfoResponseType[]
  >([])
  const [inView, setInView] = React.useState(1)
  const [tokenId, setTokenId] = React.useState('')
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleCurrentInView(n: number) {
    setInView(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return 4
      } else if (newPrev > 4) {
        return 1
      } else {
        return newPrev
      }
    })
  }

  function handleInputRadio(event: React.ChangeEvent<HTMLInputElement>) {
    setTokenId(event.target.name)
  }

  function handleView(token: string) {
    console.log(token)
  }

  React.useEffect(() => {
    const expressao = new RegExp(searchValue, 'i')
    const arr = tokensData ? tokensData : []
    const tokensFiltered = arr.filter(token => {
      return expressao.test(token.symbol)
    })

    setFilteredArr(tokensFiltered)
  }, [tokensData, searchValue])

  return (
    <S.AddAssetsTable>
      <S.InputSearchWrapper>
        <InputSearch
          name="addAssetsInput"
          placeholder="Search for asset to add"
          value={searchValue}
          onChange={handleSearch}
        />
      </S.InputSearchWrapper>

      <S.Table>
        <S.THead>
          <S.Tr>
            <S.Th className="select">Select</S.Th>
            <S.Th className="asset">Asset</S.Th>
            <S.Th className="price" isView={inView === 1}>
              Price
            </S.Th>
            <S.Th className="allocation" isView={inView === 2}>
              Allocation
            </S.Th>
            <S.Th className="marketCap" isView={inView === 3}>
              Market Cap
            </S.Th>
            <S.Th className="balance" isView={inView === 4}>
              Balance
            </S.Th>
            <S.Th className="button">
              <S.TableViewButton
                type="button"
                onClick={() => handleCurrentInView(-1)}
              >
                <Image src={arrowLeftBoldIcon} width={16} height={16} />
              </S.TableViewButton>

              <S.TableViewButton
                type="button"
                onClick={() => handleCurrentInView(1)}
              >
                <Image src={arrowRightBoldIcon} width={16} height={16} />
              </S.TableViewButton>
            </S.Th>
          </S.Tr>
        </S.THead>

        <S.TBody>
          {tokensData &&
            filteredArr?.map(coin => (
              <S.Tr key={coin.id}>
                <S.Td className="select">
                  <S.InputWrapper>
                    <InputRadio
                      name={coin.id}
                      inputId={coin.id}
                      inputChecked={coin.id === tokenId}
                      handleClickInput={handleInputRadio}
                      text=""
                    />
                  </S.InputWrapper>
                </S.Td>
                <S.Td className="asset">
                  <CoinSummary
                    coinImage={coin.logo}
                    coinName={coin.name}
                    coinSymbol={coin.symbol}
                    price={priceList ? priceList[coin.id.toLowerCase()].usd : 0}
                    url={`https://heimdall-frontend.vercel.app/coins/${coin.symbol.toLocaleLowerCase()}`}
                    table
                  />
                </S.Td>
                <S.Td className="price" isView={inView === 1}>
                  ${priceList ? priceList[coin.id.toLowerCase()].usd : 0}
                </S.Td>
                <S.Td className="allocation" isView={inView === 2}>
                  teste
                </S.Td>
                <S.Td className="marketCap" isView={inView === 3}>
                  $
                  {priceList
                    ? BNtoDecimal(
                        Big(priceList[coin.id.toLowerCase()].usd_market_cap),
                        2
                      )
                    : 0}
                </S.Td>
                <S.Td className="balance" isView={inView === 4}>
                  {tokenBalance[coin.id.toLowerCase()]
                    ? BNtoDecimal(
                        Big(tokenBalance[coin.id.toLowerCase()].toString()).div(
                          Big(10).pow(coin.decimals)
                        ),
                        2
                      )
                    : 0}{' '}
                  {coin.symbol}
                  <S.SecondaryText>
                    ~$
                    {tokenBalance[coin.id.toLowerCase()] && priceList
                      ? BNtoDecimal(
                          Big(tokenBalance[coin.id.toLowerCase()].toString())
                            .div(Big(10).pow(18))
                            .mul(Big(priceList[coin.id.toLowerCase()].usd)),
                          2
                        )
                      : 0}
                  </S.SecondaryText>
                </S.Td>
                <S.Td className="button">
                  <S.ViewButton
                    type="button"
                    onClick={() => handleView(coin.name)}
                  >
                    <Image src={eyeShowIcon} />
                  </S.ViewButton>
                </S.Td>
              </S.Tr>
            ))}
        </S.TBody>
      </S.Table>
    </S.AddAssetsTable>
  )
}

export default AddAssetsTable
