import Image from 'next/image'
import Tippy from '@tippyjs/react'
import Big from 'big.js'

import { BNtoDecimal } from '@/utils/numerals'
import { abbreviateNumber } from '@/utils/abbreviateNumber'
import { CoinsMetadataType } from '@/hooks/query/useTokensData'

import CoinSummary from '../../SelectAssets/CoinSummary'
import InputNumberRight from '@/components/Inputs/InputNumberRight'

import tooltip from '@assets/utilities/tooltip.svg'

import * as S from './styles'
import { Table, THead, Tr, Th, TBody, Td } from '../../AssetsTable/styles'

import {
  TokenType,
  handleLiquidity
} from '../../../../../store/reducers/poolCreationSlice'
import { MIN_DOLLAR_TO_CREATE_POOL } from '@/constants/tokenAddresses'

interface IAddLiquidityTableProps {
  coinsList: TokenType[]
  tokensBalance: { [key: string]: Big }
  priceList: CoinsMetadataType | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onInputMaxClick: (token: string, liquidity: string) => void
  onMaxClick: (priceList: CoinsMetadataType) => void
}

const AddLiquidityTable = ({
  coinsList,
  tokensBalance,
  priceList,
  onChange,
  onInputMaxClick,
  onMaxClick
}: IAddLiquidityTableProps) => {
  function totalLiquidity() {
    const priceArr = priceList ? priceList : {}
    let total = Big(0)

    for (const coin of coinsList) {
      total = total.add(
        Big(coin.amount).mul(Big(priceArr[coin.address]?.usd ?? 0))
      )
    }

    return total
  }

  function totalAvailableLiquidity() {
    const priceArr = priceList ? priceList : {}
    let min = Big('99999999999999999999999999999999999999999999999999')
    let tokenSymbol = ''
    let liquidity = Big(0)
    for (const token of coinsList) {
      const diffAllocation = 100 - Number(token.allocation)
      const tokenBalance = tokensBalance[token.address] ?? Big(0)

      const balanceInDollar = tokenBalance
        .div(Big(10).pow(token.decimals))
        .mul(Big(priceArr[token.address]?.usd ?? 0))
        .mul(Big(diffAllocation))

      if (min.gte(balanceInDollar)) {
        min = balanceInDollar
        tokenSymbol = token.symbol
        liquidity = tokenBalance.div(Big(10).pow(token.decimals))
      }
    }

    const liquidityList = handleLiquidity(
      liquidity.toString(),
      tokenSymbol,
      coinsList,
      priceArr
    )

    let total = Big(0)

    for (const coin of liquidityList) {
      total = total.add(
        Big(coin.amount).mul(Big(priceArr[coin.address]?.usd ?? 0))
      )
    }

    return total
  }

  function handleInvalid(event: any) {
    return event.target.setCustomValidity(' ')
  }

  return (
    <S.AddLiquidityTable>
      <Table>
        <THead>
          <Tr>
            <Th className="asset">Asset</Th>
            <Th className="price">Price</Th>
            <Th className="balance">Balance</Th>
            <Th className="liquidity">
              Initial Liquidity
              <Tippy content="This is a tip">
                <S.Tooltip tabIndex={0}>
                  <Image src={tooltip} alt="Explanation" layout="responsive" />
                </S.Tooltip>
              </Tippy>
            </Th>
          </Tr>
        </THead>

        <TBody>
          {coinsList.map(coin => (
            <Tr key={coin.name}>
              <Td className="asset">
                <CoinSummary
                  coinImage={coin.icon}
                  coinName={coin.name}
                  coinSymbol={coin.symbol}
                  price={
                    priceList ? priceList[coin.address]?.usd.toString() : '0'
                  }
                  url={coin.url}
                  balance={
                    tokensBalance[coin.address]
                      ? Number(
                          BNtoDecimal(
                            tokensBalance[coin.address].div(
                              Big(10).pow(coin.decimals)
                            ),
                            2
                          )
                        )
                      : 0
                  }
                  table
                />
                <S.Error isError={Big(coin.amount).lte(Big(0))}>
                  Must be greater than 0
                </S.Error>
                <S.Error
                  isError={
                    tokensBalance[coin.address] &&
                    Big(coin.amount).gt(
                      Big(tokensBalance[coin.address].toString()).div(
                        Big(10).pow(coin.decimals)
                      )
                    )
                  }
                >
                  Exceeds wallet balance
                </S.Error>
              </Td>

              <Td className="price">
                $
                {priceList
                  ? BNtoDecimal(Big(priceList[coin.address]?.usd ?? 0), 4)
                  : 0}
              </Td>

              <Td className="balance">
                {tokensBalance[coin.address]
                  ? abbreviateNumber(
                      tokensBalance[coin.address]
                        .div(Big(10).pow(coin.decimals))
                        .toString()
                    )
                  : 0}{' '}
                <S.SecondaryText>
                  ~$
                  {tokensBalance[coin.address] && priceList
                    ? abbreviateNumber(
                        tokensBalance[coin.address]
                          .div(Big(10).pow(coin.decimals))
                          .mul(Big(priceList[coin.address]?.usd ?? 0))
                          .toString()
                      )
                    : 0}
                </S.SecondaryText>
              </Td>

              <Td className="liquidity">
                <S.InputWrapper
                  isBiggerThanZero={Big(coin.amount).lte(Big(0))}
                  isBiggerThanBalance={
                    tokensBalance[coin.address] &&
                    Big(coin.amount).gt(
                      tokensBalance[coin.address].div(
                        Big(10).pow(coin.decimals)
                      )
                    )
                  }
                >
                  <InputNumberRight
                    form="poolCreationForm"
                    name={coin.symbol}
                    type="number"
                    value={coin.amount.toString()}
                    min={Big(1).div(Big(10).pow(coin.decimals)).toString()}
                    max={
                      tokensBalance[coin.address] &&
                      tokensBalance[coin.address]
                        .div(Big(10).pow(coin.decimals))
                        .toString()
                    }
                    placeholder=""
                    lable="add liquidity"
                    required
                    onChange={onChange}
                    button
                    buttonText={'Max'}
                    onClick={() =>
                      onInputMaxClick(
                        coin.symbol,
                        tokensBalance[coin.address]
                          ? String(
                              tokensBalance[coin.address].div(
                                Big(10).pow(coin.decimals)
                              )
                            )
                          : '0'
                      )
                    }
                  />
                </S.InputWrapper>

                <S.SecondaryText>
                  ~$
                  {priceList
                    ? BNtoDecimal(
                        Big(coin.amount).mul(
                          Big(priceList[coin.address]?.usd ?? 0)
                        ),
                        4
                      )
                    : 0}
                </S.SecondaryText>
              </Td>
            </Tr>
          ))}
        </TBody>

        <S.Footer>
          <Tr>
            <S.TitleContainer>
              <S.Title>Total</S.Title>
              <S.MinAmountError
                isError={totalLiquidity().lt(MIN_DOLLAR_TO_CREATE_POOL)}
              >
                Must be greater than ${MIN_DOLLAR_TO_CREATE_POOL}
              </S.MinAmountError>
            </S.TitleContainer>
            <S.TotalContainer>
              <S.Total>
                ${priceList ? BNtoDecimal(totalLiquidity(), 2) : 0}
                {priceList && (
                  <S.MaxButton
                    type="button"
                    onClick={() => onMaxClick(priceList)}
                  >
                    Max
                  </S.MaxButton>
                )}
              </S.Total>

              <S.Available>
                Available: $
                {Object.keys(tokensBalance).length > 0 && priceList
                  ? BNtoDecimal(totalAvailableLiquidity(), 2)
                  : 0}
              </S.Available>
            </S.TotalContainer>
          </Tr>
        </S.Footer>
        {totalLiquidity().lt(MIN_DOLLAR_TO_CREATE_POOL) && (
          <S.InputValidation
            form="poolCreationForm"
            id="select-token"
            name="select-token"
            type="radio"
            onInvalid={handleInvalid}
            required
            checked={totalLiquidity().gte(MIN_DOLLAR_TO_CREATE_POOL)}
            onChange={() => {
              return
            }}
          />
        )}
      </Table>
    </S.AddLiquidityTable>
  )
}

export default AddLiquidityTable
