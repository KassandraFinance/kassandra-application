import React from 'react'

import { PieChart, Pie, Cell, Label } from 'recharts'

import * as S from './styles'

type IDataProps = {
  image: string
  symbol: string
  value: number
}

interface IPieChartAllocationsProps {
  data: IDataProps[]
  activeIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  isRebalancing?: boolean
}

const Chart = ({
  data,
  activeIndex,
  setActiveIndex,
  isRebalancing
}: IPieChartAllocationsProps) => {
  const CustomLabel = ({ viewBox, labelText, value }: any) => {
    const { cx, cy } = viewBox
    return (
      <g>
        <g x={cx - 70} y={cy}>
          <svg
            x={cx - 40}
            y={cy - 30}
            width={16}
            height={16}
            xmlns="http://www.w3.org/2000/svg"
          >
            <image href={data[activeIndex]?.image} width={16} height={16} />
          </svg>
          <text
            x={cx + 10}
            y={cy - 20}
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
          x={cx + 3}
          y={cy + 10}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fill="#fcfcfc"
          fontSize="32"
          fontWeight="500"
        >
          {value}%
        </text>

        {isRebalancing && (
          <text
            x={cx + 2}
            y={cy + 36}
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
        )}
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
          data={data}
          dataKey="value"
          cx={100}
          cy={100}
          innerRadius={80}
          onMouseEnter={onPieEnter}
          outerRadius={100}
          stroke="transparent"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]}
              className={entry.symbol}
              stroke={
                entry.symbol === data[activeIndex]?.symbol
                  ? '#ffff'
                  : 'transparent'
              }
              strokeWidth={entry.symbol === data[activeIndex]?.symbol ? 2 : 0}
              style={{ outline: 'none' }}
            />
          ))}
          <Label
            content={
              <CustomLabel
                labelText={data[activeIndex]?.symbol}
                value={data[activeIndex]?.value}
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

const COLORS: { [key: number]: string } = {
  0: '#E8983D',
  1: '#63698C',
  2: '#B7372D',
  3: '#3D6ECC',
  4: '#E9BC50',
  5: '#AB40E1',
  6: '#CF498D',
  7: '#D54F49',
  8: '#4517AB',
  9: '#72EEE4',
  10: '#4B81EF',
  11: '#e8983d65',
  12: '#18db11',
  13: '#cc24bef7',
  14: '#68d410d6',
  15: '#e9bb5067',
  16: '#ab40e149',
  17: '#cf498c42',
  18: '#d5504949',
  19: '#10e72299',
  20: '#d4e442b0'
}
