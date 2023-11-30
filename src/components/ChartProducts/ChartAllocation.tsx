import React from 'react'
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts'

import TooltipAllocation from './TooltipAllocation'
import CustomizedAxisTick from './CustomizedAxisTick'

import { dictionary } from './styles'

import { PoolChartsQuery } from '../../gql/generated/kassandraApi'

interface IChartAllocationProps {
  data: NonNullable<PoolChartsQuery['pool']>['weight_goals']
}

type RechartsData = {
  [x: string]: number
  timestamp: number
}

const invertSymbol: { [key: string]: string } = {
  '0x0C4684086914D5B1525bf16c62a0FF8010AB991A': 'YY.YAK',
  '0xd0F41b1C9338eB9d374c83cC76b684ba3BB71557': 'YY.sAVAX',
  '0x19707F26050Dfe7eb3C1b36E49276A088cE98752': 'YY.PNG',
  '0xbF5bFFbf7D94D3B29aBE6eb20089b8a9E3D229f7': 'YY.QI',
  '0xbbcED92AC9B958F88A501725f080c0360007e858': 'WBTC.e', //WBTC
  '0xe28Ad9Fa07fDA82abab2E0C86c64A19D452b160E': 'WETH.e', //WETH
  '0xFA17fb53da4c837594127b73fFd09fdb15f42C49': 'DAI.e', //DAI
  '0x964555644E067c560A4C144360507E80c1104784': 'USDT.e' //USDT
}

const ChartAllocation = ({ data }: IChartAllocationProps) => {
  const [allocation, setAllocation] = React.useState<
    Array<{
      [symbol: string]: number
    }>
  >([])
  const [arrayKeys, setArrayKeys] = React.useState<string[]>([])
  const [referenceLineX, setReferenceLineX] = React.useState(0)

  React.useEffect(() => {
    if (data.length) {
      const everySymbol = new Set<string>()
      const rechartData: RechartsData[] = []

      for (let i = data.length - 1; i >= 0; i--) {
        const { start_timestamp, end_timestamp } = data[i]
        const last = rechartData.at(-1)

        const endGoals: RechartsData = data[i].weights.reduce(
          (acc: RechartsData, cur) => {
            const symbol =
              invertSymbol[cur.asset.token.id] || cur.asset.token.symbol
            const identifier = `${cur.asset.token.id}${symbol}`
            everySymbol.add(identifier)
            acc[identifier] = Number(cur.weight_normalized)
            return acc
          },
          { timestamp: end_timestamp }
        )

        if (last) {
          // new action while rebalace was running
          if (last.timestamp > start_timestamp) {
            const startLast = rechartData.at(-2)

            if (startLast) {
              Object.keys(last).forEach(key => {
                last[key] =
                  ((last[key] - startLast[key]) /
                    (last.timestamp - startLast.timestamp)) *
                    (start_timestamp - startLast.timestamp) +
                  startLast[key]
              })
            }

            last.timestamp = start_timestamp
          }

          if (start_timestamp !== end_timestamp) {
            rechartData.push({
              ...last,
              timestamp: start_timestamp
            })
          }
          // adding/removing token / start_timestamp === end_timestamp
          else {
            const startGoals: RechartsData = { ...last }

            Object.keys(endGoals).forEach(key => {
              if (!startGoals[key]) {
                startGoals[key] = 0
              }
            })

            Object.keys(last).forEach(key => {
              if (!endGoals[key]) {
                endGoals[key] = 0
              }
            })

            startGoals.timestamp = start_timestamp - 1
            rechartData.push(startGoals)
          }
        }

        rechartData.push(endGoals)
      }

      const last = rechartData.at(-1) as RechartsData
      const now = Math.round(Date.now() / 1000)

      if (now < last.timestamp) {
        setReferenceLineX(now)
      } else {
        rechartData.push({
          ...last,
          timestamp: now
        })
      }

      for (const symbol of everySymbol) {
        rechartData[0][symbol] = rechartData[0][symbol] || 0
      }

      const keys = Object.keys(rechartData[0])

      setArrayKeys(keys.splice(1, keys.length - 1))
      setAllocation(rechartData)
    }
  }, [data])

  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart
        data={allocation}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '25px',
          margin: '25px 0'
        }}
        stackOffset="expand"
        margin={{ top: 50, right: 2, left: 0, bottom: 16 }}
      >
        <XAxis
          dataKey="timestamp"
          axisLine={false}
          tick={<CustomizedAxisTick chart="allocation" />}
          tickMargin={-4}
          tickLine={false}
          scale="time"
          type="number"
          domain={['auto', 'auto']}
          hide
          // tickFormatter={time => getDate(time)}
        />
        <YAxis hide domain={[0, 1]} />
        <Tooltip
          content={<TooltipAllocation payload={undefined} label={undefined} />}
        />
        {arrayKeys &&
          arrayKeys.map((key, index) => {
            return (
              <Area
                key={`${key}`}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={`${dictionary[index]}`}
                fill={`${dictionary[index]}`}
              />
            )
          })}
        <ReferenceLine
          x={referenceLineX}
          stroke="white"
          strokeDasharray="3 3"
          isFront={true}
          label={
            <Label
              value="Now"
              position="left"
              angle={270}
              fill="white"
              fontSize={11}
              offset={10}
            />
          }
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ChartAllocation
