import React from 'react'
import Big from 'big.js'

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

const Overview = ({ pool, handleClickStakeButton }: IOverviewProps) => {
  const [volumePeriodSelected, setVolumePeriodSelected] = React.useState('1D')
  const [returnPeriodSelected, setReturnPeriodSelected] = React.useState('1D')
  const [changePriceList, setChangePriceList] = React.useState<
    Record<string, string>
  >({})

  const dispatch = useAppDispatch()

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

  const volume = React.useMemo(() => {
    return volumeData?.volumes.reduce((acc, current) => {
      return Big(current.volume_usd).add(acc)
    }, Big(0))
  }, [volumeData])

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
          value={'$' + BNtoDecimal(Big(pool?.price_usd ?? 0), 2, 2, 2)}
        />
        <StatusCard
          title="TVL"
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
      </S.ChangeAndStakeContainer>

      {pool?.summary && <TokenDescription summary={pool.summary} />}

      <MorePool />
    </S.Overview>
  )
}

export default Overview
