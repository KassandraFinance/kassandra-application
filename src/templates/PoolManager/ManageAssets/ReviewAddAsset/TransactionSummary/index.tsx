import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'

import { BNtoDecimal } from '../../../../../utils/numerals'

import { useAppSelector } from '../../../../../store/hooks'
import { useManagerPoolInfo } from '@/hooks/query/useManagerPoolInfo'
import { useTokensData } from '@/hooks/query/useTokensData'

import TokenWithNetworkImage from '@/components/TokenWithNetworkImage'

import * as S from './styles'

const TransactionSummary = () => {
  const token = useAppSelector(state => state.addAsset.token)
  const newToken = useAppSelector(state => state.addAsset.token)
  const newTokenLiquidity = useAppSelector(state => state.addAsset.liquidit)
  const [{ wallet }] = useConnectWallet()

  const router = useRouter()

  const poolId = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data: poolInfo } = useManagerPoolInfo({
    manager: wallet?.accounts[0].address,
    id: poolId
  })

  const { data: priceData } = useTokensData({
    chainId: (poolInfo && poolInfo[0]?.chain_id) || 137,
    tokenAddresses: [token.id]
  })

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
                      priceData[token.id.toLowerCase()]?.usd ?? 0
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

          {poolInfo && priceData && (
            <S.ValueContainer>
              <S.ValueWrapper>
                <S.Value>
                  {BNtoDecimal(
                    Big(newTokenLiquidity.amount || 0)
                      .mul(priceData[token.id.toLowerCase()]?.usd ?? 0)
                      .div(poolInfo[0].price_usd),
                    2
                  )}
                </S.Value>

                <S.SecondaryValue>
                  ~$
                  {BNtoDecimal(
                    Big(newTokenLiquidity.amount || 0).mul(
                      priceData[token.id.toLowerCase()]?.usd ?? 0
                    ),
                    2
                  )}
                </S.SecondaryValue>
              </S.ValueWrapper>

              <S.ImageWrapper>
                {poolInfo[0].logo ? (
                  <Image src={poolInfo[0].logo} width={24} height={24} />
                ) : (
                  <TokenWithNetworkImage
                    tokenImage={{
                      url: poolInfo[0]?.logo || '',
                      height: 24,
                      width: 24,
                      withoutBorder: true
                    }}
                    networkImage={{
                      url: poolInfo[0].chain?.logo || '',
                      height: 12,
                      width: 12
                    }}
                    blockies={{
                      size: 5,
                      scale: 6,
                      seedName: poolInfo[0].name
                    }}
                  />
                )}
              </S.ImageWrapper>
            </S.ValueContainer>
          )}
        </S.FlexContainer>
      </S.Container>
    </S.TransactionSummary>
  )
}

export default TransactionSummary
