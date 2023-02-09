import Change from './Change'

import * as S from './styles'

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

const TVMChart = () => {
  return (
    <S.TVMChart>
      <S.ChangeContainer>
        {changeList.map(change => (
          <Change key={change.name} title={change.name} value={change.value} />
        ))}
      </S.ChangeContainer>
    </S.TVMChart>
  )
}

export default TVMChart
