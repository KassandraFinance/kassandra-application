import React from 'react'

import { getDate } from '@/utils/date'

import * as S from './styles'

type TooltipAllocationProps = {
  payload?: { color: string; name: string; value: number }[]
  label?: number
}

const TooltipAllocation = ({ payload, label = 0 }: TooltipAllocationProps) => {
  const [currentDate, setCurrentDate] = React.useState('')

  const toPercent = (decimal: number, fixed = 2) => {
    return `${(decimal * 100).toFixed(fixed)}%`
  }

  React.useEffect(() => {
    setCurrentDate(getDate(label))
  }, [label])

  return (
    <S.TooltipAllocation>
      <ul>
        {payload &&
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              <span>{entry.name}</span>
              <span>-</span>
              <span>{toPercent(entry.value)}</span>
            </li>
          ))}
        <S.DateAllocation>{currentDate}</S.DateAllocation>
      </ul>
    </S.TooltipAllocation>
  )
}

export default TooltipAllocation
