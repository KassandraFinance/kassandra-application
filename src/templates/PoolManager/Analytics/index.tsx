import React from 'react'
import router from 'next/router'
import useSWR from 'swr'
import request from 'graphql-request'
import Big from 'big.js'

import TitleSection from '../../../components/TitleSection'
import TVMChart from '../../../components/Manage/TVMChart'
import StatusCard from '../../../components/Manage/StatusCard'
import Loading from '@/components/Loading'
import { DataType } from '@/components/Manage/TVMChart/Chart'

import PoolAssets from './PoolAssets'

import { BACKEND_KASSANDRA } from '@/constants/tokenAddresses'
import { calcChange } from '@/utils/numerals'
import {
  GET_CHANGE_PRICE,
  GET_CHANGE_TVL,
  GET_PRICE_CHART,
  GET_TVM_CHART,
  GET_VOLATILITY,
  GET_WITHDRAWS
} from './graphql'

import poolsAssetsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const periods: Record<string, number> = {
  '1D': 60 * 60 * 24,
  '1M': 60 * 60 * 24 * 30,
  '3M': 60 * 60 * 24 * 30 * 3,
  '6M': 60 * 60 * 24 * 30 * 6,
  '1Y': 60 * 60 * 24 * 30 * 12,
  ALL: new Date().getTime() / 1000
}

const changeList = [
  {
    name: '1 Day',
    key: 'day',
    value: 0
  },
  {
    name: '1 Week',
    key: 'week',
    value: 0
  },

  {
    name: '1 Month',
    key: 'month',
    value: 0
  },
  {
    name: '1 Year',
    key: 'year',
    value: 0
  },
  {
    name: 'All',
    key: 'max',
    value: 0
  }
]

interface IAnalyticsProps {
  poolId: string;
}

type Result = {
  pool: {
    value: DataType[]
  }
}

type ResultWitdraw = {
  pool: {
    volumes: {
      volume_usd: string
    }[]
  }
}

const Analytics = (props: IAnalyticsProps) => {
  const [volatilityPeriod, setVolatilityPeriod] = React.useState<string>('1D')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('1D')
  const [selectedType, setSelectedType] = React.useState<string>('price')

  const id = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  console.log('periods', periods[selectedPeriod], selectedPeriod)

  const { data } = useSWR<Result>(
    [
      selectedType === 'price' ? GET_PRICE_CHART : GET_TVM_CHART,
      id,
      selectedPeriod
    ],
    (query, id, selectedPeriod) =>
      request(BACKEND_KASSANDRA, query, {
        id,
        timestamp: Math.trunc(
          new Date().getTime() / 1000 - periods[selectedPeriod]
        )
      })
  )

  const { data: dataChange } = useSWR(
    [
      selectedType === 'price' ? GET_CHANGE_PRICE : GET_CHANGE_TVL,
      id,
      selectedPeriod
    ],
    (query, id) =>
      request(BACKEND_KASSANDRA, query, {
        id,
        day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
        week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
        month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
        year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
      })
  )

  const { data: dataVolatility } = useSWR<Result>(
    [GET_VOLATILITY, id, volatilityPeriod],
    (query, id, volatilityPeriod) =>
      request(BACKEND_KASSANDRA, query, {
        id,
        timestamp: Math.trunc(
          new Date().getTime() / 1000 - periods[volatilityPeriod]
        )
      })
  )

  const { data: dataWithdraws } = useSWR<ResultWitdraw>(
    [GET_WITHDRAWS, id, withdrawalPeriod],
    (query, id, withdrawalPeriod) =>
      request(BACKEND_KASSANDRA, query, {
        id,
        timestamp: Math.trunc(
          new Date().getTime() / 1000 - periods[withdrawalPeriod]
        )
      })
  )

  const withdraws = React.useMemo(() => {
    if (!dataWithdraws?.pool) return '0'
    return dataWithdraws.pool.volumes
      .reduce((acc, volume) => acc.add(volume.volume_usd), Big(0))
      .toFixed(3)
  }, [dataWithdraws])

  const volatility = React.useMemo(() => {
    if (dataVolatility?.pool?.value?.length) {
      const points = dataVolatility?.pool.value
      const size = points.length
      if (size < 2) return '0'
      const dayVolatility = new Array(size - 1).fill('0')
      let total = '0'
      for (let index = 0; index < size - 1; index++) {
        console.log(points)
        dayVolatility[index] = Big(points[index + 1].close)
          .sub(points[index].close)
          .div(points[index].close)
          .toFixed()
        total = Big(total).add(dayVolatility[index]).toFixed()
      }
      const average = Big(total)
        .div(size - 1)
        .toFixed()

      return Big(average)
        .mul(Big(size - 1).sqrt())
        .toFixed(4)
    }
    return '0'
  }, [dataVolatility])

  const change = React.useMemo(() => {
    if (!dataChange?.pool) return changeList
    const calcChangeList = changeList.map(change => {
      return {
        name: change.name,
        value: Number(
          calcChange(
            dataChange.pool.now[0]?.close,
            dataChange.pool[change.key][0]?.close
          )
        )
      }
    })
    return calcChangeList
  }, [dataChange])

  return (
    <S.Analytics>
      <S.ManagerOverviewContainer>
        <S.ChartWrapper>
          {data?.pool && dataChange?.pool ? (
            <TVMChart
              data={data.pool.value}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              changeList={change}
            />
          ) : (
            <Loading marginTop={15} />
          )}
        </S.ChartWrapper>

        <S.StatsContainer>
          <StatusCard
            title="Volatility"
            value={volatility}
            status="POSITIVE"
            dataList={dataList}
            selected={volatilityPeriod}
            onClick={(period: string) => setVolatilityPeriod(period)}
          />
          <StatusCard
            title="Total Withdrawals"
            value={`${Big(withdraws).eq(0) ? '$' : '-$'}${withdraws}`}
            status="NEGATIVE"
            dataList={dataList}
            selected={withdrawalPeriod}
            onClick={(period: string) => setWithdrawalPeriod(period)}
          />
          <StatusCard title="Risk Factor" value="362" />
        </S.StatsContainer>
      </S.ManagerOverviewContainer>
      <S.TitleWrapper>
        <TitleSection title="Pool Assets" image={poolsAssetsIcon} />
      </S.TitleWrapper>
      <PoolAssets poolId={props.poolId} />
    </S.Analytics>
  )
}

export default Analytics
