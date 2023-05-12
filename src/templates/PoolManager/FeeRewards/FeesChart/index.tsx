import Big from 'big.js'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import { BNtoDecimal } from '@/utils/numerals'
import { abbreviateNumber } from '@/utils/abbreviateNumber'

import CustomLegend from './CustomLegend'

import * as S from './styles'

export type FeeGraph = {
  totalFeesToManager: string,
  feesJoinManager: string,
  feesAumManager: string,
  timestamp: number
}[]

type Props = {
  fees: FeeGraph,
  title: string,
  legend: Record<string, string>
}

const monthShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const FeesChart = ({ fees, title, legend }: Props) => {
  return (
    <S.FeesGraph>
      <ResponsiveContainer width="99%" height={322} minWidth={768}>
        <BarChart
          data={fees}
          layout="horizontal"
          margin={{ right: 24 }}
          barCategoryGap={10}
          barSize={10}
        >
          <XAxis
            xAxisId="0"
            type="category"
            dataKey="timestamp"
            tickLine={false}
            height={21}
            tickFormatter={item => {
              const date = new Date(Number(item) * 1000)
              return monthShort[date.getUTCMonth()]
            }}
            reversed={true}
            stroke="#c4c4c4"
            axisLine={false}
          />
          <XAxis
            xAxisId="1"
            type="category"
            dataKey="totalFeesToManager"
            allowDuplicatedCategory={true}
            tickLine={false}
            tickFormatter={item => `$${Big(item).toFixed(2)}`}
            reversed={true}
            stroke="#c4c4c4"
            axisLine={false}
          />
          <YAxis
            type="number"
            domain={[0, 'auto']}
            stroke="#c4c4c4"
            tickLine={false}
            axisLine={false}
            tickFormatter={item => {
              if (Number(item) < 100) {
                return item
              }
              return abbreviateNumber(item)
            }}
          />
          <CartesianGrid
            strokeDasharray="0"
            horizontal={true}
            vertical={false}
            stroke="rgba(255, 255, 255, 0.08)"
          />
          <Tooltip
            contentStyle={{
              background: '#333333',
              borderWidth: 0
            }}
            cursor={false}
            labelFormatter={label => {
              const date = new Date(Number(label) * 1000)
              return monthShort[date.getUTCMonth()]
            }}
            formatter={(value, name) => {
              const _value = Array.isArray(value) ? Big(value[0]) : Big(value)
              return [' $' + BNtoDecimal(_value, 2), legend[name]]
            }}
          />
          <Legend
            content={<CustomLegend title={title} legend={legend} />}
            align="left"
            verticalAlign="top"
          />
          <Bar dataKey="feesJoinManager" fill="#fcfcfc" />
          <Bar dataKey="feesAumManager" fill="#FFBF00" />
        </BarChart>
      </ResponsiveContainer>
    </S.FeesGraph>
  )
}

export default FeesChart
