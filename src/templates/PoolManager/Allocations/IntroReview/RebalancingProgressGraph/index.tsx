import React from 'react'

import { Cell, Label, Pie, PieChart } from 'recharts'

import * as S from './styles'

interface IRebalancingProgressGraphProps {
  ProgressValue: number
}

const RebalancingProgressGraph = ({
  ProgressValue
}: IRebalancingProgressGraphProps) => {
  const data = [
    { name: 'progress', value: ProgressValue },
    { name: 'remaining-progress', value: 100 - ProgressValue }
  ]

  return (
    <S.RebalancingProgressGraph>
      <PieChart width={152} height={160}>
        <Pie
          data={data}
          cx={71}
          cy={72}
          innerRadius={60}
          outerRadius={70}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          maxRadius={100}
          stroke="transparent"
          cornerRadius={10}
        >
          <Label
            dy={-10}
            value={data[0].name}
            className="label-top"
            position="centerBottom"
            fill="#bdbdbd"
            fontSize="12px"
            fontWeight={400}
            letterSpacing="0.22em"
          />
          <Label
            value={String(data[0].value?.toFixed(0)) + '%'}
            position="centerTop"
            className="label-test"
            fill="#fcfcfc"
            fontSize="28px"
            fontWeight={500}
          />
          {data.map((item, index) => {
            const isProgress = data[0].name === item.name

            return (
              <Cell
                key={index + 1}
                fill={isProgress ? 'url(#progress)' : '#fcfcfc'}
                style={{
                  outline: 'none',
                  filter: isProgress
                    ? 'drop-shadow(0px 0px 5px #E843C490)'
                    : 'none'
                }}
                fillOpacity={isProgress ? '1' : '0.2'}
              />
            )
          })}
        </Pie>

        <defs>
          <linearGradient id="progress">
            <stop offset="-1.42%" stopColor="#FFBF00" />
            <stop offset="101.42%" stopColor="#E843C4" />
          </linearGradient>
        </defs>
      </PieChart>
    </S.RebalancingProgressGraph>
  )
}

export default RebalancingProgressGraph
