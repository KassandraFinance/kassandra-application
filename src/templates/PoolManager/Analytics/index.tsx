import React from 'react'
import router from 'next/router'
import Big from 'big.js'

import { usePoolChainId } from '@/hooks/query/usePoolChainId'
import { usePoolJoins } from '@/hooks/query/usePoolJoins'
import { usePoolWithdraws } from '@/hooks/query/usePoolWithdraws'
import { usePoolChangePrice } from '@/hooks/query/usePoolChangePrice'
import { usePoolChangeTvl } from '@/hooks/query/usePoolChangeTvl'
import { usePoolTvmChart } from '@/hooks/query/usePoolTvmChart'
import { usePoolPriceChart } from '@/hooks/query/usePoolPriceChart'

import TitleSection from '@/components/TitleSection'
import TVMChart from '@/components/Manage/TVMChart'
import StatusCard from '@/components/Manage/StatusCard'
import Loading from '@/components/Loading'

import PoolAssets from './PoolAssets'

import { BNtoDecimal, calcChange } from '@/utils/numerals'

import poolsAssetsIcon from '@assets/iconGradient/assets-distribution.svg'

import * as S from './styles'

const periods: Record<string, number> = {
  '1D': 60 * 60 * 24,
  '1W': 60 * 60 * 24 * 7,
  '1M': 60 * 60 * 24 * 30,
  '3M': 60 * 60 * 24 * 30 * 3,
  '6M': 60 * 60 * 24 * 30 * 6,
  '1Y': 60 * 60 * 24 * 30 * 12,
  ALL: new Date().getTime() / 1000
}

type ChangeListType = {
  name: string
  key: 'week' | 'month' | 'year' | 'max'
  value: number
}

const changeList: ChangeListType[] = [
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
  poolId: string
}

const Analytics = (props: IAnalyticsProps) => {
  const [withdrawalPeriod, setWithdrawalPeriod] = React.useState<string>('1D')
  const [investPeriod, setInvestPeriod] = React.useState<string>('1D')
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('1W')
  const [selectedType, setSelectedType] = React.useState<string>('price')

  const id = Array.isArray(router.query.pool)
    ? router.query.pool[0]
    : router.query.pool ?? ''

  const { data: dataTvmChart } = usePoolTvmChart({
    id,
    timestamp: Math.trunc(
      new Date().getTime() / 1000 - periods[selectedPeriod]
    ),
    enabled: selectedType !== 'price'
  })
  const { data: dataPriceChart } = usePoolPriceChart({
    id,
    timestamp: Math.trunc(
      new Date().getTime() / 1000 - periods[selectedPeriod]
    ),
    enabled: selectedType === 'price'
  })

  const data = selectedType === 'price' ? dataPriceChart : dataTvmChart

  const { data: dataChainId } = usePoolChainId({ id })

  const { data: dataChangePrice } = usePoolChangePrice({
    id,
    week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365),
    enabled: selectedType === 'price'
  })

  const { data: dataChangeTvl } = usePoolChangeTvl({
    id,
    week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365),
    enabled: selectedType !== 'price'
  })

  const { data: dataWithdraws } = usePoolWithdraws({
    id,
    timestamp: Math.trunc(
      new Date().getTime() / 1000 - periods[withdrawalPeriod]
    )
  })

  const { data: dataInvest } = usePoolJoins({
    id,
    timestamp: Math.trunc(new Date().getTime() / 1000 - periods[investPeriod])
  })

  const withdraws = React.useMemo(() => {
    if (!dataWithdraws) return '0'
    return dataWithdraws.volumes
      .reduce((acc, volume) => acc.add(volume.volume_usd), Big(0))
      .toFixed(3)
  }, [dataWithdraws])

  const joins = React.useMemo(() => {
    if (!dataInvest) return '0'
    return dataInvest.volumes
      .reduce((acc, volume) => acc.add(volume.volume_usd), Big(0))
      .toFixed(3)
  }, [dataInvest])

  const dataChange = selectedType === 'price' ? dataChangePrice : dataChangeTvl
  const change = React.useMemo(() => {
    if (!dataChange) return changeList
    const calcChangeList = changeList.map(change => {
      return {
        name: change.name,
        value: Number(
          calcChange(dataChange.now[0]?.close, dataChange[change.key][0].close)
        )
      }
    })
    return calcChangeList
  }, [dataChange])

  return (
    <S.Analytics>
      <S.ManagerOverviewContainer>
        <S.ChartWrapper>
          {data && dataChange ? (
            <TVMChart
              data={data.value.map(value => {
                return {
                  close: Number(value.close),
                  timestamp: value.timestamp
                }
              })}
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
            title="Total Deposits"
            value={`${Big(joins).eq(0) ? '$' : '+$'}${BNtoDecimal(
              Big(joins),
              2
            )}`}
            status={Big(joins).lte(0) ? 'NEUTRAL' : 'POSITIVE'}
            dataList={['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL']}
            selected={investPeriod}
            onClick={(period: string) => setInvestPeriod(period)}
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
            title="Unique Depositors"
            value={dataChainId?.unique_investors?.toString() || ''}
          />
        </S.StatsContainer>
      </S.ManagerOverviewContainer>
      <S.TitleWrapper>
        <TitleSection title="Pool Assets" image={poolsAssetsIcon} />
      </S.TitleWrapper>
      {dataChainId && (
        <PoolAssets poolId={props.poolId} chainId={dataChainId.chain_id} />
      )}
    </S.Analytics>
  )
}

export default Analytics
