import React from 'react'
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts'

import CustomizedTooltip from './CustomizedTooltip'

import * as S from './styles'

export type DataType = {
  close: string,
  timestamp: number
}

interface IChartProps {
  data: DataType[];
  color: string;
}

const Chart = ({ data, color }: IChartProps) => {
  return (
    <S.Chart>
      <ResponsiveContainer width="99%" height="100%">
        <AreaChart
          data={data}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            margin: '0'
          }}
          margin={{ top: 72, right: 2, left: 0, bottom: 0 }}
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
            tickMargin={-4}
            tickLine={false}
            scale="time"
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={item => {
              const date = new Date(item)
              return date.toLocaleDateString('en-us', { month: 'short' })
            }}
          />
          <YAxis
            mirror
            domain={['auto', 'auto']}
            tickLine={false}
            axisLine={false}
            hide
          />
          <Tooltip
            wrapperStyle={{
              visibility: 'visible',
              outline: 'none'
            }}
            cursor={{ stroke: color }}
            position={{ x: 0, y: 0 }}
            content={
              <CustomizedTooltip
                payload={[]}
                currentValue={data[data.length - 1]}
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
    </S.Chart>
  )
}

export default Chart
