import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import { useInView } from 'react-intersection-observer'

import { useAppSelector, useAppDispatch } from '../../../../../store/hooks'
import { setSelectedToken } from '../../../../../store/reducers/addAssetSlice'

import { BNtoDecimal } from '../../../../../utils/numerals'

import InputSearch from '../../../../../components/Inputs/InputSearch'
import CoinSummary from '@/templates/Manage/CreatePool/SelectAssets/CoinSummary'
import InputRadio from '../../../../../components/Inputs/InputRadio'
import ModalViewCoin from '../../../../../components/Modals/ModalViewCoin'

import arrowIcon from '../../../../../../public/assets/utilities/arrow-left.svg'
import eyeShowIcon from '../../../../../../public/assets/utilities/eye-show.svg'

import {
  TableLine,
  TableLineTitle,
  ValueContainer,
  Value,
  SecondaryValue
} from '../../../../../components/Modals/ModalViewCoin/styles'

import * as S from './styles'

import {
  TokensInfoResponseType,
  CoinGeckoAssetsResponseType
} from '../../SelectAssets'

interface IAddAssestsTableProps {
  tokensData: (TokensInfoResponseType & { balance?: Big })[] | undefined
  priceList: CoinGeckoAssetsResponseType | undefined
}

const AddAssetTable = ({ tokensData, priceList }: IAddAssestsTableProps) => {
  const [searchValue, setSearchValue] = React.useState('')
  const [filteredArr, setFilteredArr] = React.useState<
    (TokensInfoResponseType & { balance?: Big })[]
  >([])
  const [inViewCollum, setInViewCollum] = React.useState(1)
  const [token, setToken] = React.useState({
    logo: '',
    name: ''
  })
  const [isOpen, setIsOpen] = React.useState(false)
  const [viewToken, setViewToken] = React.useState({
    id: '',
    decimals: 18,
    symbol: '',
    balance: Big(0)
  })

  const dispatch = useAppDispatch()
  const tokenId = useAppSelector(state => state.addAsset.token.id)

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
    filteredArr.forEach(item => {
      if (item.id === event.target.id) {
        dispatch(
          setSelectedToken({
            id: event.target.id,
            logo: item.logo,
            name: item.name,
            symbol: item.symbol,
            image: item.logo,
            decimals: item.decimals
          })
        )
      }
    })
  }

  function handleView(
    token: string,
    logo: string,
    id: string,
    symbol: string,
    decimals: number,
    balance: Big
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
      return a?.balance?.lt(b?.balance || Big(0)) ? 1 : -1
    })
    const tokensFiltered = sortedArr.filter(token => {
      return expressao.test(token.symbol)
    })

    setFilteredArr(tokensFiltered)
  }, [tokensData, searchValue])

  return (
    <>
      <S.AddAssetTable>
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
                  <Image src={arrowIcon} width={7} height={12} />
                </S.TableViewButton>

                <S.TableViewButton
                  type="button"
                  onClick={() => handleCurrentInView(1)}
                  id="arrowRight"
                >
                  <Image src={arrowIcon} width={7} height={12} />
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
                        form="manageAssetsForm"
                        name="selectAssets"
                        inputId={coin.id}
                        inputChecked={coin.id === tokenId}
                        handleClickInput={handleInputRadio}
                        text=""
                        required
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
                    $
                    {priceList
                      ? priceList[coin.id?.toLowerCase()]?.usd.toFixed(2)
                      : 0}
                  </S.Td>
                  <S.Td className="marketCap" isView={inViewCollum === 2}>
                    $
                    {priceList
                      ? BNtoDecimal(
                          Big(
                            priceList[coin.id?.toLowerCase()]?.marketCap ?? 0
                          ),
                          2
                        )
                      : 0}
                  </S.Td>
                  <S.Td className="balance" isView={inViewCollum === 3}>
                    {coin.balance
                      ? BNtoDecimal(
                          coin.balance?.div(Big(10).pow(coin.decimals)) ??
                            Big(0),
                          2
                        )
                      : 0}
                    <S.SecondaryText>
                      ~$
                      {coin.balance && priceList
                        ? BNtoDecimal(
                            coin.balance
                              ?.div(Big(10).pow(coin.decimals))
                              ?.mul(
                                Big(priceList[coin.id?.toLowerCase()]?.usd ?? 0)
                              ) ?? Big(0),
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
                          coin.balance || Big(0)
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
      </S.AddAssetTable>
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
                    Big(priceList[viewToken.id.toLowerCase()]?.marketCap || 0),
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
                viewToken.balance?.div(Big(10).pow(viewToken.decimals)) ??
                  Big(0),
                2
              )}
            </Value>
            <SecondaryValue>
              ~$
              {priceList && priceList[viewToken.id.toLowerCase()]
                ? BNtoDecimal(
                    viewToken.balance
                      ?.div(Big(10).pow(viewToken.decimals))
                      ?.mul(
                        Big(priceList[viewToken.id.toLowerCase()]?.usd || 0)
                      ) ?? Big(0),
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

export default AddAssetTable
