import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Big from 'big.js'
import useSWR from 'swr'
import { request } from 'graphql-request'

import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'

import { BACKEND_KASSANDRA } from '../../constants/tokenAddresses'

import { getWeightsNormalizedV2 } from '../../utils/updateAssetsToV2'
import { BNtoDecimal, calcChange } from '../../utils/numerals'

import FundAreaChart from './FundAreaChart'
import FundBarChart from './FundBarChart'
import FundTokenIcons from './FundTokenIcons'
import TokenWithNetworkImage from '../TokenWithNetworkImage'

import arrowAscend from '@assets/notificationStatus/arrow-ascend.svg'
import arrowDescend from '@assets/notificationStatus/arrow-descend.svg'

import { underlyingAssetsInfo } from '@/store/reducers/pool'

import { GET_POOL } from './graphql'

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
  const [poolInfo, setPoolInfo] = React.useState<underlyingAssetsInfo[]>([])
  const [poolObject, setPoolObject] = React.useState<Record<string, number>>({})

  const [price, setPrice] = React.useState([])

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

  const { data } = useSWR([GET_POOL, params], (query, params) =>
    request(BACKEND_KASSANDRA, query, params)
  )

  const getPercentage = (weight: number) => {
    return Number((weight * 100).toFixed(2))
  }

  React.useEffect(() => {
    const arrChangePrice = []

    if (data?.pool) {
      const newPrice = data?.pool?.price_candles.map(
        (item: { timestamp: number; close: string }) => {
          return {
            timestamp: item.timestamp,
            close: Number(item.close)
          }
        }
      )

      const changeDay = calcChange(
        data.pool.now[0]?.close,
        data.pool.day[0]?.close
      )
      const changeMonth = calcChange(
        data.pool.now[0]?.close,
        data.pool.month[0]?.close
      )

      arrChangePrice[0] = changeDay
      arrChangePrice[1] = changeMonth

      setChangeWeek(arrChangePrice)

      setInfoPool({
        tvl: BNtoDecimal(Big(data?.pool?.total_value_locked_usd ?? 0), 2, 2, 2),
        price: data.pool.price_usd
      })

      setPrice(newPrice)

      if (data.pool.pool_version === 2) {
        try {
          const poolInfo = getWeightsNormalizedV2(
            data.pool.weight_goals,
            data.pool.underlying_assets
          )
          setPoolInfo(poolInfo ?? data.pool.underlying_assets)
        } catch (error) {
          setPoolInfo(data.pool.underlying_assets)
        }
      } else {
        setPoolInfo(data.pool.underlying_assets)
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
      {infoPool.price > '0.1' ? (
        <S.CardContainer isLink={!!link}>
          <Link href={link ?? ''} passHref>
            <S.CardLinkContent
              onClick={() =>
                trackEventFunction(
                  'click-on-link',
                  `${data.pool.symbol.toLocaleLowerCase()}`,
                  'feature-funds'
                )
              }
            >
              <S.CardHeader>
                <S.ImageContainer>
                  <TokenWithNetworkImage
                    tokenImage={{
                      url: data.pool?.logo,
                      height: 36,
                      width: 36
                    }}
                    networkImage={{
                      url: data.pool.chain?.logo,
                      height: 16,
                      width: 16
                    }}
                    blockies={{
                      size: 8,
                      scale: 5,
                      seedName: data.pool.name ?? ''
                    }}
                  />
                </S.ImageContainer>

                <S.FundPrice>
                  <h3>Price</h3>
                  <span>
                    {data?.pool
                      ? `$${parseFloat(infoPool.price).toFixed(2)}`
                      : '...'}
                  </span>
                </S.FundPrice>
              </S.CardHeader>

              <S.CardBody>
                <S.FundName>
                  <h3>{data?.pool?.name}</h3>
                  <span>by {data?.pool?.foundedBy ?? 'Community'}</span>
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
