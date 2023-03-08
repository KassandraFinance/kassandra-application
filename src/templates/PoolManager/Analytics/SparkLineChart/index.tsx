import { XAxis, YAxis, AreaChart, Area, ResponsiveContainer } from 'recharts'

import * as S from './styles'

export type sparkData = {
  close: string,
  timestamp: number
}

interface ISparkLineChartProps {
  data: sparkData[];
  color: string;
}

const SparkLineChart = ({ data, color }: ISparkLineChartProps) => {
  return (
    <S.SparkLineChart>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            margin: '0'
          }}
          margin={{ top: 0, right: 1, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={color} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="175.59%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timestamp" domain={['auto', 'auto']} hide />
          <YAxis
            mirror
            axisLine={false}
            tick={false}
            domain={['auto', 'auto']}
          />

          <Area
            type="monotone"
            dataKey="close"
            stroke={color}
            fillOpacity={1}
            fill={`url(#${color})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </S.SparkLineChart>
  )
}

export default SparkLineChart
