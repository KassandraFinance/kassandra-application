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
import { BNtoDecimal, calcChange } from '@/utils/numerals'
import {
  GET_CHAINID,
  GET_CHANGE_PRICE,
  GET_CHANGE_TVL,
  GET_PRICE_CHART,
  GET_SHARPRATIO,
  GET_TVM_CHART,
  GET_VOLATILITY,
  GET_WITHDRAWS
} from './graphql'

import poolsAssetsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'
import { calcVolatility } from '../utils'

const periods: Record<string, number> = {
  '1D': 60 * 60 * 24,
  '1W': 60 * 60 * 24 * 7,
  '1M': 60 * 60 * 24 * 30,
  '3M': 60 * 60 * 24 * 30 * 3,
  '6M': 60 * 60 * 24 * 30 * 6,
  '1Y': 60 * 60 * 24 * 30 * 12,
  ALL: new Date().getTime() / 1000
}

const changeList = [
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
  const [volatilityPeriod, setVolatilityPeriod] = React.useState<string>('1W')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('1W')
  const [selectedType, setSelectedType] = React.useState<string>('price')

  const id = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

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

  const { data: dataChainId } = useSWR(
    [GET_CHAINID, id],
    (query, id) =>
      request(BACKEND_KASSANDRA, query, {
        id
      }),
    {
      refreshInterval: 60 * 60 * 24
    }
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

  const { data: dataSharpRatio } = useSWR<Result>(
    [GET_SHARPRATIO, id, volatilityPeriod],
    (query, id) =>
      request(BACKEND_KASSANDRA, query, {
        id,
        timestamp: Math.trunc(new Date().getTime() / 1000 - 60 * 60 * 24 * 365)
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
      return calcVolatility(dataVolatility.pool.value)
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

  const sharpRatio = React.useMemo(() => {
    if (!dataSharpRatio?.pool?.value?.length) return '0'
    const volatility = calcVolatility(dataSharpRatio.pool.value)
    if (volatility === '0') return '0'
    const total = dataSharpRatio.pool.value.reduce((acc, value, i) => {
      const oldClose = dataSharpRatio.pool.value[i + 1]?.close
      if (!oldClose) return acc
      return acc.add(calcChange(Number(value.close), Number(oldClose)))
    }, Big(0))

    return total
      .div(dataSharpRatio.pool.value.length)
      .div(volatility)
      .toFixed(2)
  }, [dataSharpRatio])

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
              dataList={['1W', '1M', '3M', '6M', '1Y', 'ALL']}
            />
          ) : (
            <Loading marginTop={15} />
          )}
        </S.ChartWrapper>

        <S.StatsContainer>
          <StatusCard
            title="Volatility"
            value={volatility}
            status={Big(volatility).gt(0) ? 'POSITIVE' : 'NEGATIVE'}
            dataList={['1W', '1M', '3M', '6M', '1Y', 'ALL']}
            selected={volatilityPeriod}
            onClick={(period: string) => setVolatilityPeriod(period)}
          />
          <StatusCard
            title="Total Withdrawals"
            value={`${Big(withdraws).eq(0) ? '$' : '-$'}${BNtoDecimal(
              Big(withdraws),
              2
            )}`}
            status={Big(withdraws).gt(0) ? 'NEGATIVE' : 'NEUTRAL'}
            dataList={['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL']}
            selected={withdrawalPeriod}
            onClick={(period: string) => setWithdrawalPeriod(period)}
          />
          <StatusCard
            title="Sharpe ratio"
            value={sharpRatio}
            status={Big(sharpRatio).lt(-1) ? 'NEGATIVE' : 'NEUTRAL'}
          />
        </S.StatsContainer>
      </S.ManagerOverviewContainer>
      <S.TitleWrapper>
        <TitleSection title="Pool Assets" image={poolsAssetsIcon} />
      </S.TitleWrapper>
      {dataChainId?.pool && (
        <PoolAssets poolId={props.poolId} chainId={dataChainId.pool.chainId} />
      )}
    </S.Analytics>
  )
}

export default Analytics
