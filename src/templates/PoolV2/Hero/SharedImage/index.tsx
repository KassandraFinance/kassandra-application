import Image from 'next/image'
import React from 'react'
import Blockies from 'react-blockies'

import ChartProducts from './ChartProducts'

import imageIcon from '@assets/icons/coming-soon.svg'
import {
  Background,
  IconBar,
  IconBirdKassandra,
  IconUnion,
  IconUnionKassandra
} from './Icons'

import * as S from './styles'
import { usePoolPrice } from '@/hooks/query/usePoolPrice'
import { calcChange } from '@/utils/numerals'

export type AllPerformancePeriod = {
  [key: string]: string
}

export interface IPerformanceValues {
  title: string
  allPerformancePeriod?: AllPerformancePeriod
}

interface ISharedImageProps {
  poolId: string
  crpPoolAddress: string
  totalValueLocked: string
  socialIndex: string
  productName: string
  poolLogo: string
  tokens:
    | {
        balance: string
        weight_normalized: string
        weight_goal_normalized: string
        token: {
          id: string
          name: string
          logo?: string | null | undefined
          symbol: string
          decimals: number
          is_wrap_token: number
          wraps?:
            | {
                id: string
                decimals: number
                symbol: string
                name: string
                logo?: string | null | undefined
              }
            | null
            | undefined
        }
      }[]
    | undefined
}

const SharedImage = ({
  poolId,
  crpPoolAddress,
  totalValueLocked,
  socialIndex,
  productName,
  poolLogo,
  tokens
}: ISharedImageProps) => {
  const [performanceValues, setPerformanceValues] =
    React.useState<IPerformanceValues>({ title: '' })

  const { data: change } = usePoolPrice({
    id: poolId,
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    quarterly: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 90),
    year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
  })

  React.useEffect(() => {
    if (change) {
      const changeDay = calcChange(change.now[0].close, change.day[0]?.close)
      const changeWeek = calcChange(change.now[0].close, change.week[0]?.close)
      const changeMonth = calcChange(
        change.now[0].close,
        change.month[0]?.close
      )
      const changeQuarterly = calcChange(
        change.now[0].close,
        change.quarterly[0]?.close
      )
      const changeYear = calcChange(change.now[0].close, change.year[0]?.close)

      setPerformanceValues({
        title: 'Weekly Performance',
        allPerformancePeriod: {
          'Daily Performance': changeDay,
          'Weekly Performance': changeWeek,
          'Monthly Performance': changeMonth,
          '3 Months Performance': changeQuarterly,
          'Yearly Performance': changeYear
        }
      })
    }
  }, [change])

  return (
    <S.SharedImage className="bg-image-color">
      <Background />
      <S.Header>
        <S.Title>
          {poolLogo ? (
            <S.PoolLogoWrapper>
              <Image src={poolLogo} width={40} height={40} />
            </S.PoolLogoWrapper>
          ) : (
            <Blockies
              seed={productName}
              className="poolIcon"
              size={8}
              scale={5}
            />
          )}
          <h1>{productName}</h1>
          <S.Detail>${socialIndex}</S.Detail>
        </S.Title>
      </S.Header>

      <S.Main>
        {performanceValues.allPerformancePeriod && (
          <S.InfoContainer>
            <S.Info>
              <S.InfoTitle>
                <IconBar />
                <span>{performanceValues.title}</span>
              </S.InfoTitle>
              {performanceValues.allPerformancePeriod[
                performanceValues.title
              ].startsWith('-') ? (
                <S.InfoValue color="red">
                  {
                    performanceValues.allPerformancePeriod[
                      performanceValues.title
                    ]
                  }
                  %
                </S.InfoValue>
              ) : (
                <S.InfoValue color="green">
                  +
                  {
                    performanceValues.allPerformancePeriod[
                      performanceValues.title
                    ]
                  }
                  %
                </S.InfoValue>
              )}
            </S.Info>
            <S.Info>
              <S.InfoTitle>
                <IconBar />
                <span>Total Value Locked</span>
              </S.InfoTitle>
              <S.InfoValue color="white">${totalValueLocked}</S.InfoValue>
            </S.Info>
            <S.Assets>
              <S.InfoTitle>
                <IconUnion />
                <span>Assets</span>
              </S.InfoTitle>
              <S.AssetsContainer>
                {tokens?.map((item, index) => (
                  <Image
                    key={index}
                    src={
                      item.token?.logo ?? item.token?.wraps?.logo ?? imageIcon
                    }
                    width={25}
                    height={25}
                  />
                ))}
              </S.AssetsContainer>
            </S.Assets>
          </S.InfoContainer>
        )}
        <S.ChartContainer>
          <ChartProducts crpPoolAddress={crpPoolAddress} height={296} />
        </S.ChartContainer>
      </S.Main>

      <S.Footer>
        <S.SocialMedia>
          <IconBirdKassandra />
          dao_kassandra
        </S.SocialMedia>
        <S.SocialMedia>
          <IconUnionKassandra />
          kassandra.finance
        </S.SocialMedia>
      </S.Footer>
    </S.SharedImage>
  )
}

export default SharedImage
