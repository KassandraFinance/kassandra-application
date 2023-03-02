import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import {
  BACKEND_KASSANDRA,
  COINGECKO_API,
  networks
} from '../../../../../constants/tokenAddresses'
import { GET_POOL_TOKENS } from '../../AddLiquidity/graphql'

import { BNtoDecimal } from '../../../../../utils/numerals'

import { useAppSelector } from '../../../../../store/hooks'
import {
  GetPoolTokensType,
  CoinGeckoAssetsResponseType
} from '../../AddLiquidity/AddLiquidityOperation'

import * as S from './styles'

const TransactionSummary = () => {
  const token = useAppSelector(state => state.addAsset.token)
  const newToken = useAppSelector(state => state.addAsset.token)
  const newTokenLiquidity = useAppSelector(state => state.addAsset.liquidit)
  const poolId = useAppSelector(state => state.addAsset.poolId)
  const chainId = useAppSelector(state => state.addAsset.chainId)

  const params = {
    id: poolId
  }

  const { data } = useSWR<GetPoolTokensType>(
    [GET_POOL_TOKENS, params],
    (query, params) => request(BACKEND_KASSANDRA, query, params)
  )

  const { data: priceData } = useSWR<CoinGeckoAssetsResponseType>(
    `${COINGECKO_API}/simple/token_price/${networks[chainId].coingecko}?contract_addresses=${token.id}&vs_currencies=usd`
  )

  return (
    <S.TransactionSummary>
      <S.Title>Transaction summary</S.Title>

      <S.Container>
        <S.FlexContainer>
          <S.ContentTitle>token added</S.ContentTitle>

          <S.ValueContainer>
            <S.ValueWrapper>
              <S.Value>{BNtoDecimal(Big(newTokenLiquidity.amount), 2)}</S.Value>

              <S.SecondaryValue>
                ~$
                {priceData &&
                  BNtoDecimal(
                    Big(newTokenLiquidity.amount).mul(
                      priceData[token.id.toLowerCase()].usd
                    ),
                    2
                  )}
              </S.SecondaryValue>
            </S.ValueWrapper>

            <S.ImageWrapper>
              <Image src={newToken.image} layout="fill" />
            </S.ImageWrapper>
          </S.ValueContainer>
        </S.FlexContainer>

        <S.FlexContainer>
          <S.ContentTitle>allocation</S.ContentTitle>

          <S.Value>{Big(newTokenLiquidity.allocation).toFixed(2)}%</S.Value>
        </S.FlexContainer>
      </S.Container>

      <S.Line />

      <S.Container>
        <S.FlexContainer>
          <S.ContentTitle>received LP (EST.)</S.ContentTitle>

          {data && priceData && (
            <S.ValueContainer>
              <S.ValueWrapper>
                <S.Value>
                  {BNtoDecimal(
                    Big(newTokenLiquidity.amount || 0)
                      .mul(priceData[token.id.toLowerCase()].usd)
                      .div(data.pool.price_usd),
                    2
                  )}
                </S.Value>

                <S.SecondaryValue>
                  ~$
                  {BNtoDecimal(
                    Big(newTokenLiquidity.amount || 0).mul(
                      priceData[token.id.toLowerCase()].usd
                    ),
                    2
                  )}
                </S.SecondaryValue>
              </S.ValueWrapper>

              <S.ImageWrapper>
                <Image src={data.pool.logo} layout="fill" />
              </S.ImageWrapper>
            </S.ValueContainer>
          )}
        </S.FlexContainer>
      </S.Container>
    </S.TransactionSummary>
  )
}

export default TransactionSummary
