import React from 'react'

import Chart, { DataType } from './Chart'
import Change from './Change'
import InputList from '../../Inputs/InputList'
import SegmentedControls from '../../Inputs/SegmentedControls'

import * as S from './styles'

const dataList = ['1D', '1M', '3M', '6M', '1Y', 'ALL']

type Change = {
  name: string,
  value: number
}

type Props = {
  data: DataType[],
  selectedPeriod: string,
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>,
  selectedType?: string,
  setSelectedType?: React.Dispatch<React.SetStateAction<string>>,
  changeList: Change[]
}

const TVMChart = ({
  data,
  selectedPeriod,
  setSelectedPeriod,
  setSelectedType,
  selectedType,
  changeList
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
