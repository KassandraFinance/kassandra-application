import React from 'react'

import { PieChart, Pie, Cell, Label } from 'recharts'

import * as S from './styles'

const Chart = (props: any) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const data01 = [
    {
      image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
      name: 'WTBC',
      value: 50,
      porcentage: '60%'
    },
    {
      image:
        'https://assets.coingecko.com/coins/images/21490/thumb/Add-a-heading-26.png',
      name: 'LYRA',
      value: 50,
      porcentage: '60%'
    }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  const CustomLabel = ({ viewBox, labelText, value }: any) => {
    const { cx, cy } = viewBox
    return (
      <g>
        <g x={cx} y={cy}>
          <svg
            x={cx - 40}
            y={cy - 40}
            width={16}
            height={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <image href={data01[activeIndex].image} width={16} height={16} />
          </svg>
          <text
            x={cx + 10}
            y={cy - 30}
            className="recharts-text"
            textAnchor="middle"
            dominantBaseline="central"
            alignmentBaseline="middle"
            fill="#fcfcfc"
            fontSize="16"
            fontWeight="400"
          >
            {labelText}
          </text>
        </g>
        <text
          x={cx}
          y={cy + 5}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#fcfcfc"
          fontSize="36"
          fontWeight="500"
        >
          {value}%
        </text>

        <text
          x={cx}
          y={cy + 30}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#fcfcfc"
          fontSize="12"
          fontWeight="400"
        >
          REBALANCING
        </text>
      </g>
    )
  }

  const onPieEnter = React.useCallback(
    (_, index) => {
      setActiveIndex(index)
    },
    [setActiveIndex]
  )

  return (
    <S.PieChartsContainer>
      <PieChart width={210} height={210}>
        <Pie
          data={data01}
          dataKey="value"
          cx={100}
          cy={100}
          innerRadius={80}
          onMouseEnter={onPieEnter}
          outerRadius={100}
          stroke="transparent"
        >
          {data01.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              className={entry.name}
              stroke={
                entry.name === data01[activeIndex].name
                  ? '#ffff'
                  : 'transparent'
              }
              strokeWidth={entry.name === data01[activeIndex].name ? 2 : 0}
              style={{ outline: 'none' }}
            />
          ))}
          <Label
            content={
              <CustomLabel
                labelText={data01[activeIndex].name}
                value={data01[activeIndex].value}
              />
            }
            position="center"
          />
        </Pie>
      </PieChart>
    </S.PieChartsContainer>
  )
}

export default Chart