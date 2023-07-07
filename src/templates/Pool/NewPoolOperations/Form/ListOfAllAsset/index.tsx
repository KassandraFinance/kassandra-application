import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Big from 'big.js'

import { usePoolData } from '@/hooks/query/usePoolData'
import logoNone from '../../../../../../public/assets/icons/coming-soon.svg'

import PoolOperationContext from '../PoolOperationContext'

import { BNtoDecimal } from '../../../../../utils/numerals'

import * as S from './styles'

interface IListOfAllAssetProps {
  amountAllTokenOut: Record<string, Big>
  balanceAllTokenOut: Record<string, Big>
}
const ListOfAllAsset = ({
  amountAllTokenOut,
  balanceAllTokenOut
}: IListOfAllAssetProps) => {
  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const { priceToken } = React.useContext(PoolOperationContext)

  const ListTokenWithBalance = pool
    ? pool?.underlying_assets.map(item => {
        const decimals = item.token.wraps?.decimals || item.token.decimals || 18
        return {
          ...item,
          amount: Big(amountAllTokenOut[item.token.id] ?? 0).div(
            Big(10).pow(decimals)
          ),
          balance: Big(balanceAllTokenOut[item.token.id] ?? 0).div(
            Big(10).pow(decimals)
          )
        }
      })
    : []
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
          const amount = item?.amount ?? Big(0)

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
                  {BNtoDecimal(item.amount || Big(0), token?.decimals || 18)}{' '}
                  {token.symbol}
                </S.SymbolContainer>
                <S.SpanLight>
                  Balance:{' '}
                  {BNtoDecimal(item.balance || Big(0), token?.decimals || 18)}
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
                      amount.mul(
                        Big(
                          priceToken(
                            item.token.wraps
                              ? item.token.wraps.id.toLocaleLowerCase()
                              : item.token.id.toLocaleLowerCase()
                          ) || 0
                        )
                      ),
                      Number(token.decimals),
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
