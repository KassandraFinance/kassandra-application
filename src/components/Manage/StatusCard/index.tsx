import InputList, { DataListType } from '../../Inputs/InputList'

import * as S from './styles'

export type NumberStatus = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'

interface IStatusCardProps {
  title: string
  value: string
  status?: NumberStatus
  dataList?: DataListType
  selected?: string
  onClick?: (period: string) => void
}

const StatusCard = ({
  title,
  value,
  status = 'NEUTRAL',
  dataList = [],
  selected = '',
  onClick = () => {
    return
  }
}: IStatusCardProps) => {
  return (
    <S.StatusCard>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>

        {dataList.length > 0 && (
          <InputList
            dataList={dataList}
            selected={selected}
            onClick={onClick}
          />
        )}
      </S.TitleContainer>

      <S.Value status={status}>{value}</S.Value>
    </S.StatusCard>
  )
}

export default StatusCard
