import React, { useMemo } from 'react'
import Big from 'big.js'
import { useRouter } from 'next/router'

import { useAppDispatch } from '@/store/hooks'
import { usePoolPrice } from '@/hooks/query/usePoolPrice'
import { IPoolDataProps } from '@/hooks/query/usePoolData'
import { usePoolVolumeData } from '@/hooks/query/usePoolVolumeData'
import { setPerformanceValues } from '@/store/reducers/performanceValues'

import MorePool from './MorePool'
import PriceChange from './PriceChange'
import TokenDescription from './TokenDescription'
import StakeAndEarnCard from './StakeAndEarnCard'
import ChartProducts from '@/components/ChartProducts'
import StatusCard from '@/components/Manage/StatusCard'

import { BNtoDecimal, calcChange } from '@/utils/numerals'

import * as S from './styles'
import Chart from '@/templates/PoolManager/Allocations/IntroReview/PieChartAllocations'

import useAllocationInfo from '@/hooks/useAllocationInfo'
import { usePoolAssets } from '@/hooks/query/usePoolAssets'
import { useTokensPool } from '@/hooks/query/useTokensPool'
import { mockTokens } from '@/constants/tokenAddresses'
import { UnderlyingAssetsInfoType } from '@/utils/updateAssetsToV2'
import { useTokensData } from '@/hooks/query/useTokensData'

import priceUp from '@assets/notificationStatus/arrow-ascend.svg'
import priceDown from '@assets/notificationStatus/arrow-descend.svg'

const dayList = ['1D', '1W', '1M', '3M', '1Y']

const volumePeriods: Record<string, number> = {
  '1D': 60 * 60 * 24,
  '1W': 60 * 60 * 24 * 7,
  '1M': 60 * 60 * 24 * 30,
  '3M': 60 * 60 * 24 * 30 * 3,
  '1Y': 60 * 60 * 24 * 30 * 12
}

interface IOverviewProps {
  pool: IPoolDataProps
  handleClickStakeButton: () => void
}

type TokenInfo = {
  token: {
    address: string
    logo: string
    name: string
    symbol: string
    decimals: number
  }
  allocation: string
  holding: {
    value: Big
  }
}

const Overview = ({ pool, handleClickStakeButton }: IOverviewProps) => {
  const [volumePeriodSelected, setVolumePeriodSelected] = React.useState('1D')
  const [returnPeriodSelected, setReturnPeriodSelected] = React.useState('1D')
  const [changePriceList, setChangePriceList] = React.useState<
    Record<string, string>
  >({})

  const [activeIndex, setActiveIndex] = React.useState(0)
  const router = useRouter()
  const poolId = Array.isArray(router.query.address)
    ? router.query.address[0]
    : router.query.address ?? ''

  const dispatch = useAppDispatch()
  const useAllocation = useAllocationInfo()
  const { data: poolAssets } = usePoolAssets({ id: poolId })

  const price = parseFloat(pool?.price_usd ?? '0')
  const dateNow = React.useMemo(() => {
    return Date.now()
  }, [])

  const { data: volumeData } = usePoolVolumeData({
    poolId: pool?.id || '',
    timestamp: Math.trunc(dateNow / 1000 - volumePeriods[volumePeriodSelected])
  })
  const { data } = usePoolPrice({
    id: pool?.id ?? '',
    day: Math.trunc(dateNow / 1000 - 60 * 60 * 24),
    week: Math.trunc(dateNow / 1000 - 60 * 60 * 24 * 7),
    month: Math.trunc(dateNow / 1000 - 60 * 60 * 24 * 30),
    quarterly: Math.trunc(dateNow / 1000 - 60 * 60 * 24 * 90),
    year: Math.trunc(dateNow / 1000 - 60 * 60 * 24 * 365)
  })

  const { data: tokenPoolData } = useTokensPool({ id: poolId })
  const chainId = tokenPoolData?.chain_id ?? 137
  const { data: tokensInfo } = useTokensData({
    chainId,
    tokenAddresses: handleMockToken(poolAssets ?? [])
  })

  const coingeckoData = tokensInfo ?? {}

  const rebalancingProgress = useMemo(() => {
    if (!tokenPoolData) return null

    return useAllocation.handleRebalancingTimeProgress(
      tokenPoolData?.weight_goals
    )
  }, [tokenPoolData])

  const listTokenWeights = useMemo(() => {
    if (!tokenPoolData || !poolAssets) return

    const tokenList = useAllocation.handleCurrentAllocationInfo(poolAssets)

    if (tokenList.length <= 0) {
      return
    }

    return tokenList
  }, [tokenPoolData, poolAssets])

  const tokenSelected =
    listTokenWeights && listTokenWeights[activeIndex]
      ? listTokenWeights[activeIndex]
      : ({} as TokenInfo)
  const allocationsDataChart = listTokenWeights
    ? listTokenWeights.map(item => ({
        image: item.token.logo,
        symbol: item.token?.symbol || '',
        value: Number(item.allocation)
      }))
    : []

  const coingeckoTokenInfo =
    coingeckoData[
      chainId === 5
        ? mockTokens[tokenSelected?.token?.address]?.toLowerCase()
        : tokenSelected?.token?.address.toLowerCase()
    ]

  const volume = React.useMemo(() => {
    return volumeData?.volumes.reduce((acc, current) => {
      return Big(current.volume_usd).add(acc)
    }, Big(0))
  }, [volumeData])

  function handleMockToken(tokenList: UnderlyingAssetsInfoType[]) {
    if (tokenPoolData?.chain_id === 5) {
      return tokenList?.map(item => {
        return mockTokens[item.token.id]
      })
    } else {
      return tokenList?.map(asset => asset.token.id)
    }
  }

  function handleCalcChangePrice() {
    if (!data) return

    const arrChangePrice = []

    const changeDay = calcChange(data.now[0].close, data.day[0]?.close)
    const changeWeek = calcChange(data.now[0].close, data.week[0]?.close)
    const changeMonth = calcChange(data.now[0].close, data.month[0]?.close)
    const changeQuarterly = calcChange(
      data.now[0].close,
      data.quarterly[0]?.close
    )
    const changeYear = calcChange(data.now[0].close, data.year[0]?.close)

    arrChangePrice[0] = changeDay
    arrChangePrice[1] = changeWeek
    arrChangePrice[2] = changeMonth
    arrChangePrice[3] = changeQuarterly
    arrChangePrice[4] = changeYear

    setChangePriceList({
      '1D': changeDay,
      '1W': changeWeek,
      '1M': changeMonth,
      '3M': changeQuarterly,
      '1Y': changeYear
    })

    dispatch(
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
    )
  }

  React.useEffect(() => {
    if (!data) return

    handleCalcChangePrice()
  }, [data])

  return (
    <S.Overview>
      <S.StatsContainer>
        <StatusCard
          title="Price"
          value={'$' + (price > 0.1 ? price.toFixed(2) : price.toFixed(5))}
        />
        <StatusCard
          title="AUM"
          value={
            '$' + BNtoDecimal(Big(pool?.total_value_locked_usd || 0), 2, 2, 2)
          }
        />
        <StatusCard
          title="VOLUME"
          value={'$' + BNtoDecimal(volume ?? Big(0), 2, 2, 2)}
          status="NEUTRAL"
          dataList={dayList}
          selected={volumePeriodSelected}
          onClick={(period: string) => setVolumePeriodSelected(period)}
        />
        <StatusCard
          title="RETURN"
          value={(changePriceList[returnPeriodSelected] ?? '0') + '%'}
          status={
            parseFloat(changePriceList[returnPeriodSelected] ?? 0) === 0
              ? 'NEUTRAL'
              : parseFloat(changePriceList[returnPeriodSelected] ?? 0) > 0
              ? 'POSITIVE'
              : 'NEGATIVE'
          }
          dataList={dayList}
          selected={returnPeriodSelected}
          onClick={(period: string) => setReturnPeriodSelected(period)}
        />
      </S.StatsContainer>

      <ChartProducts poolId={pool?.id ?? ''} />

      <S.ChangeAndStakeContainer>
        <S.TokenInfoContainer>
          <div>
            <Chart
              data={allocationsDataChart}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              isRebalancing={!!rebalancingProgress}
            />
          </div>

          <S.TokenInfoContent>
            <S.ImgAndSymbolWrapper>
              <img
                src={tokenSelected?.token?.logo ?? ''}
                alt="Token Logo"
                width={16}
                height={16}
              />
              <p>{tokenSelected?.token?.symbol}</p>
            </S.ImgAndSymbolWrapper>
            <S.HoldingAndPriceContainer>
              <S.HoldingWrapper>
                <S.TitleHoldingAndPrice>holding</S.TitleHoldingAndPrice>
                <S.ValueHoldingAndPrice>
                  $
                  {tokenSelected?.holding?.value
                    .mul(Big(coingeckoTokenInfo?.usd ?? 0))
                    .toFixed(2) ?? 0}
                </S.ValueHoldingAndPrice>
                <p>
                  {tokenSelected?.holding?.value.toFixed(2, 2) ?? 0}{' '}
                  {tokenSelected?.token?.symbol}
                </p>
              </S.HoldingWrapper>
              <S.PriceDayWrapper>
                <S.TitleHoldingAndPrice>PRICE 24H</S.TitleHoldingAndPrice>
                <S.PriceDayValue>
                  <S.ValueHoldingAndPrice>
                    ${Big(coingeckoTokenInfo?.usd ?? 0).toFixed(2)}
                  </S.ValueHoldingAndPrice>
                  <S.ChangeDayValue
                    changePrice={
                      coingeckoTokenInfo?.pricePercentageChangeIn24h ?? 0
                    }
                  >
                    <p>
                      {(
                        coingeckoTokenInfo?.pricePercentageChangeIn24h ?? 0
                      ).toFixed(2)}
                      %
                    </p>
                    <img
                      src={
                        (coingeckoTokenInfo?.pricePercentageChangeIn24h ?? 0) >=
                        0
                          ? priceUp.src
                          : priceDown.src
                      }
                      alt="an arrow indicating if the price is going"
                      width={12}
                      height={12}
                    />
                  </S.ChangeDayValue>
                </S.PriceDayValue>
              </S.PriceDayWrapper>
            </S.HoldingAndPriceContainer>
          </S.TokenInfoContent>
        </S.TokenInfoContainer>

        <S.ChangeAndStakeContent>
          <PriceChange changePriceList={Object.values(changePriceList)} />

          {pool?.chain_id && pool?.pool_id && (
            <StakeAndEarnCard
              handleClickStakeButton={handleClickStakeButton}
              poolName={pool.name}
              poolIcon={pool.logo ?? ''}
              poolId={pool?.pool_id ?? undefined}
              chainId={pool?.chain_id ?? 0}
              poolPrice={pool?.price_usd ?? '0'}
            />
          )}
        </S.ChangeAndStakeContent>
      </S.ChangeAndStakeContainer>

      {pool?.summary && <TokenDescription summary={pool.summary} />}

      <MorePool />
    </S.Overview>
  )
}

export default Overview
