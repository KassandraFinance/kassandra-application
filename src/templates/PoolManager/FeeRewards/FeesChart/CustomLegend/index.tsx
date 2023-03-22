import * as S from './styles'

export const legend: Record<string, string> = {
  feesJoinManager: 'MANAGED FEE',
  feesAumManager: 'DEPOSIT FEE'
}

const CustomLegend = ({ payload }: any) => {
  return (
    <S.CustomLegend>
      <h2>Rewards History</h2>
      <S.Legend style={{ backgroundColor: payload[0]?.color }} />
      <p>{legend[payload[0]?.dataKey]}</p>
      <S.Legend style={{ backgroundColor: payload[1]?.color }} />
      <p>{legend[payload[1]?.dataKey]}</p>
    </S.CustomLegend>
  )
}

export default CustomLegend
