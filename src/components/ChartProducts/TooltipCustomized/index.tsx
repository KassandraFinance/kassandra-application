import React from 'react'
import Big from 'big.js'

import { getDateInHours } from '@/utils/date'
import { BNtoDecimal } from '@/utils/numerals'

import * as S from './styles'

interface ITooltipCustomizedPRops {
  chart: string
  payload: { value: string; payload: { timestamp: number } }[]
  currentPrice?: { close?: string; timestamp: number; value?: string }
}

const TooltipCustomized = (props: ITooltipCustomizedPRops) => {
  const { chart, payload, currentPrice } = props

  const price = parseFloat(currentPrice?.close ?? '0')
  const formattedPrice = price > 0.1 ? price.toFixed(2) : price.toFixed(5)

  if (payload && payload.length) {
    const price = parseFloat(payload[0].value)
    return (
      <S.Content>
        <S.Price>
          <h1>{`$${price > 0.1 ? price.toFixed(2) : price.toFixed(5)}`}</h1>
        </S.Price>
        <p>{getDateInHours(payload[0].payload.timestamp)}</p>
      </S.Content>
    )
  }
  return (
    <S.Content>
      {currentPrice && (
        <>
          <S.Price>
            {chart === 'price' && <h1>${formattedPrice}</h1>}
            {chart === 'tvl' && (
              <h1>
                ${`${BNtoDecimal(Big(currentPrice?.value || 0), 2, 2, 2)}`}
              </h1>
            )}
          </S.Price>
          <p>{getDateInHours(currentPrice?.timestamp)}</p>
        </>
      )}
    </S.Content>
  )
}

export default TooltipCustomized
