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
          payload
            .sort((a, b) => a.value - b.value)
            .flatMap(entry => {
              if (entry.value > 0)
                return [
                  <li key={entry.name} style={{ color: entry.color }}>
                    <span>{entry.name.substring(42)}</span>
                    <span>-</span>
                    <span>{toPercent(entry.value)}</span>
                  </li>
                ]
              return []
            })}
        <S.DateAllocation>{currentDate}</S.DateAllocation>
      </ul>
    </S.TooltipAllocation>
  )
}

export default TooltipAllocation
