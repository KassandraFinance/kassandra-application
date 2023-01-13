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

import { TokenType } from '../../../../../store/reducers/poolCreationSlice'
import { CoinGeckoResponseType } from '..'

interface IAddLiquidityTableProps {
  coinsList: TokenType[];
  tokenBalance: { [key: string]: BigNumber };
  priceList: CoinGeckoResponseType | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputMaxClick: (token: string, liquidity: Big) => void;
  onMaxClick: (priceList: CoinGeckoResponseType) => void;
}

const AddLiquidityTable = ({
  coinsList,
  tokenBalance,
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
                    tokenBalance[coin.address]
                      ? Number(
                          BNtoDecimal(
                            Big(tokenBalance[coin.address].toString()).div(
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
                {coin.amount.gt(
                  Big(tokenBalance[coin.address].toString()).div(
                    Big(10).pow(coin.decimals)
                  )
                ) && <S.Error>Exceeds wallet balance</S.Error>}
              </Td>

              <Td className="price">
                ${priceList ? priceList[coin.address].usd : 0}
              </Td>

              <Td className="balance">
                {tokenBalance[coin.address]
                  ? BNtoDecimal(
                      Big(tokenBalance[coin.address].toString()).div(
                        Big(10).pow(coin.decimals)
                      ),
                      2
                    )
                  : 0}{' '}
                {coin.symbol}
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
              </Td>

              <Td className="liquidity">
                <S.InputWrapper
                  isBiggerThanZero={coin.amount.lte(Big(0))}
                  isBiggerThanBalance={coin.amount.gt(
                    Big(tokenBalance[coin.address].toString()).div(
                      Big(10).pow(coin.decimals)
                    )
                  )}
                >
                  <InputNumberRight
                    name={coin.symbol}
                    type="number"
                    value={coin.amount.toString()}
                    min={0}
                    max="any"
                    placeholder=""
                    lable="add liquidity"
                    onChange={onChange}
                    button
                    buttonText={'Max'}
                    onClick={() =>
                      onInputMaxClick(
                        coin.symbol,
                        tokenBalance[coin.address]
                          ? Big(tokenBalance[coin.address].toString()).div(
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
                  <S.MaxButton onClick={() => onMaxClick(priceList)}>
                    Max
                  </S.MaxButton>
                )}
              </S.Total>

              <S.Available>Available: $20,000.00</S.Available>
            </S.TotalContainer>
          </Tr>
        </S.Footer>
      </Table>
    </S.AddLiquidityTable>
  )
}

export default AddLiquidityTable
