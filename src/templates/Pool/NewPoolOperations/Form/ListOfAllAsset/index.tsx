import Image from 'next/image'
import React from 'react'
import { useAppSelector } from '../../../../../store/hooks'
import BigNumber from 'bn.js'
import Big from 'big.js'

import logoNone from '../../../../../../public/assets/icons/coming-soon.svg'

import PoolOperationContext from '../PoolOperationContext'

import { BNtoDecimal } from '../../../../../utils/numerals'

import * as S from './styles'

interface IListOfAllAssetProps {
  amountAllTokenOut: any;
  balanceAllTokenOut: any;
}
const ListOfAllAsset = ({
  amountAllTokenOut,
  balanceAllTokenOut
}: IListOfAllAssetProps) => {
  const { pool } = useAppSelector(state => state)

  const { priceToken } = React.useContext(PoolOperationContext)

  const ListTokenWithBalance = pool.underlying_assets.map((item, index) => {
    return {
      ...item,
      amount: amountAllTokenOut[index],
      balance: balanceAllTokenOut[index]
    }
  })
  const tokenSorting = [...ListTokenWithBalance].sort(
    (a, b) => Number(b.weight_normalized) - Number(a.weight_normalized)
  )

  return (
    <S.ListOfAllAsset>
      <S.IntroBestValue>
        <S.title>Receive(est.)</S.title>
      </S.IntroBestValue>
      <S.AllInput>
        {tokenSorting.map(item => {
          const token = item.token.wraps ? item.token.wraps : item.token

          return (
            <S.InputBestValueGrid key={`best_value_${item.token.id}`}>
              <S.BestValueItem>
                <S.SymbolContainer>
                  <S.tokenLogo>
                    <Image
                      src={token.logo || logoNone}
                      alt=""
                      width={21}
                      height={21}
                    />
                  </S.tokenLogo>
                  {BNtoDecimal(item.amount || new BigNumber(0), token.decimals)}{' '}
                  {token.symbol}
                </S.SymbolContainer>
                <S.SpanLight>
                  Balance:{' '}
                  {item.balance > new BigNumber(-1)
                    ? BNtoDecimal(
                        item.balance || new BigNumber(0),
                        token.decimals
                      )
                    : '...'}
                </S.SpanLight>
              </S.BestValueItem>
              <S.BestValueItem style={{ paddingRight: '10px' }}>
                <S.Input
                  readOnly
                  type="text"
                  placeholder="0"
                  value={
                    '$' +
                    BNtoDecimal(
                      Big(item.amount || 0)
                        .mul(
                          Big(
                            priceToken(
                              item.token.wraps
                                ? item.token.wraps.id.toLocaleLowerCase()
                                : item.token.id.toLocaleLowerCase()
                            ) || 0
                          )
                        )
                        .div(Big(10).pow(Number(token.decimals))),
                      18,
                      2,
                      2
                    )
                  }
                />
                <S.SpanLight style={{ textAlign: 'right', float: 'right' }}>
                  {(Number(item.weight_normalized || 0) * 100).toFixed(2)}%
                </S.SpanLight>
              </S.BestValueItem>
            </S.InputBestValueGrid>
          )
        })}
      </S.AllInput>
    </S.ListOfAllAsset>
  )
}

export default ListOfAllAsset
