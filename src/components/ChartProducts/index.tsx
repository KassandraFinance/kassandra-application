import React from 'react'

import useMatomoEcommerce from '../../hooks/useMatomoEcommerce'
import { usePoolCharts } from '@/hooks/query/usePoolCharts'

import { useAppDispatch } from '../../store/hooks'
import { setChartSelected } from '../../store/reducers/chartSelected'
import { setPerformanceValues } from '../../store/reducers/performanceValues'
import { setPeriodSelected as reduxSetPeriodSelected } from '../../store/reducers/periodSelected'

import Loading from '../Loading'

import ChartPrice from './ChartPrice'
import ChartTVL from './ChartTVL'
import ChartAllocation from './ChartAllocation'

import * as S from './styles'

const arrPeriod: string[] = ['1W', '1M', '3M', '1Y']

interface IChartProductsProps {
  poolId: string
}

const ChartProducts = ({ poolId }: IChartProductsProps) => {
  const dispatch = useAppDispatch()

  const [inputChecked, setInputChecked] = React.useState<string>('Price')
  const [price, setPrice] = React.useState<
    {
      timestamp: number
      close: string
    }[]
  >([])
  const [tvl, setTvl] = React.useState<
    {
      timestamp: number
      value: string
    }[]
  >([])
  const [loading, setLoading] = React.useState<boolean>(true)

  const [periodSelected, setPeriodSelected] = React.useState<string>('1W')
  const dateNow = new Date()

  const [params, setParams] = React.useState({
    id: poolId,
    price_period: 3600,
    period_selected: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 7)
  })

  const { trackEventFunction } = useMatomoEcommerce()

  const { data } = usePoolCharts(params)

  function returnDate(period: string) {
    switch (period) {
      case '1D':
        setParams(prevState => ({
          ...prevState,
          price_period: 3600,
          period_selected: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24)
        }))
        dispatch(
          setPerformanceValues({
            title: 'Daily Performance'
          })
        )
        break
      case '1W':
        setParams(prevState => ({
          ...prevState,
          price_period: 3600,
          period_selected: Math.trunc(
            dateNow.getTime() / 1000 - 60 * 60 * 24 * 7
          )
        }))
        dispatch(
          setPerformanceValues({
            title: 'Weekly Performance'
          })
        )
        break
      case '1M':
        setParams(prevState => ({
          ...prevState,
          price_period: 86400,
          period_selected: Math.trunc(
            dateNow.getTime() / 1000 - 60 * 60 * 24 * 30
          )
        }))
        dispatch(
          setPerformanceValues({
            title: 'Monthly Performance'
          })
        )
        break
      case '3M':
        setParams(prevState => ({
          ...prevState,
          price_period: 86400,
          period_selected: Math.trunc(
            dateNow.getTime() / 1000 - 60 * 60 * 24 * 90
          )
        }))
        dispatch(
          setPerformanceValues({
            title: '3 Months Performance'
          })
        )
        break
      case '1Y':
        setParams(prevState => ({
          ...prevState,
          price_period: 86400,
          period_selected: Math.trunc(
            dateNow.getTime() / 1000 - 60 * 60 * 24 * 365
          )
        }))
        dispatch(
          setPerformanceValues({
            title: 'Yearly Performance'
          })
        )
        break
      default:
        break
    }
  }

  React.useEffect(() => {
    dispatch(setChartSelected('Price'))
  }, [])

  React.useEffect(() => {
    setParams({
      id: poolId,
      price_period: 3600,
      period_selected: Math.trunc(dateNow.getTime() / 1000 - 60 * 60 * 24 * 7)
    })
  }, [poolId])

  React.useEffect(() => {
    dispatch(setChartSelected('Price'))
  }, [poolId])

  React.useEffect(() => {
    returnDate('1W')
    setPeriodSelected('1W')
    dispatch(reduxSetPeriodSelected('1W'))
  }, [inputChecked])

  React.useEffect(() => {
    setLoading(true)

    if (data) {
      setLoading(false)
    }
  }, [params, data])

  React.useEffect(() => {
    if (data) {
      const newTVL = data?.total_value_locked.map(item => {
        return {
          timestamp: item.timestamp,
          value: parseFloat(item.close).toFixed(2)
        }
      })

      const newPrice = data?.price_candles.map(item => {
        return {
          timestamp: item.timestamp,
          close:
            parseFloat(item.close) > 0.1
              ? parseFloat(item.close).toFixed(2)
              : parseFloat(item.close).toFixed(5)
        }
      })

      setTvl(newTVL)
      setPrice(newPrice)
    }
  }, [data])

  return (
    <S.ChartProduct>
      <S.Selects>
        <S.SelectChart>
          <S.Input
            type="radio"
            name="operator"
            id="Price-chart"
            onChange={() => {
              setInputChecked('Price')
              dispatch(setChartSelected('Price'))
              trackEventFunction('click-on-tab', 'price', 'chart-invest')
            }}
            checked={inputChecked === 'Price'}
          />
          <S.Label selected={inputChecked === 'Price'} htmlFor="Price-chart">
            Price
          </S.Label>
          <S.Input
            type="radio"
            name="operator"
            id="TVL-chart"
            onChange={() => {
              setInputChecked('TVL')
              dispatch(setChartSelected('TVL'))
              trackEventFunction('click-on-tab', 'tvl', 'chart-invest')
            }}
            checked={inputChecked === 'TVL'}
          />
          <S.Label selected={inputChecked === 'TVL'} htmlFor="TVL-chart">
            AUM
          </S.Label>
          <S.Input
            type="radio"
            name="operator"
            id="Allocation-chart"
            onChange={() => {
              setInputChecked('Allocation')
              dispatch(setChartSelected('Allocation'))
              trackEventFunction('click-on-tab', 'allocation', 'chart-invest')
            }}
            checked={inputChecked === 'Allocation'}
          />
          <S.Label
            selected={inputChecked === 'Allocation'}
            htmlFor="Allocation-chart"
          >
            Allocation
          </S.Label>
        </S.SelectChart>
        <S.SelectPeriod>
          {inputChecked === 'Price' && (
            <li key="day-1D">
              <S.Input
                id="day-1D"
                type="radio"
                checked={periodSelected === '1D'}
                onChange={() => {
                  returnDate('1D')
                  setPeriodSelected('1D')
                  dispatch(reduxSetPeriodSelected('1D'))
                  trackEventFunction(
                    'click-on-tab',
                    'day-1D',
                    'chart-product-period'
                  )
                }}
              />
              <S.LabelPeriod
                selectPeriod={periodSelected === '1D'}
                isPrice={inputChecked === 'Price'}
                htmlFor="day-1D"
                title="period"
              >
                1D
              </S.LabelPeriod>
            </li>
          )}
          {arrPeriod.map(period => (
            <li key={`day-${period}`}>
              <S.Input
                id={`day-${period}`}
                type="radio"
                checked={periodSelected === period}
                onChange={() => {
                  returnDate(period)
                  setPeriodSelected(period)
                  dispatch(reduxSetPeriodSelected(period))
                  trackEventFunction(
                    'click-on-tab',
                    `day-${period}`,
                    'chart-product-period'
                  )
                }}
              />
              <S.LabelPeriod
                selectPeriod={periodSelected === period}
                htmlFor={`day-${period}`}
                title="period"
              >
                {period}
              </S.LabelPeriod>
            </li>
          ))}
        </S.SelectPeriod>
      </S.Selects>
      {loading ? (
        <S.Wrapper>
          <Loading marginTop={14} />
        </S.Wrapper>
      ) : null}
      {inputChecked === 'Price' && !loading && (
        <ChartPrice data={price} color="#E843C4" />
      )}
      {inputChecked === 'TVL' && !loading && (
        <ChartTVL data={tvl} color="#26DBDB" />
      )}
      {inputChecked === 'Allocation' && !loading && (
        <ChartAllocation
          data={
            data?.weight_goals
              ? data.weight_goals.length > 0
                ? data.weight_goals
                : data.weight_goal_last
              : []
          }
        />
      )}
    </S.ChartProduct>
  )
}

export default ChartProducts
