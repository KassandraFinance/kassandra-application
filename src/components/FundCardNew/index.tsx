import React from 'react'
import Link from 'next/link'
import Big from 'big.js'

import useMatomoEcommerce from '@/hooks/useMatomoEcommerce'

import { BNtoDecimal, calcChange } from '@/utils/numerals'
import { getWeightsNormalizedV2 } from '@/utils/updateAssetsToV2'

import Label from '../Labels/Label'
import FundStatus from './FundStatus'
import FundBarChart from './FundBarChart'
import FundAreaChart from './FundAreaChart'
import FundTokenIcons from './FundTokenIcons'
import SkeletonLoading from '../SkeletonLoading'
import GradientLabel from '../Labels/GradientLabel'
import TokenWithNetworkImage from '../TokenWithNetworkImage'

import * as S from './styles'

type Candlestick = {
  close: string
  timestamp: number
}

type WeightGoals = {
  start_timestamp: number
  end_timestamp: number
  weights: {
    weight_normalized: string
    asset: {
      token: {
        id: string
      }
    }
  }[]
}

type Weights = {
  timestamp: number
  weights: {
    weight_normalized: string
    token: {
      id: string
      symbol: string
    }
  }[]
}

type UnderlyingAssets = {
  balance: string
  weight_normalized: string
  weight_goal_normalized: string
  token: {
    id: string
    name: string
    logo?: string | null
    symbol: string
    decimals: number
    is_wrap_token: number
    wraps?: {
      id: string
      decimals: number
      symbol: string
      name: string
      logo?: string | null
    } | null
  }
}

export type PoolData = {
  id: string
  name: string
  symbol: string
  logo?: string | null
  address: string
  founded_by?: string | null
  pool_id?: number | null
  price_usd: string
  pool_version: number
  featured: boolean
  strategy: string
  total_value_locked_usd: string
  now: Candlestick[]
  day: Candlestick[]
  month: Candlestick[]
  weights: Weights[]
  weight_goals: WeightGoals[]
  underlying_assets: UnderlyingAssets[]
  manager: { id: string; nickname?: string | null }
  chain: { logo?: string | null }
  price_candles: {
    timestamp: number
    close: string
  }[]
  total_value_locked: {
    close: string
    timestamp: number
  }[]
}

interface IFundCardProps {
  link?: string
  poolData: PoolData
}

const FundCard = ({ poolData, link }: IFundCardProps) => {
  const [poolObject, setPoolObject] = React.useState<Record<string, number>>({})

  const { trackEventFunction } = useMatomoEcommerce()

  function handleClickCard(symbol: string) {
    trackEventFunction('click-on-link', symbol, 'feature-funds')
  }

  const getPercentage = (weight: number) => {
    return Number((weight * 100).toFixed(2))
  }

  function handleChartDataFormatted(data: Candlestick[]) {
    return data?.map(item => {
      return {
        timestamp: item.timestamp,
        close: Number(item.close)
      }
    })
  }

  function handleWeightNormalized(
    poolVersion: number,
    underlyingAssets: UnderlyingAssets[],
    weightGoals: WeightGoals[]
  ) {
    if (poolVersion === 2) {
      const poolInfo = getWeightsNormalizedV2(weightGoals, underlyingAssets)
      return poolInfo ?? underlyingAssets
    }

    return underlyingAssets
  }

  const poolDataMetrics = React.useMemo(() => {
    if (!poolData?.id) return

    const price = poolData.price_usd
    const tvl = BNtoDecimal(Big(poolData.total_value_locked_usd ?? 0), 2, 2, 2)
    const chartData = handleChartDataFormatted(poolData?.price_candles)
    const changeDay = calcChange(
      poolData?.now[0]?.close,
      poolData?.day[0]?.close
    )
    const changeMonth = calcChange(
      poolData.now[0]?.close,
      poolData.month[0]?.close
    )
    const underlying_assets = handleWeightNormalized(
      poolData.pool_version,
      poolData.underlying_assets,
      poolData.weight_goals
    )

    return {
      price,
      tvl,
      chartData,
      changeDay,
      changeMonth,
      underlying_assets
    }
  }, [poolData])

  React.useEffect(() => {
    if (poolDataMetrics && poolDataMetrics.underlying_assets.length > 0) {
      const pool = poolDataMetrics.underlying_assets.map(item => {
        return {
          [item.token.id]: getPercentage(Number(item.weight_normalized))
        }
      })
      const poolData = Object.assign({}, ...pool)
      setPoolObject(poolData)
    }
  }, [poolDataMetrics])

  return (
    <S.CardContainer isLink={!!link}>
      <Link href={link ?? ''} passHref>
        <S.CardLinkContent
          onClick={() => handleClickCard(poolData?.symbol?.toLowerCase() ?? '')}
        >
          <S.CardHeader>
            <S.ImageContainer>
              {poolData?.logo ? (
                <TokenWithNetworkImage
                  tokenImage={{
                    url: poolData?.logo || '',
                    height: 36,
                    width: 36
                  }}
                  networkImage={{
                    url: poolData?.chain?.logo || '',
                    height: 16,
                    width: 16
                  }}
                  blockies={{
                    size: 8,
                    scale: 5,
                    seedName: poolData?.name
                  }}
                />
              ) : (
                <SkeletonLoading height={5.6} width={5.6} borderRadios={50} />
              )}

              {poolData?.pool_id && (
                <div>
                  <img
                    src="/assets/icons/fire.svg"
                    alt="fire icon"
                    // width={8}
                    // height={8}
                  />
                </div>
              )}
            </S.ImageContainer>

            <S.FundPrice>
              <h3>Price</h3>
              {poolDataMetrics?.price ? (
                <span>${parseFloat(poolDataMetrics.price).toFixed(2)}</span>
              ) : (
                <SkeletonLoading height={2.4} width={6} />
              )}
            </S.FundPrice>
          </S.CardHeader>

          <S.CardBody>
            <S.FundName>
              {poolData?.name ? (
                <h3>{poolData?.name}</h3>
              ) : (
                <SkeletonLoading height={2.4} width={22} />
              )}
              {/* <span>
                by {poolData?.manager.nickname ?? substr(poolData?.manager?.id ?? '')}
              </span> */}

              {poolData?.pool_id && (
                <S.LabelContent>
                  <Label text="+5%" />
                  <GradientLabel
                    text="$KACY"
                    img={{
                      url: '/assets/iconGradient/lightning.svg',
                      width: 12,
                      height: 12
                    }}
                  />
                </S.LabelContent>
              )}
            </S.FundName>

            <S.FundStatusContainer>
              <FundStatus
                day={
                  poolDataMetrics?.changeDay
                    ? parseFloat(poolDataMetrics.changeDay)
                    : undefined
                }
                monthly={
                  poolDataMetrics?.changeMonth
                    ? parseFloat(poolDataMetrics.changeMonth)
                    : undefined
                }
                tvl={
                  poolDataMetrics?.tvl
                    ? parseInt(poolDataMetrics.tvl.replace(/\s/g, ''), 10)
                    : undefined
                }
              />
            </S.FundStatusContainer>

            {poolDataMetrics?.chartData ? (
              <FundAreaChart
                areaChartData={poolDataMetrics.chartData}
                color="#E843C4"
              />
            ) : (
              <S.SkeletonLoadingWrapper>
                <SkeletonLoading height={11.3} width={'100%'} />
              </S.SkeletonLoadingWrapper>
            )}

            {poolDataMetrics?.underlying_assets ? (
              <S.TokenIconsContainer>
                <FundTokenIcons
                  poolInfo={poolDataMetrics.underlying_assets ?? []}
                />
                {poolDataMetrics.underlying_assets.length > 3 && (
                  <p>
                    +{poolDataMetrics.underlying_assets.length - 3}
                    <span> more</span>
                  </p>
                )}
              </S.TokenIconsContainer>
            ) : (
              <S.SkeletonLoadingWrapper>
                <SkeletonLoading height={2.4} width="100%" />
              </S.SkeletonLoadingWrapper>
            )}

            {poolDataMetrics?.underlying_assets && (
              <FundBarChart
                poolObject={poolObject}
                poolInfo={poolDataMetrics.underlying_assets}
              />
            )}
          </S.CardBody>
        </S.CardLinkContent>
      </Link>
    </S.CardContainer>
  )
}

export default FundCard
