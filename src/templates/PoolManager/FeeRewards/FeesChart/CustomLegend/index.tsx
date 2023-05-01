import * as S from './styles'

const CustomLegend = ({ payload, title, legend }: any) => {
  return (
    <S.CustomLegend>
      <h2>{title}</h2>
      <S.Legend style={{ backgroundColor: payload[0]?.color }} />
      <p>{legend[payload[0]?.dataKey]}</p>
      <S.Legend style={{ backgroundColor: payload[1]?.color }} />
      <p>{legend[payload[1]?.dataKey]}</p>
    </S.CustomLegend>
  )
}

export default CustomLegend
