import React from 'react'
import Image from 'next/image'
import Big from 'big.js'
import { useRouter } from 'next/router'
import { useConnectWallet } from '@web3-onboard/react'
import { getAddress } from 'ethers'

import { networks } from '../../../../../constants/tokenAddresses'

import { BNtoDecimal } from '../../../../../utils/numerals'

import { useAppSelector } from '../../../../../store/hooks'
import usePoolInfo from '@/hooks/usePoolInfo'
import useCoingecko from '@/hooks/useCoingecko'

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

  const { poolInfo } = usePoolInfo(
    wallet ? getAddress(wallet.accounts[0].address) : '',
    poolId
  )

  const { data: priceData } = useCoingecko(
    networks[poolInfo?.chain_id ?? 137].coingecko,
    networks[poolInfo?.chain_id ?? 137].nativeCurrency.address,
    [token.id]
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
                      .div(poolInfo.price_usd),
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
                {poolInfo.logo ? (
                  <Image src={poolInfo.logo} width={24} height={24} />
                ) : (
                  <TokenWithNetworkImage
                    tokenImage={{
                      url: poolInfo.logo,
                      height: 24,
                      width: 24,
                      withoutBorder: true
                    }}
                    networkImage={{
                      url: poolInfo.chain.logo,
                      height: 12,
                      width: 12
                    }}
                    blockies={{
                      size: 5,
                      scale: 6,
                      seedName: poolInfo.name
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
