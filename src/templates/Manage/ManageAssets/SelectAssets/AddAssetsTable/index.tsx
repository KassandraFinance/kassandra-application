import React from 'react'
import Image from 'next/image'
import BigNumber from 'bn.js'
import Big from 'big.js'
import { useInView } from 'react-intersection-observer'

import { BNtoDecimal } from '../../../../../utils/numerals'

import InputSearch from '../../../../../components/Inputs/InputSearch'
import CoinSummary from '../../../CreatePool/SelectAssets/CoinSummary'
import InputRadio from '../../../../../components/Inputs/InputRadio'
import ModalViewCoin from '../../../../../components/Modals/ModalViewCoin'

import arrowLeftBoldIcon from '../../../../../../public/assets/utilities/arrow-left-bold.svg'
import arrowRightBoldIcon from '../../../../../../public/assets/utilities/arrow-right-bold.svg'
import eyeShowIcon from '../../../../../../public/assets/utilities/eye-show.svg'

import * as S from './styles'
import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value,
  SecondaryValue
} from '../../../../../components/Modals/ModalViewCoin/styles'

import {
  TokensInfoResponseType,
  CoinGeckoAssetsResponseType
} from '../../SelectAssets'

interface IAddAssestsTableProps {
  tokensData: (TokensInfoResponseType & { balance?: BigNumber })[] | undefined;
  priceList: CoinGeckoAssetsResponseType | undefined;
}

const AddAssetsTable = ({ tokensData, priceList }: IAddAssestsTableProps) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [filteredArr, setFilteredArr] = React.useState<
    (TokensInfoResponseType & { balance?: BigNumber })[]
  >([])
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [tokenId, setTokenId] = React.useState('')
  const [token, setToken] = React.useState({
    logo: '',
    name: ''
  })
  const [isOpen, setIsOpen] = React.useState(false)
  const [viewToken, setViewToken] = React.useState({
    id: '',
    decimals: 18,
    symbol: '',
    balance: new BigNumber(0)
  })

  const { ref, inView } = useInView({
    threshold: 0.5
  })

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
  }

  function handleCurrentInView(n: number) {
    setInViewCollum(prev => {
      const newPrev = prev + n
      if (newPrev < 1) {
        return 3
      } else if (newPrev > 3) {
        return 1
      } else {
        return newPrev
      }
    })
  }

  function handleInputRadio(event: React.ChangeEvent<HTMLInputElement>) {
    setTokenId(event.target.name)
  }

  function handleView(
    token: string,
    logo: string,
    id: string,
    symbol: string,
    decimals: number,
    balance: BigNumber
  ) {
    setToken({
      logo: logo,
      name: token
    })
    setViewToken({
      id: id,
      symbol: symbol,
      decimals: decimals,
      balance: balance
    })
    setIsOpen(true)
  }

  React.useEffect(() => {
    const expressao = new RegExp(searchValue, 'i')
    const arr = tokensData ? tokensData : []

    const sortedArr = arr.sort((a, b) => {
      return a?.balance?.gt(b?.balance || new BigNumber(0)) ? 1 : -1
    })
    const tokensFiltered = sortedArr.filter(token => {
      return expressao.test(token.symbol)
    })

    setFilteredArr(tokensFiltered)
  }, [tokensData, searchValue])

  return (
    <>
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
              <S.Th className="price" isView={inViewCollum === 1}>
                Price
              </S.Th>
              <S.Th className="marketCap" isView={inViewCollum === 2}>
                Market Cap
              </S.Th>
              <S.Th className="balance" isView={inViewCollum === 3}>
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
            {filteredArr &&
              filteredArr[0]?.id &&
              filteredArr[0]?.balance &&
              filteredArr.map((coin, i) => (
                <S.Tr
                  key={coin.id}
                  ref={i === filteredArr.length - 1 ? ref : null}
                >
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
                      price={
                        priceList ? priceList[coin.id?.toLowerCase()]?.usd : 0
                      }
                      url={`https://heimdall-frontend.vercel.app/coins/${coin.symbol?.toLocaleLowerCase()}`}
                      table
                    />
                  </S.Td>
                  <S.Td className="price" isView={inViewCollum === 1}>
                    ${priceList ? priceList[coin.id?.toLowerCase()]?.usd : 0}
                  </S.Td>
                  <S.Td className="marketCap" isView={inViewCollum === 2}>
                    $
                    {priceList
                      ? BNtoDecimal(
                          Big(
                            priceList[coin.id?.toLowerCase()]?.usd_market_cap
                          ),
                          2
                        )
                      : 0}
                  </S.Td>
                  <S.Td className="balance" isView={inViewCollum === 3}>
                    {coin.balance
                      ? BNtoDecimal(
                          Big(coin.balance?.toString()).div(
                            Big(10).pow(coin.decimals)
                          ),
                          2
                        )
                      : 0}{' '}
                    {coin.symbol}
                    <S.SecondaryText>
                      ~$
                      {coin.balance && priceList
                        ? BNtoDecimal(
                            Big(coin.balance?.toString())
                              .div(Big(10).pow(coin.decimals))
                              .mul(Big(priceList[coin.id?.toLowerCase()].usd)),
                            2
                          )
                        : 0}
                    </S.SecondaryText>
                  </S.Td>
                  <S.Td className="button">
                    <S.ViewButton
                      type="button"
                      onClick={() =>
                        handleView(
                          coin.name,
                          coin.logo,
                          coin.id,
                          coin.symbol,
                          coin.decimals,
                          coin.balance || new BigNumber(0)
                        )
                      }
                    >
                      <Image src={eyeShowIcon} />
                    </S.ViewButton>
                  </S.Td>
                </S.Tr>
              ))}
            <S.Shadow inView={inView}></S.Shadow>
          </S.TBody>
        </S.Table>
      </S.AddAssetsTable>
      <ModalViewCoin
        title={token}
        isOpen={isOpen}
        onClick={() => setIsOpen(false)}
      >
        <TableLine>
          <TableLineTitle>Price</TableLineTitle>

          <ValueContainer>
            <Value>
              ${priceList ? priceList[viewToken.id.toLowerCase()]?.usd : 0}
            </Value>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Market Cap</TableLineTitle>
          <ValueContainer>
            <Value>
              $
              {priceList
                ? BNtoDecimal(
                    Big(
                      priceList[viewToken.id.toLowerCase()]?.usd_market_cap || 0
                    ),
                    2
                  )
                : 0}
            </Value>
          </ValueContainer>
        </TableLine>
        <TableLine>
          <TableLineTitle>Balance</TableLineTitle>
          <ValueContainer>
            <Value>
              {BNtoDecimal(
                Big(viewToken.balance.toString()).div(
                  Big(10).pow(viewToken.decimals)
                ),
                2
              )}{' '}
              {viewToken.symbol}
            </Value>
            <SecondaryValue>
              ~$
              {priceList && priceList[viewToken.id.toLowerCase()]
                ? BNtoDecimal(
                    Big(viewToken.balance.toString())
                      .div(Big(10).pow(viewToken.decimals))
                      .mul(Big(priceList[viewToken.id.toLowerCase()].usd || 0)),
                    2
                  )
                : 0}
            </SecondaryValue>
          </ValueContainer>
        </TableLine>
      </ModalViewCoin>
    </>
  )
}

export default AddAssetsTable
