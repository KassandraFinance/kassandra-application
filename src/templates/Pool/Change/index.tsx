import React from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { request } from 'graphql-request'
import Big from 'big.js'

import {
  BACKEND_KASSANDRA,
  KacyPoligon
} from '../../../constants/tokenAddresses'

import { GET_POOL_PRICE } from './graphql'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setPerformanceValues } from '../../../store/reducers/performanceValues'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'

import * as S from './styles'

const Change = () => {
  const [arrChangePrice, setArrChangePrice] = React.useState<string[]>([])

  const dispatch = useAppDispatch()
  const { pool } = useAppSelector(state => state)

  const { data } = useSWR([GET_POOL_PRICE], query =>
    request(BACKEND_KASSANDRA, query, {
      id: pool.id,
      day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
      week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
      month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
      quarterly: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 90),
      year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
    })
  )

  function calcChange(newPrice: number, oldPrice: number) {
    const calc = ((newPrice - oldPrice) / oldPrice) * 100
    return calc ? calc.toFixed(2) : '0'
  }

  React.useEffect(() => {
    const arrChangePrice = []

    if (data?.pool) {
      const indexKacy = pool.underlying_assets.findIndex(
        asset => asset.token.id === KacyPoligon
      )
      if (indexKacy !== -1) {
        const diff = Big(data.pool.price_usd).mul(2).div(98).toFixed()
        const changeDay = calcChange(
          Big(data.pool.now[0].close).add(diff).toNumber(),
          Big(data.pool.day[0]?.close).add(diff).toNumber()
        )
        const changeWeek = calcChange(
          Big(data.pool.now[0].close).add(diff).toNumber(),
          Big(data.pool.week[0]?.close).add(diff).toNumber()
        )
        const changeMonth = calcChange(
          Big(data.pool.now[0].close).add(diff).toNumber(),
          Big(data.pool.month[0]?.close).add(diff).toNumber()
        )
        const changeQuarterly = calcChange(
          Big(data.pool.now[0].close).add(diff).toNumber(),
          Big(data.pool.quarterly[0]?.close).add(diff).toNumber()
        )
        const changeYear = calcChange(
          Big(data.pool.now[0].close).add(diff).toNumber(),
          Big(data.pool.year[0]?.close).add(diff).toNumber()
        )

        arrChangePrice[0] = changeDay
        arrChangePrice[1] = changeWeek
        arrChangePrice[2] = changeMonth
        arrChangePrice[3] = changeQuarterly
        arrChangePrice[4] = changeYear

        setArrChangePrice(arrChangePrice)

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
      } else {
        const changeDay = calcChange(
          data.pool.now[0].close,
          data.pool.day[0]?.close
        )
        const changeWeek = calcChange(
          data.pool.now[0].close,
          data.pool.week[0]?.close
        )
        const changeMonth = calcChange(
          data.pool.now[0].close,
          data.pool.month[0]?.close
        )
        const changeQuarterly = calcChange(
          data.pool.now[0].close,
          data.pool.quarterly[0]?.close
        )
        const changeYear = calcChange(
          data.pool.now[0].close,
          data.pool.year[0]?.close
        )

        arrChangePrice[0] = changeDay
        arrChangePrice[1] = changeWeek
        arrChangePrice[2] = changeMonth
        arrChangePrice[3] = changeQuarterly
        arrChangePrice[4] = changeYear

        setArrChangePrice(arrChangePrice)

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
    }
  }, [data])

  return (
    <S.Change>
      <S.Title>
        <Image src={iconBar} alt="" width={18} height={18} />
        <h2>Price Change</h2>
      </S.Title>
      <table>
        <thead>
          <tr>
            <th>1 day</th>
            <th>1 week</th>
            <th>1 month</th>
            <th>3 months</th>
            <th>1 year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {arrChangePrice.length > 0 &&
              arrChangePrice.map((item: string, index: number) => (
                <S.Td key={index} value={parseFloat(item)}>
                  {item.length === 0 ? '...' : `${item}%`}
                </S.Td>
              ))}
          </tr>
        </tbody>
      </table>
    </S.Change>
  )
}

export default Change
