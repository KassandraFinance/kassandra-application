import React from 'react'

import Chart from './Chart'
import Change from './Change'
import InputList from '../../Inputs/InputList'

import * as S from './styles'
import SegmentedControls from '../../Inputs/SegmentedControls'

const dataList = ['1D', '1M', '3M', '6M']

const changeList = [
  {
    name: '1 Day',
    value: 1.71
  },
  {
    name: '1 Week',
    value: -1.71
  },

  {
    name: '1 Month',
    value: 0
  },
  {
    name: '1 Year',
    value: 1.71
  },
  {
    name: 'All',
    value: 1.71
  }
]

const tvlMock = [
  {
    close: '94318.37054523511140168523952945796',
    timestamp: 1675728000
  },
  {
    close: '95091.74746429377807836123162616105',
    timestamp: 1675814400
  },
  {
    close: '85241.17251719990223997877332444707',
    timestamp: 1675900800
  },
  {
    close: '85045.29234618072344962470317197355',
    timestamp: 1675987200
  },
  {
    close: '85257.29515923262661250333474590629',
    timestamp: 1676073600
  },
  {
    close: '83021.6322759742165446435973994729',
    timestamp: 1676246400
  }
]

const TVMChart = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('1D')

  return (
    <S.TVMChart>
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

      <Chart data={tvlMock} color="#E843C4" />

      <S.ChangeContainer>
        {changeList.map(change => (
          <Change key={change.name} title={change.name} value={change.value} />
        ))}
      </S.ChangeContainer>
    </S.TVMChart>
  )
}

export default TVMChart
