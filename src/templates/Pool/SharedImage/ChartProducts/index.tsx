import React from 'react'

import { useAppSelector } from '../../../../store/hooks'
import useMatomoEcommerce from '../../../../hooks/useMatomoEcommerce'
import { usePoolCharts } from '@/hooks/query/usePoolCharts'

import Loading from '../../../../components/Loading'

import ChartPrice from './ChartPrice'
import ChartTVL from './ChartTVL'
import ChartAllocation from './ChartAllocation'

import * as S from './styles'

const arrPeriod: string[] = ['1W', '1M', '3M', '1Y']

interface IChartProductsProps {
  crpPoolAddress: string
  height: number
}

const ChartProducts = ({ crpPoolAddress, height }: IChartProductsProps) => {
  const {
    chartSelected: reduxChartSelected,
    periodSelected: reduxPeriodSelected
  } = useAppSelector(state => state)

  const [inputChecked, setInputChecked] = React.useState<string>('Price')
  const [price, setPrice] = React.useState<
    {
      timestamp: number
      close: number
    }[]
  >([])
  const [tvl, setTvl] = React.useState<
    {
      timestamp: number
      value: number
    }[]
  >([])
  const [loading, setLoading] = React.useState<boolean>(true)

  const [periodSelected, setPeriodSelected] = React.useState<string>('1W')
  const dateNow = new Date()

  const [params, setParams] = React.useState({
    id: crpPoolAddress,
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
        break
      case '1W':
        setParams(prevState => ({
          ...prevState,
          price_period: 3600,
          period_selected: Math.trunc(
            dateNow.getTime() / 1000 - 60 * 60 * 24 * 7
          )
        }))
        break
      case '1M':
        setParams(prevState => ({
          ...prevState,
          price_period: 86400,
          period_selected: Math.trunc(
            dateNow.getTime() / 1000 - 60 * 60 * 24 * 30
          )
        }))
        break
      case '3M':
        setParams(prevState => ({
          ...prevState,
          price_period: 86400,
          period_selected: Math.trunc(
            dateNow.getTime() / 1000 - 60 * 60 * 24 * 90
          )
        }))
        break
      case '1Y':
        setParams(prevState => ({
          ...prevState,
          price_period: 86400,
          period_selected: Math.trunc(
            dateNow.getTime() / 1000 - 60 * 60 * 24 * 365
          )
        }))
        break
      default:
        break
    }
  }

  React.useEffect(() => {
    returnDate(reduxPeriodSelected)
    setPeriodSelected(reduxPeriodSelected)
  }, [inputChecked, reduxPeriodSelected])

  React.useEffect(() => {
    setInputChecked(reduxChartSelected)
  }, [reduxChartSelected])

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
          value: Number(item.close)
        }
      })

      const newPrice = data?.price_candles.map(item => {
        return {
          timestamp: item.timestamp,
          close: Number(item.close)
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
            id="Price"
            disabled={true}
            onChange={() => {
              setInputChecked('Price')
              trackEventFunction('click-on-tab', 'price', 'chart-invest')
            }}
            checked={inputChecked === 'Price'}
          />
          <S.Label selected={inputChecked === 'Price'} htmlFor="Price">
            Price
          </S.Label>
          <S.Input
            type="radio"
            name="operator"
            id="TVL"
            disabled={true}
            onChange={() => {
              setInputChecked('TVL')
              trackEventFunction('click-on-tab', 'tvl', 'chart-invest')
            }}
            checked={inputChecked === 'TVL'}
          />
          <S.Label selected={inputChecked === 'TVL'} htmlFor="TVL">
            TVL
          </S.Label>
          <S.Input
            type="radio"
            name="operator"
            id="Allocation"
            disabled={true}
            onChange={() => {
              setInputChecked('Allocation')
              trackEventFunction('click-on-tab', 'allocation', 'chart-invest')
            }}
            checked={inputChecked === 'Allocation'}
          />
          <S.Label
            selected={inputChecked === 'Allocation'}
            htmlFor="Allocation"
          >
            Allocation
          </S.Label>
        </S.SelectChart>
        <S.SelectPeriod>
          {inputChecked === 'Price' && (
            <li key="day1D">
              <S.Input
                id="day1D"
                type="radio"
                disabled={true}
                checked={periodSelected === '1D'}
                onChange={() => {
                  returnDate('1D')
                  setPeriodSelected('1D')
                }}
              />
              <S.LabelPeriod
                selectPeriod={periodSelected === '1D'}
                isPrice={inputChecked === 'Price'}
                htmlFor="day1D"
                title="period"
              >
                1D
              </S.LabelPeriod>
            </li>
          )}
          {arrPeriod.map(period => (
            <li key={`day${period}`}>
              <S.Input
                id={`day${period}`}
                disabled={true}
                type="radio"
                checked={periodSelected === period}
                onChange={() => {
                  returnDate(period)
                  setPeriodSelected(period)
                }}
              />
              <S.LabelPeriod
                selectPeriod={periodSelected === period}
                htmlFor={`day${period}`}
                title="period"
              >
                {period}
              </S.LabelPeriod>
            </li>
          ))}
        </S.SelectPeriod>
      </S.Selects>
      {loading ? (
        <S.Wrapper height={height}>
          <Loading marginTop={10} />
        </S.Wrapper>
      ) : null}
      {inputChecked === 'Price' && !loading && (
        <ChartPrice height={height} data={price} color="#E843C4" />
      )}
      {inputChecked === 'TVL' && !loading && (
        <ChartTVL height={height} data={tvl} color="#26DBDB" />
      )}
      {inputChecked === 'Allocation' && !loading && (
        <ChartAllocation
          height={height}
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
