import Image from 'next/image'
import React from 'react'
import { useAppSelector } from '../../../../../store/hooks'

import logoNone from '../../../../../../public/assets/icons/coming-soon.svg'

import * as S from './styles'

const ListOfAllAsset = () => {
  const { pool } = useAppSelector(state => state)

  return (
    <S.ListOfAllAsset>
      <S.IntroBestValue>
        <S.title>Receive(est.)</S.title>
      </S.IntroBestValue>
      <S.AllInput>
        {pool.underlying_assets.map(item => {
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
                  {/* {BNtoDecimal(
                    swapOutAmount[index] || new BigNumber(0),
                    token.decimals.toNumber()
                  )}{' '}
                  {poolTokenDetails.length > 0 ? token.symbol : '...'} */}
                  {token.symbol}
                </S.SymbolContainer>
                <S.SpanLight>
                  Balance:{' '}
                  {/* {swapOutBalance[index] > new BigNumber(-1)
                    ? BNtoDecimal(
                        swapOutBalance[index],
                        token.decimals.toNumber()
                      )
                    : '...'} */}
                  0
                </S.SpanLight>
              </S.BestValueItem>
              <S.BestValueItem style={{ paddingRight: '10px' }}>
                <S.Input
                  readOnly
                  type="text"
                  placeholder="0"
                  // value={
                  //   '$' +
                  //   BNtoDecimal(
                  //     Big((swapOutAmount[index] || 0).toString())
                  //       .mul(Big(priceDollar(token.address, poolTokensArray)))
                  //       .div(Big(10).pow(Number(token.decimals))),
                  //     18,
                  //     2,
                  //     2
                  //   )
                  // }
                />
                <S.SpanLight style={{ textAlign: 'right', float: 'right' }}>
                  {/* {token.allocation}% */}
                  30%
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
