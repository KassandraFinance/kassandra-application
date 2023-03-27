import React from 'react'
import router from 'next/router'
import useSWR from 'swr'
import request from 'graphql-request'

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
  GET_TVM_CHART
} from './graphql'

import poolsAssetsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

const periods: Record<string, number> = {
  '1D': 60 * 60 * 24,
  '1M': 60 * 60 * 24 * 30,
  '3M': 60 * 60 * 24 * 30 * 3,
  '6M': 60 * 60 * 24 * 30 * 6
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

const Analytics = (props: IAnalyticsProps) => {
  const [depostiPeriod, setDepositPeriod] = React.useState<string>('1D')
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('1D')
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
            title="Total Deposits"
            value="+$251,360.00"
            status="POSITIVE"
            dataList={dataList}
            selected={depostiPeriod}
            onClick={(period: string) => setDepositPeriod(period)}
          />
          <StatusCard
            title="Total Withdrawals"
            value="-$2,204.21"
            status="NEGATIVE"
            dataList={dataList}
            selected={withdrawalPeriod}
            onClick={(period: string) => setWithdrawalPeriod(period)}
          />
          <StatusCard title="Unique Depositors" value="362" />
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
