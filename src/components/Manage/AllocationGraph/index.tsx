import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelProps,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

import * as S from './styles'

export type IDataProps = {
  imageUrl: string
  name: string
  currentAllocation: number
  newAllocation: number
}

interface IAllocationGraphProps {
  data: IDataProps[]
  isOpen: boolean
}

const AllocationGraph = ({ data, isOpen }: IAllocationGraphProps) => {
  const customAxisTick = ({ x, y, payload }: any) => {
    return (
      <svg
        x={x - 30}
        y={y - 12}
        width={30}
        height={30}
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href={data[payload.index].imageUrl} width={24} height={24} />
      </svg>
    )
  }

  const customBarLabel = ({ x, y, width, value, height }: LabelProps) => {
    if (!(x && y && width && height)) return

    return (
      <text
        x={x + width + 10}
        y={y + height + 2}
        fill="#fcfcfc"
        fontSize={12}
        fontWeight={300}
        fontFamily="Rubik"
        dy={-6}
      >{`${value === 0.0001 ? 0 : value}%`}</text>
    )
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <S.CustomTooltipContainer>
          <S.CustomTooltipName>
            <img
              src={payload[0].payload.imageUrl}
              alt=""
              width={16}
              height={16}
            />
            <span>{label}</span>
          </S.CustomTooltipName>
          <S.CustomTooltipContent>
            <S.CustomTooltipItens textColor={payload[0].fill}>
              <p>Current Allocation: </p>
              <strong>
                {(payload[0].payload.currentAllocation || 0) === 0.0001
                  ? 0
                  : payload[0].payload.currentAllocation}
              </strong>
            </S.CustomTooltipItens>
            <S.CustomTooltipItens textColor={payload[1].fill}>
              <p>New allocation: </p>
              <strong>
                {(payload[1].payload.newAllocation || 0) === 0.0001
                  ? 0
                  : payload[1].payload.newAllocation}
              </strong>
            </S.CustomTooltipItens>
          </S.CustomTooltipContent>
        </S.CustomTooltipContainer>
      )
    }
    return null
  }

  return (
    <S.AllocationGraph isOpen={isOpen} height={((data.length + 1) * 90) / 10}>
      <S.AllocationTitle>
        <h4>Allocation Summary</h4>
        <S.AllocationList>
          <S.AllocationItem>
            <span />
            <p>Current Allocation</p>
          </S.AllocationItem>
          <S.AllocationItem>
            <span />
            <p>New allocation</p>
          </S.AllocationItem>
        </S.AllocationList>
      </S.AllocationTitle>

      <ResponsiveContainer width="99%" height={data.length * 90}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 2, left: -21, bottom: 5 }}
          barCategoryGap={10}
          barSize={20}
        >
          <XAxis type="number" domain={[0, 100]} stroke="#ccc" />
          <YAxis
            type="category"
            dataKey="name"
            tick={customAxisTick}
            stroke="#ccc"
          />
          <CartesianGrid
            strokeDasharray="0"
            horizontal={false}
            stroke="#ffffff30"
          />
          <Tooltip cursor={{ fill: '#ffffff10' }} content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="currentAllocation"
            fill="#FFBF00"
            label={customBarLabel}
          />
          <Bar dataKey="newAllocation" fill="#26DBDB" label={customBarLabel} />
        </BarChart>
      </ResponsiveContainer>
    </S.AllocationGraph>
  )
}

export default AllocationGraph
