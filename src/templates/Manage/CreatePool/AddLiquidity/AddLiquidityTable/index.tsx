import Image from 'next/image'
import Tippy from '@tippyjs/react'
import Big from 'big.js'
import BigNumber from 'bn.js'

import { BNtoDecimal } from '../../../../../utils/numerals'

import CoinSummary from '../../SelectAssets/CoinSummary'
import InputNumberRight from '../../../../../components/Inputs/InputNumberRight'

import tooltip from '../../../../../../public/assets/utilities/tooltip.svg'

import * as S from './styles'
import { Table, THead, Tr, Th, TBody, Td } from '../../AssetsTable/styles'

import {
  TokenType,
  handleLiquidity
} from '../../../../../store/reducers/poolCreationSlice'
import { CoinGeckoResponseType } from '..'

interface IAddLiquidityTableProps {
  coinsList: TokenType[];
  tokensBalance: { [key: string]: BigNumber };
  priceList: CoinGeckoResponseType | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputMaxClick: (token: string, liquidity: Big) => void;
  onMaxClick: (priceList: CoinGeckoResponseType) => void;
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
      total = total.add(coin.amount.mul(Big(priceArr[coin.address].usd)))
    }

    return total
  }

  function totalAvailableLiquidity() {
    const priceArr = priceList ? priceList : {}
    let min = Big('99999999999999999999999999999999999999999999999999')
    let tokenSymbol = ''
    let liquidity = Big(0)
    for (const token of coinsList) {
      const diffAllocation = 100 - token.allocation

      const balanceInDollar = Big(tokensBalance[token.address]?.toString() || 0)
        .div(Big(10).pow(token.decimals))
        .mul(Big(priceArr[token.address].usd))
        .mul(Big(diffAllocation))

      if (min.gte(balanceInDollar)) {
        min = balanceInDollar
        tokenSymbol = token.symbol
        liquidity = Big(tokensBalance[token.address]?.toString() || 0).div(
          Big(10).pow(token.decimals)
        )
      }
    }

    const liquidityList = handleLiquidity(
      liquidity,
      tokenSymbol,
      coinsList,
      priceArr
    )

    let total = Big(0)

    for (const coin of liquidityList) {
      total = total.add(coin.amount.mul(Big(priceArr[coin.address].usd)))
    }

    return total
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
                  price={priceList ? priceList[coin.address].usd : 0}
                  url={coin.url}
                  balance={
                    tokensBalance[coin.address]
                      ? Number(
                          BNtoDecimal(
                            Big(tokensBalance[coin.address].toString()).div(
                              Big(10).pow(coin.decimals)
                            ),
                            2
                          )
                        )
                      : 0
                  }
                  table
                />
                {coin.amount.lte(Big(0)) && (
                  <S.Error>Must be greater than 0</S.Error>
                )}
                {tokensBalance[coin.address] &&
                  coin.amount.gt(
                    Big(tokensBalance[coin.address].toString()).div(
                      Big(10).pow(coin.decimals)
                    )
                  ) && <S.Error>Exceeds wallet balance</S.Error>}
              </Td>

              <Td className="price">
                ${priceList ? priceList[coin.address].usd : 0}
              </Td>

              <Td className="balance">
                {tokensBalance[coin.address]
                  ? BNtoDecimal(
                      Big(tokensBalance[coin.address].toString()).div(
                        Big(10).pow(coin.decimals)
                      ),
                      2
                    )
                  : 0}{' '}
                {coin.symbol}
                <S.SecondaryText>
                  ~$
                  {tokensBalance[coin.address] && priceList
                    ? BNtoDecimal(
                        Big(tokensBalance[coin.address].toString())
                          .div(Big(10).pow(coin.decimals))
                          .mul(Big(priceList[coin.address].usd)),
                        2
                      )
                    : 0}
                </S.SecondaryText>
              </Td>

              <Td className="liquidity">
                <S.InputWrapper
                  isBiggerThanZero={coin.amount.lte(Big(0))}
                  isBiggerThanBalance={
                    tokensBalance[coin.address] &&
                    coin.amount.gt(
                      Big(tokensBalance[coin.address].toString()).div(
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
                    min={1 / 10 ** coin.decimals}
                    max={
                      tokensBalance[coin.address] &&
                      Big(tokensBalance[coin.address].toString())
                        .div(Big(10).pow(coin.decimals))
                        .toNumber()
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
                          ? Big(tokensBalance[coin.address].toString()).div(
                              Big(10).pow(coin.decimals)
                            )
                          : Big(0)
                      )
                    }
                  />
                </S.InputWrapper>

                <S.SecondaryText>
                  ~$
                  {priceList
                    ? BNtoDecimal(
                        coin.amount.mul(Big(priceList[coin.address].usd)),
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
            <S.Title>Total</S.Title>

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
                {priceList ? BNtoDecimal(totalAvailableLiquidity(), 2) : 0}
              </S.Available>
            </S.TotalContainer>
          </Tr>
        </S.Footer>
      </Table>
    </S.AddLiquidityTable>
  )
}

export default AddLiquidityTable
