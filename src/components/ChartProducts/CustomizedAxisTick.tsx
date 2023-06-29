import React from 'react'

import { getHour, getDay } from '@/utils/date'

type CustomizedAxisTickProps = {
  chart?: string
  x?: number
  y?: number
  payload?: { value: number }
}

export const CustomizedAxisTick = ({
  chart,
  x,
  y,
  payload
}: CustomizedAxisTickProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#eee"
        // transform="rotate(-35)"
      >
        {chart === 'price'
          ? getHour(payload?.value ?? 0)
          : getDay(payload?.value ?? 0)}
      </text>
    </g>
  )
}

export default CustomizedAxisTick
