import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Big from 'big.js'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'
import { useFundCard } from '@/hooks/query/useFundCard'

import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'
import { BNtoDecimal, calcChange } from '@/utils/numerals'

import FundAreaChart from './FundAreaChart'
import FundBarChart from './FundBarChart'
import FundTokenIcons from './FundTokenIcons'
import TokenWithNetworkImage from '../TokenWithNetworkImage'

import arrowAscend from '@assets/notificationStatus/arrow-ascend.svg'
import arrowDescend from '@assets/notificationStatus/arrow-descend.svg'

import { UnderlyingAssetsInfoType } from '@/utils/updateAssetsToV2'

import * as S from './styles'

interface InfoPool {
  tvl: string
  price: string
}

interface IFundCardProps {
  poolAddress: string
  link?: string
}

const FundCard = ({ poolAddress, link }: IFundCardProps) => {
  const { trackEventFunction } = useMatomoEcommerce()

  const dateNow = new Date()

  const [infoPool, setInfoPool] = React.useState<InfoPool>({
    tvl: '...',
    price: '...'
  })
  const [poolInfo, setPoolInfo] = React.useState<UnderlyingAssetsInfoType[]>([])
  const [poolObject, setPoolObject] = React.useState<Record<string, number>>({})

  const [price, setPrice] = React.useState<
    {
      timestamp: number
      close: number
    }[]
  >([])

  const [changeWeek, setChangeWeek] = React.useState<string[]>(
    Array(2).fill('')
  )

  const [params] = React.useState({
    id: poolAddress,
    price_period: 86400,
    period_selected: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 30),
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30)
  })

  const { data } = useFundCard(params)

  const getPercentage = (weight: number) => {
    return Number((weight * 100).toFixed(2))
  }

  React.useEffect(() => {
    const arrChangePrice = []

    if (data) {
      const newPrice = data.price_candles.map(item => {
        return {
          timestamp: item.timestamp,
          close: Number(item.close)
        }
      })

      const changeDay = calcChange(data.now[0]?.close, data.day[0]?.close)
      const changeMonth = calcChange(data.now[0]?.close, data.month[0]?.close)

      arrChangePrice[0] = changeDay
      arrChangePrice[1] = changeMonth

      setChangeWeek(arrChangePrice)

      setInfoPool({
        tvl: BNtoDecimal(Big(data.total_value_locked_usd ?? 0), 2, 2, 2),
        price: data.price_usd
      })

      setPrice(newPrice)

      if (data.pool_version === 2) {
        try {
          const poolInfo = getWeightsNormalizedV2(
            data.weight_goals,
            data.underlying_assets
          )
          setPoolInfo(poolInfo ?? data.underlying_assets)
        } catch (error) {
          setPoolInfo(data.underlying_assets)
        }
      } else {
        setPoolInfo(data.underlying_assets)
      }
    }
  }, [data])

  React.useEffect(() => {
    if (poolInfo.length > 0) {
      const pool = poolInfo.map(item => {
        return {
          [item.token.id]: getPercentage(Number(item.weight_normalized))
        }
      })
      const poolData = Object.assign({}, ...pool)
      setPoolObject(poolData)
    }
  }, [poolInfo])

  return (
    <>
      {data && infoPool.price > '0.1' ? (
        <S.CardContainer isLink={!!link}>
          <Link href={link ?? ''} passHref>
            <S.CardLinkContent
              onClick={() =>
                trackEventFunction(
                  'click-on-link',
                  `${data?.symbol?.toLocaleLowerCase()}`,
                  'feature-funds'
                )
              }
            >
              <S.CardHeader>
                <S.ImageContainer>
                  <TokenWithNetworkImage
                    tokenImage={{
                      url: data?.logo || '',
                      height: 36,
                      width: 36
                    }}
                    networkImage={{
                      url: data?.chain?.logo || '',
                      height: 16,
                      width: 16
                    }}
                    blockies={{
                      size: 8,
                      scale: 5,
                      seedName: data.name
                    }}
                  />
                </S.ImageContainer>

                <S.FundPrice>
                  <h3>Price</h3>
                  <span>
                    {data ? `$${parseFloat(infoPool.price).toFixed(2)}` : '...'}
                  </span>
                </S.FundPrice>
              </S.CardHeader>

              <S.CardBody>
                <S.FundName>
                  <h3>{data?.name}</h3>
                  <span>by {data?.founded_by ?? 'Community'}</span>
                </S.FundName>

                <S.FundStatusContainer>
                  <S.FundStatus>
                    <span>${infoPool.tvl}</span>
                    <h4>Tvl</h4>
                  </S.FundStatus>

                  <S.FundStatus>
                    <div>
                      <span
                        style={{
                          color:
                            parseFloat(changeWeek[1]) >= 0
                              ? '#5EE56B'
                              : '#EA3224'
                        }}
                      >
                        {changeWeek[1]}%
                      </span>
                      <Image
                        src={
                          parseFloat(changeWeek[1]) >= 0
                            ? arrowAscend
                            : arrowDescend
                        }
                        width={16}
                        height={16}
                      />
                    </div>
                    <h4>monthly</h4>
                  </S.FundStatus>

                  <S.FundStatus>
                    <div>
                      <span
                        style={{
                          color:
                            parseFloat(changeWeek[0]) >= 0
                              ? '#5EE56B'
                              : '#EA3224'
                        }}
                      >
                        {changeWeek[0]}%
                      </span>
                      <Image
                        src={
                          parseFloat(changeWeek[0]) >= 0
                            ? arrowAscend
                            : arrowDescend
                        }
                        width={16}
                        height={16}
                      />
                    </div>
                    <h4>24h</h4>
                  </S.FundStatus>
                </S.FundStatusContainer>

                <FundAreaChart areaChartData={price} color="#E843C4" />

                <S.TokenIconsContainer>
                  <FundTokenIcons poolInfo={poolInfo ?? []} />
                  {poolInfo.length > 3 && (
                    <p>
                      +{poolInfo.length - 3}
                      <span> more</span>
                    </p>
                  )}
                </S.TokenIconsContainer>

                {data && (
                  <FundBarChart poolObject={poolObject} poolInfo={poolInfo} />
                )}
              </S.CardBody>
            </S.CardLinkContent>
          </Link>
        </S.CardContainer>
      ) : null}
    </>
  )
}

export default FundCard
