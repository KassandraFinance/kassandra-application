/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Big from 'big.js'
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts'

import TooltipCustomized from './TooltipCustomized'
import CustomizedAxisTick from './CustomizedAxisTick'

import { BNtoDecimal } from '../../utils/numerals'

interface IChartPriceProps {
  data: any[]
  color: string
}

const tooltipPosition = {
  mobile: {
    x: 20,
    y: 96
  },
  desktop: {
    x: 20,
    y: 60
  }
}

const ChartPrice = ({ data, color }: IChartPriceProps) => {
  const [position, setPosition] = React.useState(tooltipPosition.desktop)

  const domain = React.useMemo(() => {
    const closes = data.map(item => parseFloat(item.close))

    return {
      max: Math.max.apply(null, closes),
      min: Math.min.apply(null, closes)
    }
  }, [data])

  React.useEffect(() => {
    const widthDevice = window.screen.width

    if (widthDevice < 375) {
      setPosition(tooltipPosition.mobile)
    } else {
      setPosition(tooltipPosition.desktop)
    }
  }, [window.screen.width])

  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart
        data={data}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '25px',
          margin: '25px 0'
        }}
        margin={{ top: 140, right: 2, left: 2, bottom: 32 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          axisLine={false}
          tick={<CustomizedAxisTick chart="price" />}
          tickMargin={-4}
          tickLine={false}
          scale="time"
          type="number"
          domain={['auto', 'auto']}
          hide
          // tickFormatter={time => getHour(time)}
        />
        <YAxis
          mirror
          domain={[domain.min, domain.max]}
          tickLine={false}
          axisLine={false}
          tickFormatter={item => {
            if (item === Infinity || item === -Infinity) {
              return ''
            }

            return BNtoDecimal(Big(item), 18, 2, 2)
          }}
        />
        <Tooltip
          wrapperStyle={{
            visibility: 'visible',
            outline: 'none'
          }}
          cursor={{ stroke: color }}
          position={position}
          content={
            <TooltipCustomized
              chart="price"
              payload={[]}
              currentPrice={data && data[data?.length - 1]}
            />
          }
        />
        <Area
          type="monotone"
          dataKey="close"
          stroke={color}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ChartPrice
