import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { usePoolPrice } from '@/hooks/query/usePoolPrice'
import { usePoolData } from '@/hooks/query/usePoolData'

import { useAppDispatch } from '../../../store/hooks'
import { setPerformanceValues } from '../../../store/reducers/performanceValues'

import { calcChange } from '@/utils/numerals'

import iconBar from '../../../../public/assets/iconGradient/product-bar.svg'

import * as S from './styles'

const Change = () => {
  const [arrChangePrice, setArrChangePrice] = React.useState<string[]>([])

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data: pool } = usePoolData({ id: router.query.address as string })

  const { data } = usePoolPrice({
    id: pool?.id || '',
    day: Math.trunc(Date.now() / 1000 - 60 * 60 * 24),
    week: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 7),
    month: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 30),
    quarterly: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 90),
    year: Math.trunc(Date.now() / 1000 - 60 * 60 * 24 * 365)
  })

  React.useEffect(() => {
    const arrChangePrice = []

    if (data) {
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
