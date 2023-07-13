import React from 'react'

import Chart, { DataType } from './Chart'
import Change from './Change'
import InputList from '../../Inputs/InputList'
import SegmentedControls from '../../Inputs/SegmentedControls'

import * as S from './styles'

type Change =
  | readonly [
      {
        readonly name: '1 Day'
        readonly key: 'day'
        readonly value: 0
      },
      {
        readonly name: '1 Week'
        readonly key: 'week'
        readonly value: 0
      },
      {
        readonly name: '1 Month'
        readonly key: 'month'
        readonly value: 0
      },
      {
        readonly name: '1 Year'
        readonly key: 'year'
        readonly value: 0
      },
      {
        readonly name: 'All'
        readonly key: 'max'
        readonly value: 0
      }
    ]
  | {
      name: '1 Week' | '1 Month' | '1 Year' | 'All' | '1 Day'
      value: number
    }[]

type Props = {
  data: DataType[]
  selectedPeriod: string
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>
  selectedType?: string
  setSelectedType?: React.Dispatch<React.SetStateAction<string>>
  changeList: Change
  dataList?: string[]
}

const TVMChart = ({
  data,
  selectedPeriod,
  setSelectedPeriod,
  setSelectedType,
  selectedType,
  changeList,
  dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']
}: Props) => {
  return (
    <S.TVMChart>
      <S.SelectChartTypeContainer>
        {setSelectedType ? (
          <>
            <S.ChartTypeButton
              selected={selectedType === 'price'}
              onClick={() => setSelectedType('price')}
            >
              Price
            </S.ChartTypeButton>
            <S.ChartTypeButton
              selected={selectedType === 'tvl'}
              onClick={() => setSelectedType('tvl')}
            >
              Total Value Managed
            </S.ChartTypeButton>
          </>
        ) : (
          <S.Title>Total Value Managed</S.Title>
        )}
      </S.SelectChartTypeContainer>

      <S.SegmentedControlsContainer>
        <SegmentedControls
          dataList={dataList}
          selected={selectedPeriod}
          onClick={(period: string) => setSelectedPeriod(period)}
        />
      </S.SegmentedControlsContainer>

      <S.InputListContainer>
        <InputList
          dataList={dataList}
          selected={selectedPeriod}
          onClick={(period: string) => setSelectedPeriod(period)}
        />
      </S.InputListContainer>

      <Chart data={data} color="#E843C4" />

      <S.ChangeContainer>
        {changeList?.map(change => (
          <Change key={change.name} title={change.name} value={change.value} />
        ))}
      </S.ChangeContainer>
    </S.TVMChart>
  )
}

export default TVMChart
